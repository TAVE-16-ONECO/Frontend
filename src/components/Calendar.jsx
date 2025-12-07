import { useMemo, useState, useRef, useEffect } from 'react'

const Calendar = ({
  studyPeriod,
  calendarData,
  currentDate,
  setCurrentDate,
}) => {
  // 내부 state로 뷰 관리
  const [isMonthView, setIsMonthView] = useState(false)
  const [height, setHeight] = useState('auto')
  const contentRef = useRef(null)

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
    const dateStr = formatDate(date)
    const startDate = new Date(studyPeriod.startDate)
    const endDate = new Date(studyPeriod.endDate)
    return date >= startDate && date <= endDate
  }

  // 공부 상태 가져오기
  const getStudyStatus = (date) => {
    const dateStr = formatDate(date)
    return calendarData?.dailyRecords?.[dateStr]?.studyStatus || null
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

  // 현재 월과 주차 계산 (목요일 기준)
  const getWeekInfo = () => {
    // 주의 목요일 찾기 (월~금 배열에서 목요일은 인덱스 3)
    const thursday = weekDates[3] // 배열 인덱스 3이 목요일 (월=0, 화=1, 수=2, 목=3, 금=4)
    const month = thursday.getMonth() + 1
    const year = thursday.getFullYear()

    // 해당 월의 1일로 시작하는 주의 목요일 찾기
    const firstDayOfMonth = new Date(year, month - 1, 1) // month - 1 (0-indexed)
    const firstDayWeekday = firstDayOfMonth.getDay() // 0=일요일, 1=월요일, ...

    // 1일이 속한 주의 목요일 날짜 계산
    let firstWeekThursday
    if (firstDayWeekday <= 4) {
      // 1일이 일~목요일이면, 같은 주의 목요일
      firstWeekThursday = 4 - firstDayWeekday + 1
    } else {
      // 1일이 금~토요일이면, 다음 주의 목요일
      firstWeekThursday = 11 - firstDayWeekday + 1
    }

    // 현재 목요일 날짜와 첫 주 목요일 날짜의 차이로 주차 계산
    const weekOfMonth =
      Math.floor((thursday.getDate() - firstWeekThursday) / 7) + 1

    return `${month}월 ${weekOfMonth}주차`
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

  // 조건부로 헤더 정보 선택
  const headerInfo = isMonthView ? getMonthInfo() : getWeekInfo()

  const dayNames = ['월', '화', '수', '목', '금']

  // 뷰 전환 함수
  const toggleView = () => {
    setIsMonthView(!isMonthView)
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

        // 월간 뷰로 확장될 때 스크롤
        if (isMonthView) {
          // 애니메이션이 완료된 후 스크롤 (100ms 후)
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          }, 100)
        }
      })
    }
  }, [isMonthView, dates])

  return (
    <div>
      {/* 헤더: 월/주차 및 화살표 - 배경 밖 */}
      <div className='flex items-center justify-center'>
        <button
          onClick={handlePrev}
          className='p-2 hover:opacity-70 transition-opacity'
          aria-label={isMonthView ? '이전 월' : '이전 주'}
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
              stroke='#9E9E9E'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <h3 className='text-[14px] text-[#000000] opacity-70 font-medium'>
          {headerInfo}
        </h3>

        <button
          onClick={handleNext}
          className='p-2 hover:opacity-70 transition-opacity'
          aria-label={isMonthView ? '다음 월' : '다음 주'}
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
              stroke='#9E9E9E'
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
        onClick={toggleView}
        className='bg-[#E2EFFF] rounded-2xl p-4 transition-all duration-100 ease-in-out overflow-hidden'
        style={{
          height: height,
        }}
      >
        <div className='flex gap-8'>
          {[0, 1, 2, 3, 4].map((dayIndex) => {
            const columnDates = dates.filter((_, idx) => idx % 5 === dayIndex)

            return (
              <div
                key={dayIndex}
                className='flex-1 flex flex-col items-center'
              >
                <span className='text-[14px] text-[#919191] opacity-70 font-medium'>
                  {dayNames[dayIndex]}
                </span>

                {columnDates.map((date, dateIdx) => {
                  const inStudyPeriod = isInStudyPeriod(date)
                  const studyStatus = getStudyStatus(date)
                  const todayHighlight = isToday(date)
                  const isFuture = isFutureDate(date)
                  const inCurrentMonth = isCurrentMonth(date)

                  return (
                    <button
                      key={dateIdx}
                      className='flex flex-col items-center w-full'
                    >
                      <span
                        className={`w-[18px] h-[18px] text-[10px] mt-[13px] font-semibold border-1 flex items-center justify-center ${
                          !inCurrentMonth && isMonthView ?
                            'border-transparent opacity-30'
                          : todayHighlight ?
                            'rounded-md border-[#5188FB] text-[#404040]'
                          : 'border-transparent text-[#919191] opacity-70'
                        }`}
                      >
                        {date.getDate()}
                      </span>

                      <div className='w-[24px] h-[22px] flex items-center justify-center mt-[2px]'>
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
                          <div className='w-[8px] h-[8px] rounded-full bg-[#bababa]' />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        {/* 인디케이터 바 (주간 뷰에서만 표시) */}
        {!isMonthView && (
          <div className='flex justify-center mt-2'>
            <div className='w-[67px] h-[3px] rounded-[2px] bg-[#d9d9d9]' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
