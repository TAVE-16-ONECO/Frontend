import apiClient from './client'

export const authAPI = {
  // 로그인 성공 후 사용자 정보 조회 (백엔드에서 제공하는 경우)
  getUserInfo: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  // 로그아웃
  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response.data
  },

  // 토큰 갱신 (필요한 경우)
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken })
    return response.data
  },
}
