import { Navigate, Outlet } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import { useAuthStore } from '../store/authStore'

const ProtectedRoute = () => {
  // 로그인 여부 판단 로직
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useAuthStore((state) => state._hasHydrated)

  // localStorage에서 토큰을 복원할 때까지 대기 (로딩 표시)
  if (!hasHydrated) {
    return <Loading />
  }

  // Hydration 완료 후 인증 체크
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    )
  }

  //children을 라우팅하기 위한 Outlet (중첩라우팅)
  return <Outlet />
}

export default ProtectedRoute
