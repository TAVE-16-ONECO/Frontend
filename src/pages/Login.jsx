import { useEffect } from 'react'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const { setShowHeader, setShowNavigation } = useUIOptionStore()
  const [searchParam] = useSearchParams()

  const setInviteCode = useAuthStore((state) => state.setInviteCode)

  useEffect(() => {
    setShowHeader(true)
    setShowNavigation(false)
  }, [])

  // 초대 코드 authStore에 저장
  useEffect(() => {
    const inviteCode = searchParam.get('inviteCode')
    if (!inviteCode) return
    setInviteCode(inviteCode)
  }, [])

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
      {/* 메인 캐릭터 */}
      <div className='mt-[100px]'>
        <img
          className='w-[130px] h-[140px] mr-5'
          src='/images/MainCharacter-peaceful.png'
          alt='메인 캐릭터'
        />
      </div>

      {/* 메인 텍스트 */}
      <div className='text-center mt-[43px]'>
        <p className='font-semibold text-[22px] leading-[130%]'>
          얘야, 경제는 같이 배우는 거란다
        </p>
      </div>

      {/* 서브 텍스트 */}
      <div className='text-center mt-[74px] text-[15px] leading-[150%] text-[#595959]'>
        <p>부모와 함께 약속을 만들고, 아이는 경제를 배우며,</p>
        <p>약속을 지키면 보상으로 이어지는 경제 학습 앱이에요</p>
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className='mt-[200px]'>
        <button
          onClick={handleKakaoLogin}
          className='w-[282px] h-[40px] bg-[#FDEE4B] hover:bg-[#E6CF00] transition-colors rounded-xl flex items-center justify-center gap-2 shadow-sm'
        >
          {/* 카카오 아이콘 (SVG) */}
          <div className='pt-0.5'>
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
          </div>
          <span className='text-[15px] text-[#000000] font-medium leading-[130%] pt-1'>
            카카오로 3초 만에 시작하기
          </span>
        </button>
      </div>
    </div>
  )
}

export default Login
