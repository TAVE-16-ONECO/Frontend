import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIOptionStore } from '../../store/uiOptionStore'
import PlusIcon from '../../components/icons/PlusIcon'
import { ongoingMissions } from '../Mission/Current'

const My = () => {
  const navigate = useNavigate()
  const [keywordAlarmEnabled, setKeywordAlarmEnabled] = useState(false)

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(true)
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handlePlusClick = () => {
    // 플러스 버튼 클릭 시 동작 (예: 미션 생성 등)
    console.log('플러스 버튼 클릭')
  }

  const handleMyActivity = () => {
    // 나의 활동 페이지로 이동
    console.log('나의 활동')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  const handleAccountInfo = () => {
    // 계정정보 페이지로 이동
    console.log('계정정보')
  }

  const handleCustomerService = () => {
    // 고객센터 페이지로 이동
    console.log('고객센터')
  }

  const handlePrivacyPolicy = () => {
    // 개인정보처리방침 페이지로 이동
    console.log('개인정보처리방침')
  }

  const toggleKeywordAlarm = () => {
    setKeywordAlarmEnabled(!keywordAlarmEnabled)
  }

  return (
    <div className='flex flex-col bg-white min-h-screen'>
      {/* ========== 상단 영역 ========== */}
      <div className='px-6'>
        <div className='flex items-center justify-center relative pt-4 pb-4'>
          <h1 className='text-[20px] font-bold text-[#2c2c2c]'>마이</h1>
          {/* 알람 아이콘 */}
          <button
            onClick={handleAlarmClick}
            className='absolute right-0 p-2 hover:opacity-70 transition-opacity'
            aria-label='알림'
          >
            <img
              src='/images/AlarmIcon.png'
              alt='alarm icon'
              width={16}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* ========== 중간 프로필 영역 ========== */}
      <div className='px-6 py-6 bg-[#f8f9fa]'>
        {/* 플러스 아이콘 */}
        <button
          onClick={handlePlusClick}
          className='p-2 hover:opacity-70 transition-opacity'
          aria-label='추가'
        >
          <PlusIcon
            className='w-[14px] h-[14]'
            color='#BABABA'
          />
        </button>
        <div className='flex items-center gap-5 justify-center mb-4'>
          {/* 멤버 연동 여부 카톡프사 영역 */}
          <div className='w-[60px] h-[60px] rounded-full bg-gray-200'>
            {/* 프로필 이미지 플레이스홀더 */}
          </div>
          {/*인원들 사이에 물방울표시*/}
          <div className='flex gap-[7px]'>
            <div className='w-[2px] h-[2px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[4px] h-[4px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[6px] h-[6px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[8px] h-[8px] rounded-full bg-[#E2EFFF]'></div>
          </div>
          <div className='w-[60px] h-[60px] rounded-full bg-gray-200'>
            {/* 프로필 이미지 플레이스홀더 */}
          </div>
        </div>

        {/* 나의 활동 & 미션현황 */}
        <div className='flex items-center justify-between'>
          <p>나의 활동 {ongoingMissions.length}개</p>
          <button
            className='w-[60px] h-[22px] text-[12px]'
            label='미션현황'
            onClick={handleMissionStatus}
          >
            미션현황 &gt;
          </button>
        </div>
        <div className='flex items-center justify-center mt-[25px] w-[353px] h-[104px]'>
          <div className='flex flex-col justify-center items-center border-2 w-[170px] h-[104px]'>
            <p className='mb-[21.5px]'>미션진행 중</p>
            {ongoingMissions.length}건
          </div>
          <div className='flex items-center justify-center mt-[25px] w-[170px] h-[104px]'>
            <p>지난 미션</p>
          </div>
        </div>
      </div>

      {/* ========== 메뉴 영역 ========== */}
      <div className='px-6 py-6 flex flex-col gap-1'>
        {/* 계정정보 */}
        <MenuItem
          label='계정정보'
          onClick={handleAccountInfo}
        />

        {/* 키워드 알림 (토글) */}
        <MenuItemWithToggle
          label='키워드 알림'
          enabled={keywordAlarmEnabled}
          onToggle={toggleKeywordAlarm}
        />

        {/* 구분선 */}
        <div className='h-[1px] bg-[#e5e5e5] my-4' />

        {/* 고객센터 */}
        <MenuItem
          label='고객센터'
          onClick={handleCustomerService}
        />

        {/* 개인정보처리방침 */}
        <MenuItem
          label='개인정보처리방침'
          onClick={handlePrivacyPolicy}
        />
      </div>
    </div>
  )
}

// 일반 메뉴 아이템 컴포넌트
const MenuItem = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex gap-[10px] items-center py-4 px-2 hover:bg-gray-50 transition-colors rounded-lg'
    >
      <span className='text-[16px] text-[#2c2c2c] font-medium'>{label}</span>
      <span className='text-[#919191] text-[14px]'>&gt;</span>
    </button>
  )
}

// 토글 스위치가 있는 메뉴 아이템 컴포넌트
const MenuItemWithToggle = ({ label, enabled, onToggle }) => {
  return (
    <div className='flex justify-between items-center py-4 px-2'>
      <span className='text-[16px] text-[#2c2c2c] font-medium'>{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-[#5188fb]' : 'bg-gray-300'
        }`}
        aria-label={`${label} ${enabled ? '켜기' : '끄기'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

export default My
