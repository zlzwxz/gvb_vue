function getQueryTitle(route, fallback = '') {
  const title = String(route?.query?.title || '').trim()
  if (title) return title
  return String(fallback || '').trim()
}

export function buildFrontBreadcrumbs(route) {
  const home = { label: '首页', to: '/' }
  const currentTitle = getQueryTitle(route, route?.meta?.title || '当前页面')
  const boardName = String(route?.query?.board_name || '').trim()
  const boardPath = String(route?.query?.board_path || '').trim()

  switch (route?.name) {
    case 'Home':
      return [home]
    case 'BoardDetail':
      return [home, { label: currentTitle || '板块', current: true }]
    case 'ArticleDetail':
      return [
        home,
        boardName && boardPath ? { label: boardName, to: boardPath } : { label: '文章中心', to: '/' },
        { label: currentTitle || '文章详情', current: true }
      ]
    case 'Search':
      return [home, { label: '搜索结果', current: true }]
    case 'News':
      return [home, { label: '最新资讯', current: true }]
    case 'Games':
      return [home, { label: '小游戏', current: true }]
    case 'ChatRoom':
      return [home, { label: '公共聊天室', current: true }]
    case 'CommunityHub':
      return [home, { label: '闲聊广场', current: true }]
    case 'CommunityPostDetail':
      return [home, { label: '闲聊广场', to: '/community' }, { label: currentTitle || '交流帖详情', current: true }]
    case 'BountyHub':
      return [home, { label: '赏金大厅', current: true }]
    case 'BountyPostDetail':
      return [home, { label: '赏金大厅', to: '/bounty' }, { label: currentTitle || '赏金详情', current: true }]
    case 'PrivateMessages':
      return [home, { label: '我的私信', current: true }]
    case 'Profile':
      return [home, { label: '个人中心', current: true }]
    case 'UserSpace':
      return [home, { label: currentTitle || '用户空间', current: true }]
    case 'Collect':
      return [home, { label: '我的收藏', current: true }]
    default:
      return [home, { label: currentTitle || '当前页面', current: true }]
  }
}

export function buildAdminBreadcrumbs(route) {
  const root = { label: '控制台', to: '/admin/dashboard' }
  const currentTitle = getQueryTitle(route, route?.meta?.title || '当前页面')
  const map = {
    Dashboard: [{ label: '仪表盘', current: true }],
    UserManage: [{ label: '用户管理', current: true }],
    ArticleManage: [{ label: '文章管理', current: true }],
    ArticleEdit: [{ label: '文章管理', to: '/admin/articles' }, { label: currentTitle || '编辑文章', current: true }],
    ArticleReview: [{ label: '文章管理', to: '/admin/articles' }, { label: '文章审核', current: true }],
    ArticleReport: [{ label: '文章管理', to: '/admin/articles' }, { label: '文章举报', current: true }],
    TagManage: [{ label: '标签管理', current: true }],
    ImageManage: [{ label: '图片库', current: true }],
    AdvertManage: [{ label: '广告管理', current: true }],
    MenuManage: [{ label: '导航管理', current: true }],
    BoardManage: [{ label: '板块管理', current: true }],
    SocialManage: [{ label: '好友管理', current: true }],
    CommunityManage: [{ label: '社区悬赏', current: true }],
    AnnouncementManage: [{ label: '公告管理', current: true }],
    MessageManage: [{ label: '消息管理', current: true }],
    CollectManage: [{ label: '收藏管理', current: true }],
    CommentManage: [{ label: '评论管理', current: true }],
    ChatManage: [{ label: '群聊管理', current: true }],
    LogManage: [{ label: '日志管理', current: true }],
    SettingManage: [{ label: '系统配置', current: true }],
    ArticleMaterial: [{ label: '素材中心' }, { label: '文章素材', current: true }],
    ImageMaterial: [{ label: '素材中心' }, { label: '图片素材', current: true }]
  }

  return [root, ...(map[route?.name] || [{ label: currentTitle || '当前页面', current: true }])]
}

export function resolveBreadcrumbFallback(items, fallback) {
  const matched = [...items].reverse().find((item) => item?.to && !item.current)
  return matched?.to || fallback
}
