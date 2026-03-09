// `src/utils/url.js` 专门处理“后端返回的路径如何变成前端可访问 URL”。
// 这个文件对图片显示、富文本图片、富文本链接都很关键。
//
// 为什么需要它？
// 因为后端返回的数据不一定统一，可能出现这些情况：
// - `/uploads/file/u_1/demo.png`
// - `uploads/file/u_1/demo.png`
// - `/api/files/12/download`
// - `http://example.com/a.png`
// - 富文本里的 `<img src="uploads/xxx">`
// 这个工具文件的目标就是：把这些“历史格式、相对路径、完整地址”统一规范掉。
const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()

let apiOrigin = ''
if (/^https?:\/\//i.test(apiBaseUrl)) {
  try {
    apiOrigin = new URL(apiBaseUrl).origin
  } catch {
    apiOrigin = ''
  }
}

// `withOrigin` 的作用是：当我们已经知道后端源站时，
// 把相对路径拼成完整 URL；否则就原样返回，交给浏览器当前站点处理。
function withOrigin(path) {
  if (!path) return ''
  if (!apiOrigin) return path
  try {
    return new URL(path, apiOrigin).toString()
  } catch {
    return path
  }
}

// 清理路径里的杂质：
// - 去首尾空格；
// - 统一反斜杠为正斜杠；
// - 去掉开头的 `./`、`../`，避免前端路径拼接混乱。
function cleanRelativePath(value) {
  return String(value || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^(\.\/)+/, '')
    .replace(/^(\.\.\/)+/, '')
}

// 把一些“已知资源路径”规范成统一形式。
// 例如：
// - `http://host/uploads/a.png` -> `/uploads/a.png`
// - `uploads/a.png` -> `/uploads/a.png`
// - `api/files/1/download` -> `/api/files/1/download`
function normalizeKnownResourcePath(value) {
  const normalized = String(value || '')
  const lowerValue = normalized.toLowerCase()
  const uploadIndex = lowerValue.indexOf('/uploads/')
  if (uploadIndex >= 0) {
    return normalized.slice(uploadIndex)
  }
  const uploadRelativeIndex = lowerValue.indexOf('uploads/')
  if (uploadRelativeIndex >= 0) {
    return `/${normalized.slice(uploadRelativeIndex)}`
  }
  const apiIndex = lowerValue.indexOf('/api/')
  if (apiIndex >= 0) {
    return normalized.slice(apiIndex)
  }
  const apiRelativeIndex = lowerValue.indexOf('api/')
  if (apiRelativeIndex >= 0) {
    return `/${normalized.slice(apiRelativeIndex)}`
  }
  return normalized
}

function appendAccessToken(urlValue) {
  const token = String(localStorage.getItem('token') || '').trim()
  if (!token) return urlValue
  try {
    const resolved = apiOrigin ? new URL(urlValue, apiOrigin) : new URL(urlValue, window.location.origin)
    if (!resolved.pathname.startsWith('/uploads/')) return urlValue
    if (!resolved.searchParams.get('token')) {
      resolved.searchParams.set('token', token)
    }
    return resolved.toString()
  } catch {
    return urlValue
  }
}

// 图片、附件、二维码等资源地址统一走这个方法。
export function resolveResourceUrl(value) {
  const cleanedValue = cleanRelativePath(value)
  if (!cleanedValue) return ''

  // 这些协议本身就是完整可用值，不需要再拼接。
  if (/^(data:|blob:|mailto:|tel:|javascript:)/i.test(cleanedValue)) return cleanedValue
  if (/^https?:\/\//i.test(cleanedValue)) return cleanedValue
  if (cleanedValue.startsWith('//')) return cleanedValue

  const normalized = normalizeKnownResourcePath(cleanedValue)

  if (normalized.startsWith('/api/') || normalized.startsWith('/uploads/')) {
    return appendAccessToken(withOrigin(normalized))
  }
  if (normalized.startsWith('api/') || normalized.startsWith('uploads/')) {
    return appendAccessToken(withOrigin(`/${normalized}`))
  }
  if (normalized.startsWith('/')) {
    return appendAccessToken(withOrigin(normalized))
  }
  return appendAccessToken(withOrigin(`/uploads/${normalized}`))
}

// 普通链接统一走这个方法。
// 它和图片解析的差别是：对“未知相对路径”更保守，避免把任意字符串都误当成图片上传目录。
export function resolveLinkUrl(value) {
  const cleanedValue = cleanRelativePath(value)
  if (!cleanedValue) return ''

  if (
    /^(data:|blob:|mailto:|tel:|javascript:|https?:\/\/)/i.test(cleanedValue) ||
    cleanedValue.startsWith('//') ||
    cleanedValue.startsWith('#') ||
    cleanedValue.startsWith('?')
  ) {
    return cleanedValue
  }

  const normalized = normalizeKnownResourcePath(cleanedValue)
  if (normalized.startsWith('/')) {
    return withOrigin(normalized)
  }
  if (normalized.startsWith('api/') || normalized.startsWith('uploads/')) {
    return withOrigin(`/${normalized}`)
  }
  return normalized
}

// 富文本 HTML 二次标准化：
// 1. 把 `<img src="相对路径">` 转成完整资源地址；
// 2. 把 `<a href="相对路径">` 转成可访问链接；
// 3. 对外链自动补 `target="_blank"` 和安全属性。
export function normalizeRichTextHtml(html) {
  if (!html || typeof document === 'undefined') return String(html || '')

  const wrapper = document.createElement('div')
  wrapper.innerHTML = String(html)

  wrapper.querySelectorAll('img').forEach((node) => {
    const src = resolveResourceUrl(node.getAttribute('src'))
    if (src) {
      node.setAttribute('src', src)
    }
  })

  wrapper.querySelectorAll('a').forEach((node) => {
    const href = resolveLinkUrl(node.getAttribute('href'))
    if (!href) return
    node.setAttribute('href', href)
    if (/^https?:\/\//i.test(href)) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    }
  })

  return wrapper.innerHTML
}
