# 好友管理与跳转聊天框第二层细化说明

这份文档专门讲两件事：

1. 后台“好友管理”页的数据和操作怎么组织
2. 点击“去聊天”以后，页面为什么能直接跳到正确会话

如果你已经看过 `FRONTEND_BEGINNER_GUIDE.md`，
可以把这份文档理解成“继续往下一层拆开的版本”。

---

## 1. 先分清两个页面

项目里和社交功能最相关的两个页面是：

1. `src/views/admin/SocialManageView.vue`
2. `src/views/front/PrivateMessageView.vue`

它们职责完全不同。

### 1.1 `SocialManageView.vue`

这是后台管理页。

它负责：

- 看全站好友关系
- 看黑名单关系
- 看好友群组
- 做快捷跳转

它不负责真正渲染聊天消息区。

---

### 1.2 `PrivateMessageView.vue`

这是前台私信页。

它负责：

- 展示会话列表
- 展示消息列表
- 发送消息
- 建群
- 拉黑 / 取消拉黑
- 加好友
- 语音通话

你要把它理解成：

`真正的聊天工作台`

---

## 2. 这次后台好友管理页补了什么

改动文件：

- `src/views/admin/SocialManageView.vue`

这次补了三类内容：

### 2.1 顶部说明卡

新增了一段提示文案，明确告诉使用者：

`这里的“去聊天”是当前登录账号发起聊天，不是管理员替别人聊天`

这个提示很重要。

因为后台管理表格展示的是“全站用户之间的关系”，
比如一行好友关系可能是：

- 用户 A
- 用户 B

但是你当前登录的管理员并不是 A，也不是 B。

所以当你点击“聊发起方”时，真正发生的是：

`当前管理员账号 -> 跳到和 A 的私信页`

而不是：

`强行代替 A 去和 B 聊`

---

### 2.2 三个表格都加了操作列

#### 好友关系表

新增：

- `聊发起方`
- `聊目标方`

也就是：

- 跳到 `row.user_id`
- 跳到 `row.follow_user_id`

---

#### 黑名单表

新增：

- `聊拉黑人`
- `聊被拉黑用户`

也就是：

- 跳到 `row.user_id`
- 跳到 `row.block_user_id`

---

#### 群组表

新增：

- `联系群主`
- `进入群聊`

也就是：

- 跳到群主私信页
- 跳到指定群聊页

---

### 2.3 筛选条件改成自动刷新

这次还补了一个交互层改动：

- 切换顶部 tab 会自动刷新
- 切换好友关系 `mode` 会自动刷新
- 搜索框清空或回车会立即刷新
- 普通输入会做一个短延迟防抖，然后自动刷新

这样做的意义是：

1. 不用每次改完条件再额外点一次“刷新”
2. 仍然保留防抖，避免每敲一个字都立刻打一请求

---

## 3. 后台页是怎么发起跳转的

关键函数就在：

- `goDirectChat`
- `goGroupChat`

它们本质上只做了一件事：

`调用 vue-router，把目标 ID 放进 query`

例如私信跳转：

```js
router.push({ name: 'PrivateMessages', query: { user_id: String(target) } })
```

例如群聊跳转：

```js
router.push({ name: 'PrivateMessages', query: { group_id: String(target) } })
```

这说明一个很关键的设计思想：

`聊天页不是靠“某个全局变量”决定打开谁，而是靠路由 query 决定`

这样做的好处是：

1. 地址栏能直接表达“当前打开的是谁的会话”
2. 刷新页面后还能根据 query 恢复会话
3. 其他页面也能复用同一套跳转方式

---

## 4. 为什么前台私信页能自动选中正确会话

这里要看：

- `src/views/front/PrivateMessageView.vue`

你可以重点找这几块：

1. `selectConversation`
2. `openDirectByUserId`
3. `watch(() => [route.query.user_id, route.query.group_id], ...)`
4. `syncSelectionFromRoute()`

---

### 4.1 `openDirectByUserId`

这个函数在私信页内部也有一份。

作用是：

- 统一把“点某个好友 / 某条通话记录 / 某个搜索结果”
- 转成 `router.push({ name: 'PrivateMessages', query: { user_id } })`

也就是说：

后台管理页和前台私信页内部，其实使用的是同一种跳转协议。

这个协议就是：

- 私聊看 `user_id`
- 群聊看 `group_id`

---

### 4.2 `selectConversation`

当左侧会话列表中用户点击某项时，代码不会只改本地变量，
而是会把当前选择写回路由：

- 私聊写 `user_id`
- 群聊写 `group_id`

这样做的意义是：

`页面当前状态和地址栏状态保持同步`

---

### 4.3 `watch(route.query...)`

私信页里有一个很重要的监听：

它会持续监听：

- `route.query.user_id`
- `route.query.group_id`

只要这两个值变了，就会调用：

- `syncSelectionFromRoute()`

你可以把这段监听理解成：

`地址栏一变，聊天页就重新校准自己的选中状态`

---

### 4.4 `syncSelectionFromRoute()`

虽然这类函数名字通常不起眼，但它常常是页面联动的真正核心。

它的职责通常包括：

1. 读取当前 query
2. 判断是私聊还是群聊
3. 在会话列表里找到对应对象
4. 更新 `selectedConversation`
5. 拉取对应消息记录

所以你以后再遇到“为什么能直接跳到某个聊天框”的问题，
优先找这种“从路由同步页面状态”的函数。

---

## 5. 好友管理页的数据从哪里来

后台好友管理页调用的 API 在：

- `src/api/social.js`

对应方法：

1. `apiGetSocialManageSummary`
2. `apiGetSocialManageFollows`
3. `apiGetSocialManageBlocks`
4. `apiGetSocialManageGroups`

页面里主要对应这些函数：

1. `fetchSummary`
2. `fetchFriends`
3. `fetchBlocks`
4. `fetchGroups`
5. `fetchCurrent`

你可以这样理解：

### `fetchSummary`

负责顶部统计卡片。

---

### `fetchFriends`

负责好友 / 关注列表。

它会带：

- `page`
- `limit`
- `key`
- `mode`

其中 `mode` 对应后台的：

- `friend`
- `follow`
- `all`

---

### `fetchBlocks`

负责黑名单列表。

---

### `fetchGroups`

负责群组列表。

---

### `fetchCurrent`

这是页面层的统一调度器。

它会根据当前 tab 自动决定调哪个接口。

所以当你以后想继续扩展这个页面时，
优先改它，而不是在各个按钮里到处散着写请求。

---

### `queueSearch` / `triggerSearch`

这两个函数负责把“输入框变化”变成自动查询：

- `triggerSearch`
  适合清空、回车这类“立刻执行”的场景
- `queueSearch`
  适合普通输入，先做一次短延迟防抖，再调用 `fetchCurrent(1)`

你可以把它理解成：

`用户改筛选条件 -> 页面统一重新请求列表`

---

### `watch(activeTab)` / `watch(search)`

这两个监听是自动刷新的真正触发点之一：

- `watch(activeTab)` 负责切换“好友关系 / 黑名单 / 群组”时重查
- `watch(search)` 负责监听搜索词变化并交给 `queueSearch`

所以这次“筛选自动刷新”并不是后端新增了什么接口，
而是前端把原来手动点按钮的时机，改成了条件变化时自动调用 `fetchCurrent(1)`。

---

## 6. 为什么我说“跳转聊天框”是前端问题，不是后端问题

因为“跳转聊天框”本质是：

`页面从 A 跳到 B`

这属于前端路由职责。

后端在这件事里负责的是：

1. 给你管理列表数据
2. 给你会话 / 消息数据

前端负责的是：

1. 根据列表拿到用户 ID 或群组 ID
2. 拼成路由 query
3. 跳到私信页
4. 让私信页根据 query 自动选中会话

所以你以后看到类似需求：

- 跳转到文章详情
- 跳转到用户空间
- 跳转到某个聊天会话

先看：

- `router.push`
- 路由定义
- 目标页的 `watch(route.query...)`

一般都会很快定位。

---

## 7. 这块代码推荐怎么读

建议顺序：

### 第一遍：先看地址和目标页

1. `src/router/index.js`
2. 找到 `PrivateMessages`
3. 确认它对应的是 `PrivateMessageView.vue`

这样你先知道：

`/messages` 就是目标聊天页

---

### 第二遍：看后台好友管理页怎么跳

1. `src/views/admin/SocialManageView.vue`
2. 找 `goDirectChat`
3. 找 `goGroupChat`

这样你就知道：

`后台页只是把 user_id / group_id 写进路由`

---

### 第三遍：看私信页怎么接住这个路由

1. `src/views/front/PrivateMessageView.vue`
2. 找 `watch(route.query...)`
3. 找 `syncSelectionFromRoute`
4. 找 `selectConversation`

这样你就能看明白：

`为什么地址一变，会话和消息区也会跟着变`

---

### 第四遍：再看 store 层

1. `src/stores/social.js`

这里重点不是“跳转页面”，而是：

- 会话相关数据刷新
- WebSocket 消息推送
- 在线状态同步
- 语音通话信令

也就是说：

`路由决定打开谁，store 负责保证数据是新的`

---

## 8. 你后面继续扩展时，最常见的三种改法

### 8.1 给更多地方补“去聊天”

统一做法：

```js
router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
```

如果是群聊：

```js
router.push({ name: 'PrivateMessages', query: { group_id: String(groupId) } })
```

不要自己重新造一套“聊天跳转协议”。

---

### 8.2 想加“查看资料”

通常走：

```js
router.push({ name: 'UserSpace', params: { id: String(userId) } })
```

也就是：

- 聊天跳 `/messages`
- 资料跳 `/space/:id`

---

### 8.3 想给后台管理页加更多操作按钮

建议遵守这个原则：

- 后台页只做“管理”和“跳转”
- 真正复杂交互放到前台工作页完成

例如：

- 查看群详情
- 发送消息
- 搜索消息
- 语音通话

这些都更适合在 `PrivateMessageView.vue` 完成。

---

## 9. 最容易踩的坑

### 9.1 误以为“去聊天”是管理员代聊

不是。

它只是当前登录账号打开目标会话。

---

### 9.2 只改 `selectedConversation`，不改路由

这样页面刷新后状态就丢了。

更稳的做法是：

`让路由成为页面状态来源`

---

### 9.3 在多个页面各写一套不同的聊天跳转方法

这样后面会越来越乱。

当前项目已经形成了统一习惯：

- 私聊用 `user_id`
- 群聊用 `group_id`

最好继续沿用。

---

## 10. 最后给你的一个记忆口诀

把这块逻辑记成一句话：

`后台好友管理负责给出对象，router 负责把对象带到 /messages，私信页再根据 query 自动选中会话。`
