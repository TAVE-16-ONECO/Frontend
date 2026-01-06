import apiClient from './client'

export const missionAPI = {
  //미션 생성
  createMission: async (missionData) => {
    const response = await apiClient.post('/missions', missionData)
    return response.data
  },
  //미션 승인/거절
  respondToMission: async (missionId, isApproved) => {
    const response = await apiClient.post(`/missions/${missionId}/approval`, {
      isApproved,
    })
    return response.data
  },
  // 진행 중인 미션 조회
  getOngoingMissions: async () => {
    try {
      const response = await apiClient.get('/api/missions/in-progress', {
        params: { lastId: 5, size: 5 },
      })
      console.log('진행 중인 미션 전체 응답:', response)
      console.log('진행 중인 미션 response.data:', response.data)
      return response.data?.data?.content ?? []
    } catch (error) {
      console.error('진행 중인 미션 API 에러:', error)
      throw error
    }
  },
  //종료된 미션 조회
  getFinishedMissions: async () => {
    try {
      const response = await apiClient.get('/api/missions/finished')
      console.log('종료된 미션 전체 응답:', response)
      console.log('종료된 미션 response.data:', response.data)
      return response.data?.data?.content ?? []
    } catch (error) {
      console.error('종료된 미션 API 에러:', error)
      throw error
    }
  },
}
