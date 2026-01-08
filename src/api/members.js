import apiClient from './client'

export const membersAPI = {
  // 회원 정보 조회
  getMemberInfo: async () => {
    const response = await apiClient.get('/api/members/info')
    return response.data
  },
}
