import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import { BackArrowIcon } from '../components/icons/BackArrowIcon'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore'

const keywordMockData = {
  keyword: '실질소득',
  dayCount: 9,
}

const QuizLayout = () => {
  const navigate = useNavigate()
  const urlParams = useLocation()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const isStudyCompleted = useQuizStore((state) => state.isStudyCompleted)

  const handleBack = () => {
    switch (urlParams.pathname) {
      case '/quiz/keyword-explain':
        navigate('/')
        break
      case '/quiz/test':
      case '/quiz/result':
        navigate('/quiz/keyword-explain')
        break
    }
  }

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
  }, [])
  return (
    <>
      {/* 상단 바 */}
      <div className='w-full h-[30px] flex relative'>
        <div className='absolute left-4 top-1'>
          <button onClick={handleBack}>
            <BackArrowIcon color='#404040' />
          </button>
        </div>
        <p className='w-full text-center text-[18px] font-medium leading-[130%]'>
          {isStudyCompleted ? '마스터 퀴즈' : '마스터하기'}
        </p>
      </div>
      {/* 키워드 헤더 */}
      <div className='flex items-center gap-1 px-[16px] pt-6'>
        <div className='px-[10px] py-[2px] border-1 border-[#2c2c2c] rounded-2xl text-[14px] font-medium'>
          {keywordMockData.dayCount}일차
        </div>
        <h1 className='text-[22px] font-bold text-[#000000]'>
          {keywordMockData.keyword}
        </h1>
      </div>
      <Outlet />
    </>
  )
}

export default QuizLayout
