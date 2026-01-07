import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/store/quizStore'
import apiClient from '../../api/client'
import { FadeLoader } from 'react-spinners'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'

const Quiz = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [quizzes, setQuizzes] = useState(null)
  const [quizNumber, setQuizNumber] = useState(0) // 0은 첫 번째 퀴즈를 의미
  const [quizAnswer, setQuizAnswer] = useState({ 0: null, 1: null, 2: null })
  const [attemptId, setAttemptId] = useState(null)
  const isQuizStarted = useRef(false)

  const studyRecordId = useQuizStore((state) => state.studyRecordId)
  const daySequence = useQuizStore((state) => state.daySequence)
  const dailyContent = useQuizStore((state) => state.dailyContent)
  const setQuizResultData = useQuizStore((state) => state.setQuizResultData)

  // 퀴즈 시작하는 함수
  useEffect(() => {
    if (isQuizStarted.current) {
      return
    }
    const tryQuiz = async () => {
      try {
        const response = await apiClient.post(
          `/api/study-records/${studyRecordId}/quiz-attempts`,
        )
        setQuizzes(response.data.data.quizzes)
        setAttemptId(response.data.data.attempt.attemptId)
      } catch (e) {
        setHasError(true)
      } finally {
        setLoading(false)
      }
    }
    tryQuiz()
    isQuizStarted.current = true
  }, [])

  // 퀴즈 정답 선택 함수
  const handleAnswerSelect = (idx) => {
    setQuizAnswer((prev) => ({ ...prev, [quizNumber]: idx }))
  }

  // 다음 퀴즈 넘어가는 함수
  const handleNextQuiz = async () => {
    // 정답 제출 API 호출
    if (quizNumber === 2) {
      const body = {
        [quizzes[0].quizId]: quizAnswer[0],
        [quizzes[1].quizId]: quizAnswer[1],
        [quizzes[2].quizId]: quizAnswer[2],
      }
      try {
        const response = await apiClient.post(
          `/api/study-records/${studyRecordId}/quiz-attempts/${attemptId}/submissions`,
          { answers: body },
        )
        setQuizResultData(response.data.data)
      } catch (e) {
        console.log('퀴즈 정답 제출 중 오류 발생', e)
      }
      navigate('/quiz/result')
      return
    }
    // 다음 퀴즈 표시
    setQuizNumber((prev) => prev + 1)
  }

  // 뒤로 가기 버튼 클릭 핸들링 함수
  const handleBack = () => {
    if (quizNumber === 0) {
      const response = confirm(
        '퀴즈 기회가 1회 줄어듭니다. 그래도 퀴즈를 포기하시겠습니까?',
      )
      if (response) {
        navigate('/')
      }
      return
    }
    setQuizNumber((prev) => prev - 1)
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
        <p className='text-red-500 text-xl'>퀴즈를 불러오는 도중</p>
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
          마스터 퀴즈
        </p>
      </div>
      {/* 키워드 헤더 */}
      <div className='flex items-center gap-[10px] px-[16px] pt-6'>
        <div className='px-[10px] py-[2px] border-1 border-[#2c2c2c] rounded-2xl text-[14px] font-medium'>
          {daySequence}일차
        </div>
        <h1 className='text-[22px] font-bold text-[#000000]'>
          {dailyContent.keyword}
        </h1>
      </div>
      <div className='flex flex-col px-[16px] items-center'>
        {/* 퀴즈 현황 표시줄 */}
        <div className='w-full flex justify-around mt-[22px] gap-[20px]'>
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              className={clsx(
                'w-full h-0 border-[1.2px]',
                quizNumber === n ? 'border-[#595959]' : 'border-[#bababa]',
              )}
            ></div>
          ))}
        </div>
        {/* 퀴즈 설명 카드 */}
        <div className='w-full flex flex-col items-center'>
          <p className='mt-[33px] text-[16px] font-semibold'>
            {quizzes[quizNumber].question}
          </p>
        </div>
        {/* 답변 선택 */}
        <div className='w-full mt-[100px] flex flex-col gap-[14px]'>
          {quizzes[quizNumber].options.map((item, idx) => (
            <button
              key={item}
              className={clsx(
                'px-[48px] py-[14px] text-[#fdfdfd] rounded-[16px] hover:cursor-pointer',
                quizAnswer[quizNumber] === idx ?
                  'bg-[#5188fb]'
                : 'bg-[#b2d6ff]',
              )}
              onClick={() => handleAnswerSelect(idx)}
            >
              {item}
            </button>
          ))}
        </div>
        {/* 다음 버튼 */}
        <button
          className={clsx(
            'w-[170px] h-[56px] mt-[28px] px-[29px] py-[17px] rounded-[16px] text-[16px] font-semibold',
            quizAnswer[quizNumber] === null ?
              'bg-[#dbdbdb] text-[#fdfdfd] hover:cursor-not-allowed'
            : 'bg-[#fdfdfd] text-[#404040] hover:cursor-pointer [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]',
          )}
          disabled={quizAnswer[quizNumber] === null}
          onClick={handleNextQuiz}
        >
          {quizNumber === 2 ? '제출하기' : '다음'}
        </button>
      </div>
    </>
  )
}

export default Quiz
