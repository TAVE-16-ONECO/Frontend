import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'
import MissionCard from '@/components/Mission/MissionCard'
import RewardRequestModal from '@/components/Mission/RewardRequestModal'

export const ongoingMissions = [
  {
    id: 1,
    title: '주식 시장 Part 1 마스터하기',
    status: '진행 중',
    reward: '10,000원',
    startDate: '2025-12-01',
    dueDate: '2026-01-20',
    autoCancelDate: '2026-01-27',
    description: '주식 시장의 기본 개념과 투자 전략을 학습하는 미션입니다.',
  },
  {
    id: 2,
    title: '은행 업무 이해하기',
    status: '승인 요청',
    reward: '15,000원',
    startDate: '2025-12-05',
    dueDate: '2025-12-31',
    autoCancelDate: '2026-01-07',
    description: '은행에서 할 수 있는 다양한 업무를 이해하는 미션입니다.',
  },
  {
    id: 3,
    title: '투자 포트폴리오 구성하기',
    status: '승인 수락',
    reward: '20,000원',
    startDate: '2025-12-10',
    dueDate: '2026-01-15',
    autoCancelDate: '2026-01-22',
    description:
      '투자 포트폴리오를 효과적으로 구성하는 방법을 배우는 미션입니다.',
  },
  {
    id: 4,
    title: '관세 이해하기',
    status: '승인 거절',
    reward: '5,000원',
    startDate: '2025-12-08',
    dueDate: '2025-01-25',
    autoCancelDate: '2026-02-01',
    description: '관세 개념을 이해하는 미션입니다.',
  },
  {
    id: 5,
    title: '경제인물 공부하기',
    status: '진행 중',
    reward: '12,000원',
    startDate: '2025-12-12',
    dueDate: '2025-01-25',
    autoCancelDate: '2026-02-01',
    description: '경제인 관련 인물들을 공부하는 미션입니다.',
  },
  {
    id: 6,
    title: '재테크 part1 이해하기',
    status: '진행 중',
    reward: '8,000원',
    startDate: '2025-12-15',
    dueDate: '2025-01-18',
    autoCancelDate: '2026-01-25',
    description: '재테크에 대해 이해하는 미션입니다.',
  },
  {
    id: 7,
    title: '적금이해하기',
    status: '승인 요청',
    reward: '25,000원',
    startDate: '2025-12-18',
    dueDate: '2026-01-30',
    autoCancelDate: '2026-02-06',
    description: '적금내용 을 이해하는 미션입니다.',
  },
]

export const completedMissions = [
  {
    id: 8,
    title: '저축 습관 들이기',
    status: '보상완료',
    reward: '10,000원',
    startDate: '2025-11-01',
    dueDate: '2025-11-30',
    autoCancelDate: '2025-12-07',
    description: '저축내용 기록하고 습관화하는 미션입니다.',
  },
  {
    id: 9,
    title: '비트코인 기초 이해하기',
    status: '보상요청',
    reward: '7,000원',
    startDate: '2025-11-05',
    dueDate: '2025-11-25',
    autoCancelDate: '2025-12-02',
    description: '비트코인 기초를 이해하는 미션입니다.',
  },
  {
    id: 10,
    title: '주식 시장 Part 3 마스터하기',
    status: '보상완료',
    reward: '15,000원',
    startDate: '2025-10-15',
    dueDate: '2025-11-15',
    autoCancelDate: '2025-11-22',
    description: '주식 시장의 기본 개념과 투자 전략을 학습하는 미션입니다.',
  },
  {
    id: 11,
    title: '화폐 가치 이해하기',
    status: '미션실패',
    reward: '0원',
    startDate: '2025-10-20',
    dueDate: '2025-11-10',
    autoCancelDate: '2025-11-17',
    description: '화폐가치를 이해하는 미션입니다.',
  },
  {
    id: 12,
    title: '인플레이션 이해하기',
    status: '미션완료',
    reward: '18,000원',
    startDate: '2025-10-01',
    dueDate: '2025-10-31',
    autoCancelDate: '2025-11-07',
    description: '인플레이션을 이해하는 미션입니다.',
  },
]

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

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [setShowHeader, setShowNavigation])

  const handleBack = () => {
    navigate(-1)
  }

  const handleMissionClick = (missionId) => {
    // 현재 activeTab 정보를 state로 전달
    navigate(`/mission/details/${missionId}`, { state: { activeTab } })
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
          <p>김원코의 미션현황</p>
          <p className='flex text-gray-400 text-[14px]'>
            보상 대기 중 {ongoingMissions.length}건
          </p>
        </div>
        {/*탭 영역*/}
        <div className='flex items-center justify-center gap-23 mt-[26px] font-bold border-b'>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`pb-2 px-4 transition-all border-b-2 ${
              activeTab === 'ongoing' ?
                'border-black text-black'
              : 'border-transparent text-gray-400'
            }`}
          >
            진행중인 미션 {ongoingMissions.length}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-2 px-4 transition-all border-b-2 ${
              activeTab === 'completed' ?
                'border-black text-black'
              : 'border-transparent text-gray-400'
            }`}
          >
            종료된 미션
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
