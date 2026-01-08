import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useAuthStore } from '@/store/authStore'
import { useQuizStore } from '@/store/quizStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import apiClient from '../../api/client'
import { FadeLoader } from 'react-spinners'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'

const KeyWordExplain = () => {
  const navigate = useNavigate()
  const isStudyStarted = useRef(false)

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [quizProgressStatus, setQuizProgressStatus] = useState(null)

  const role = useAuthStore((state) => state.role)
  const dailyContentId = useQuizStore((state) => state.dailyContentId)
  const dailyContent = useQuizStore((state) => state.dailyContent)
  const setDailyContent = useQuizStore((state) => state.setDailyContent)
  const daySequence = useQuizStore((state) => state.daySequence)
  const setDaySequence = useQuizStore((state) => state.setDaySequence)
  const setStudyRecordId = useQuizStore((state) => state.setStudyRecordId)

  // TODO: 홈에서 dailyContentId 설정해야 함. 현재는 초기값 입력해서 사용.

  useEffect(() => {
    if (isStudyStarted.current) return

    const getKeywordExplain = async () => {
      try {
        const response = await apiClient.post('/api/study-records/start', {
          dailyContentId,
        })
        const data = response.data.data
        setDailyContent(data.dailyContent)
        setDaySequence(data.daySequence)
        setStudyRecordId(data.studyRecordId)
        setQuizProgressStatus(data.quizProgressStatus)
      } catch (e) {
        console.log('키워드 본문 불러오기 실패', e)
        setHasError(true)
      } finally {
        setLoading(false)
      }
    }

    getKeywordExplain()
    isStudyStarted.current = true
  }, [])

  const handleStudyCompleted = () => {
    navigate('/quiz/test')
  }

  const handleBack = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center h-full'>
        <FadeLoader
          aria-label='Loading Spinner'
          cssOverride={{ left: '25px' }}
        />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className='flex flex-col justify-center items-center mt-5'>
        <p className='text-red-500 text-xl'>키워드를 불러오는 도중</p>
        <p className='text-red-500 text-xl'>에러가 발생했습니다</p>
        <button
          className='bg-gray-500 rounded-2xl p-2 text-white mt-3'
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    )
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
        <p className='w-full text-center text-[18px] font-semibold leading-[130%] text-[#2c2c2c]'>
          마스터하기
        </p>
      </div>
      <div className='pb-[30px]'>
        {/* 키워드 헤더 */}
        <div className='flex items-center gap-[10px] px-[16px] pt-6'>
          <div className='px-[10px] py-[2px] border-1 border-[#2c2c2c] rounded-2xl text-[14px] font-medium'>
            {daySequence}일차
          </div>
          <h1 className='text-[22px] font-bold text-[#000000]'>
            {dailyContent.keyword}
          </h1>
        </div>
        <div className='px-[16px] py-7'>
          {/* 키워드 설명 */}
          {dailyContent.imageUrl && (
            <div className='w-full mb-5'>
              <img
                src={dailyContent.imageUrl}
                alt='키워드 본문 이미지'
                className='w-full h-auto rounded-lg object-cover max-h-[400px]'
                onError={(e) => {
                  e.target.style.display = 'none' // 로드 실패 시 숨김
                }}
              />
            </div>
          )}
          <div className='pb-5'>
            {/* 마크다운 콘텐츠 */}
            <div className='markdown-content'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {dailyContent.bodyText}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        {role === 'child' &&
          quizProgressStatus !== 'PASSED' &&
          quizProgressStatus !== 'FAILED' && (
            <div className='flex justify-center'>
              <button
                className='text-[18px] text-[#fdfdfd] bg-[#5188fb] px-9 py-4 rounded-2xl hover:cursor-pointer'
                onClick={handleStudyCompleted}
              >
                퀴즈 도전하기
              </button>
            </div>
          )}
      </div>
    </>
  )
}

export default KeyWordExplain
