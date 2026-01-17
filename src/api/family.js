import apiClient from './client'

export const familyAPI = {
  // 연결된 가족 멤버 조회
  getMembers: async () => {
    const response = await apiClient.get('/api/family/members')
    return response.data
  },
}
