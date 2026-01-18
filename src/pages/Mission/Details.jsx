import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { useAuthStore } from '@/store/authStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'
import { Home } from '../../components/icons/Home'
import { missionAPI } from '../../api/mission'
import { membersAPI } from '../../api/members'
import { familyAPI } from '../../api/family'

// API 상태값을 한글로 변환
const getStatusLabel = (status) => {
  const statusMap = {
    APPROVAL_REQUEST: '승인 요청',
    APPROVAL_ACCEPTED: '승인 수락',
    APPROVAL_REJECTED: '승인 거절',
    IN_PROGRESS: '진행 중',
    MISSION_COMPLETED: '미션완료',
    REWARD_REQUESTED: '보상요청',
    REWARD_COMPLETED: '보상완료',
    MISSION_FAILED: '미션실패',
  }
  return statusMap[status] || status
}

const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const role = useAuthStore((state) => state.role)
  const [mission, setMission] = useState(null)
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setShowNavigation(false)

    const fetchData = async () => {
      try {
        setLoading(true)
        const missionResponse = await missionAPI.getMissionDetail(id)
        setMission(missionResponse.data)

        // 부모일 때는 가족 멤버에서 자녀 닉네임 가져오기
        if (role === 'PARENT') {
          const familyResponse = await familyAPI.getMembers()
          const members = familyResponse.data?.members || []
          // 자녀 멤버의 닉네임 사용 (첫 번째 자녀)
          const childMember = members.find((m) => m.role === 'CHILD')
          if (childMember?.nickname) {
            setNickname(childMember.nickname)
          }
        } else {
          // 자녀일 때는 본인 정보 가져오기
          const memberInfo = await membersAPI.getMemberInfo()
          if (memberInfo?.data?.nickname) {
            setNickname(memberInfo.data.nickname)
          }
        }
      } catch (error) {
        console.error('데이터 조회 실패:', error)
        setMission(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, role])

  const handleBack = () => {
    navigate(-1)
  }

  const home = () => {
    navigate('/')
  }

  const handleAcceptMission = async () => {
    try {
      await missionAPI.respondToMission(id, true)
      navigate(-1)
    } catch (err) {
      console.error('미션 수락 실패:', err)
      alert('미션 수락에 실패했습니다.')
    }
  }

  // 미션 상태에 따른 메시지 반환
  const getStatusMessage = (status) => {
    const name = nickname || '멤버'
    const messages = {
      APPROVAL_REQUEST: `${name}님이 새로운 미션 승인을 요청했어요`,
      APPROVAL_ACCEPTED: `${name}님의 미션 승인이 수락됐어요`,
      APPROVAL_REJECTED: `${name}님의 미션 승인이 거절되었어요`,
      IN_PROGRESS: `${name}님이 미션을 진행 중이에요`,
      MISSION_COMPLETED: `${name}님이 미션을 완료했어요`,
      REWARD_REQUESTED: `${name}님이 약속한 보상을 요청했어요`,
      REWARD_COMPLETED: `${name}님이 보상을 받았어요`,
      MISSION_FAILED: `${name}님이 미션에 실패했어요`,
    }
    return messages[status] || '미션 정보'
  }

  const statusLabel = mission ? getStatusLabel(mission.missionStatus) : ''

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-gray-400'>로딩 중...</p>
      </div>
    )
  }

  if (!mission) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-gray-400'>미션을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col relative'>
        {/* 헤더 영역 */}
        <div className='flex justify-between items-center h-[60px] px-6 w-full relative'>
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className='text-[24px] text-[#2c2c2c] hover:opacity-70 transition-opacity'
            aria-label='뒤로가기'
          >
            <BackArrowIcon />
          </button>
          <p className='text-[18px] font-semibold text-[#404040] absolute left-1/2 -translate-x-1/2'>
            미션 상세
          </p>
          <div className='w-[24px]'></div>
          <button
            onClick={home}
            className='text-[24px] text-[#2c2c2c] hover:opacity-70 transition-opacity'
            aria-label='홈으로 가기'
          >
            <Home />
          </button>
        </div>

        {/* 미션 상세 윗부분 */}
        <div className='mt-[38px] px-6 pb-24'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold mb-4'>
              {getStatusMessage(mission.missionStatus)}
            </h1>
            {/*상세 카드구역 */}
            <div className='flex flex-col items-center mt-20 pt-9 w-full gap-4 mb-10 border border-gray-200/50 rounded-2xl p-[5px] shadow-md hover:shadow-lg transition-shadow'>
              {/* Status 배지 - 상단 중앙 */}
              <div className='flex justify-center w-full pt-4'>
                <span
                  className={`text-sm px-4 py-2 rounded-full font-medium ${
                    statusLabel === '진행 중' ? 'bg-[#91C4FF] text-white'
                    : statusLabel === '보상완료' ? 'bg-[#91C4FF] text-white'
                    : statusLabel === '미션완료' ? 'bg-[#91C4FF] text-white'
                    : statusLabel === '보상 요청' ? 'bg-[#91C4FF] text-white'
                    : statusLabel === '승인 수락' ? 'bg-[#FFE0A9] text-black'
                    : statusLabel === '승인 거절' ? 'bg-[#FFE0A9] text-black'
                    : statusLabel === '보상요청' ? 'bg-[#FFE0A9] text-black'
                    : statusLabel === '승인 요청' ? 'bg-[#FFE0A9] text-black'
                    : statusLabel === '미션실패' ? 'bg-gray-100 text-gray-600'
                    : ''
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* 미션 제목 및 보상 */}
              <div className='flex flex-col items-center bg-[#E2EFFF] rounded-2xl p-6 mb-[34px] mt-[10px] ml-[24px] mr-[24px] w-full'>
                <p className='text-[#404040] mb-[23px]'>
                  {mission.categoryTitle}
                </p>
                <p className='text-2xl mb-[28px] text-[#404040] font-bold'>
                  {mission.rewardTitle}
                </p>
              </div>

              {/* 날짜 정보 - border-bottom 아래 */}
              <div className='w-full px-6 pb-6 border-t'>
                <div className='flex flex-col gap-2 mt-4'>
                  {mission.startDate && (
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600 font-medium'>
                        시작일
                      </span>
                      <span className='text-sm text-[#404040]'>
                        {mission.startDate}
                      </span>
                    </div>
                  )}
                  {mission.endDate && (
                    <div className='flex justify-between'>
                      <span className='text-sm text-[#404040] font-medium'>
                        완료 목표일
                      </span>
                      <span className='text-sm text-[#404040]'>
                        {mission.endDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 승인 거절된 미션일 때 플로팅 버튼 */}
      {mission.missionStatus === 'APPROVAL_REJECTED' && (
        <button
          className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6FAEFF] hover:bg-[#5188FB] text-white px-8 py-4 rounded-2xl shadow-lg transition-colors font-bold'
          onClick={() => {
            navigate('/mission/create')
          }}
        >
          + 미션만들기
        </button>
      )}

      {/* 승인 요청 미션일 때 수락하기 플로팅 버튼 */}
      {mission.missionStatus === 'APPROVAL_REQUEST' && (
        <button
          className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6FAEFF] hover:bg-[#5188FB] text-white px-8 py-4 rounded-2xl shadow-lg transition-colors font-bold'
          onClick={handleAcceptMission}
        >
          수락하기
        </button>
      )}
    </div>
  )
}

export default Details
