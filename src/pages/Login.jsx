import { useEffect } from 'react'
import { useUIOptionStore } from '@/store/uiOptionStore'

const Login = () => {
  const { setShowHeader, setShowNavigation } = useUIOptionStore()

  useEffect(() => {
    setShowHeader(true)
    setShowNavigation(false)
    return () => {
      setShowNavigation(true)
    }
  }, [])

  // TODO: 백엔드에서 리다이렉트 된 경우 로직 처리

  const handleKakaoLogin = () => {
    try {
      const kakaoLoginURL = import.meta.env.VITE_KAKAO_LOGIN_URL

      if (!kakaoLoginURL) {
        throw new Error('카카오 로그인 URL이 설정되지 않았습니다.')
      }

      window.location.href = kakaoLoginURL
    } catch (error) {
      console.error('카카오 로그인 오류:', error)
      alert('로그인 서비스에 접근할 수 없습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <div className='flex flex-col items-center bg-white px-6'>
      {/* ONECO 타이틀 */}
      <h1 className='text-[43px] font-header text-black mt-[100px]'>ONECO</h1>

      {/* 설명 텍스트 2줄 */}
      <div className='text-center mb-[32px] text-[12px] mt-[4px] opacity-[70%]'>
        <p className='leading-[130%]'>매일 한 발자국씩 가까워지는 경제 소식,</p>
        <p className='leading-[130%]'>원코와 함께 만나보세요</p>
      </div>

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className='w-[282px] h-[40px] bg-[#FDEE4B] hover:bg-[#E6CF00] transition-colors rounded-xl flex items-center justify-center gap-2 shadow-sm'
      >
        {/* 카카오 아이콘 (SVG) */}
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 0C4.477 0 0 3.846 0 8.571c0 3.034 2.016 5.695 5.033 7.18-.207.758-.673 2.515-.764 2.91-.11.482.177.475.374.346.155-.102 2.495-1.653 3.466-2.306.594.082 1.2.126 1.817.126 5.523 0 10-3.846 10-8.571S15.523 0 10 0z'
            fill='#3C1E1E'
          />
        </svg>
        <span className='text-[15px] text-[#3C1E1E] font-medium'>
          카카오로 3초 만에 시작하기
        </span>
      </button>
    </div>
  )
}

export default Login
