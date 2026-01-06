import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false // 토큰 리프레싱 진행 상태
let failedQueue = [] // 실패한 요청을 담아두는 큐

// 실패한 요청 차례대로 실행하는 함수
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// 요청 인터셉터: 토큰 자동 첨부
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터: 401 에러 시 토큰 갱신 또는 로그아웃
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 401 에러이고, 재요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 리프레시 토큰이 만료되었을 경우 바로 종료
      if (originalRequest.url?.includes('api/auth/refresh')) {
        isRefreshing = false
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      // 이미 토큰 갱신 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      const { refreshToken } = useAuthStore.getState()

      // 리프레시 토큰이 없으면 로그아웃
      if (!refreshToken) {
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      originalRequest._retry = true // 재요청 시그널 표시
      isRefreshing = true // 리프레시 진행 상태 저장

      try {
        // 리프레시 토큰으로 새 토큰 요청
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        const { accessToken, refreshToken } = response.data

        // 새 토큰 저장
        useAuthStore.getState().existUserLogin(accessToken, refreshToken)

        // 대기 중인 요청들 처리
        processQueue(null, accessToken)

        // 실패했던 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 시 로그아웃
        processQueue(refreshError, null)
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false // 리프레시 진행 상태 초기화
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
