import clsx from 'clsx'
import { useMemo, useState, useRef, useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import apiClient from '../api/client'
import { useQuizStore } from '../store/quizStore'

const Calendar = ({
  studyPeriod,
  calendarData,
  currentDate,
  setCurrentDate,
  onDateSelect,
  selectedDate,
}) => {
  const isMonthView = useUIOptionStore((state) => state.isMonthView)
  const setIsMonthView = useUIOptionStore((state) => state.setIsMonthView)
  const updateDailyContentIdAndKeyword = useQuizStore(
    (state) => state.updateDailyContentIdAndKeyword,
  )
  const [height, setHeight] = useState('auto')
  const contentRef = useRef(null)
  const prevIsMonthViewRef = useRef(isMonthView)

  // 현재 주의 월~금 날짜 계산
  const weekDates = useMemo(() => {
    const dates = []
    const today = new Date(currentDate)
    const dayOfWeek = today.getDay()

    // 일요일을 기준으로 현재 주 계산
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)

    // 월요일(1)부터 금요일(5)까지만 추가
    for (let i = 1; i <= 5; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }

    return dates
  }, [currentDate])

  // 현재 월의 월~금 날짜만 계산
  const monthDates = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // 해당 월의 1일
    const firstDay = new Date(year, month, 1)
    // 해당 월의 마지막 날
    const lastDay = new Date(year, month + 1, 0)

    // 캘린더 시작일 (해당 주의 월요일부터 시작)
    const startDay = firstDay.getDay()
    const calendarStart = new Date(firstDay)
    // 월요일(1)로 맞추기
    const daysToMonday = startDay === 0 ? 6 : startDay - 1
    calendarStart.setDate(firstDay.getDate() - daysToMonday)

    // 캘린더 종료일 (해당 주의 금요일로 끝)
    const endDay = lastDay.getDay()
    const calendarEnd = new Date(lastDay)
    // 금요일(5)로 맞추기
    const daysToFriday =
      endDay === 0 ? -2
      : endDay === 6 ? -1
      : 5 - endDay
    calendarEnd.setDate(lastDay.getDate() + daysToFriday)

    // 월~금만 날짜 생성
    const dates = []
    const current = new Date(calendarStart)
    while (current <= calendarEnd) {
      const dayOfWeek = current.getDay()
      // 월요일(1)부터 금요일(5)만 추가
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        dates.push(new Date(current))
      }
      current.setDate(current.getDate() + 1)
    }

    return dates
  }, [currentDate])

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 오늘 날짜 체크
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // 미래 날짜 체크
  const isFutureDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate > today
  }

  // 현재 월에 속하는지 체크 (월간 뷰 전용)
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  // 공부 기간 체크
  const isInStudyPeriod = (date) => {
    const startDate = new Date(studyPeriod.startDate + 'T00:00:00')
    const endDate = new Date(studyPeriod.endDate + 'T00:00:00')

    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)

    return compareDate >= startDate && compareDate <= endDate
  }

  // 빈 이전/다음 달 주 필터링 (월간 뷰 전용)
  const filteredMonthDates = useMemo(() => {
    if (!isMonthView) {
      return monthDates
    }

    // 날짜를 주 단위로 그룹화 (5개씩: 월~금)
    const weeks = []
    for (let i = 0; i < monthDates.length; i += 5) {
      weeks.push(monthDates.slice(i, i + 5))
    }

    // 이전/다음 달만 있고 미션 데이터가 없는 주 필터링
    const filteredWeeks = weeks.filter((week) => {
      // 안전성 체크: 주가 5일로 구성되어 있는지 확인
      if (week.length !== 5) return true

      // 모든 날짜가 현재 월이 아닌지 체크
      const allDifferentMonth = week.every((date) => !isCurrentMonth(date))

      // 모든 날짜가 공부 기간 밖인지 체크 (미션 인디케이터 없음)
      const allOutsideStudyPeriod = week.every((date) => !isInStudyPeriod(date))

      // 현재 월 날짜가 하나라도 있거나 미션 데이터가 있으면 주를 유지
      // 모든 날짜가 다른 달이고 미션 데이터도 없으면 주를 제거
      return !(allDifferentMonth && allOutsideStudyPeriod)
    })

    // 필터링된 주들을 다시 1차원 배열로 변환
    return filteredWeeks.flat()
  }, [monthDates, currentDate, studyPeriod, isMonthView])

  // 이전/다음 주로 이동
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // 이전/다음 월로 이동
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // 현재 월 정보
  const getMonthInfo = () => {
    return `${currentDate.getMonth() + 1}월`
  }

  // 조건부로 날짜 목록 선택
  const dates = isMonthView ? filteredMonthDates : weekDates

  // 조건부로 이전/다음 함수 선택
  const handlePrev = isMonthView ? handlePrevMonth : handlePrevWeek
  const handleNext = isMonthView ? handleNextMonth : handleNextWeek

  // 헤더 정보 (항상 월만 표시)
  const headerInfo = getMonthInfo()

  // 선택된 날짜 문자열
  const selectedDateStr = selectedDate?.date || null

  const dayNames = ['월', '화', '수', '목', '금']

  // 뷰 전환 함수
  const toggleView = () => {
    setIsMonthView(!isMonthView)
  }

  // 날짜 클릭시 해당 일자 키워드 정보 불러오는 함수
  const handleDateClick = async (date) => {
    if (!isInStudyPeriod(date)) {
      return
    }

    // 오늘을 포함 이전 날짜여야 조회 가능
    if (isFutureDate(date)) return

    // 해당 일자 키워드의 dailyContentId 가져오기
    const dateStr = formatDate(date)
    const dailyContentId =
      calendarData?.dailyRecords?.[dateStr]?.dailyContentId || null
    if (!dailyContentId) return

    try {
      const res = await apiClient.get(
        `/api/home/keyword?dailyContentId=${dailyContentId}`,
      )
      const keyword = res.data.data.keyword
      updateDailyContentIdAndKeyword(dailyContentId, keyword)

      // 선택된 날짜 정보를 부모에게 전달
      const dateInfo = {
        date: dateStr,
        month: date.getMonth() + 1,
        day: date.getDate(),
      }
      if (onDateSelect) {
        onDateSelect(dateInfo)
      }

      console.log('키워드 개별 정보 조회 성공')
    } catch (e) {
      console.log('키워드 개별 정보를 불러오는 중 에러 발생', e)
    }
  }

  // 높이 측정 및 애니메이션
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current

      // 먼저 현재 높이를 저장
      const currentHeight = element.offsetHeight

      // auto로 변경하여 실제 콘텐츠 높이 측정
      element.style.height = 'auto'
      const targetHeight = element.scrollHeight

      // 현재 높이로 되돌림 (애니메이션 시작점)
      element.style.height = `${currentHeight}px`

      // 다음 프레임에서 목표 높이로 변경 (애니메이션 실행)
      requestAnimationFrame(() => {
        setHeight(`${targetHeight}px`)

        // 실제로 뷰가 토글되어 월간 뷰로 변경되었을 때만 스크롤
        const wasWeekView = prevIsMonthViewRef.current === false
        const isNowMonthView = isMonthView === true

        if (wasWeekView && isNowMonthView) {
          // 애니메이션이 완료된 후 스크롤 (100ms 후)
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          }, 100)
        }

        // 현재 상태를 저장
        prevIsMonthViewRef.current = isMonthView
      })
    }
  }, [isMonthView, dates])

  return (
    <div>
      {/* 헤더: 월/주차 및 화살표 - 배경 밖 */}
      <div className='flex items-center justify-center mb-[5px]'>
        <button
          onClick={handlePrev}
          className='p-2 hover:opacity-70 transition-opacity'
          aria-label={isMonthView ? '이전 월' : '이전 주'}
        >
          <svg
            width='10'
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

        <h3 className='text-[16px] text-[#717171] font-medium'>{headerInfo}</h3>

        <button
          onClick={handleNext}
          className='p-2 hover:opacity-70 transition-opacity'
          aria-label={isMonthView ? '다음 월' : '다음 주'}
        >
          <svg
            width='10'
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
      </div>

      {/* 캘린더 - 파란 배경 안 + 높이 애니메이션 */}
      <div
        ref={contentRef}
        className='bg-[#fdfdfd] rounded-2xl pt-4 pb-2 transition-all duration-100 ease-in-out overflow-hidden [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]'
        style={{
          height: height,
        }}
      >
        <div className='flex justify-between'>
          {[0, 1, 2, 3, 4].map((dayIndex) => {
            const columnDates = dates.filter((_, idx) => idx % 5 === dayIndex)

            return (
              <div
                key={dayIndex}
                className='flex-1 flex flex-col items-center'
              >
                <span className='text-[14px] text-[#595959] font-medium leading-[130%]'>
                  {dayNames[dayIndex]}
                </span>

                {columnDates.map((date, dateIdx) => {
                  const dateStr = formatDate(date)
                  const inStudyPeriod = isInStudyPeriod(date)
                  const studyStatus =
                    calendarData?.dailyRecords?.[dateStr]?.studyStatus || null
                  const todayHighlight = isToday(date)
                  const isFuture = isFutureDate(date)
                  const inCurrentMonth = isCurrentMonth(date)
                  const isSelected = selectedDateStr === dateStr

                  return (
                    <button
                      key={dateIdx}
                      className={clsx(
                        'flex flex-col items-center w-full mt-[13px] pb-2',
                        isSelected &&
                          'w-full max-w-[34px] bg-[#f4f4f4] rounded-xl',
                      )}
                      onClick={() => handleDateClick(date)}
                    >
                      <span
                        className={`w-[18px] h-[18px] text-[10px] flex items-center justify-center ${
                          !inCurrentMonth && isMonthView ?
                            'border-transparent opacity-30'
                          : todayHighlight ? 'font-bold text-[#404040]'
                          : 'font-semibold border-transparent text-[#919191]'
                        }`}
                      >
                        {date.getDate()}
                      </span>

                      <div className='w-[24px] h-[22px] flex items-center justify-center mt-[1px]'>
                        {inStudyPeriod && studyStatus === 'studied' && (
                          <img
                            src='/images/DidShell.png'
                            alt='공부함'
                            width='24'
                            height='22'
                          />
                        )}
                        {inStudyPeriod && studyStatus === 'not-studied' && (
                          <img
                            src='/images/NotDidShell.png'
                            alt='공부 안 함'
                            width='24'
                            height='22'
                          />
                        )}
                        {inStudyPeriod && !studyStatus && isFuture && (
                          <img
                            src='/images/WillShell.png'
                            alt='공부 예정'
                            width='24'
                            height='22'
                          />
                        )}
                        {!inStudyPeriod && (
                          <div
                            className={`w-[8px] h-[8px] rounded-full ${
                              !inCurrentMonth && isMonthView ? 'bg-[#d9d9d9]'
                              : 'bg-[#bababa]'
                            }`}
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        {/* 인디케이터 바 */}
        <div className='flex justify-center mt-3'>
          <button
            className='w-[67px] h-[3px] rounded-[2px] bg-[#bababa]'
            onClick={toggleView}
          />
        </div>
      </div>
    </div>
  )
}

export default Calendar
