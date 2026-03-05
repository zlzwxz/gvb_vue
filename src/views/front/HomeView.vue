<template>
  <div class="home-page">
    <el-row :gutter="24">
      <!-- 左侧文章列表 -->
      <el-col :span="17">
        <!-- 菜单轮播图 (menu banners) -->
        <el-carousel v-if="menuBanners.length" height="200px" :interval="5000" arrow="always" style="border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <el-carousel-item v-for="img in menuBanners" :key="img.id">
            <img :src="$resolveImg(img.path)" style="width: 100%; height: 100%; object-fit: scale-down;" />
          </el-carousel-item>
        </el-carousel>

        <!-- 文章列表 -->
        <div class="section-header">
          <h3 class="section-title">文章列表</h3>
          <el-input v-model="searchKey" placeholder="搜索文章标题" clearable @clear="fetchArticles" @keyup.enter="fetchArticles" style="width:200px;" size="default">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>

        <div class="article-list">
          <div v-for="item in articles" :key="item.id" class="article-card" @click="goDetail(item.id)">
            <div class="card-cover">
              <el-image v-if="item.banner_url" :src="$resolveImg(item.banner_url)" fit="scale-down" style="width:100%;height:100%;" />
              <div v-else class="cover-placeholder">
                <span>{{ item.title?.charAt(0) || '文' }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-abstract">{{ item.abstract || '暂无摘要...' }}</p>
              <div class="card-meta">
                <el-tag v-if="item.category" size="small" effect="dark" round class="category-tag">{{ item.category }}</el-tag>
                <span class="meta-item"><el-icon><Clock /></el-icon> {{ formatDate(item.created_at) }}</span>
                <span class="meta-item"><el-icon><View /></el-icon> {{ item.look_count || 0 }}</span>
                <span class="meta-item"><el-icon><ChatDotRound /></el-icon> {{ item.comment_count || 0 }}</span>
                <span class="meta-item"><el-icon><Star /></el-icon> {{ item.digg_count || 0 }}</span>
              </div>
            </div>
          </div>
          <el-empty v-if="!articles.length" description="暂无文章" />
        </div>

        <el-pagination
          v-if="total > 0" background layout="prev, pager, next"
          :page-size="pageSize" :total="total" @current-change="fetchArticles" class="pagination"
        />
      </el-col>

      <!-- 右侧侧边栏 -->
      <el-col :span="7">
        <!-- 标签云 -->
        <div class="sidebar-card">
          <div class="sidebar-title">标签云</div>
          <div v-if="tags.length" class="tags-cloud">
            <span v-for="tag in tags" :key="tag.title || tag.id" class="cloud-tag"
              :class="{ active: currentTag === (tag.title || '') }"
              @click="filterByTag(tag.title || '')">
              {{ tag.title }}
            </span>
          </div>
          <div v-else class="empty-tip">暂无标签数据</div>
        </div>

        <!-- 广告栏 -->
        <div class="sidebar-card" v-if="adverts.length">
          <div class="sidebar-title">推荐</div>
          <div class="advert-list">
            <a v-for="ad in adverts" :key="ad.id" :href="ad.href" target="_blank" class="advert-item">
              <div class="advert-bg">
                <img :src="$resolveImg(ad.images)" style="width:100%; height:100%; object-fit:scale-down; position:absolute; top:0; left:0;" />
                <div class="advert-overlay"></div>
                <span class="advert-text">{{ ad.title }}</span>
              </div>
            </a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetArticleList } from '@/api/article'
import { apiGetTagList } from '@/api/tag'
import { apiGetAdvertList } from '@/api/advert'
import { apiGetMenuList } from '@/api/menu'
import { apiGetImageList } from '@/api/image'
import { Search, Clock, View, ChatDotRound, Star } from '@element-plus/icons-vue'

const router = useRouter()
const articles = ref([])
const total = ref(0)
const pageSize = 10
const searchKey = ref('')
const tags = ref([])
const currentTag = ref('')
const adverts = ref([])
const menuBanners = ref([])

function formatDate(dateStr) {
  if (!dateStr) return '未知'
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function goDetail(id) { router.push({ name: 'ArticleDetail', params: { id } }) }

async function fetchArticles(page = 1) {
  const params = { page, size: pageSize }
  if (searchKey.value) params.key = searchKey.value
  if (currentTag.value) params.tag = currentTag.value
  try {
    const res = await apiGetArticleList(params)
    articles.value = res.data?.list || res.data || []
    total.value = res.data?.total || 0
  } catch (e) { console.error('获取文章失败', e) }
}

async function fetchSideData() {
  try {
    const [tagRes, advRes] = await Promise.all([
      apiGetTagList({ size: 50 }),
      apiGetAdvertList({ size: 10 })
    ])
    tags.value = tagRes.data?.list || tagRes.data || []
    adverts.value = (advRes.data?.list || advRes.data || []).filter(a => a.is_show)
  } catch (e) { console.error('获取侧边栏数据失败', e) }
}

async function fetchMenuBanners() {
  try {
    const res = await apiGetMenuList()
    const menus = res.data || []
    // Find the homepage or first menu with banners
    const homeMenu = menus.find(m => (m.path === '/' || m.path === '/index') && m.banners?.length > 0) || menus.find(m => m.banners?.length > 0)
    if (homeMenu && homeMenu.banners && homeMenu.banners.length > 0) {
      menuBanners.value = homeMenu.banners
    } else {
      // Fallback: use all images from all menus
      const allBanners = menus.flatMap(m => m.banners || [])
      menuBanners.value = allBanners.slice(0, 5)
    }
  } catch (e) { console.error('获取菜单轮播失败', e) }
}

function filterByTag(name) {
  currentTag.value = currentTag.value === name ? '' : name
  fetchArticles(1)
}

onMounted(() => { fetchSideData(); fetchArticles(); fetchMenuBanners() })
</script>

<style scoped>
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-title { font-size: 18px; font-weight: 700; color: var(--text-primary); margin: 0; }

.article-list { display: flex; flex-direction: column; gap: 16px; }
.article-card {
  display: flex; background: var(--bg-card, #fff); border-radius: 10px; overflow: hidden;
  cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.article-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.card-cover { width: 220px; min-height: 160px; flex-shrink: 0; overflow: hidden; }
.cover-placeholder {
  width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 700; color: rgba(255,255,255,0.6);
}
.card-body { flex: 1; padding: 18px 22px; display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.card-title { font-size: 17px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-abstract {
  font-size: 13px; color: var(--text-secondary, #999); margin: 0 0 12px; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.card-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted, #bbb); }
.card-meta .meta-item { display: flex; align-items: center; gap: 3px; }

.sidebar-card {
  background: var(--bg-card, #fff); border-radius: 10px; padding: 20px; margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.sidebar-title {
  font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;
  padding-bottom: 10px; border-bottom: 2px solid var(--primary-color, #409eff);
}
.tags-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.cloud-tag {
  padding: 4px 14px; border-radius: 20px; font-size: 13px; color: var(--text-secondary);
  background: #f2f3f5; cursor: pointer; transition: all 0.2s; border: 1px solid transparent;
}
.cloud-tag:hover { color: var(--primary-color); border-color: var(--primary-color); }
.cloud-tag.active { background: var(--primary-color, #409eff); color: #fff; border-color: var(--primary-color); }
.empty-tip { font-size: 13px; color: #999; }
.pagination { margin-top: 20px; display: flex; justify-content: center; }

.advert-list { display: flex; flex-direction: column; gap: 10px; }
.advert-item { text-decoration: none; display: block; border-radius: 8px; overflow: hidden; }
.advert-bg {
  width: 100%; height: 100px; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.advert-overlay {
  content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.35); transition: background 0.3s; z-index: 1;
}
.advert-item:hover .advert-overlay { background: rgba(0,0,0,0.5); }
.advert-text {
  position: relative; z-index: 2; color: #fff; font-size: 16px; font-weight: 700;
  text-shadow: 0 2px 6px rgba(0,0,0,0.4); text-align: center; padding: 0 10px;
}
</style>
