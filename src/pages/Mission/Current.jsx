import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'
import MissionCard from '@/components/Mission/MissionCard'
import RewardRequestModal from '@/components/Mission/RewardRequestModal'

const Current = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  // location.state에서 이전 탭 정보를 가져오거나, 없으면 'ongoing'을 기본값으로 사용
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'ongoing')
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)

  // 더미 데이터 - 나중에 API로 교체, 내용은 상의하고 어디까지 필터링할건지 의논해볼게 지금은 그냥 ongoing이랑 complet에 id로 묶어놨어
  const [ongoingMissions] = useState([
    {
      id: 1,
      title: '주식 시장 Part 1 마스터하기',
      status: '진행 중',
      reward: '10,000원',
      dueDate: '2026-01-20',
    },
    {
      id: 2,
      title: 'React 기초 강의 완강하기',
      status: '승인 요청',
      reward: '15,000원',
    },
    {
      id: 3,
      title: 'TypeScript 프로젝트 완성하기',
      status: '승인 수락',
      reward: '20,000원',
    },
    {
      id: 4,
      title: '알고리즘 문제 10개 풀기',
      status: '승인 거절',
      reward: '5,000원',
      dueDate: '2025-01-25',
    },
    {
      id: 5,
      title: 'UI/UX 디자인 기초 학습',
      status: '진행 중',
      reward: '12,000원',
      dueDate: '2025-01-25',
    },
    {
      id: 6,
      title: 'Git 협업 워크플로우 익히기',
      status: '진행 중',
      reward: '8,000원',
      dueDate: '2025-01-18',
    },
    {
      id: 7,
      title: 'REST API 설계 및 구현',
      status: '승인 요청',
      reward: '25,000원',
    },
  ])

  const [completedMissions] = useState([
    {
      id: 8,
      title: 'JavaScript 기초 완성하기',
      status: '보상완료',
      reward: '10,000원',
    },
    {
      id: 9,
      title: 'CSS Flexbox 마스터하기',
      status: '보상요청',
      reward: '7,000원',
    },
    {
      id: 10,
      title: 'Node.js 서버 구축하기',
      status: '보상완료',
      reward: '15,000원',
    },
    {
      id: 11,
      title: 'MongoDB 기초 학습',
      status: '미션실패',
      reward: '0원',
    },
    {
      id: 12,
      title: '데이터베이스 설계 이해하기',
      status: '미션완료',
      reward: '18,000원',
    },
  ])

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [setShowHeader, setShowNavigation])

  const handleBack = () => {
    navigate('/')
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
          <p className='absolute left-1/2 -translate-x-1/2'>미션현황</p>
          <div className='w-[24px]'></div>
        </div>
        {/*중간 내용 영역*/}
        <div className='mt-[38px] ml-[21px] font-bold'>
          <p>김원코의 미션현황</p>
          <p className='flex text-gray-400 text-[14px]'>보상 대기 중 N건</p>
        </div>
        {/*탭 영역*/}
        <div className='flex items-center justify-center gap-23 mt-[26px] font-bold border-b'>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`pb-2 px-4 transition-all ${
              activeTab === 'ongoing' ?
                'border-b-2 border-black text-black'
              : 'text-gray-400'
            }`}
          >
            진행중인 미션 N
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-2 px-4 transition-all ${
              activeTab === 'completed' ?
                'border-b-2 border-black text-black'
              : 'text-gray-400'
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
          onClick={() => {
            // 미션 만들기
          }}
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
