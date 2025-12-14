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
  const quizLevel = useQuizStore((state) => state.quizLevel)

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

  let keywordHeader
  switch (quizLevel) {
    case 'keyword-explain':
      keywordHeader = '마스터하기'
      break
    case 'test':
      keywordHeader = '마스터 퀴즈'
      break
    case 'result':
      keywordHeader = '미션 마스터하기'
      break
  }

  return (
    <>
      {/* 상단 바 */}
      <div className='w-full h-[30px] flex items-center relative'>
        <div className='absolute left-4 top-1.5'>
          <button onClick={handleBack}>
            <BackArrowIcon color='#404040' />
          </button>
        </div>
        <p className='w-full text-center text-[18px] font-semibold leading-[130%]'>
          {keywordHeader}
        </p>
        {quizLevel === 'result' && (
          <div className='flex items-center absolute right-4'>
            <img
              src='/images/Bookmark-before.png'
              alt='북마크 버튼'
              className='w-[12px] h-[16px] mr-6 mt-1'
            />
            <img
              src='/images/Share.png'
              alt='공유 버튼'
              className='w-[25px] h-[22px]'
            />
          </div>
        )}
      </div>
      {/* 키워드 헤더 */}
      {quizLevel !== 'result' && (
        <div className='flex items-center gap-1 px-[16px] pt-6'>
          <div className='px-[10px] py-[2px] border-1 border-[#2c2c2c] rounded-2xl text-[14px] font-medium'>
            {keywordMockData.dayCount}일차
          </div>
          <h1 className='text-[22px] font-bold text-[#000000]'>
            {keywordMockData.keyword}
          </h1>
        </div>
      )}

      <Outlet />
    </>
  )
}

export default QuizLayout
