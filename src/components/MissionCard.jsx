import { useState, useMemo } from 'react'
import Calendar from './Calendar'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore'
import { transformMissionData } from '../utils/missionDataTransformer'

const MissionCard = ({ mission }) => {
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())

  // 오늘 날짜(또는 가장 가까운 평일) 계산
  const getDefaultDate = () => {
    if (!mission.dateList || mission.dateList.length === 0) return null

    let targetDate = new Date()
    targetDate.setHours(0, 0, 0, 0)
    const dayOfWeek = targetDate.getDay()

    if (dayOfWeek === 0) {
      targetDate.setDate(targetDate.getDate() - 2)
    } else if (dayOfWeek === 6) {
      targetDate.setDate(targetDate.getDate() - 1)
    }

    // dateList에서 가장 가까운 날짜 찾기
    let closestItem = null
    let minDiff = Infinity

    mission.dateList.forEach((item) => {
      const itemDate = new Date(item.date)
      itemDate.setHours(0, 0, 0, 0)
      const diff = Math.abs(itemDate - targetDate)

      if (diff < minDiff) {
        minDiff = diff
        closestItem = item
      }
    })

    if (closestItem) {
      const date = new Date(closestItem.date)
      return {
        date: closestItem.date,
        month: date.getMonth() + 1,
        day: date.getDate(),
      }
    }
    return null
  }

  const [selectedDateInfo, setSelectedDateInfo] = useState(() =>
    getDefaultDate(),
  )

  const storeKeyword = useQuizStore((state) => state.dailyContent?.keyword)
  const setDailyContentId = useQuizStore((state) => state.setDailyContentId)

  // 원본 API 데이터를 컴포넌트에서 사용할 형식으로 변환
  const missionData = useMemo(() => transformMissionData(mission), [mission])

  // 오늘 날짜에서 가장 가까운 평일의 키워드 찾기
  const getInProgressDate = () => {
    // 선택된 날짜가 있으면 그것을 표시
    if (selectedDateInfo) {
      return `${selectedDateInfo.month}월 ${selectedDateInfo.day}일 키워드`
    }

    if (!mission.dateList || mission.dateList.length === 0) {
      return '오늘의 키워드' // 기본값
    }

    // 오늘 날짜를 가져와서 시간 정보 제거 (자정으로 설정)
    let targetDate = new Date()
    targetDate.setHours(0, 0, 0, 0)
    const dayOfWeek = targetDate.getDay()

    // 주말인 경우 가장 가까운 금요일로 조정
    if (dayOfWeek === 0) {
      // 일요일 -> 2일 전 금요일
      targetDate.setDate(targetDate.getDate() - 2)
    } else if (dayOfWeek === 6) {
      // 토요일 -> 1일 전 금요일
      targetDate.setDate(targetDate.getDate() - 1)
    }

    // dateList에서 targetDate와 가장 가까운 날짜 찾기
    let closestItem = null
    let minDiff = Infinity

    mission.dateList.forEach((item) => {
      const itemDate = new Date(item.date)
      itemDate.setHours(0, 0, 0, 0) // 시간 정보 제거
      const diff = Math.abs(itemDate - targetDate)

      if (diff < minDiff) {
        minDiff = diff
        closestItem = item
      }
    })

    if (closestItem) {
      const date = new Date(closestItem.date)
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}월 ${day}일 키워드`
    }

    return '오늘의 키워드' // 기본값
  }

  const handleDateSelect = (dateInfo) => {
    setSelectedDateInfo(dateInfo)
  }

  const handleQuizStart = () => {
    // selectedDateInfo가 있으면 해당 날짜의 dailyContentId 설정
    if (selectedDateInfo && selectedDateInfo.date) {
      const dateItem = mission.dateList?.find(
        (item) => item.date === selectedDateInfo.date,
      )
      if (dateItem?.dailyContentId) {
        setDailyContentId(dateItem.dailyContentId)
      } else {
        // dateList에 없으면 기본 dailyContentId 사용
        setDailyContentId(mission.dailyContent.dailyContentId)
      }
    } else {
      // selectedDateInfo가 없으면 기본 dailyContentId 사용
      setDailyContentId(mission.dailyContent.dailyContentId)
    }
    navigate('/quiz/keyword-explain')
  }

  return (
    <>
      {/* 미션 카드 */}
      <div className='w-full pt-[24px] px-[16px] [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] flex flex-col rounded-2xl bg-[#e2efff]'>
        {/* 미션 주제 */}
        <div className='pb-[10px] border-b-1 border-[#dbdbdb]'>
          <div className='flex flex-col gap-1'>
            <p className='text-[10px] font-normal leading-[130%] text-[#717171]'>
              시작한 지 {missionData.studyDay}
              일차
            </p>
            <p className='text-[14px] font-medium'>{mission.rewardTitle}</p>
            <div className='flex items-center gap-2'>
              <div className='flex-1 relative pt-[10px]'>
                {/* 80% 지점 마커 */}
                <div className='absolute -top-1 flex flex-col items-center z-10 right-0'>
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
                    style={{ width: `${missionData.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <span className='text-[10px] text-[#bababa] min-w-[35px] text-right'>
              전체 진행률 {missionData.progress}%
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
                {getInProgressDate()}
              </h3>

              {/* 키워드 및 디데이 */}
              <div className='flex items-center mb-[10px]'>
                <p className='text-[16px] text-[#000000] font-medium'>
                  {missionData.missionTheme}:{' '}
                  {selectedDateInfo && storeKeyword ?
                    storeKeyword
                  : missionData.keyword}
                </p>
              </div>

              {/* 마스터하기 버튼 */}
              <button
                className='w-full h-[50px] bg-[#5188fb] rounded-[16px] text-[16px] text-white font-medium hover:bg-[#1b4ebd] transition-colors'
                onClick={handleQuizStart}
              >
                조개 모으기
              </button>
            </div>
          </div>
        </div>
        {/* 캘린더 섹션 */}
        <div className='mb-3'>
          <Calendar
            studyPeriod={missionData.studyPeriod}
            calendarData={missionData.calendarData}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDateInfo}
          />
        </div>
      </div>
    </>
  )
}

export default MissionCard
