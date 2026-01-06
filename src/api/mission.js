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
    const response = await apiClient.get('/missions/in-progress')
    return response.data
  },
  //종료된 미션 조회
  getFinishedMissions: async () => {
    const response = await apiClient.get('/missions/finished')
    return response.data
  },
}
