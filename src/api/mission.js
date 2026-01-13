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
  getOngoingMissions: async (lastId = null, size = 5) => {
    try {
      const params = { size }
      if (lastId !== null) {
        params.lastId = lastId
      }

      const response = await apiClient.get('/api/missions/in-progress', {
        params,
      })
      return response.data?.data?.content ?? []
    } catch (error) {
      console.error('진행 중인 미션 API 에러:', error)
      throw error
    }
  },
  //종료된 미션 조회
  getFinishedMissions: async (lastId = null, size = 5) => {
    try {
      const params = { size }
      if (lastId !== null) {
        params.lastId = lastId
      }

      const response = await apiClient.get('/api/missions/finished', {
        params,
      })
      return response.data?.data?.content ?? []
    } catch (error) {
      console.error('종료된 미션 API 에러:', error)
      throw error
    }
  },
}
