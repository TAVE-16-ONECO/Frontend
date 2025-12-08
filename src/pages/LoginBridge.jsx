import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import apiClient from '../api/client'
import { useUIOptionStore } from '../store/uiOptionStore'
import { useAuthStore } from '../store/authStore'

export default function LoginBridge() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const newUserLogin = useAuthStore((state) => state.newUserLogin)
  const existUserLogin = useAuthStore((state) => state.existUserLogin)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
    return () => {
      setShowNavigation(true)
    }
  })

  // 리다이렉트 후 쿼리 파라미터에서 key 추출 및 로그인 결과 API 호출
  useEffect(() => {
    // key 추출
    const key = params.get('key')

    if (!key) {
      navigate('/login', { replace: true })
      return
    }

    // 로그인 key로 로그인 결과 API 호출하는 함수
    const getLoginResult = async () => {
      try {
        const response = await apiClient.get(
          `/api/auth/login-result?key=${encodeURIComponent(key)}`,
        )

        const data = response.data.data

        if (!data) {
          navigate('/login', { replace: true })
          return
        }

        if (data.isNew) {
          // 신규 유저: 온보딩 토큰 저장 후 역할 선택 페이지로 리다이렉트
          if (!data.onboardingToken) {
            navigate('/login', { replace: true })
            return
          }
          newUserLogin(data.onboardingToken)
          navigate('/role-select', { replace: true })
        } else {
          // 기존 유저: Access/Refresh Token 저장 후 홈 페이지로 리다이렉트
          if (!data.accessToken && !data.refreshToken) {
            navigate('/login', { replace: true })
            return
          }
          existUserLogin(data.accessToken, data.refreshToken)
          navigate('/', { replace: true })
        }
      } catch (error) {
        navigate('/login', { replace: true })
      }
    }

    getLoginResult()
  }, [params, navigate])

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <FadeLoader
        aria-label='Loading Spinner'
        cssOverride={{ left: '25px' }}
      />
    </div>
  )
}
