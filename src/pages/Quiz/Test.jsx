import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const quizMockData = [
  {
    quiz: '실질소득은 물가를 고려해 실제 체감되는 소득이다.',
    imageSrc: '#',
    answerOption: ['O', 'X'],
  },
  {
    quiz: '물가 상승률이 소득 증가율보다 더 크면 실질소득은 감소한다.',
    imageSrc: '#',
    answerOption: ['O', 'X'],
  },
  {
    quiz: '실질소득은 명목소득과 반드시 같은 방향으로 움직인다.',
    imageSrc: '#',
    answerOption: ['O', 'X'],
  },
]
const Quiz = () => {
  const [answerNumber, setAnswerNumber] = useState(null) // 답변 선택하지 않으면 null, 선택하면 0 또는 1
  const [quizCount, setQuizCount] = useState(0) // 0은 첫 번째를 의미

  const navigate = useNavigate()
  const handleAnswerSelect = (answer) => {
    setAnswerNumber(answer)
  }

  const handleNextQuiz = () => {
    if (quizCount === 2) {
      // 마지막 퀴즈일 때
      navigate('/quiz/result')
      return
    }
    setAnswerNumber(null)
    setQuizCount((prev) => prev + 1)
  }
  return (
    <div className='flex flex-col px-[16px] items-center'>
      {/* 퀴즈 현황 표시줄 */}
      <div className='w-full flex justify-around mt-[22px] gap-[20px]'>
        {[0, 1, 2].map((n) => (
          <div
            key={n}
            className={clsx(
              'w-full h-0 border-[1.2px]',
              quizCount === n ? 'border-[#595959]' : 'border-[#bababa]',
            )}
          ></div>
        ))}
      </div>
      {/* 퀴즈 설명 카드 */}
      <div className='w-full flex flex-col items-center'>
        <p className='mt-[33px] text-[16px] font-semibold'>
          {quizMockData[quizCount].quiz}
        </p>
        <div className='mt-[58px] bg-gray-300'>
          <img
            src={quizMockData[quizCount].imageSrc}
            alt='퀴즈 이미지'
            width={353}
            height={177}
          />
        </div>
      </div>
      {/* 답변 선택 */}
      <div className='w-full mt-[100px] flex flex-col gap-[14px]'>
        {quizMockData[quizCount].answerOption.map((item, idx) => (
          <button
            key={item}
            className={clsx(
              'px-[48px] py-[14px] text-[#fdfdfd] rounded-[16px] hover:cursor-pointer',
              answerNumber === idx ? 'bg-[#5188fb]' : 'bg-[#b2d6ff]',
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
          answerNumber === null ?
            'bg-[#dbdbdb] text-[#fdfdfd] hover:cursor-not-allowed'
          : 'bg-[#fdfdfd] text-[#404040] hover:cursor-pointer [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]',
        )}
        disabled={answerNumber === null}
        onClick={handleNextQuiz}
      >
        {quizCount === 2 ? '제출하기' : '다음'}
      </button>
    </div>
  )
}

export default Quiz
