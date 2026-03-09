const OPEN_MARK_TOKEN = '__GVB_MARK_OPEN__'
const CLOSE_MARK_TOKEN = '__GVB_MARK_CLOSE__'

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildKeywordPattern(keyword) {
  const segments = String(keyword || '')
    .trim()
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (!segments.length) return null
  return new RegExp(`(${segments.map(escapeRegExp).join('|')})`, 'gi')
}

function normalizeHighlightSource(value) {
  return String(value || '')
    .replace(/<\s*mark\s*>/gi, OPEN_MARK_TOKEN)
    .replace(/<\s*\/\s*mark\s*>/gi, CLOSE_MARK_TOKEN)
    .replace(/<\s*em\s*>/gi, OPEN_MARK_TOKEN)
    .replace(/<\s*\/\s*em\s*>/gi, CLOSE_MARK_TOKEN)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
}

function restoreMarkTags(value) {
  return String(value || '')
    .replaceAll(OPEN_MARK_TOKEN, '<mark>')
    .replaceAll(CLOSE_MARK_TOKEN, '</mark>')
}

function highlightEscapedHtml(value, keyword) {
  const pattern = buildKeywordPattern(keyword)
  if (!pattern) return value

  let inMark = false
  return String(value || '')
    .split(/(<mark>|<\/mark>|<[^>]+>)/g)
    .map((part) => {
      if (!part) return part
      if (part === '<mark>') {
        inMark = true
        return part
      }
      if (part === '</mark>') {
        inMark = false
        return part
      }
      if (part.startsWith('<')) return part
      if (inMark) return part
      return part.replace(pattern, '<mark>$1</mark>')
    })
    .join('')
}

function normalizePlainText(value) {
  return normalizeHighlightSource(value)
    .replaceAll(OPEN_MARK_TOKEN, '')
    .replaceAll(CLOSE_MARK_TOKEN, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildSnippetText(value, keyword, radius = 90) {
  const text = normalizePlainText(value)
  if (!text) return ''

  const pattern = buildKeywordPattern(keyword)
  if (!pattern) {
    if (text.length <= radius * 2) return text
    return `${text.slice(0, radius * 2).trim()}...`
  }

  const match = pattern.exec(text)
  if (!match) {
    if (text.length <= radius * 2) return text
    return `${text.slice(0, radius * 2).trim()}...`
  }

  const start = Math.max(0, match.index - radius)
  const end = Math.min(text.length, match.index + match[0].length + radius)
  let snippet = text.slice(start, end).trim()
  if (start > 0) snippet = `...${snippet}`
  if (end < text.length) snippet = `${snippet}...`
  return snippet
}

export function renderHighlightedHtml(value, keyword = '') {
  const safeValue = restoreMarkTags(escapeHtml(normalizeHighlightSource(value)))
  return highlightEscapedHtml(safeValue, keyword)
}

export function renderSnippetHtml(value, keyword = '', radius = 90) {
  return renderHighlightedHtml(buildSnippetText(value, keyword, radius), keyword)
}

export function stripHighlightMarkup(value) {
  return normalizePlainText(value)
}
