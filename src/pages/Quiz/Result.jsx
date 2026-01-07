import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../../store/quizStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'

const Result = () => {
  const navigate = useNavigate()

  const quizResultData = useQuizStore((state) => state.quizResultData)
  const dailyContent = useQuizStore((state) => state.dailyContent)

  const handleBack = () => {
    const response = confirm('홈으로 돌아가시겠습니까?')
    if (response) {
      navigate('/')
    }
  }

  if (!quizResultData) {
    return (
      <>
        <div className='flex flex-col justify-center items-center mt-5'>
          <p className='text-red-500 text-xl'>결과를 불러오는 도중</p>
          <p className='text-red-500 text-xl'>에러가 발생했습니다</p>
          <button
            className='bg-gray-500 rounded-2xl p-2 text-white mt-3'
            onClick={() => navigate('/')}
          >
            홈으로 돌아가기
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='w-full h-[30px] flex items-center relative'>
        <div className='absolute left-4 top-1.5'>
          <button onClick={handleBack}>
            <BackArrowIcon color='#404040' />
          </button>
        </div>
        <p className='w-full text-center text-[18px] font-semibold leading-[130%] text-[#2c2c2c]'>
          미션 마스터하기
        </p>
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
      </div>
      <div className='flex flex-col items-center px-[16px] pb-[47px]'>
        {/* 아빠 이미지 */}
        <div className='w-[137px] h-[137px] mt-10'>
          <img
            src='/images/MainCharacter.png'
            alt='아빠 캐릭터'
          />
        </div>
        <p className='text-[16px] font-semibold mt-4'>너가 정말 대견하구나.</p>
        {/* 결과 정보 카드 */}
        <div className='w-full bg-[#e2efff] mt-7 rounded-xl flex flex-col items-center'>
          <div className='w-fit mt-4 px-[10px] py-[4px] rounded-2xl border-1 border-[#2c2c2c] text-[14px] font-medium'>
            마스터 도전
          </div>
          <p className='mt-4 text-[14px] font-medium'>
            {quizResultData.grading.correctCount}마리 획득
          </p>
          <div className='mt-2 flex gap-4'>
            {Array(quizResultData.grading.correctCount)
              .fill(1)
              .map((_, idx) => (
                <img
                  key={idx}
                  src='/images/DidShell.png'
                  alt='조개 아이콘'
                  className='w-[30px] h-[28px]'
                />
              ))}
          </div>
          {/* 키워드 정보 또는 뉴스 정보 카드 */}
          <div className='w-full px-[10px] pb-[10px] flex justify-center'>
            {
              quizResultData.newsUnlocked ?
                // 뉴스 정보 카드
                <div className='w-full min-h-[215px] px-[14px] py-[19px] mt-[44px] flex justify-around items-center gap-[20px] bg-[#fdfdfd] rounded-xl'>
                  <a
                    className='flex-1 flex flex-col items-center gap-[6px]'
                    href={quizResultData.newsItems[0].url}
                    target='_blank'
                  >
                    <img
                      className='bg-gray-400 rounded-2xl w-[133px] h-[133px]'
                      src={quizResultData.newsItems[0].imageUrl}
                      alt='뉴스 기사 1'
                    />
                    <p className='font-normal text-[#2c2c2c] text-[12px]'>
                      {quizResultData.newsItems[0].title}
                    </p>
                  </a>
                  <a
                    className='flex-1 flex flex-col items-center gap-[6px]'
                    href={quizResultData.newsItems[1].url}
                    target='_blank'
                  >
                    <img
                      className='bg-gray-400 rounded-2xl w-[133px] h-[133px]'
                      src={quizResultData.newsItems[1].imageUrl}
                      alt='뉴스 기사 2'
                    />
                    <p className='font-normal text-[#2c2c2c] text-[12px]'>
                      {quizResultData.newsItems[1].title}
                    </p>
                  </a>
                </div>
                // 키워드 정보 카드
              : <div className='w-full min-h-[215px] px-[14px] py-[19px] mt-[44px] bg-[#fdfdfd] rounded-xl'>
                  <p className='text-[16px] font-bold text-[#2c2c2c]'>
                    {dailyContent.keyword}
                  </p>
                  <p className='mt-[19px] text-[12px] text-[#595959] leading-[100%]'>
                    {dailyContent.summary}
                  </p>
                </div>

            }
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className='mt-4 w-full flex justify-around gap-[14px]'>
          {quizResultData.quizProgressStatus === 'RETRY_AVAILABLE' && (
            <button
              className='flex-1 h-[56px] text-center bg-[#91c4ff] rounded-2xl text-[#fdfdfd] text-[18px]'
              onClick={() => navigate('/quiz/test')}
            >
              기회 1번 더
            </button>
          )}

          <button
            className='flex-1 h-[56px] text-center bg-[#91c4ff] rounded-2xl text-[#fdfdfd] text-[18px]'
            onClick={() => navigate('/history')}
          >
            히스토리 가기
          </button>
        </div>
      </div>
    </>
  )
}

export default Result
