import request from '@/utils/request'

export const apiGetSocialSummary = () => request.get('/social/summary')
export const apiGetSocialManageSummary = () => request.get('/social/manage/summary')
export const apiGetSocialManageFollows = (params) => request.get('/social/manage/follows', { params })
export const apiGetSocialManageBlocks = (params) => request.get('/social/manage/blocks', { params })
export const apiGetSocialManageGroups = (params) => request.get('/social/manage/groups', { params })
export const apiGetSocialDiscovery = (params) => request.get('/social/discovery', { params })
export const apiGetSocialFriends = (params) => request.get('/social/friends', { params })
export const apiGetSocialRelation = (id) => request.get(`/social/relations/${id}`)
export const apiFollowUser = (id) => request.post(`/social/follows/${id}`)
export const apiUnfollowUser = (id) => request.delete(`/social/follows/${id}`)

export const apiGetSocialBlocks = () => request.get('/social/blocks')
export const apiBlockUser = (id, data) => request.post(`/social/blocks/${id}`, data)
export const apiUnblockUser = (id) => request.delete(`/social/blocks/${id}`)

export const apiGetSocialConversations = () => request.get('/social/conversations')
export const apiGetSocialDirectMessages = (params) => request.get('/social/direct/messages', { params })
export const apiCreateSocialDirectMessage = (data) => request.post('/social/direct/messages', data)
export const apiSearchSocialMessages = (params) => request.get('/social/messages/search', { params })
export const apiRecallSocialMessage = (id) => request.post(`/social/messages/${id}/recall`)
export const apiGetSocialCallLogs = (params) => request.get('/social/calls', { params })

export const apiGetSocialGroups = () => request.get('/social/groups')
export const apiCreateSocialGroup = (data) => request.post('/social/groups', data)
export const apiJoinSocialGroup = (data) => request.post('/social/groups/join', data)
export const apiGetSocialGroupDetail = (id) => request.get(`/social/groups/${id}`)
export const apiGetSocialGroupMessages = (id) => request.get(`/social/groups/${id}/messages`)
export const apiCreateSocialGroupMessage = (id, data) => request.post(`/social/groups/${id}/messages`, data)
export const apiAddSocialGroupMembers = (id, data) => request.post(`/social/groups/${id}/members`, data)
export const apiUpdateSocialGroupMemberRole = (id, userId, data) => request.put(`/social/groups/${id}/members/${userId}/role`, data)
export const apiRemoveSocialGroupMember = (id, userId) => request.delete(`/social/groups/${id}/members/${userId}`)
export const apiTransferSocialGroupOwner = (id, data) => request.put(`/social/groups/${id}/transfer-owner`, data)

export const apiUpdateSocialPresence = (data) => request.put('/social/presence', data)

export const apiUploadSocialFile = (formData) => request.post('/social/files', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

export const apiGetCommunityMeta = (params) => request.get('/social/community/meta', { params })
export const apiGetCommunityPostList = (params) => request.get('/social/community/posts', { params })
export const apiGetCommunityPostDetail = (id) => request.get(`/social/community/posts/${id}`)
export const apiCreateCommunityPost = (data) => request.post('/social/community/posts', data)
export const apiDeleteCommunityPost = (id) => request.delete(`/social/community/posts/${id}`)
export const apiCreateCommunityReply = (id, data) => request.post(`/social/community/posts/${id}/replies`, data)
export const apiAcceptCommunityBounty = (id) => request.post(`/social/community/posts/${id}/accept`)
export const apiUpdateCommunityPostStatus = (id, data) => request.put(`/social/community/posts/${id}/status`, data)
export const apiToggleCommunityPostPin = (id, data) => request.put(`/social/community/posts/${id}/pin`, data)
export const apiGetAdminCommunityPostList = (params) => request.get('/social/manage/community', { params })
