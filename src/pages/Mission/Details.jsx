import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'

const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const [mission, setMission] = useState(null)

  //id(아이디), title(미션 제목), status(미션상태),
  //reward(미션보상), startDate(시작날짜), dueDate(마감날짜),
  //autoCancelDate(자동취소날짜), description(미션설명)

  const allMissions = [
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
  const [completedMissions] = useState([
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
  ])

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)

    // URL 파라미터로부터 받은 ID로 미션 정보 찾기
    // 진행중인 미션과 종료된 미션 모두에서 검색
    const allMissionsData = [...allMissions, ...completedMissions]
    const foundMission = allMissionsData.find((m) => m.id === parseInt(id))
    setMission(foundMission)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [id, setShowHeader, setShowNavigation])

  const handleBack = () => {
    // 이전 페이지에서 받은 activeTab 정보를 다시 전달
    // navigate('/mission/current', {
    //   state: { activeTab: location.state?.activeTab },
    // })
    navigate(-1)
  }

  // 미션 상태에 따른 메시지 반환
  const getStatusMessage = (status) => {
    const messages = {
      '진행 중': '김원코님이 미션을 진행 중이에요',
      '승인 요청': '김원코님이 새로운 미션 승인을 요청했어요',
      '승인 수락': '김원코님의 미션 승인이 수락됐어요',
      '승인 거절': '김원코님의 미션 승인이 거절되었어요',
      '보상 요청': '김원코님이 약속한 보상을 요청했어요',
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
        </div>

        {/* 미션 상세 윗부분 */}
        <div className='mt-[38px] px-6 pb-24'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold mb-4'>
              {getStatusMessage(mission.status)}
            </h1>
            {/*상세 카드구역 */}
            <div className='flex flex-col items-center mt-20 pt-9 w-full gap-4 mb-10 border border-gray-200/50 rounded-2xl p-[5px] shadow-md hover:shadow-lg transition-shadow'>
              {/* Status 배지 - 상단 중앙 */}
              <div className='flex justify-center w-full pt-4'>
                <span
                  className={`text-sm px-4 py-2 rounded-full font-medium ${
                    mission.status === '진행 중' ? 'bg-blue-100 text-blue-600'
                    : mission.status === '승인 요청' ? 'bg-[#FFE0A9] text-black'
                    : mission.status === '승인 수락' ?
                      'bg-green-100 text-green-600'
                    : mission.status === '승인 거절' ? 'bg-red-100 text-red-600'
                    : mission.status === '보상완료' ?
                      'bg-green-100 text-green-600'
                    : mission.status === '보상요청' ?
                      'bg-yellow-100 text-yellow-600'
                    : mission.status === '미션실패' ? 'bg-red-100 text-red-600'
                    : mission.status === '미션완료' ?
                      'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {mission.status}
                </span>
              </div>

              {/* 미션 제목 및 보상 */}
              <div className='flex flex-col items-center bg-[#E2EFFF] rounded-2xl p-6 mb-[34px] mt-[10px] ml-[24px] mr-[24px] w-full'>
                <p className='text-gray-700'>{mission.title}</p>
                <p className='text-2xl font-bold'>{mission.reward}</p>
              </div>

              {/* 날짜 정보 - border-bottom 아래 */}
              <div className='w-full px-6 pb-6 border-t'>
                <div className='flex flex-col gap-2 mt-4'>
                  {mission.startDate && (
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600 font-medium'>
                        시작일
                      </span>
                      <span className='text-sm text-gray-500'>
                        {mission.startDate}
                      </span>
                    </div>
                  )}
                  {mission.dueDate && (
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600 font-medium'>
                        만료목표일
                      </span>
                      <span className='text-sm text-gray-500'>
                        {mission.dueDate}
                      </span>
                    </div>
                  )}
                  {mission.autoCancelDate && (
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600 font-medium'>
                        자동취소일
                      </span>
                      <span className='text-sm text-gray-500'>
                        {mission.autoCancelDate}
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
      {mission.status === '승인 거절' && (
        <button
          className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6FAEFF] hover:bg-[#5188FB] text-white px-8 py-4 rounded-2xl shadow-lg transition-colors font-bold'
          onClick={() => {
            // 미션 만들기
            navigate('/mission/create')
          }}
        >
          + 미션만들기
        </button>
      )}
    </div>
  )
}

export default Details
