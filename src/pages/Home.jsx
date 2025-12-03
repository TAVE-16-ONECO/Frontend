import { useNavigate } from 'react-router-dom'
import PlusIcon from '@/components/icons/PlusIcon'
import SpeechBubble from '@/components/SpeechBubble'
import { useUIOptionStore } from '../store/uiOptionStore'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'

const Home = () => {
  const navigate = useNavigate()
  const { setShowHeader, setShowNavigation } = useUIOptionStore()
  const { hasMembers } = useAuthStore()

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(true)
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handleAddMember = () => {
    navigate('/my/members')
  }

  const handleCreateMission = () => {
    navigate('/mission/make')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  return (
    <div className='flex flex-col min-h-screen bg-white px-6'>
      {/* 알림 아이콘 */}
      <div className='flex justify-end pt-4 pb-[10px]'>
        <button
          onClick={handleAlarmClick}
          className='p-2 hover:opacity-70 transition-opacity'
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

      {/* 프로필 및 인사말 섹션 */}
      <div className='flex items-start gap-[11px] mb-[46px]'>
        {/* 프로필 이미지 */}
        <div className='w-[134px] h-[134px] rounded-full bg-gray-200 flex-shrink-0'>
          {/* 프로필 이미지 플레이스홀더 */}
        </div>

        {/* 말풍선 */}
        <div className='relative mt-8'>
          <SpeechBubble className='w-full min-w-[200px] max-w-[220px]' />
          <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5/9 text-[16px] text-[#000000] font-medium leading-[130%] whitespace-nowrap text-center'>
            원코아, 이 힘난한 세상에
            <br />
            경제를 모르면 되겠니
          </p>
        </div>
      </div>

      {/* 나의 진행중인 미션 섹션 */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[16px] font-semibold text-[#000000]'>
            나의 진행중인 미션
          </h2>
          <button
            onClick={handleMissionStatus}
            className='text-[12px] text-[#000000] opacity-70 hover:text-[#2c2c2c] transition-colors'
          >
            미션현황 &gt;
          </button>
        </div>

        {/* 미션 생성 카드 */}
        <button
          onClick={() =>
            hasMembers ? handleCreateMission() : handleAddMember()
          }
          className='w-full h-[243px] bg-[#E2EFFF] rounded-3xl flex flex-col items-center justify-center gap-[6px] hover:bg-[#d0e5ff] transition-colors [box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]'
        >
          <PlusIcon
            className='w-[20px] h-[20px]'
            color='#5188fb'
          />
          <p className='text-[14px] text-[#000000] opacity-[36%]'>
            {hasMembers ?
              '새로운 미션을 만들어보세요'
            : '구성원을 추가하고 미션을 만들어보세요'}
          </p>
        </button>
      </div>
    </div>
  )
}

export default Home
