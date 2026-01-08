import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'
import MissionCard from '@/components/Mission/MissionCard'
import RewardRequestModal from '@/components/Mission/RewardRequestModal'
import { missionAPI } from '../../api/mission'
import { membersAPI } from '../../api/members'

const Current = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  // location.state에서 이전 탭 정보를 가져오거나, 없으면 'ongoing'을 기본값으로 사용
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'ongoing',
  )
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)
  const [ongoingMissions, setOngoingMissions] = useState([])
  const [completedMissions, setCompletedMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [setShowHeader, setShowNavigation])

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true)
        setError(null)

        const [ongoingData, finishedData, memberInfo] = await Promise.all([
          missionAPI.getOngoingMissions(5, 5),
          missionAPI.getFinishedMissions(5, 5),
          membersAPI.getMemberInfo(),
        ])

        console.log('진행 중인 미션 데이터:', ongoingData)
        console.log('종료된 미션 데이터:', finishedData)
        console.log('회원 정보:', memberInfo)

        // API 응답이 배열인지 확인하고, 아니면 빈 배열로 설정
        setOngoingMissions(Array.isArray(ongoingData) ? ongoingData : [])
        setCompletedMissions(Array.isArray(finishedData) ? finishedData : [])

        // nickname 설정
        if (memberInfo?.data?.nickname) {
          setNickname(memberInfo.data.nickname)
        }
      } catch (err) {
        console.error('미션 데이터 로딩 실패:', err)
        setError('미션 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchMissions()
  }, [])

  const handleBack = () => {
    navigate(-1)
  }

  const handleMissionClick = (missionId) => {
    // 현재 activeTab 정보를 state로 전달
    navigate(`/mission/details/${missionId}`, { state: { activeTab } })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500'>미션 데이터를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <p className='text-red-500'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='px-6 py-2 bg-[#6FAEFF] text-white rounded-lg hover:bg-[#5188FB]'
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col'>
        {/* 헤더 영역 */}
        <div className='flex justify-between items-center h-[60px] px-6'>
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className='text-[24px] text-[#2c2c2c] hover:opacity-70 transition-opacity'
            aria-label='뒤로가기'
          >
            <BackArrowIcon />
          </button>
          <p className='text-[18px] font-semibold text-[#404040] absolute left-1/2 -translate-x-1/2'>
            미션현황
          </p>
          <div className='w-[24px]'></div>
        </div>
        {/*중간 내용 영역*/}
        <div className='mt-[38px] ml-[21px] font-bold'>
          <p>{nickname}의 미션현황</p>
          <p className='flex text-gray-400 text-[14px]'>
            보상 대기 중 {ongoingMissions.length}건
          </p>
        </div>
        {/*탭 영역*/}
        <div className='flex items-center justify-center gap-12 mt-[26px] font-bold border-b'>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`pb-2 px-4 transition-all border-b-2 min-w-[140px] ${
              activeTab === 'ongoing' ?
                'border-black text-black'
              : 'border-transparent text-gray-400'
            }`}
          >
            진행중인 미션 {ongoingMissions.length}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-2 px-4 transition-all border-b-2 min-w-[140px] ${
              activeTab === 'completed' ?
                'border-black text-black'
              : 'border-transparent text-gray-400'
            }`}
          >
            종료된 미션 {completedMissions.length}
          </button>
        </div>

        {/*내용 영역*/}
        <div className='mt-[26px] px-6 pb-24'>
          {activeTab === 'ongoing' ?
            <div>
              {/* 진행중인 미션 목록 */}
              {ongoingMissions.length > 0 ?
                ongoingMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onClick={handleMissionClick}
                  />
                ))
              : <p className='text-gray-400 text-center py-8'>
                  진행중인 미션이 없습니다.
                </p>
              }
            </div>
          : <div>
              {/* 종료된 미션 목록 */}
              {completedMissions.length > 0 ?
                completedMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onClick={handleMissionClick}
                  />
                ))
              : <p className='text-gray-400 text-center py-8'>
                  종료된 미션이 없습니다.
                </p>
              }
            </div>
          }
        </div>
      </div>

      {/* 플로팅 버튼 */}
      {activeTab === 'ongoing' ?
        <button
          className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6FAEFF] hover:bg-[#5188FB] text-white px-8 py-4 rounded-2xl shadow-lg transition-colors font-bold'
          onClick={() => navigate('/mission/make')}
        >
          + 미션만들기
        </button>
      : <button
          className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6FAEFF] text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-[#5188FB] transition-colors font-bold'
          onClick={() => setIsRewardModalOpen(true)}
        >
          보상요청하기
        </button>
      }

      {/* 보상 요청 모달 */}
      <RewardRequestModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        completedMissions={completedMissions}
      />
    </div>
  )
}

export default Current
