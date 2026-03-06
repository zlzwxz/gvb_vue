<template>
  <div class="menu-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col>
        <el-button type="primary" @click="openCreate">新建菜单</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="slogan" label="Slogan" />
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column label="轮播图" width="120">
        <template #default="{ row }">
          <span>{{ row.banners?.length || 0 }} 张</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="editMenu(row)">编辑</el-button>
          <el-button type="text" @click="deleteMenu(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '编辑菜单' : '新建菜单'" v-model="showCreate" width="650px">
      <el-form :model="form" :rules="rules" ref="menuForm" label-width="100px">
        <el-form-item label="标题" prop="title"><el-input v-model="form.title" placeholder="菜单标题" /></el-form-item>
        <el-form-item label="路径" prop="path"><el-input v-model="form.path" placeholder="菜单路径，如 /news" /></el-form-item>
        <el-form-item label="Slogan" prop="slogan"><el-input v-model="form.slogan" placeholder="标语" /></el-form-item>
        <el-form-item label="简介" prop="abstract">
          <div style="width:100%">
            <div v-for="(item, index) in form.abstract" :key="index" style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <el-input v-model="form.abstract[index]" placeholder="简介文本" />
              <el-button type="danger" size="small" @click="form.abstract.splice(index, 1)">删</el-button>
            </div>
            <el-button type="primary" size="small" @click="form.abstract.push('')">添加简介</el-button>
          </div>
        </el-form-item>
        <el-form-item label="简介切换(秒)" prop="abstract_time">
          <el-input-number v-model="form.abstract_time" :min="1" :max="60" />
        </el-form-item>
        <el-form-item label="轮播切换(秒)" prop="banner_time">
          <el-input-number v-model="form.banner_time" :min="1" :max="60" />
        </el-form-item>
        <el-form-item label="排序" prop="sort"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
        <el-form-item label="关联图片">
          <div class="image-picker">
            <div
              v-for="img in imageList"
              :key="img.id"
              class="image-picker-item"
              :class="{ 'is-selected': selectedImageIds.includes(img.id) }"
              @click="toggleImage(img.id)"
            >
              <el-image :src="$resolveImg(img.path)" fit="scale-down" style="width:60px;height:60px;" />
              <div v-if="selectedImageIds.includes(img.id)" class="selected-mark">✓</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetMenuList, apiCreateMenu, apiUpdateMenu, apiDeleteMenu } from '@/api/menu'
import { apiGetImageList } from '@/api/image'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const showCreate = ref(false)
const isEdit = ref(false)
const imageList = ref([])
// 这里只保存选中的图片 ID 顺序，真正提交时再转换成后端需要的 image_sort_list。
const selectedImageIds = ref([])

const form = ref({
  title: '',
  path: '',
  slogan: '',
  abstract: [],
  abstract_time: 7,
  banner_time: 7,
  sort: 1,
})

const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  path: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
}

async function fetchList() {
  const res = await apiGetMenuList()
  list.value = res.data?.list || res.data || []
}

async function loadImages() {
  try {
    const res = await apiGetImageList({ page: 1, size: 100 })
    imageList.value = res.data?.list || res.data || []
  } catch (e) { imageList.value = [] }
}

function toggleImage(id) {
  const idx = selectedImageIds.value.indexOf(id)
  if (idx >= 0) {
    selectedImageIds.value.splice(idx, 1)
  } else {
    selectedImageIds.value.push(id)
  }
}

function openCreate() {
  isEdit.value = false
  form.value = { title: '', path: '', slogan: '', abstract: [], abstract_time: 7, banner_time: 7, sort: 1 }
  selectedImageIds.value = []
  loadImages()
  showCreate.value = true
}

function editMenu(row) {
  // 编辑时一定要把菜单 id 带回表单，后端才能精确更新当前菜单，而不是误改其它菜单。
  isEdit.value = true
  form.value = {
    id: row.id,
    title: row.title,
    path: row.path,
    slogan: row.slogan || '',
    abstract: Array.isArray(row.abstract) ? [...row.abstract] : [],
    abstract_time: row.abstract_time || 7,
    banner_time: row.banner_time || 7,
    sort: row.sort || 0,
  }
  selectedImageIds.value = (row.banners || []).map(b => b.id)
  loadImages()
  showCreate.value = true
}

function deleteMenu(id) {
  ElMessageBox.confirm('确定删除该菜单吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteMenu({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList()
  }).catch(() => {})
}

async function saveMenu() {
  // 前端显式把排序号传给后端，这样每个菜单都能保存自己的轮播顺序。
  const imageSortList = selectedImageIds.value.map((imgId, idx) => ({
    image_id: imgId,
    sort: idx + 1
  }))

  const payload = {
    ...form.value,
    image_sort_list: imageSortList
  }

  try {
    if (isEdit.value) {
      await apiUpdateMenu(payload)
      ElMessage.success('更新成功')
    } else {
      await apiCreateMenu(payload)
      ElMessage.success('创建成功')
    }
    showCreate.value = false
    isEdit.value = false
    fetchList()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}

onMounted(() => fetchList())
</script>

<style scoped>
.menu-manage { padding: 20px; }
.image-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fafafa;
}
.image-picker-item {
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 2px;
  transition: all 0.2s;
}
.image-picker-item:hover { border-color: #409eff; }
.image-picker-item.is-selected { border-color: #67c23a; background: #f0f9eb; }
.selected-mark {
  position: absolute;
  top: 0;
  right: 0;
  background: #67c23a;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
}
</style>

