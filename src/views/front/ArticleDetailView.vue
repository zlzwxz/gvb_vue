<template>
  <div class="article-detail-page">
    <div v-if="loading" class="loading-state container">
      <el-skeleton :rows="10" animated />
    </div>

    <template v-else-if="article">
      <!-- Hero Banner -->
      <div class="hero-banner" :style="getBannerStyle(article.banner_url)">
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-title">{{ article.title }}</h1>
            <p class="hero-abstract" v-if="article.abstract">{{ article.abstract }}</p>
            <div class="hero-meta">
              <el-tag v-for="tag in (article.tags || [])" :key="tag" size="small" effect="dark" round class="hero-tag">{{ tag }}</el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 两栏内容区 -->
      <div class="container detail-layout">
        <div class="detail-main">
          <div class="article-card">
            <h2 class="article-title">{{ article.title }}</h2>
            <div class="article-meta">
              <span><el-icon><Clock /></el-icon> 发布时间：{{ formatDate(article.created_at) }}</span>
              <el-tag v-for="tag in (article.tags || [])" :key="tag" size="small" type="info" effect="plain" round style="margin-left:6px;">{{ tag }}</el-tag>
            </div>
            <el-divider />
            <div class="content-html" v-html="renderedContent"></div>
            <div v-if="Array.isArray(article.attachments) && article.attachments.length" class="attachment-panel">
              <h3>附件下载</h3>
              <a
                v-for="(item, idx) in article.attachments"
                :key="`${item.url}-${idx}`"
                class="attachment-link"
                :href="normalizeDownloadUrl(item.url)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.name || `附件 ${idx + 1}` }}
              </a>
            </div>


          </div>

          <!-- 评论区域 -->
          <div class="comment-section" id="comment">
            <h3 class="section-title">💬 评论区 <span style="font-weight:normal;color:#999;font-size:14px;">{{ comments.length }} 条评论</span></h3>

            <div v-if="userStore.isLoggedIn" class="comment-form">
              <div v-if="replyTo" class="reply-hint">
                回复 <strong>{{ getCommentDisplayName(replyTo) }}</strong>:
                <el-button type="primary" link size="small" @click="cancelReply">取消</el-button>
              </div>
              <el-input
                ref="commentInputRef"
                v-model="commentContent"
                type="textarea"
                :rows="3"
                :placeholder="replyTo ? '写下你的回复...' : '写下你的评论...'"
                maxlength="500"
                show-word-limit
              />
              <div style="text-align:right;margin-top:10px;">
                <el-button type="primary" @click="submitComment" :loading="commentLoad">
                  {{ replyTo ? '回复' : '发送评论' }}
                </el-button>
              </div>
            </div>
            <div v-else class="login-tips">
              <el-icon :size="18"><Lock /></el-icon>
              需要 <el-button type="primary" link @click="$router.push('/login')">登录</el-button> 后才能评论
            </div>

            <div class="comment-list" v-if="comments.length > 0">
              <div class="comment-item" v-for="c in comments" :key="c.id">
                <el-avatar :src="c.user?.avatar ? $resolveImg(c.user.avatar) : defaultAvatar" :size="40" />
                <div class="comment-body">
                  <div class="comment-header">
                    <span class="comment-author">{{ getCommentDisplayName(c) }}</span>
                    <span class="comment-time">IP 属地：{{ formatCommentAddr(c.user?.addr) }} | {{ formatCommentTime(c.created_at) }}</span>
                  </div>
                  <div class="comment-text">{{ c.content }}</div>
                  <div class="comment-actions" v-if="userStore.isLoggedIn">
                    <el-button type="primary" link size="small" @click="setReply(c)">回复</el-button>
                    <el-button v-if="canPrivateMessage(c.user_id)" type="primary" link size="small" @click="startPrivateMessage(c.user_id)">私信</el-button>
                  </div>
                  <div v-if="c.sub_comments && c.sub_comments.length" class="sub-comments">
                    <div class="comment-item sub" v-for="sc in c.sub_comments" :key="sc.id">
                      <el-avatar :src="sc.user?.avatar ? $resolveImg(sc.user.avatar) : defaultAvatar" :size="30" />
                      <div class="comment-body">
                        <div class="comment-header">
                          <span class="comment-author">
                            {{ getCommentDisplayName(sc) }}
                            <template v-if="sc.parent_comment_id && sc.parent_comment_id !== c.id">
                              <span style="color: var(--text-muted); font-weight: normal; margin: 0 4px">回复</span>
                              <span style="color: var(--primary-color); font-weight: 600">@{{ getCommentUser(sc, c) }}</span>
                            </template>
                          </span>
                          <span class="comment-time">IP 属地：{{ formatCommentAddr(sc.user?.addr) }} | {{ formatCommentTime(sc.created_at) }}</span>
                        </div>
                        <div class="comment-text">{{ sc.content }}</div>
                        <div class="comment-actions" v-if="userStore.isLoggedIn">
                          <el-button type="primary" link size="small" @click="setReply(sc)">回复</el-button>
                          <el-button v-if="canPrivateMessage(sc.user_id)" type="primary" link size="small" @click="startPrivateMessage(sc.user_id)">私信</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-empty v-else description="还没有人评论哦，快来抢沙发吧~" :image-size="80" />
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="detail-sidebar">
          <div class="sidebar-card author-card">
            <el-avatar :size="70" :src="article.user_avatar ? $resolveImg(article.user_avatar) : defaultAvatar" />
            <h3 class="author-name">{{ article.user_nick_name || article.nick_name || article.user_name || '博主' }}</h3>
            <p class="author-bio">欢迎来到我的主页</p>
            <div class="author-stats">
              <div class="stat-item"><span class="stat-num">{{ article.look_count || 0 }}</span><el-icon><View /></el-icon></div>
              <div class="stat-item"><span class="stat-num">{{ article.digg_count || 0 }}</span><el-icon><Star /></el-icon></div>
              <div class="stat-item"><span class="stat-num">{{ article.comment_count || 0 }}</span><el-icon><ChatDotRound /></el-icon></div>
              <div class="stat-item"><span class="stat-num">{{ article.collects_count || 0 }}</span><el-icon><CollectionTag /></el-icon></div>
            </div>
          </div>
          <div class="sidebar-card toc-card">
            <div class="toc-header">
              <h3 class="toc-title">📑 文章目录</h3>
              <el-button class="toc-toggle" type="primary" link @click="tocCollapsed = !tocCollapsed">
                <el-icon><ArrowRight v-if="tocCollapsed" /><ArrowDown v-else /></el-icon>
                <span>{{ tocCollapsed ? '展开' : '收起' }}</span>
              </el-button>
            </div>
            <div v-show="!tocCollapsed" class="toc-content">
              <div class="toc-list" v-if="tocData.length">
                <div
                  v-for="(item, i) in tocData"
                  :key="item.anchorId || `${item.title}-${i}`"
                  class="toc-item"
                  :class="`toc-level-${getTocItemLevel(item)}`"
                  @click="scrollToSection(item)"
                >
                  {{ item.title }}
                </div>
              </div>
              <div v-else class="toc-empty">暂无目录</div>
            </div>
          </div>
          
          <!-- 操作栏 -->
          <div class="sidebar-card action-card">
            <h3 class="action-title">📌 操作</h3>
            <div class="action-list">
              <div class="action-item" :class="{'active': hasDigged}" @click="handleDigg">
                <el-icon :size="18"><StarFilled v-if="hasDigged" /><Star v-else /></el-icon>
                <span>点赞 ({{ article.digg_count || 0 }})</span>
              </div>
              <div class="action-item" :class="{'active': isCollected}" @click="handleCollect" v-if="userStore.isLoggedIn">
                <el-icon :size="18"><CollectionTag /></el-icon>
                <span>{{ isCollected ? '已收藏' : '收藏' }} ({{ article.collects_count || 0 }})</span>
              </div>
              <div class="action-item" @click="scrollToComment">
                <el-icon :size="18"><ChatDotRound /></el-icon>
                <span>评论 ({{ comments.length }})</span>
              </div>
              <div class="action-item" @click="scrollToTop">
                <el-icon :size="18"><Top /></el-icon>
                <span>回到顶部</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="container" style="padding:60px 0;">
      <el-empty description="此文章不存在或已被下架" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiGetArticleDetail, apiDiggArticle, apiCollectArticle, apiGetArticleTOC } from '@/api/article'
import { apiGetCommentList, apiCreateComment } from '@/api/comment'
import { ElMessage } from 'element-plus'
import { Clock, View, Star, StarFilled, CollectionTag, ChatDotRound, Lock, Top, ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const article = ref(null)
const loading = ref(true)
const hasDigged = ref(false)
const isCollected = ref(false)
const comments = ref([])
const commentContent = ref('')
const commentLoad = ref(false)
const commentInputRef = ref(null)
const replyTo = ref(null)
const tocData = ref([])
const tocCollapsed = ref(false)

// Token过期处理函数
function handleTokenExpired() {
  if (userStore.isLoggedIn) {
    userStore.logout()
    ElMessage.error('登录已过期，请重新登录')
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }
}

function getBannerStyle(url) {
  if (!url) {
    return { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
  }
  let finalUrl = url.startsWith('http') ? url : (url.startsWith('/') ? url : '/' + url)
  // Wrap in quotes to handle spaces in filenames
  return { backgroundImage: `url('${finalUrl}')` }
}

const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  return marked.parse(article.value.content)
})

function formatDate(dateStr) {
  if (!dateStr) return '未知'
  const d = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
  const str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  if (diff === 0) return '今天'
  if (diff <= 30) return `${str}（${diff} 天前）`
  return str
}

function normalizeDownloadUrl(url) {
  const value = String(url || '').trim()
  if (!value) return '#'
  if (value.startsWith('http')) return value
  if (value.startsWith('/')) return value
  return `/${value}`
}

function formatCommentTime(dateStr) {
  if (!dateStr) return '未知'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

function formatCommentAddr(addr) {
  if (!addr) return '未知'
  if (addr === '内网地址') return '本地网络'
  if (addr === '错误的地址') return '未知'
  return addr
}

function getCommentDisplayName(comment) {
  if (!comment) return '匿名'
  const nickName = String(comment.user?.nick_name || comment.user_nick_name || '').trim()
  if (nickName) return nickName

  const userName = String(comment.user?.user_name || comment.user_name || '').trim()
  if (userName) return userName

  return comment.user_id ? `用户${comment.user_id}` : '匿名'
}

function canPrivateMessage(userId) {
  return userStore.isLoggedIn && Number(userId) > 0 && Number(userId) !== Number(userStore.currentUserId)
}

function startPrivateMessage(userId) {
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

async function loadArticleTOC() {
  try {
    if (!route.params.id) {
      return
    }

    const res = await apiGetArticleTOC(route.params.id)
    if (res.code === 0 && Array.isArray(res.data?.list)) {
      tocData.value = res.data.list
    } else {
      tocData.value = []
    }
  } catch (e) {
    if (e?.response?.data?.code === 7) {
      handleTokenExpired()
      return
    }
    tocData.value = []
    console.error('获取文章目录失败', e)
  }
}

async function loadArticle() {
  loading.value = true
  try {
    // 验证文章ID
    if (!route.params.id) {
      ElMessage.error('文章ID不存在')
      return
    }
    
    const res = await apiGetArticleDetail(route.params.id)
    article.value = res.data || res
    await loadArticleTOC()
    await nextTick()
    syncTocWithContent()
  } catch (e) {
    // 检查是否是 token过期（code: 7）
    if (e?.response?.data?.code === 7) {
      handleTokenExpired()
      return
    }
    console.error('文章详情加载失败', e)
    ElMessage.error('文章加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

async function loadComments() {
  try {
    // 验证文章ID
    if (!route.params.id) {
      return
    }
    
    const res = await apiGetCommentList({ article_id: route.params.id })
    const data = res.data
    comments.value = Array.isArray(data) ? data : (data?.list || [])
  } catch (e) {
    // 检查是否是 token过期（code: 7）
    if (e?.response?.data?.code === 7) {
      handleTokenExpired()
      return
    }
    console.error('获取评论失败', e)
    // 不显示错误信息，避免影响用户体验
  }
}

async function handleDigg() {
  if (hasDigged.value) return ElMessage.info('您已经点过赞了')
  try {
    await apiDiggArticle({ id: article.value.id })
    ElMessage.success('点赞成功')
    hasDigged.value = true
    article.value.digg_count = (article.value.digg_count || 0) + 1
  } catch(e) {
    // 检查是否是 token过期（code: 7）
    if (e?.response?.data?.code === 7) {
      handleTokenExpired()
      return
    }
    ElMessage.error('点赞失败')
  }
}

async function handleCollect() {
  try {
    await apiCollectArticle({ id: article.value.id })
    ElMessage.success(isCollected.value ? '已取消收藏' : '收藏成功')
    isCollected.value = !isCollected.value
  } catch (e) {
    // 检查是否是 token过期（code: 7 或 msg 包含 token错误）
    if (e?.response?.data?.code === 7 || e?.response?.data?.msg?.includes('token')) {
      handleTokenExpired()
      return
    }
    ElMessage.error('操作失败')
  }
}

function setReply(comment) {
  replyTo.value = comment
  // Scroll to comment form
  nextTick(() => {
    document.querySelector('.comment-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    commentInputRef.value?.focus()
  })
}

function cancelReply() {
  replyTo.value = null
}

function extractSlugAnchor(item) {
  const slug = String(item?.slug || '')
  const hashIndex = slug.indexOf('#')
  if (hashIndex < 0) return ''

  const anchor = slug.slice(hashIndex + 1).trim()
  if (!anchor) return ''

  try {
    return decodeURIComponent(anchor)
  } catch {
    return anchor
  }
}

function inferLevelFromTitle(title) {
  const text = String(title || '').trim()
  const match = text.match(/^(\d+(?:\.\d+)*)/)
  if (!match || !match[1]) {
    return 1
  }
  const depth = match[1].split('.').length
  return Math.min(Math.max(depth, 1), 6)
}

function getTocItemLevel(item) {
  const rawLevel = Number(item?.level ?? item?.lv ?? item?.depth)
  if (Number.isFinite(rawLevel) && rawLevel >= 1) {
    return Math.min(Math.max(rawLevel, 1), 6)
  }
  const tagName = String(item?.tag || '').toUpperCase()
  if (/^H[1-6]$/.test(tagName)) {
    return Number(tagName.slice(1))
  }
  const slugAnchor = extractSlugAnchor(item)
  return inferLevelFromTitle(item?.title || slugAnchor)
}

function normalizeTitle(title) {
  return String(title || '')
    .replace(/&nbsp;/gi, ' ')
    .trim()
    .replace(/^\s*#+\s*/, '')
    .replace(/^\d+(?:\.\d+)*\s*[.)、:：-]?\s*/, '')
    .replace(/^\s*[\-*+]\s*/, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function getContentHeadings() {
  const contentEl = document.querySelector('.content-html')
  if (!contentEl) return []

  const headingElements = Array.from(contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    .filter((heading) => heading.textContent?.trim())

  return headingElements.map((heading, index) => {
    const title = heading.textContent.trim()
    const anchorId = `article-heading-${index}`
    heading.id = anchorId
    return {
      anchorId,
      title,
      normalizedTitle: normalizeTitle(title),
      level: Number(heading.tagName.slice(1))
    }
  })
}

function syncTocWithContent() {
  const headingMeta = getContentHeadings()
  if (!headingMeta.length) {
    return
  }

  if (!tocData.value.length) {
    tocData.value = headingMeta.map((heading) => ({
      title: heading.title,
      level: heading.level,
      anchorId: heading.anchorId
    }))
    return
  }

  const used = new Set()
  let searchStart = 0

  const findHeadingIndex = (predicate, startAt = 0) => {
    for (let i = startAt; i < headingMeta.length; i++) {
      if (!used.has(i) && predicate(headingMeta[i])) {
        return i
      }
    }
    return -1
  }

  tocData.value = tocData.value.map((item, itemIndex) => {
    const title = String(item?.title || '').trim()
    const slugAnchor = extractSlugAnchor(item)
    const normalizedCandidates = [...new Set([
      normalizeTitle(title),
      normalizeTitle(slugAnchor)
    ].filter(Boolean))]

    const expectedLevel = getTocItemLevel(item)
    let matchedIndex = -1

    for (const candidate of normalizedCandidates) {
      matchedIndex = findHeadingIndex(
        (heading) => heading.normalizedTitle === candidate && heading.level === expectedLevel,
        searchStart
      )
      if (matchedIndex >= 0) break
    }

    if (matchedIndex < 0) {
      for (const candidate of normalizedCandidates) {
        matchedIndex = findHeadingIndex((heading) => heading.normalizedTitle === candidate, searchStart)
        if (matchedIndex >= 0) break
      }
    }

    if (matchedIndex < 0) {
      for (const candidate of normalizedCandidates) {
        matchedIndex = findHeadingIndex((heading) => heading.normalizedTitle === candidate, 0)
        if (matchedIndex >= 0) break
      }
    }

    if (matchedIndex < 0 && itemIndex < headingMeta.length && !used.has(itemIndex)) {
      matchedIndex = itemIndex
    }

    if (matchedIndex < 0) {
      matchedIndex = findHeadingIndex(() => true, searchStart)
    }

    if (matchedIndex < 0) {
      matchedIndex = findHeadingIndex(() => true, 0)
    }

    const matchedHeading = matchedIndex >= 0 ? headingMeta[matchedIndex] : null
    if (matchedIndex >= 0) {
      used.add(matchedIndex)
      searchStart = Math.max(searchStart, matchedIndex + 1)
    }

    return {
      ...item,
      title: title || slugAnchor || matchedHeading?.title || '未命名标题',
      level: matchedHeading?.level || expectedLevel,
      anchorId: matchedHeading?.anchorId || ''
    }
  })
}

function scrollToHeading(targetElement) {
  const offset = 90
  const top = window.scrollY + targetElement.getBoundingClientRect().top - offset
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })

  targetElement.classList.add('toc-highlight')
  window.setTimeout(() => {
    targetElement.classList.remove('toc-highlight')
  }, 1200)
}

function scrollToSection(item) {
  let targetElement = item?.anchorId ? document.getElementById(item.anchorId) : null

  if (!targetElement) {
    const candidates = [...new Set([
      normalizeTitle(item?.title),
      normalizeTitle(extractSlugAnchor(item))
    ].filter(Boolean))]

    if (candidates.length) {
      const headingMeta = getContentHeadings()
      const matchedHeading = headingMeta.find((heading) => candidates.includes(heading.normalizedTitle))
      if (matchedHeading?.anchorId) {
        targetElement = document.getElementById(matchedHeading.anchorId)
      }
    }
  }

  if (targetElement) {
    scrollToHeading(targetElement)
  }
}

function scrollToComment() {
  nextTick(() => {
    const element = document.getElementById('comment')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


// 获取子评论中@的用户名称
function getCommentUser(subComment, parentComment) {
  if (subComment.comment_model?.user) {
    return getCommentDisplayName(subComment.comment_model)
  }
  if (subComment.parent_comment_id === parentComment.id) {
    return getCommentDisplayName(parentComment)
  }
  return '匿名'
}

async function submitComment() {
  if (!commentContent.value.trim()) return ElMessage.warning('评论内容不能为空')
  commentLoad.value = true
  try {
    const payload = {
      article_id: String(route.params.id),
      content: commentContent.value
    }
    // 如果是回复评论，传递 parent_comment_id（后端需要整数类型）
    if (replyTo.value) {
      payload.parent_comment_id = Number(replyTo.value.id)
    }
    await apiCreateComment(payload)
    ElMessage.success(replyTo.value ? '回复成功' : '评论成功')
    commentContent.value = ''
    replyTo.value = null
    await loadComments()
  } catch (e) {
    // 检查是否是 token过期（code: 7 或 msg 包含 token错误）
    if (e?.response?.data?.code === 7 || e?.response?.data?.msg?.includes('token')) {
      handleTokenExpired()
      return
    }
    ElMessage.error(e?.response?.data?.msg || '评论失败')
  } finally {
    commentLoad.value = false
  }
}

onMounted(() => { loadArticle(); loadComments() })
</script>

<style scoped>
.hero-banner { 
  width: 100vw; 
  height: 40vh; 
  min-height: 300px;
  max-height: 500px;
  background-size: cover; 
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #f0f2f5; 
  background-position: center; 
  position: relative; 
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.hero-overlay { width: 100%; height: 100%; background: linear-gradient(transparent 30%, rgba(0,0,0,0.7) 100%); display: flex; align-items: flex-end; justify-content: center; }
.hero-content { max-width: 800px; text-align: center; padding: 40px 20px; color: #fff; }
.hero-title { font-size: 32px; font-weight: 700; margin: 0 0 14px; text-shadow: 0 2px 8px rgba(0,0,0,0.4); }
.hero-abstract { font-size: 15px; line-height: 1.7; opacity: 0.9; margin: 0 0 16px; }
.hero-meta { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
.hero-tag { border: none; }

.detail-layout { display: flex; gap: 24px; margin-top: -40px; position: relative; z-index: 10; }
.detail-main { flex: 1; min-width: 0; }
.detail-sidebar { width: 300px; flex-shrink: 0; position: sticky; top: 100px; align-self: flex-start; }

.article-card { background: var(--bg-card); border-radius: 12px; padding: 36px 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 24px; }
.article-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0 0 12px; }
.article-meta { font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.content-html { line-height: 1.8; font-size: 15px; color: var(--text-primary); }
.content-html :deep(h1), .content-html :deep(h2), .content-html :deep(h3), .content-html :deep(h4), .content-html :deep(h5), .content-html :deep(h6) { margin-top: 28px; margin-bottom: 14px; font-weight: 600; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; }
.content-html :deep(h4), .content-html :deep(h5), .content-html :deep(h6) { border-bottom: none; margin-top: 20px; padding-bottom: 0; }
.content-html :deep(.toc-highlight) { background: rgba(64,158,255,0.14); border-radius: 6px; transition: background 0.3s ease; }
.content-html :deep(pre) { background: #1e1e2e; color: #cdd6f4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
.content-html :deep(code) { background: rgba(99,110,123,0.12); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
.content-html :deep(pre code) { background: none; padding: 0; }
.content-html :deep(blockquote) { border-left: 4px solid var(--primary-color); padding: 8px 16px; margin: 16px 0; background: rgba(64,158,255,0.05); }
.content-html :deep(img) { max-width: 100%; border-radius: 8px; margin: 12px 0; box-shadow: 0 4px 14px rgba(0,0,0,0.08); transition: all 0.3s ease; }
.content-html :deep(img):hover { box-shadow: 0 8px 24px rgba(0,0,0,0.15); transform: translateY(-2px); }
.content-html :deep(a) { color: var(--primary-color); text-decoration: none; }
.content-html :deep(table) { border-collapse: collapse; width: 100%; margin: 16px 0; }
.content-html :deep(th), .content-html :deep(td) { border: 1px solid var(--border-color); padding: 8px 12px; }
.attachment-panel { margin-top: 18px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: grid; gap: 8px; }
.attachment-panel h3 { margin: 0; font-size: 16px; color: var(--text-primary); }
.attachment-link { color: var(--primary-color); text-decoration: none; }
.attachment-link:hover { text-decoration: underline; }

.action-bar { display: flex; gap: 24px; padding-top: 24px; margin-top: 24px; border-top: 1px solid var(--border-color); }
.action-btn { display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: var(--text-secondary); transition: color 0.3s; padding: 8px 16px; border-radius: 20px; background: #f5f5f5; }
.action-btn:hover, .action-btn.active { color: var(--primary-color); background: rgba(64,158,255,0.1); }

.comment-section { background: var(--bg-card); border-radius: 12px; padding: 30px 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.section-title { font-size: 18px; margin: 0 0 20px; color: var(--text-primary); }
.comment-form { margin-bottom: 24px; }
.reply-hint { padding: 8px 12px; background: #e6f7ff; border-radius: 6px; margin-bottom: 10px; font-size: 13px; color: #1890ff; display: flex; align-items: center; justify-content: space-between; }
.login-tips { text-align: center; padding: 20px; color: var(--text-secondary); background: #f8f8f8; border-radius: 8px; margin-bottom: 20px; }
.comment-list { margin-top: 16px; }
.comment-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
.comment-item.sub { padding: 10px 0; border-bottom: none; }
.comment-body { flex: 1; }
.comment-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.comment-author { font-weight: 600; font-size: 14px; color: var(--text-primary); }
.comment-time { font-size: 12px; color: #bbb; }
.comment-text { font-size: 14px; color: var(--text-primary); line-height: 1.6; }
.comment-actions { margin-top: 4px; }
.sub-comments { margin-top: 10px; padding-left: 20px; border-left: 2px solid #f0f0f0; }

.sidebar-card { background: var(--bg-card); border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 20px; }
.author-card { text-align: center; }
.author-card .el-avatar { margin-bottom: 12px; }
.author-name { margin: 0 0 4px; font-size: 18px; color: var(--text-primary); }
.author-bio { margin: 0 0 16px; font-size: 13px; color: var(--primary-color); }
.author-stats { display: flex; justify-content: space-around; border-top: 1px solid var(--border-color); padding-top: 16px; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-num { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.stat-item .el-icon { font-size: 14px; color: var(--text-muted); }

.toc-card { padding: 18px 16px; }
.toc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.toc-title { margin: 0; font-size: 16px; color: var(--text-primary); }
.toc-toggle { font-size: 12px; }
.toc-content { max-height: min(48vh, 380px); overflow-y: auto; padding-right: 4px; }
.toc-list { display: flex; flex-direction: column; gap: 2px; }
.toc-item { cursor: pointer; font-size: 13px; color: var(--text-secondary); text-decoration: none; padding: 6px 0; border-left: 2px solid transparent; padding-left: 10px; transition: all 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toc-item:hover { color: var(--primary-color); border-left-color: var(--primary-color); background: rgba(64,158,255,0.06); }
.toc-level-1 { padding-left: 10px; font-weight: 600; }
.toc-level-2 { padding-left: 18px; }
.toc-level-3 { padding-left: 26px; font-size: 12px; }
.toc-level-4 { padding-left: 34px; font-size: 12px; }
.toc-level-5 { padding-left: 42px; font-size: 12px; }
.toc-level-6 { padding-left: 50px; font-size: 12px; }
.toc-empty { font-size: 13px; color: #999; padding: 6px 0; }

.action-title { margin: 0 0 14px; font-size: 16px; color: var(--text-primary); }
.action-list { display: flex; flex-direction: column; gap: 8px; }
.action-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; color: var(--text-secondary); transition: all 0.2s; padding: 8px 12px; border-radius: 6px; background: #f5f5f5; }
.action-item:hover, .action-item.active { color: var(--primary-color); background: rgba(64,158,255,0.1); }

.loading-state { padding: 60px 0; }

@media (max-width: 768px) {
  .hero-banner { height: 260px; }
  .hero-title { font-size: 22px; }
  .detail-layout { flex-direction: column; }
  .detail-sidebar { width: 100%; position: static; top: auto; }
  .article-card, .comment-section { padding: 20px; }
}
</style>














