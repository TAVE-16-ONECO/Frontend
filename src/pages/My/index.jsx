import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIOptionStore } from '../../store/uiOptionStore'
import PlusIcon from '../../components/icons/PlusIcon'
import { missionAPI } from '../../api/mission'
import { membersAPI } from '../../api/members'
import { familyAPI } from '../../api/family'

const My = () => {
  const navigate = useNavigate()
  const [keywordAlarmEnabled, setKeywordAlarmEnabled] = useState(false)
  const [ongoingMissions, setOngoingMissions] = useState([])
  const [completedMissions, setCompletedMissions] = useState([])
  const [memberInfo, setMemberInfo] = useState(null)
  const [familyprofile, setfamilyprofile] = useState(null)

  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowNavigation(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await membersAPI.getMemberInfo()

        const [ongoingData, finishedData, familyData] = await Promise.all([
          missionAPI.getOngoingMissions(),
          missionAPI.getFinishedMissions(),
          familyAPI.getMembers(),
        ])

        setMemberInfo(memberData)
        setOngoingMissions(Array.isArray(ongoingData) ? ongoingData : [])
        setCompletedMissions(Array.isArray(finishedData) ? finishedData : [])

        // 가족 멤버 중 첫번째 멤버의 프로필 이미지 설정
        const members = familyData?.data?.members || []
        if (members.length > 0) {
          setfamilyprofile(members[0])
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err)
      }
    }

    fetchData()
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handlePlusClick = () => {
    navigate('/my/members')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  const handleAccountInfo = () => {
    // TODO: 계정정보 페이지로 이동
  }

  const handleCustomerService = () => {
    // TODO: 고객센터 페이지로 이동
  }

  const handlePrivacyPolicy = () => {
    // TODO: 개인정보처리방침 페이지로 이동
  }

  const toggleKeywordAlarm = () => {
    setKeywordAlarmEnabled(!keywordAlarmEnabled)
  }

  return (
    <div className='flex flex-col bg-white'>
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
      <div className='px-6 py-6'>
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
          {/* 본인 카톡프사 영역 */}
          <div className='w-[80px] h-[80px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center'>
            {memberInfo?.data?.profileImageUrl ?
              <img
                src={memberInfo.data.profileImageUrl}
                alt='프로필 이미지'
                className='w-full h-full object-cover'
                onError={(e) => {
                  console.error(
                    '이미지 로드 실패:',
                    memberInfo.data.profileImageUrl,
                  )
                  e.target.style.display = 'none'
                }}
              />
            : <div className='w-full h-full bg-gray-200' />}
          </div>
          {/*인원들 사이에 물방울표시*/}
          <div className='flex gap-[7px]'>
            <div className='w-[2px] h-[2px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[4px] h-[4px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[6px] h-[6px] rounded-full bg-[#E2EFFF]'></div>
            <div className='w-[8px] h-[8px] rounded-full bg-[#E2EFFF]'></div>
          </div>
          {/* 두번째 멤버 프로필 이미지 영역 */}
          <div className='w-[80px] h-[80px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center'>
            {familyprofile?.profileImageUrl ?
              <img
                src={familyprofile.profileImageUrl}
                alt='프로필 이미지'
                className='w-full h-full object-cover'
                onError={(e) => {
                  console.error(
                    '이미지 로드 실패:',
                    familyprofile.profileImageUrl,
                  )
                  e.target.style.display = 'none'
                }}
              />
            : <div className='w-full h-full bg-gray-200' />}
          </div>
        </div>
      </div>

      {/* ========== 나의 활동 & 미션현황 영역 ========== */}
      <div className='px-5'>
        {/* 나의 활동 & 미션현황 */}
        <div className='flex items-center justify-between mt-[44.95px]'>
          <p>나의 활동 {ongoingMissions.length}개</p>
          <button
            className='w-[60px] h-[22px] text-[12px]'
            label='미션현황'
            onClick={handleMissionStatus}
          >
            미션현황 &gt;
          </button>
        </div>
        <div className='flex items-center justify-between gap-[13px] mt-[25px] h-[104px] font-bold'>
          <div className='flex flex-col justify-center items-center border-2 rounded-3xl border-gray-100 shadow flex-1 h-[104px]'>
            <p className='mb-[21.5px]'>미션진행 중</p>
            <p className='text-[#919191]'>{ongoingMissions.length}건</p>
          </div>
          <div className='flex flex-col justify-center items-center border-2 rounded-3xl border-gray-100 shadow flex-1 h-[104px]'>
            <p className='mb-[21.5px]'>지난 미션</p>
            <p className='text-[#919191]'>{completedMissions.length}건</p>
          </div>
        </div>
      </div>

      {/* ========== 메뉴 영역 ========== */}
      <div className='px-5 py-6 flex flex-col gap-[13px]'>
        {/* 계정정보 */}
        <button
          onClick={handleAccountInfo}
          className='flex flex-col h-[80px] rounded-lg overflow-hidden border-gray-100 border-1 shadow'
        >
          {/* 위 3/5 - 회색 배경 */}
          <div className='w-full h-3/5 bg-[#EDEDED] flex px-[10px] items-center gap-2'>
            <p className='text-[14px] text-[#2c2c2c] font-medium text-left'>
              계정 정보
            </p>
            <div className='bg-[#FDEE4B] rounded-full inline-flex px-3 py-1 text-[8px] '>
              카카오 로그인
            </div>
          </div>
          {/* 아래 2/5 - 하얀색 배경 */}
          <div className='h-2/5 bg-white flex items-center px-[10px]'>
            <p className='text-[10px] text-[#2c2c2c]'>
              아이디 {memberInfo?.data?.email || '이메일이 연동되지 않았습니다'}
            </p>
          </div>
        </button>

        {/* 키워드 알림 (토글) */}
        <MenuItemWithToggle
          label='키워드 알림'
          enabled={keywordAlarmEnabled}
          onToggle={toggleKeywordAlarm}
        />

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
      className='flex gap-[10px] bg-[#EDEDED] items-center py-4 px-2 hover:bg-gray-50 transition-colors rounded-lg border-gray-100 border-1 shadow'
    >
      <span className='text-[14px] text-[black] font-medium'>{label}</span>
      <span className='text-[#919191] text-[14px]'>&gt;</span>
    </button>
  )
}

// 토글 스위치가 있는 메뉴 아이템 컴포넌트
const MenuItemWithToggle = ({ label, enabled, onToggle }) => {
  return (
    <div className='flex gap-[10px] bg-[#EDEDED] items-center py-4 px-2 rounded-lg border-gray-100 border-1 shadow'>
      <span className='text-[14px] text-[black] font-medium'>{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-[14px] w-[34px] items-center rounded-full transition-colors shadow-inner ${
          enabled ? 'bg-[#6FAEFF]' : 'bg-gray-300'
        }`}
        aria-label={`${label} ${enabled ? '켜기' : '끄기'}`}
      >
        <span
          className={`inline-block h-[11px] w-[11px] transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-[22px]' : 'translate-x-[2px]'
          }`}
        />
      </button>
    </div>
  )
}

export default My
