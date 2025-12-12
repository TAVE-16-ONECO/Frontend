// 미션 상태별 스타일 설정
const getStatusStyle = (status) => {
  const styles = {
    미션실패: {
      cardBg: 'bg-gray-50',
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
    },
    보상완료: {
      cardBg: 'bg-[#E2EFFF]',
      bg: 'bg-[#B2D6FF]',
      text: 'text-black-600',
      border: 'border-[#E2EFFF]',
    },
    보상요청: {
      cardBg: 'bg-[#E2EFFF]',
      bg: 'bg-[#B2D6FF]',
      text: 'text-black-600',
      border: 'border-[#E2EFFF]',
    },
    미션완료: {
      cardBg: 'bg-[#E2EFFF]',
      bg: 'bg-[#B2D6FF]',
      text: 'text-black-600',
      border: 'border-[#E2EFFF]',
    },
    '진행 중': {
      cardBg: 'bg-[#E2EFFF]',
      bg: 'bg-[#B2D6FF]',
      text: 'text-black-600',
      border: 'border-[#E2EFFF]',
    },
    '승인 수락': {
      cardBg: 'bg-[#FFF4E0]',
      bg: 'bg-[#FFE0A9]',
      text: 'text-black-600',
      border: 'border-[#FFE0A9]',
    },
    '승인 거절': {
      cardBg: 'bg-[#FFF4E0]',
      bg: 'bg-[#FFE0A9]',
      text: 'text-black-600',
      border: 'border-[#FFE0A9]',
    },
    '승인 요청': {
      cardBg: 'bg-[#FFF4E0]',
      bg: 'bg-[#FFE0A9]',
      text: 'text-black-600',
      border: 'border-[#FFE0A9]',
    },
  }
  return styles[status] || styles['진행 중']
}

const MissionCard = ({ mission }) => {
  const statusStyle = getStatusStyle(mission.status)

  // 미션 종료까지 남은 일수 계산 (진행 중 상태일 때만)
  const getDaysRemaining = () => {
    if (!mission.dueDate || mission.status !== '진행 중') return null
    const today = new Date()
    const due = new Date(mission.dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining()

  return (
    <div
      className={`${statusStyle.cardBg} border ${statusStyle.border} rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* 상단: 상태 배지와 마감일 */}
      <div className='flex justify-between items-center mb-3'>
        <span
          className={`text-xs ${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full font-medium`}
        >
          {mission.status}
        </span>

        {daysRemaining !== null && (
          <span className='text-xs text-gray-500'>
            {daysRemaining > 0 ?
              `${daysRemaining}일 남음`
            : daysRemaining === 0 ?
              '오늘 마감'
            : '기한 초과'}
          </span>
        )}
      </div>

      {/* 중단: 미션 내용 */}
      <h3 className='font-bold text-base text-gray-800 mb-3'>
        {mission.title}
      </h3>

      {/* 하단: 보상 내용 */}
      {mission.reward && (
        <div className='flex items-center'>
          <span className='text-sm text-gray-600'></span>
          <span className='text-sm font-semibold text-black-600'>
            {mission.reward}
          </span>
        </div>
      )}
    </div>
  )
}

export default MissionCard
