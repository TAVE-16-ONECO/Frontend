import { useState } from 'react'
import Calendar from './Calendar'

// 퍼블리싱 용 미션 mock 데이터
const missionMockData = [
  {
    missionTheme: 'part.1 돈의 흐름',
    progress: 90,
    keyword: '저축률',
    remainingDays: 4,
    studyPeriod: {
      startDate: '2025-12-22',
      endDate: '2026-1-2',
    },
    calendarData: {
      dailyRecords: {
        '2025-12-22': { studyStatus: 'studied' },
        '2025-12-23': { studyStatus: 'studied' },
        '2025-12-24': { studyStatus: 'studied' },
        '2025-12-25': { studyStatus: 'studied' },
        '2025-12-26': { studyStatus: 'studied' },
        '2025-12-27': { studyStatus: 'not-studied' },
        '2025-12-28': { studyStatus: 'not-studied' },
        '2025-12-29': { studyStatus: 'studied' },
        '2025-12-30': { studyStatus: 'studied' },
        '2025-12-31': { studyStatus: 'not-studied' },
        '2026-1-1': { studyStatus: 'studied' },
        '2026-1-2': { studyStatus: 'studied' },
      },
    },
  },
]

const MissionCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // 공부 시작 일차 계산
  const calculateStudyDay = (startDate) => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = today - start
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1 // 1일차부터 시작
  }

  return (
    <>
      {/* 미션 카드 */}
      <div className='w-full pt-[24px] px-[24px] [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] flex flex-col rounded-2xl bg-[#e2efff]'>
        {/* 미션 주제 */}
        <div className='pb-[10px] border-b-1 border-[#dbdbdb]'>
          <div className='flex flex-col gap-1'>
            <p className='text-[10px] font-normal leading-[130%] text-[#717171]'>
              시작한 지{' '}
              {calculateStudyDay(missionMockData[0].studyPeriod.startDate)}일차
            </p>
            <p className='text-[14px] font-medium'>
              {missionMockData[0].missionTheme}
            </p>
            <div className='flex items-center gap-2'>
              <div className='flex-1 relative pt-[10px]'>
                {/* 80% 지점 마커 */}
                <div
                  className='absolute -top-1 bottom-0 flex flex-col items-center pointer-events-none z-10'
                  style={{ left: '80%', transform: 'translateX(-50%)' }}
                >
                  {/* 선물 상자 아이콘 */}
                  <img
                    src='/images/PresentBox.png'
                    alt='목표 달성 리워드'
                    className='w-[12px] h-[12px]'
                  />
                  {/* 흰색 세로 줄 */}
                  <div className='w-[1px] h-[13px] bg-[#fdfdfd] mt-[2px]' />
                </div>
                {/* Progress bar */}
                <div className='h-[13px] bg-[#f4f4f4] rounded-full overflow-hidden relative'>
                  <div
                    className='h-full bg-[#6FAEFF] rounded-full transition-all duration-300'
                    style={{ width: `${missionMockData[0].progress}%` }}
                  />
                </div>
              </div>
            </div>
            <span className='text-[10px] text-[#bababa] min-w-[35px] text-right'>
              전체 정답률 {missionMockData[0].progress}%
            </span>
          </div>
        </div>
        {/* 키워드 카드 */}
        <div className='pt-[11px] pb-[12px]'>
          <div className='relative bg-white rounded-2xl [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] pt-[18px] pb-[13px] px-[17px]'>
            {/* 키워드 카드 내용 */}
            <div className='flex flex-col'>
              {/* Today's keyword 헤더 */}
              <h3 className='text-[14px] text-[#000000] opacity-70 font-medium mb-[4px]'>
                오늘의 키워드
              </h3>

              {/* 키워드 및 디데이 */}
              <div className='flex items-center mb-[10px]'>
                <p className='text-[16px] text-[#000000] font-semibold'>
                  {missionMockData[0].keyword}
                </p>
              </div>

              {/* 마스터하기 버튼 */}
              <button className='w-full h-[50px] bg-[#5188fb] rounded-[16px] text-[16px] text-white font-medium hover:bg-[#1b4ebd] transition-colors'>
                조개 모으기
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
