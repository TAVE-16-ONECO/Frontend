import { useState } from 'react'
import Calendar from './Calendar'

// 퍼블리싱 용 미션 mock 데이터
const missionMockData = [
  {
    missionTheme: '소비·저축·금리의 기본 구조 이해하기',
    progress: 90,
    keyword: '인플레이션',
    remainingDays: 4,
    studyPeriod: {
      startDate: '2025-12-10',
      endDate: '2025-12-27',
    },
    calendarData: {
      dailyRecords: {
        '2025-12-10': { studyStatus: 'studied' },
        '2025-12-11': { studyStatus: 'studied' },
        '2025-12-12': { studyStatus: 'studied' },
        '2025-12-13': { studyStatus: 'studied' },
        '2025-12-14': { studyStatus: 'studied' },
        '2025-12-15': { studyStatus: 'not-studied' },
        '2025-12-16': { studyStatus: 'not-studied' },
        '2025-12-17': { studyStatus: 'studied' },
        '2025-12-18': { studyStatus: 'studied' },
        '2025-12-19': { studyStatus: 'not-studied' },
        '2025-12-20': { studyStatus: 'studied' },
      },
    },
  },
]

const MissionCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <>
      {/* 미션 카드 */}
      <div className='w-full px-[23px] [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] flex flex-col rounded-2xl'>
        {/* 프로필 및 미션 주제 */}
        <div className='flex gap-[20px] pt-8 pb-[10px] border-b-1 border-[#dbdbdb]'>
          {/* 사용자 프로필 이미지 */}
          <img
            className='rounded-full w-[55px] h-[55px]'
            src='data:image/png;base64,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'
            alt='profile image'
          />
          {/* 주제 및 진행률 */}
          <div className='flex-1 flex flex-col gap-1 mt-3'>
            <p className='text-[14px] font-medium'>
              {missionMockData[0].missionTheme}
            </p>
            <div className='flex items-center gap-2'>
              <div className='flex-1 h-[13px] bg-[#f4f4f4] rounded-full overflow-hidden'>
                <div
                  className='h-full bg-[#6FAEFF] rounded-full transition-all duration-300'
                  style={{ width: `${missionMockData[0].progress}%` }}
                />
              </div>
            </div>
            <span className='text-[10px] text-[#bababa] min-w-[35px] text-right'>
              {missionMockData[0].progress}%
            </span>
          </div>
        </div>
        {/* 키워드 카드 */}
        <div className='pt-[11px] pb-[16px]'>
          <div className='relative bg-white rounded-2xl [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] pt-[18px] pb-[13px] px-[17px]'>
            {/* 좌측 화살표 */}
            <button
              className='absolute left-[-30px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity'
              aria-label='이전 키워드'
            >
              <svg
                width='8'
                height='10'
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 1L1 7L7 13'
                  stroke='#bababa'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            {/* 우측 화살표 */}
            <button
              className='absolute right-[-30px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity'
              aria-label='다음 키워드'
            >
              <svg
                width='8'
                height='10'
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L7 7L1 13'
                  stroke='#bababa'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            {/* 키워드 카드 내용 */}
            <div className='flex flex-col'>
              {/* Today's keyword 헤더 */}
              <h3 className='text-[14px] text-[#000000] opacity-70 font-medium mb-[7px]'>
                Today's keyword
              </h3>

              {/* 키워드 및 디데이 */}
              <div className='flex items-center justify-between mb-[21px]'>
                <p className='text-[16px] text-[#000000] font-semibold'>
                  {missionMockData[0].keyword}
                </p>
                <span className='text-[10px] text-[#000000] opacity-70 font-medium'>
                  미션 종료까지 D-{missionMockData[0].remainingDays}!
                </span>
              </div>

              {/* 마스터하기 버튼 */}
              <button className='w-full h-[50px] bg-[#5188fb] rounded-[16px] text-[16px] text-white font-semibold hover:bg-[#1b4ebd] transition-colors'>
                마스터하기
              </button>
            </div>
          </div>
        </div>
        {/* 캘린더 섹션 */}
        <div className='mb-3'>
          <Calendar
            studyPeriod={missionMockData[0].studyPeriod}
            calendarData={missionMockData[0].calendarData}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
      </div>
    </>
  )
}

export default MissionCard
