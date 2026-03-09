# gvb_vue

## 项目定位

`gvb_vue` 是 GVB 社区系统的前端项目，基于 Vue 3 + Vite 构建，负责两类界面：

- 前台社区：首页、板块、文章详情、搜索、资讯、聊天室、好友私信、用户空间、社区广场、赏金大厅。
- 后台运营：仪表盘、文章发布与审核、用户管理、图片库、菜单/板块/公告/标签/广告管理、系统设置、日志审计。

如果你想快速理解整个系统，先看这份 README，再看联动总览：

- [前后端总览](../gvb_server/docs/FULLSTACK_OVERVIEW.md)
- [前端入门说明](./FRONTEND_BEGINNER_GUIDE.md)
- [接口文档摘要](./API_DOCUMENTATION.md)

## 技术栈

| 类别 | 说明 |
| --- | --- |
| 构建工具 | Vite 5 |
| UI 框架 | Vue 3 + Vue Router 4 + Pinia |
| 组件库 | Element Plus |
| 请求层 | Axios |
| 富文本/Markdown | mavon-editor、marked、highlight.js、DOMPurify |
| 图表 | ECharts |
| 交互增强 | NProgress |
| 实时能力 | WebSocket + WebRTC 语音通话 |

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 准备环境变量

参考 [`.env.example`](./.env.example)：

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8080
VITE_UPLOAD_PROXY_TARGET=http://localhost:8080
```

说明：

- 开发环境默认把 `/api` 和 `/uploads` 代理到后端 `8080`。
- `VITE_API_BASE_URL` 保持 `/api` 时，前端 API 会统一走 Vite 代理。

### 3. 启动开发服务器

```bash
npm run dev
```

默认地址：`http://localhost:3000`

### 4. 生产构建

```bash
npm run build
npm run preview
```

## 目录结构

| 路径 | 作用 |
| --- | --- |
| [`src/main.js`](./src/main.js) | 前端启动入口，挂载 Pinia、Router、Element Plus 和全局工具。 |
| [`src/router/index.js`](./src/router/index.js) | 前后台路由总表，包含登录守卫、管理员守卫、标题切换、滚动恢复。 |
| [`src/layouts/FrontLayout.vue`](./src/layouts/FrontLayout.vue) | 前台公共骨架，负责头部导航、统计条、面包屑、好友浮窗、底部信息。 |
| [`src/layouts/AdminLayout.vue`](./src/layouts/AdminLayout.vue) | 后台公共骨架，负责侧边栏、顶部工具栏、后台导航。 |
| [`src/views/front`](./src/views/front) | 前台页面。 |
| [`src/views/admin`](./src/views/admin) | 后台页面。 |
| [`src/api`](./src/api) | 按业务模块拆分的接口调用封装。 |
| [`src/stores/user.js`](./src/stores/user.js) | 登录态、用户资料、管理员判断。 |
| [`src/stores/social.js`](./src/stores/social.js) | 好友系统、WebSocket 实时消息、WebRTC 语音通话。 |
| [`src/utils/request.js`](./src/utils/request.js) | Axios 统一请求层，负责 token 注入、错误处理、401 跳转。 |
| [`src/utils/url.js`](./src/utils/url.js) | 上传资源地址解析，统一处理相对路径和绝对路径。 |
| [`vite.config.js`](./vite.config.js) | 开发代理、别名、构建分包策略。 |

## 页面地图

### 前台路由

路由定义集中在 [`src/router/index.js`](./src/router/index.js)。

| 路由 | 页面组件 | 主要用途 |
| --- | --- | --- |
| `/` | `HomeView.vue` | 首页，聚合菜单、站点信息、统计、文章、公告。 |
| `/board/:key` | `BoardDetailView.vue` | 板块详情与板块文章列表。 |
| `/article/:id` | `ArticleDetailView.vue` | 文章详情、评论、点赞、收藏、举报。 |
| `/search` | `SearchView.vue` | 搜索结果页。 |
| `/news` | `NewsView.vue` | 外部资讯源聚合。 |
| `/games` | `GameHubView.vue` | 小游戏集合页。 |
| `/chat` | `ChatRoomView.vue` | 公共聊天室。 |
| `/community` | `CommunityHubView.vue` | 闲聊广场。 |
| `/bounty` | `CommunityHubView.vue` | 赏金大厅。 |
| `/messages` | `PrivateMessageView.vue` | 好友私信、群聊、在线状态、语音通话。 |
| `/profile` | `ProfileView.vue` | 当前用户个人中心。 |
| `/space/:id` | `UserSpaceView.vue` | 用户空间主页、动态和留言。 |
| `/collect` | `CollectView.vue` | 我的收藏。 |
| `/login` `/register` | `LoginView.vue` `RegisterView.vue` | 登录/注册入口。 |

### 后台路由

| 路由前缀 | 页面组件 | 主要用途 |
| --- | --- | --- |
| `/admin/dashboard` | `DashboardView.vue` | 后台统计看板。 |
| `/admin/articles` | `ArticleManageView.vue` | 文章列表管理。 |
| `/admin/article/edit` | `ArticleEditView.vue` | 发布/编辑文章。 |
| `/admin/article/review` | `ArticleReviewView.vue` | 文章审核。 |
| `/admin/article/reports` | `ArticleReportView.vue` | 文章举报处理。 |
| `/admin/users` | `UserManageView.vue` | 用户与权限管理。 |
| `/admin/images` | `ImageManageView.vue` | 图片库与图片权限。 |
| `/admin/socials` | `SocialManageView.vue` | 好友、群组、拉黑、社区数据。 |
| `/admin/community` | `CommunityManageView.vue` | 闲聊/赏金帖运营管理。 |
| `/admin/settings` | `SettingManageView.vue` | 系统配置、ES 导入导出、同步文章/图片。 |
| `/admin/logs` | `LogManageView.vue` | 审计日志。 |

## 状态管理

### 用户状态

[`src/stores/user.js`](./src/stores/user.js) 负责：

- 从 `localStorage` 恢复 token。
- 通过 `/api/user_info` 拉当前用户资料。
- 提供 `isLoggedIn`、`isAdmin`、`currentUserId` 这类计算属性。
- 统一退出登录逻辑。

### 社交状态

[`src/stores/social.js`](./src/stores/social.js) 是前端最关键的业务 store 之一，负责：

- 好友列表、黑名单、在线状态摘要。
- 连接 `/api/social/ws` WebSocket。
- 处理私信、群聊、在线状态变化的实时推送。
- 用 WebRTC 完成一对一语音通话信令协商。

页面只需要在需要社交能力时调用 `ensureStarted()`，不用自己维护 socket 生命周期。

## 接口组织方式

前端所有请求都通过 [`src/utils/request.js`](./src/utils/request.js) 发出。业务层不直接写 Axios，而是走 `src/api/*.js`。

| API 文件 | 后端接口前缀 | 对应能力 |
| --- | --- | --- |
| [`src/api/user.js`](./src/api/user.js) | `/email_login` `/users` `/user_*` `/space/*` | 登录、注册、用户资料、签到、用户空间。 |
| [`src/api/article.js`](./src/api/article.js) | `/articles` `/article/text` `/article/digg` | 文章、全文搜索、收藏、审核、举报、附件上传。 |
| [`src/api/social.js`](./src/api/social.js) | `/social/*` | 好友、黑名单、私信、群组、社区帖子、语音通话、文件。 |
| [`src/api/system.js`](./src/api/system.js) | `/settings/*` `/data_*` `/logs` `/news` | 站点设置、统计、ES、日志、资讯源。 |
| [`src/api/image.js`](./src/api/image.js) | `/images` | 图片上传、列表、元数据、权限编辑。 |
| [`src/api/menu.js`](./src/api/menu.js) | `/menus` `/menu_names` | 前台导航与后台菜单维护。 |
| [`src/api/board.js`](./src/api/board.js) | `/boards` | 板块管理。 |
| [`src/api/announcement.js`](./src/api/announcement.js) | `/announcements` | 公告管理。 |
| [`src/api/comment.js`](./src/api/comment.js) | `/comments` | 评论与评论点赞。 |
| [`src/api/message.js`](./src/api/message.js) | `/messages` | 历史私信接口。 |
| [`src/api/tag.js`](./src/api/tag.js) | `/tags` | 标签管理。 |
| [`src/api/advert.js`](./src/api/advert.js) | `/adverts` | 广告管理。 |
| [`src/api/chat.js`](./src/api/chat.js) | `/chat_groups` | 公共聊天室数据。 |

## 页面到接口的阅读路径

推荐按下面顺序看代码：

1. [`src/router/index.js`](./src/router/index.js)
2. [`src/layouts/FrontLayout.vue`](./src/layouts/FrontLayout.vue) 或 [`src/layouts/AdminLayout.vue`](./src/layouts/AdminLayout.vue)
3. 对应页面文件，例如 [`src/views/front/HomeView.vue`](./src/views/front/HomeView.vue)
4. 页面里 import 的 `src/api/*.js`
5. [`src/utils/request.js`](./src/utils/request.js)
6. 后端 [`../gvb_server/routers`](../gvb_server/routers) 和 [`../gvb_server/api`](../gvb_server/api)

## 与后端的关键联动

### 登录与鉴权

- 前端在请求拦截器里同时写入 `Authorization: Bearer <token>` 和 `token: <token>`。
- 路由守卫根据 `meta.requiresAuth` 和 `meta.requiresAdmin` 控制页面访问。
- 后端统一用 JWT 中间件校验，失效时前端自动跳回登录页。

### 文章系统

- 首页、板块、搜索和文章详情都以文章接口为中心。
- 后端文章正文和搜索能力主要依赖 Elasticsearch。
- 评论、点赞、收藏、举报则通过独立接口补充。

### 社交系统

- 私信页加载好友列表、黑名单、会话列表和消息记录。
- 实时事件通过 `/api/social/ws` 推送。
- 语音通话使用 WebSocket 交换 WebRTC offer/answer/candidate。

### 资源访问

- 图片等公开资源通常通过 `/uploads/*` 访问。
- 需要权限校验的附件和部分图片不直接暴露，必须走后端受控接口。

## 开发注意点

- 默认端口是 `3000`，后端默认端口是 `8080`。
- 当前项目大量使用路由懒加载，新增页面时记得同步修改路由和后台导航。
- 真实登录态以后端 `/user_info` 为准，Pinia 里的管理员判断只是前端兜底。
- 社交相关页面如果依赖实时能力，务必确认 `socialStore.ensureStarted()` 已执行。
- 当前代码中保留了一些历史兼容接口命名，阅读时以路由层和后端 `routers/*.go` 为准。

## 现有文档怎么配合看

- [前后端总览](../gvb_server/docs/FULLSTACK_OVERVIEW.md)：从业务和链路上理解两端如何配合。
- [前端入门说明](./FRONTEND_BEGINNER_GUIDE.md)：更偏页面和前端视角。
- [接口文档摘要](./API_DOCUMENTATION.md)：偏接口列表。

## 一句话总结

如果你要改功能，前端最常见的切入顺序是：

`路由 -> 页面 -> store -> api -> request -> 后端路由`
