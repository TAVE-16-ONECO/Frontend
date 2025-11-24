import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const ProtectedRoute = () => {
  // 로그인 여부 판단 로직
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

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
