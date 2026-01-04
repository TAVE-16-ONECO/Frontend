import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '@/components/icons/BackArrowIcon'

const Make = () => {
  const navigate = useNavigate()
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedMission, setSelectedMission] = useState(null)
  const [reward, setReward] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [message, setMessage] = useState('')
  const [noMessage, setNoMessage] = useState(false)
  const [customStartDate, setCustomStartDate] = useState(null)
  const [customEndDate, setCustomEndDate] = useState(null)

  // 멤버 데이터
  const familyMembers = [
    { id: 1, name: '엄마', avatar: '👩' },
    { id: 2, name: '아빠', avatar: '👨' },
    { id: 3, name: '언니', avatar: '👧' },
    { id: 4, name: '형', avatar: '👦' },
    { id: 5, name: '할머니', avatar: '👵' },
    { id: 6, name: '할아버지', avatar: '👴' },
  ]

  // 미션 템플릿 데이터
  const missionTemplates = [
    {
      id: 1,
      title: '주식 시장 공부하기',
      description: '주식 투자의 기본 개념을 학습합니다',
      durationDays: 14,
    },
    {
      id: 2,
      title: '은행 업무 배우기',
      description: '은행에서 할 수 있는 업무를 배웁니다',
      durationDays: 7,
    },
    {
      id: 3,
      title: '투자 이해하기',
      description: '다양한 투자 방법을 이해합니다',
      durationDays: 21,
    },
    {
      id: 4,
      title: '재테크 배우기',
      description: '효율적인 재테크 방법을 학습합니다',
      durationDays: 14,
    },
    {
      id: 5,
      title: '경제 뉴스 읽기',
      description: '경제 뉴스를 이해하고 분석합니다',
      durationDays: 10,
    },
    {
      id: 6,
      title: '저축 습관 들이기',
      description: '꾸준한 저축 습관을 만듭니다',
      durationDays: 30,
    },
    {
      id: 7,
      title: '금융 용어 학습',
      description: '기본 금융 용어를 익힙니다',
      durationDays: 7,
    },
    {
      id: 8,
      title: '세금 이해하기',
      description: '세금의 종류와 개념을 배웁니다',
      durationDays: 10,
    },
  ]

  // 날짜 계산 함수 (주말 제외)
  const calculateDates = () => {
    if (!selectedMission) return null

    const mission = missionTemplates.find((m) => m.id === selectedMission)
    if (!mission) return null

    // customStartDate와 customEndDate가 있으면 사용
    if (customStartDate && customEndDate) {
      // 영업일 수 계산
      let daysCount = 0
      const currentDate = new Date(customStartDate)

      while (currentDate <= customEndDate) {
        const dayOfWeek = currentDate.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          daysCount++
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return {
        startDate: customStartDate,
        endDate: customEndDate,
        durationDays: daysCount,
      }
    }

    let today = new Date(2026, 0, 3) // 테스트: 2026년 1월 30일

    // 시작일이 주말이면 다음 평일로 조정
    let startDate = new Date(today)
    while (startDate.getDay() === 0 || startDate.getDay() === 6) {
      startDate.setDate(startDate.getDate() + 1)
    }

    const endDate = new Date(startDate)

    // 주말을 제외하고 영업일만 카운트
    let daysAdded = 0
    let currentDate = new Date(startDate)

    while (daysAdded < mission.durationDays) {
      currentDate.setDate(currentDate.getDate() + 1)
      const dayOfWeek = currentDate.getDay()
      // 0(일요일), 6(토요일)이 아니면 카운트
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        daysAdded++
      }
    }

    endDate.setTime(currentDate.getTime())

    //시작일, 종료일, 기간일수
    return {
      startDate: startDate,
      endDate: endDate,
      durationDays: mission.durationDays,
    }
  }

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }
  //월,일 포맷팅 함수
  const formatDatewithoutyear = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}.${day}`
  }

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [setShowHeader, setShowNavigation])

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleMissionSelect = (missionId) => {
    setSelectedMission(missionId)
  }

  const handleMemberToggle = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ?
        prev.filter((id) => id !== memberId)
      : [...prev, memberId],
    )
  }

  const handleDateClick = (date) => {
    // 주말 제외
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return

    // 현재일보다 이전 날짜 선택 불가
    const today = new Date(2026, 0, 3) // 테스트: 2026년 1월 3일
    today.setHours(0, 0, 0, 0) // 시간 제거
    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0) // 시간 제거
    if (selectedDate < today) return

    // 선택된 미션 정보 가져오기
    const mission = missionTemplates.find((m) => m.id === selectedMission)
    if (!mission) return

    // 시작일 설정
    setCustomStartDate(date)

    // 종료일 계산 (주말 제외)
    const endDate = new Date(date)
    let daysAdded = 0

    while (daysAdded < mission.durationDays) {
      endDate.setDate(endDate.getDate() + 1)
      const dayOfWeek = endDate.getDay()
      // 주말이 아니면 카운트
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        daysAdded++
      }
    }

    setCustomEndDate(endDate)
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleCancel = () => {
    navigate('/mission/current')
  }

  // 진행 표시 바 컴포넌트
  const renderProgressBar = () => (
    <div className='flex gap-2 mb-6'>
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={`flex-1 border-b-[3px] rounded-xl transition-all duration-300 ${
            step <= currentStep ? 'border-[#2c2c2c]' : 'border-[#dbdbdb]'
          }`}
        ></div>
      ))}
    </div>
  )

  //------------------1페이지---------------------------------------
  const renderStep1 = () => (
    <div className='flex-1 px-6 py-6 pb-24'>
      <h2 className='text-[22px] text-[#404040] leading-[130%] font-bold mb-[27px]'>
        너가 원하는 학습 목표를 설정하고<br></br> 내게 보상을 제안해보렴.
      </h2>
      {renderProgressBar()}

      <div className='grid grid-cols-2 gap-4'>
        {missionTemplates.map((mission) => (
          <button
            key={mission.id}
            onClick={() => handleMissionSelect(mission.id)}
            className={`py-[26px] px-[20px] rounded-3xl h-[160px] [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] transition-all text-left flex flex-col ${
              selectedMission === mission.id ?
                'bg-[#B2D6FF]'
              : 'bg-[#E2EFFF]  hover:border-gray-300'
            }`}
          >
            <p className='text-[16px] leading-[150%] font-semibold mb-2'>
              {mission.title}
            </p>
            <p className='text-[12px] leading-[100%] text-gray-600'>
              {mission.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )

  // 캘린더 데이터 생성 함수
  const getCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const prevLastDay = new Date(year, month, 0)

    const firstDayOfWeek = firstDay.getDay()
    const lastDate = lastDay.getDate()
    const prevLastDate = prevLastDay.getDate()

    const days = []

    // 이전 달의 날짜들
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevLastDate - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevLastDate - i),
      })
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      })
    }

    return days
  }

  // 날짜가 범위 내에 있는지 확인
  const isDateInRange = (date, startDate, endDate) => {
    const dateStr = date.toDateString()
    const start = startDate.toDateString()
    const end = endDate.toDateString()
    return date >= new Date(start) && date <= new Date(end)
  }

  // 날짜가 같은지 확인
  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString()
  }
  //------------------------2페이지-------------------------------------
  const renderStep2 = () => {
    const dates = calculateDates()
    if (!dates) return null

    const weekDays = ['월', '화', '수', '목', '금']

    // 현재 날짜부터 4개월치 캘린더 생성
    const today = new Date(2026, 0, 3)
    const monthsToRender = []
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1)
      monthsToRender.push({
        year: monthDate.getFullYear(),
        month: monthDate.getMonth(),
      })
    }

    // 캘린더 렌더링 함수
    const renderCalendar = (year, month, isFirst = false, isLast = false) => {
      const calendarDays = getCalendarDays(year, month)
      // 주말(일요일=0, 토요일=6) 제외
      const weekdayOnly = calendarDays.filter((day) => {
        const dayOfWeek = day.fullDate.getDay()
        return dayOfWeek !== 0 && dayOfWeek !== 6
      })

      // 현재 달 날짜만 그룹화 (이전 달 날짜는 현재 달에 포함)
      const currentMonthDays = weekdayOnly.filter((day) => day.isCurrentMonth)
      const prevMonthDays = weekdayOnly.filter((day) => !day.isCurrentMonth)

      // 모든 날짜를 하나의 그룹으로 (이전 달 + 현재 달)
      const groupedByMonth = [
        {
          month: month,
          days: weekdayOnly,
          isPrevMonth: false,
        },
      ]

      return (
        <div key={`${year}-${month}`}>
          {/* 요일 헤더 (첫 번째 캘린더에만 표시) */}
          {isFirst && (
            <div className='grid grid-cols-5 gap-[55px] mb-2'>
              {weekDays.map((day) => (
                <div
                  key={day}
                  className='text-center text-xs font-bold py-2 text-gray-700'
                >
                  {day}
                </div>
              ))}
            </div>
          )}

          {/* 월별 그룹 렌더링 */}
          {groupedByMonth.map((group, groupIndex) => {
            const groupYear =
              group.days[0].year !== undefined ?
                group.days[0].year
              : group.days[0].fullDate.getFullYear()

            // 첫 번째 캘린더는 모든 월 표시, 나머지는 현재 월만 표시
            const shouldShowMonth = isFirst || group.month === month

            return (
              <div key={`${groupYear}-${group.month}`}>
                {/* 월 구분 표시 */}
                {shouldShowMonth && (
                  <div
                    className={`mb-2 text-left ${groupIndex > 0 || !isFirst ? 'mt-4' : ''}`}
                  >
                    <span className='text-sm font-semibold text-gray-600'>
                      {group.month + 1}월
                    </span>
                  </div>
                )}

                {/* 날짜 그리드 */}
                <div className='grid grid-cols-5 gap-x-0 gap-y-3'>
                  {group.days.map((day, index) => {
                    const isStart = isSameDate(day.fullDate, dates.startDate)
                    const isEnd = isSameDate(day.fullDate, dates.endDate)
                    const isInRange = isDateInRange(
                      day.fullDate,
                      dates.startDate,
                      dates.endDate,
                    )
                    // 요일 계산 월요일 1 ~ 금요일 5
                    const dayOfWeek = day.fullDate.getDay()
                    // 그리드 열 위치 계산 (월요일=1 -> col-1, 화요일=2 -> col-2, ...)
                    const gridColumn =
                      dayOfWeek >= 1 && dayOfWeek <= 5 ? dayOfWeek : null

                    // 라운드 처리: 시작일과 완료일만
                    let roundedClass = ''
                    if (isStart) {
                      // 시작일
                      roundedClass = 'rounded-l-full'
                    } else if (isEnd) {
                      // 완료일
                      roundedClass = 'rounded-r-full'
                    }

                    // 이전 달 날짜는 클릭 불가능한 div로 렌더링
                    if (!day.isCurrentMonth) {
                      return (
                        <div
                          key={index}
                          className='aspect-square flex items-center justify-center text-sm relative w-full'
                          style={{ gridColumn: gridColumn || 'auto' }}
                        >
                          <span className='relative z-20 font-medium text-gray-300'>
                            {day.date}
                          </span>
                        </div>
                      )
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day.fullDate)}
                        className='aspect-square flex items-center justify-center text-sm relative hover:opacity-80 transition-opacity cursor-pointer w-full'
                        style={{ gridColumn: gridColumn || 'auto' }}
                      >
                        {/* 1. 범위 내 배경 (연결 바) - 시작일/종료일이 아닐 때만 */}
                        {isInRange && !isStart && !isEnd && (
                          <div
                            className='absolute h-[38px] bg-[#B2D6FF] z-0'
                            style={{
                              width: 'calc(100% + 2px)',
                              left: '-1px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                            }}
                          />
                        )}

                        {/* 2. 시작일/종료일 배경 */}
                        {isStart && (
                          <>
                            {/* 시작일 원형 */}
                            <div className='absolute z-10 w-[38px] h-[38px] rounded-full bg-[#5188FB]' />
                            {/* 시작일 오른쪽 연결 배경 */}
                            {!isEnd && (
                              <div
                                className='absolute h-[38px] bg-[#B2D6FF] z-0'
                                style={{
                                  left: '50%',
                                  width: '50%',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                }}
                              />
                            )}
                          </>
                        )}

                        {isEnd && (
                          <>
                            {/* 종료일 원형 */}
                            <div className='absolute z-10 w-[38px] h-[38px] rounded-full bg-[#5188FB]' />
                            {/* 종료일 왼쪽 연결 배경 */}
                            {!isStart && (
                              <div
                                className='absolute h-[38px] bg-[#B2D6FF] z-0'
                                style={{
                                  left: '0',
                                  width: '50%',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                }}
                              />
                            )}
                          </>
                        )}

                        {/* 3. 날짜 텍스트 */}
                        <span
                          className={`relative z-20 font-medium ${
                            isStart || isEnd ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {day.date}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className='flex-1 px-6 py-6 pb-24'>
        <h2 className='text-[22px] leading-[130%] text-[#2c2c2c] font-bold mb-4'>
          {dates.durationDays}일치 목표를 골랐구나.<br></br>미션 완료일은{' '}
          {formatDatewithoutyear(dates.endDate)}이란다.{' '}
        </h2>

        {renderProgressBar()}

        {/* 캘린더 컨테이너 - 하나의 박스로 */}

        <div
          className='relative bg-[#E2EFFF] rounded-2xl p-4 overflow-y-auto mx-[6px]'
          style={{
            height: '611px',
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch',
            maskImage:
              'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 90%, transparent 100%)',
          }}
        >
          {/* 캘린더들 - 여러 달 렌더링 */}
          {monthsToRender.map((monthData, index) =>
            renderCalendar(
              monthData.year,
              monthData.month,
              index === 0,
              index === monthsToRender.length - 1,
            ),
          )}
        </div>
      </div>
    )
  }
  //--------------3페이지--------------------------------------
  const renderStep3 = () => (
    <div className='flex-1 px-6 py-6 pb-24'>
      <h2 className='text-[22px] leading-[130%] text-[#2c2c2c] font-bold mb-4'>
        보상은<br></br>무엇으로 정할거니?
      </h2>

      {renderProgressBar()}

      <div className='mt-[38px]'>
        <label className='block text-[18px] font-semibold leading-[130%] text-gray-700 mb-4'>
          보상 내용을 입력해주세요
        </label>
        <div className='relative'>
          <input
            type='text'
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder='예: 좋아하는 간식 사기, 게임 1시간 하기'
            className='w-full px-1 py-2 border-b-2 border-gray-300 focus:border-[#6FAEFF] focus:outline-none'
          />
          <span className='absolute right-0 bottom-2 text-xs text-gray-400'>
            {reward.length}
          </span>
        </div>
        <p className='mt-3 text-xs text-gray-500'>
          미션을 완료했을 때 받고 싶은 보상을 자유롭게 적어보세요.
        </p>
      </div>
    </div>
  )
  //------------------4페이지------------------
  const renderStep4 = () => {
    const selectedMissionData = missionTemplates.find(
      (m) => m.id === selectedMission,
    )
    if (!selectedMissionData) return null

    const dates = calculateDates()
    if (!dates) return null

    return (
      <div className='flex-1 px-6 py-6 pb-24'>
        <h2 className='text-[22px] leading-[130%] text-[#2c2c2c] font-bold mb-[56px]'>
          이 미션을 누구에게 보낼거니?
        </h2>

        {renderProgressBar()}

        {/* 선택된 미션 카드 */}
        <div className='flex justify-center mb-11'>
          <div className='bg-white rounded-3xl [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] w-full pt-[18px] px-[24px] pb-8'>
            {/* 제목과 보상 영역 */}
            <div className='bg-[#E2EFFF] rounded-2xl py-[34px] mb-[17.63px] flex flex-col justify-center items-center text-[#404040]'>
              <p className='text-[16px] font-medium mb-2'>
                {selectedMissionData.title}
              </p>
              <p className='text-[18px] font-semibold'>{reward}</p>
            </div>

            {/* 구분선 */}
            <div className='border-b-1 border-[#000000] opacity-50 mb-3'></div>

            {/* 날짜 정보 */}
            <div className='flex-col text-[16px] mt-[24px] text-[#404040]'>
              <div className='flex justify-between mb-2'>
                <p className='text-gray-600'>시작일</p>
                <p className='font-medium'>{formatDate(dates.startDate)}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-gray-600'>완료일</p>
                <p className='font-medium'>{formatDate(dates.endDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 멤버 선택 영역 */}
        <div>
          <p className='text-[18px] font-medium text-gray-700 mb-2'>멤버</p>
          <div className='grid grid-cols-3 gap-4'>
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMemberToggle(member.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMembers.includes(member.id) ?
                    'border-[#6FAEFF] bg-[#E2EFFF]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className='text-3xl'>{member.avatar}</div>
                <p className='text-sm font-medium'>{member.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  //--------------------------------5페이지-----------------------------------------------

  const renderStep5 = () => {
    const selectedMemberNames = familyMembers
      .filter((member) => selectedMembers.includes(member.id))
      .map((member) => member.name)
      .join(', ')

    return (
      <div className='flex-1 px-6 py-6 pb-24'>
        <h2 className='text-xl font-bold mb-4'>
          하고 싶은 말과 함께<br></br>미션 제안서를 보내주렴.
        </h2>

        {renderProgressBar()}

        {/* 메시지 입력 영역 */}
        <div className='bg-white rounded-3xl shadow-lg h-[275px] pt-[18px] px-[24px] pb-8 flex flex-col items-center mx-auto'>
          {/* 선택된 멤버 아바타 */}
          <div className='flex gap-4 mb-10 mt-[33px] '>
            {familyMembers
              .filter((member) => selectedMembers.includes(member.id))
              .map((member) => (
                <div
                  key={member.id}
                  className='flex flex-col items-center'
                >
                  <div className='text-3xl mb-1'>{member.avatar}</div>
                  <p className='text-sm font-medium text-gray-700'>
                    {member.name}
                  </p>
                </div>
              ))}
          </div>

          <div className='relative w-full mt-11'>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='하고 싶은 말을 입력해주세요'
              disabled={noMessage}
              className='w-full px-1 py-2 border-b-2 border-gray-300 focus:border-[#6FAEFF] focus:outline-none disabled:bg-gray-50 disabled:text-gray-400'
            />
            <span className='absolute right-0 bottom-2 text-xs text-gray-400'>
              {message.length}
            </span>
          </div>
        </div>

        {/* 메세지 없음 옵션 */}
        <div className='flex items-center gap-2 mt-4'>
          <input
            type='checkbox'
            id='noMessage'
            checked={noMessage}
            onChange={(e) => {
              setNoMessage(e.target.checked)
              if (e.target.checked) {
                setMessage('')
              }
            }}
            className='appearance-none w-4 h-4 border-2 border-gray-300 rounded-full checked:bg-[#6FAEFF] focus:outline-none cursor-pointer'
          />
          <label
            htmlFor='noMessage'
            className='text-sm text-gray-700 cursor-pointer'
          >
            메세지 없음
          </label>
        </div>
      </div>
    )
  }
  //--------------------------

  return (
    <div className='flex flex-col'>
      {/* 헤더 영역 */}
      <div className='flex justify-between items-center h-[60px] px-6'>
        <button
          onClick={handleBack}
          className='text-[24px] text-[#2c2c2c] hover:opacity-70 transition-opacity'
          aria-label='뒤로가기'
        >
          <BackArrowIcon />
        </button>
        <p className='text-[18px] text-[#404040] font-semibold absolute left-1/2 -translate-x-1/2'>
          미션 만들기
        </p>
        {currentStep >= 3 ?
          <button
            onClick={handleCancel}
            className='text-sm text-gray-600 hover:text-gray-800 transition-colors'
          >
            취소
          </button>
        : <div className='w-[24px]'></div>}
      </div>

      {/* 단계별 콘텐츠 */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}

      {/* 다음 버튼 (플로팅) 로직구현필요 */}
      <button
        onClick={handleNext}
        disabled={
          (currentStep === 1 && !selectedMission) ||
          (currentStep === 3 && !reward.trim()) ||
          (currentStep === 4 && selectedMembers.length === 0) ||
          (currentStep === 5 && !message.trim() && !noMessage)
        }
        className={`h-[56px] px-13 py-3 mx-[20px] mb-[46px] rounded-2xl shadow-lg text-[18px] font-medium transition-all z-50 ${
          (
            (currentStep === 1 && !selectedMission) ||
            (currentStep === 3 && !reward.trim()) ||
            (currentStep === 4 && selectedMembers.length === 0) ||
            (currentStep === 5 && !message.trim() && !noMessage)
          ) ?
            'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#6FAEFF] hover:bg-[#5188FB] text-white'
        }`}
      >
        {currentStep === 5 ? '미션 만들기' : '다음'}
      </button>
    </div>
  )
}

export default Make
