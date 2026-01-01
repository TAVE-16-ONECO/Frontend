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

    const today = new Date()
    const endDate = new Date(today)

    // 주말을 제외하고 영업일만 카운트
    let daysAdded = 0
    let currentDate = new Date(today)

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
      startDate: today,
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

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
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

    // 다음 달의 날짜들 (총 42칸을 채우기 위해)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      })
    }

    return days
  }

  // 시작일부터 종료일까지의 연속된 캘린더 데이터 생성
  const getContinuousCalendarDays = (startDate, endDate) => {
    // 시작일이 속한 주의 일요일 찾기
    const firstDay = new Date(startDate)
    firstDay.setDate(firstDay.getDate() - firstDay.getDay())

    // 종료일이 속한 주의 토요일 찾기
    const lastDay = new Date(endDate)
    lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()))

    const days = []
    const currentDate = new Date(firstDay)

    // 첫날부터 마지막날까지 순회
    while (currentDate <= lastDay) {
      days.push({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        fullDate: new Date(currentDate),
      })
      currentDate.setDate(currentDate.getDate() + 1)
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

    const weekDays = ['일', '월', '화', '수', '목', '금', '토']

    // 시작일과 종료일의 월이 다른지 확인
    const startMonth = dates.startDate.getMonth()
    const startYear = dates.startDate.getFullYear()
    const endMonth = dates.endDate.getMonth()
    const endYear = dates.endDate.getFullYear()
    const isDifferentMonth = startYear !== endYear || startMonth !== endMonth

    // 캘린더 렌더링 함수 (border 없이)
    const renderCalendar = (year, month, isFirst = false, isLast = false) => {
      const calendarDays = getCalendarDays(year, month)

      return (
        <div key={`${year}-${month}`}>
          {/* 월 표시 */}
          <div className={`text-center ${isFirst ? 'mb-2' : 'my-4'}`}>
            <h3 className='text-base font-bold'>
              {year}년 {month + 1}월
            </h3>
          </div>

          {/* 날짜 그리드 */}
          <div className='grid grid-cols-7 gap-x-0 gap-y-3'>
            {calendarDays.map((day, index) => {
              // 첫 번째 캘린더면 다음 달 날짜 숨기기, 마지막 캘린더면 이전 달 날짜 숨기기
              const currentMonthLastDay = new Date(year, month + 1, 0)
              const currentMonthFirstDay = new Date(year, month, 1)

              const shouldHide =
                (isFirst && !isLast && day.fullDate > currentMonthLastDay) ||
                (isLast && !isFirst && day.fullDate < currentMonthFirstDay)

              const isStart = isSameDate(day.fullDate, dates.startDate)
              const isEnd = isSameDate(day.fullDate, dates.endDate)
              const isInRange = isDateInRange(
                day.fullDate,
                dates.startDate,
                dates.endDate,
              )
              // 요일 계산 일요일 0 ~ 토요일 6
              const dayOfWeek = index % 7
              const isFirstDayOfWeek = dayOfWeek === 0
              const isLastDayOfWeek = dayOfWeek === 6

              // 라운드 처리: 시작일과 완료일만
              let roundedClass = ''
              if (isStart && isEnd) {
                // 시작일과 완료일이 같은 경우
                roundedClass = 'rounded-2xl'
              } else if (isStart) {
                // 시작일
                roundedClass = 'rounded-l-full'
              } else if (isEnd) {
                // 완료일
                roundedClass = 'rounded-r-full'
              }

              // 숨겨진 날짜 처리
              if (shouldHide) {
                // 현재 주에 현재 월의 날짜가 포함되어 있는지 확인
                const weekStartIndex = Math.floor(index / 7) * 7
                const weekEndIndex = weekStartIndex + 7
                const currentWeek = calendarDays.slice(
                  weekStartIndex,
                  weekEndIndex,
                )
                const hasCurrentMonthInWeek = currentWeek.some(
                  (d) => d.isCurrentMonth,
                )

                // 현재 월의 날짜가 포함된 주에만 배경색 표시
                if (isInRange && hasCurrentMonthInWeek) {
                  return (
                    <div
                      key={index}
                      className={`aspect-square ${`bg-[#B2D6FF] ${roundedClass}`}`}
                    ></div>
                  )
                }
                // 현재 월의 날짜가 없는 주의 빈칸을 채우기
                return (
                  <div
                    key={index}
                    className='aspect-square'
                  ></div>
                )
              }

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm relative
                    ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}
                    ${isInRange ? `bg-[#B2D6FF] ${roundedClass}` : ''}
                  `}
                >
                  {isStart || isEnd ?
                    <div className='w-10 h-10 rounded-full bg-[#5188FB] flex items-center justify-center relative z-10'>
                      <span className='relative z-10 text-white font-bold'>
                        {day.date}
                      </span>
                    </div>
                  : <span className='relative z-10'>{day.date}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div className='flex-1 px-6 py-6 pb-24'>
        <h2 className='text-[22px] leading-[130%] text-[#2c2c2c] font-bold mb-4'>
          {dates.durationDays}일치 목표를 골랐구나.<br></br>미션 완료일은{' '}
          {formatDate(dates.endDate)}이란다.{' '}
        </h2>

        {renderProgressBar()}

        {/* 날짜 정보 요약 */}
        <div className='mb-6 p-4 bg-[#F0F7FF] rounded-xl'>
          <div className='flex justify-between items-center text-sm'>
            <div>
              <p className='text-gray-600 text-xs mb-1'>시작일</p>
              <p className='font-bold'>{formatDate(dates.startDate)}</p>
            </div>
            <div className='text-center'>
              <p className='text-gray-600 text-xs mb-1'>기간</p>
              <p className='font-bold text-[#6FAEFF]'>{dates.durationDays}일</p>
            </div>
            <div className='text-right'>
              <p className='text-gray-600 text-xs mb-1'>완료일</p>
              <p className='font-bold'>{formatDate(dates.endDate)}</p>
            </div>
          </div>
        </div>

        {/* 캘린더 컨테이너 - 하나의 박스로 */}
        <div className='bg-[#E2EFFF] rounded-2xl border-2 border-[#6FAEFF] p-4'>
          {/* 요일 헤더 */}
          <div className='grid grid-cols-7 gap-1 mb-2'>
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-center text-xs font-bold py-2 ${
                  index === 0 ? 'text-red-500'
                  : index === 6 ? 'text-blue-500'
                  : 'text-gray-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 캘린더들 */}
          {isDifferentMonth ?
            <>
              {renderCalendar(startYear, startMonth, true, false)}
              {renderCalendar(endYear, endMonth, false, true)}
            </>
          : renderCalendar(startYear, startMonth, true, true)}
        </div>

        {/* 범례 */}
        <div className='mt-4 flex gap-4 justify-center text-xs'>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-[#5188FB] rounded-full'></div>
            <span className='text-gray-600'>시작/완료일</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-[#B2D6FF] rounded'></div>
            <span className='text-gray-600'>미션 기간</span>
          </div>
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
