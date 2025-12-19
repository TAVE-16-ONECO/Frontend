import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'

const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const [mission, setMission] = useState(null)

  // 더미 데이터 - 실제로는 API를 통해 미션 정보를 가져와야 합니다
  const allMissions = [
    {
      id: 1,
      title: '주식 시장 Part 1 마스터하기',
      status: '진행 중',
      reward: '10,000원',
      dueDate: '2026-01-20',
      description: '주식 시장의 기본 개념과 투자 전략을 학습하는 미션입니다.',
    },
    {
      id: 2,
      title: 'React 기초 강의 완강하기',
      status: '승인 요청',
      reward: '15,000원',
      description: 'React의 기초부터 중급까지 강의를 완강하는 미션입니다.',
    },
    {
      id: 3,
      title: 'TypeScript 프로젝트 완성하기',
      status: '승인 수락',
      reward: '20,000원',
      description: 'TypeScript를 사용한 프로젝트를 완성하는 미션입니다.',
    },
    {
      id: 4,
      title: '알고리즘 문제 10개 풀기',
      status: '승인 거절',
      reward: '5,000원',
      dueDate: '2025-01-25',
      description: '알고리즘 문제를 풀어 실력을 향상시키는 미션입니다.',
    },
    {
      id: 5,
      title: 'UI/UX 디자인 기초 학습',
      status: '진행 중',
      reward: '12,000원',
      dueDate: '2025-01-25',
      description: 'UI/UX 디자인의 기본 원칙을 학습하는 미션입니다.',
    },
    {
      id: 6,
      title: 'Git 협업 워크플로우 익히기',
      status: '진행 중',
      reward: '8,000원',
      dueDate: '2025-01-18',
      description: 'Git을 사용한 효율적인 협업 방법을 익히는 미션입니다.',
    },
    {
      id: 7,
      title: 'REST API 설계 및 구현',
      status: '승인 요청',
      reward: '25,000원',
      description: 'RESTful API를 설계하고 구현하는 미션입니다.',
    },
  ]

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    // URL 파라미터로부터 받은 ID로 미션 정보 찾기
    const foundMission = allMissions.find((m) => m.id === parseInt(id))
    setMission(foundMission)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [id, setShowHeader, setShowNavigation])

  const handleBack = () => {
    navigate('/mission/current')
  }

  // 미션 상태에 따른 메시지 반환
  const getStatusMessage = (status) => {
    const messages = {
      '진행 중': '김원코님이 미션을 진행 중이에요',
      '승인 요청': '김원코님이 새로운 미션 승인 요청을 보냈어요',
      '승인 수락': '미션 승인 수락됨',
      '승인 거절': '미션 승인이 거절되었어요',
      '보상 요청': '김원코님이 보상요청을 보냈어요',
      보상완료: '김원코님이 보상을 받았어요',
      미션실패: '김원코님이 미션에 실패했어요',
      미션완료: '김원코님이 미션을 완료했어요',
    }
    return messages[mission.status] || '미션 정보'
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
          <p className='absolute left-1/2 -translate-x-1/2'>미션 상세</p>
          <div className='w-[24px]'></div>
        </div>

        {/* 미션 상세 내용 */}
        <div className='mt-[38px] px-6 pb-24'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold mb-4'>
              {
                <h1 className='text-2xl font-bold mb-4'>
                  {getStatusMessage(mission.status)}
                </h1>
              }
            </h1>
            {/*상세 카드구역 */}
            <div className='flex-col items-center mt-30 gap-4 mb-10 border-1 rounded-2xl p-[5px] hover:shadow-md transition-shadow'>
              <span
                className={`flex text-sm px-4 py-2 w-fit rounded-full font-medium ${
                  mission.status === '진행 중' ? 'bg-blue-100 text-blue-600'
                  : mission.status === '승인 요청' ? 'bg-[#FFE0A9] text-black'
                  : mission.status === '승인 수락' ? 'bg-[#FFE0A9] text-black'
                  : mission.status === '승인 거절' ? 'bg-[#FFE0A9] text-black'
                  : 'bg-red-100 text-red-600'
                }`}
              >
                {mission.status}
              </span>

              <div className='flex flex-col items-center bg-[#E2EFFF] rounded-lg p-6 mb-[34px] mt-[20px] ml-[24px] mr-[24px]'>
                <p className='text-gray-700'>{mission.title} </p>
                <p className='text-2xl font-bold text-blue-600'>
                  {mission.reward}
                </p>
              </div>

              <div className='p-6 border-t-2'>
                {mission.dueDate && (
                  <span className='text-sm text-gray-500'>
                    마감일: {mission.dueDate}
                  </span>
                )}

                {mission.dueDate && (
                  <span className='text-sm text-gray-500'>
                    마감일: {mission.dueDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
