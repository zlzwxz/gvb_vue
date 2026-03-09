# GVB Vue Frontend Beginner Guide

这份文档是给“第一次接触这个前端项目”的人准备的。

目标不是把所有实现细节一次讲完，而是先回答几个最关键的问题：

1. 前端从哪里启动？
2. 一个页面是怎么被路由出来的？
3. 页面里的数据从哪里来？
4. 图片为什么能显示，资源 URL 是怎么拼的？
5. 好友 / 私信 / 实时消息这条链路在哪里看？
6. 这个仓库里每个目录、每类文件大概负责什么？

## 1. 先看什么

如果你是新手，建议按下面顺序读源码：

1. `src/main.js`
   这是前端入口，先弄清 Vue 应用怎么启动。
2. `src/router/index.js`
   看页面路由和登录鉴权规则。
3. `src/utils/request.js`
   看所有接口请求是怎么统一处理的。
4. `src/stores/user.js`
   看登录态在前端如何保存。
5. `src/utils/url.js`
   看图片和资源链接如何转换成最终 URL。
6. `src/stores/social.js`
   看好友、WebSocket、语音通话的统一状态管理。
7. `src/layouts/FrontLayout.vue` / `src/layouts/AdminLayout.vue`
   看前后台页面的总体骨架。
8. 具体页面，例如 `src/views/front/HomeView.vue`、`src/views/front/PrivateMessageView.vue`

## 2. 前端启动链路

浏览器打开站点后，前端大致经历下面这条链路：

1. `index.html` 提供一个 `#app` 挂载点。
2. `src/main.js` 创建 Vue 应用。
3. `src/main.js` 挂载：
   - Pinia 状态管理
   - Vue Router 路由
   - Element Plus 组件库
   - 全局图标
   - 全局工具 `$resolveImg`
4. `src/App.vue` 作为根组件开始渲染。
5. 路由系统根据当前 URL 决定渲染哪个 Layout 和哪个 View。

## 3. 一个页面是怎么出来的

以“我的私信”页面为例：

1. 你访问 `/messages`
2. `src/router/index.js` 里匹配到 `name: 'PrivateMessages'`
3. 该路由挂在 `FrontLayout.vue` 下
4. 真正渲染的页面组件是 `src/views/front/PrivateMessageView.vue`
5. 如果该页面 `meta.requiresAuth = true`，全局路由守卫会先检查是否登录
6. 如果未登录，会被重定向到 `/login`

## 4. 页面数据从哪里来

前端的数据流一般是：

1. 页面组件调用 `src/api/*.js` 里的函数
2. API 函数底层都走 `src/utils/request.js`
3. `request.js` 统一：
   - 拼接后端地址
   - 自动带 token
   - 处理后端 `code`
   - 处理 401/403/404/500
4. 请求成功后，页面把结果存进：
   - 页面自己的 `ref/reactive`
   - 或者 Pinia store，例如 `user.js`、`social.js`

## 5. 图片为什么能显示

这个项目图片显示最容易让新手困惑，建议你记住下面这条链路：

1. 后端返回图片路径，常见格式：
   - `/uploads/file/u_1/demo.png`
   - `uploads/avatar/default.jpeg`
2. 页面模板不会直接用原始值，而是走 `$resolveImg(...)`
3. `$resolveImg` 在 `src/main.js` 里挂到全局
4. 真正实现逻辑在 `src/utils/url.js`
5. `url.js` 会把相对路径、历史格式、完整 URL 统一规范化
6. 最终浏览器拿到一个能访问的地址并发起请求

如果你以后遇到“数据库里明明有图片路径，但页面不显示”，第一优先检查：

1. 后端返回的路径字段是什么
2. 页面有没有调用 `$resolveImg`
3. `url.js` 是否把路径转成了正确地址
4. 后端 `/uploads/*` 静态资源是否真的可访问

## 6. 好友 / 私信 / 实时消息链路

这部分是当前前端里最复杂的一块。

### 6.1 基础数据

- `src/stores/social.js`
  保存好友列表、黑名单、在线状态、语音通话状态、WebSocket 连接状态。

### 6.2 页面

- `src/views/front/PrivateMessageView.vue`
  私信、群聊、文件发送、消息搜索、黑名单、群详情等都在这里。
- `src/components/social/FriendFloatPanel.vue`
  页面右侧好友浮层入口，支持拖拽和位置本地记忆。
- `src/views/front/HomeView.vue`
  首页会读取公开 `site_info.home_layout`，所以布局设置现在是站点级配置，不再是用户本地配置。

### 6.3 实时消息

1. 页面/布局调用 `socialStore.ensureStarted()`
2. `src/stores/social.js` 建立 WebSocket 连接
3. 后端推送实时事件
4. `handleSocketMessage()` 分发事件
5. `messageVersion` 递增
6. 私信页等页面 watch 到变化后主动刷新列表/消息

### 6.4 语音通话

1. 发起方调用 `startAudioCall`
2. 先用 WebSocket 发 `call_invite`
3. 对方接受后，双方开始 WebRTC 协商
4. `offer / answer / candidate` 都通过 WebSocket 交换
5. 真正音频流通过 WebRTC 点对点传输

### 6.5 首页布局配置

1. `src/views/front/HomeView.vue` 通过 `apiGetPublicSiteInfo()` 拉取公开站点信息
2. 返回的 `site_info` 里包含 `home_layout`
3. 首页按这份配置渲染热榜、等级榜、个人介绍的数量和顺序
4. 只有管理员能看到“布局设置”按钮
5. 保存时会走 `apiUpdateSetting('site_info', ...)`，把布局写回站点配置

## 7. 目录地图

### `src/api`

这里放“页面调用后端接口”的薄封装。一般一个文件对应一个业务模块。

- `src/api/advert.js`: 广告相关接口
- `src/api/announcement.js`: 公告相关接口
- `src/api/article.js`: 文章相关接口
- `src/api/board.js`: 板块相关接口
- `src/api/chat.js`: 公共聊天室相关接口
- `src/api/comment.js`: 评论相关接口
- `src/api/image.js`: 图片上传、图片列表等接口
- `src/api/menu.js`: 菜单相关接口
- `src/api/message.js`: 站内消息相关接口
- `src/api/social.js`: 好友、群组、私信、在线状态相关接口
- `src/api/system.js`: 系统设置、抓取同步等接口
- `src/api/tag.js`: 标签相关接口
- `src/api/user.js`: 登录、注册、用户资料相关接口

### `src/components`

- `src/components/social/FriendFloatPanel.vue`: 右侧好友浮层、好友列表入口、在线状态编辑、语音来电弹窗、拖拽定位

### `src/layouts`

- `src/layouts/AdminLayout.vue`: 后台统一骨架
- `src/layouts/FrontLayout.vue`: 前台统一骨架

### `src/router`

- `src/router/index.js`: 路由总表、登录鉴权、管理员鉴权、标题和滚动控制

### `src/stores`

- `src/stores/user.js`: 当前用户登录态
- `src/stores/social.js`: 好友系统、实时消息、语音通话

### `src/utils`

- `src/utils/request.js`: 统一 axios 请求层
- `src/utils/url.js`: 统一资源 URL 解析

### `src/views/admin`

后台页面基本可以按“一个页面对应一个管理功能”理解：

- `AdvertManageView.vue`: 广告管理
- `AnnouncementManageView.vue`: 公告管理
- `ArticleEditView.vue`: 文章编辑
- `ArticleManageView.vue`: 文章管理
- `ArticleMaterialView.vue`: 文章素材
- `ArticleReportView.vue`: 文章举报
- `ArticleReviewView.vue`: 文章审核
- `BoardManageView.vue`: 板块管理
- `ChatManageView.vue`: 聊天管理
- `CollectManageView.vue`: 收藏管理
- `CommentManageView.vue`: 评论管理
- `DashboardView.vue`: 仪表盘
- `ImageManageView.vue`: 图片库
- `ImageMaterialView.vue`: 图片素材
- `LogManageView.vue`: 日志管理
- `MenuManageView.vue`: 菜单管理
- `MessageManageView.vue`: 消息管理
- `SettingManageView.vue`: 系统设置，包含 `site_info` 等站点公共配置
- `SocialManageView.vue`: 好友/社交管理，支持自动筛选刷新和跳转私信/群聊
- `TagManageView.vue`: 标签管理
- `UserManageView.vue`: 用户管理

### `src/views/front`

前台页面按“用户访问的业务场景”划分：

- `ArticleDetailView.vue`: 文章详情页
- `BoardDetailView.vue`: 板块详情页
- `ChatRoomView.vue`: 公共聊天室
- `CollectView.vue`: 我的收藏
- `GameHubView.vue`: 小游戏页
- `HomeView.vue`: 首页，读取公共站点信息和 `home_layout`
- `NewsView.vue`: 资讯页
- `PrivateMessageView.vue`: 私信 / 群聊中心
- `ProfileView.vue`: 当前用户个人中心
- `SearchView.vue`: 搜索页
- `UserSpaceView.vue`: 用户空间页

### `src/views`

- `LoginView.vue`: 登录页
- `RegisterView.vue`: 注册页
- `NotFoundView.vue`: 404 页面

## 8. 新手最常见的修改入口

### 想加一个新页面

1. 先在 `src/views/...` 新建页面组件
2. 再去 `src/router/index.js` 注册路由
3. 如果页面需要菜单入口，再去对应 Layout 里补导航项

### 想接一个新接口

1. 先在 `src/api/xxx.js` 里增加 API 方法
2. 页面或 store 里调用它
3. 如果接口需要统一鉴权或错误处理，不需要重复写，`request.js` 已经兜底

### 想排查登录问题

按这个顺序看：

1. `src/stores/user.js`
2. `src/utils/request.js`
3. `src/router/index.js`

### 想排查图片显示问题

按这个顺序看：

1. 页面模板里是否调用 `$resolveImg`
2. `src/utils/url.js`
3. 后端静态资源路由

### 想排查私信 / 好友问题

按这个顺序看：

1. `src/stores/social.js`
2. `src/views/front/PrivateMessageView.vue`
3. `src/components/social/FriendFloatPanel.vue`

## 9. 读前端时要记住的几个约定

1. `meta.requiresAuth` 表示需要登录。
2. `meta.requiresAdmin` 表示需要管理员。
3. 所有请求默认走 `/api` 前缀。
4. 资源地址不要手拼，尽量用 `$resolveImg` 或 `resolveResourceUrl`。
5. 跨页面共享数据优先放 Pinia store，而不是到处透传 props。

## 10. 最后给新手的建议

不要试图一次看完整个仓库。更高效的方式是：

1. 先找“入口文件”
2. 再找“当前问题涉及的链路”
3. 最后再钻进具体页面和函数

这个项目最推荐的三条阅读线是：

1. 登录线：`main.js -> router/index.js -> stores/user.js -> api/user.js`
2. 图片线：`页面模板 -> $resolveImg -> utils/url.js -> 后端 /uploads`
3. 社交线：`FriendFloatPanel/PrivateMessageView -> stores/social.js -> 后端 social API`

## 11. 第二层细化阅读

如果你已经知道社交功能的大体入口，下一步建议读：

- `SOCIAL_FRIEND_MANAGEMENT_DETAIL.md`

如果你想看后台系统设置里新增的 ES 导入导出工具，建议顺着这条线看：

- `views/admin/SettingManageView.vue -> api/system.js -> 后端 settings/es 接口`
