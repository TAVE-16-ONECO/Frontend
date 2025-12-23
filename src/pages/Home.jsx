import { useNavigate } from 'react-router-dom'
import SpeechBubble from '@/components/SpeechBubble'
import { useUIOptionStore } from '../store/uiOptionStore'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'
import { useMissionStore } from '../store/missionStore'
import MissionCard from '../components/MissionCard'
import MissionCreateCard from '../components/MissionCreateCard'
import PWAInstallModal from '@/components/PWAInstallModal'
import { usePWAInstall } from '@/hooks/usePWAInstall'

const Home = () => {
  const navigate = useNavigate()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const role = useAuthStore((state) => state.role)
  const isMissionCreated = useMissionStore((state) => state.isMissionCreated)

  // PWA 설치 훅 사용
  const {
    showModal,
    isIOSPlatform,
    handleInstall,
    handleDismissToday,
    handleClose,
  } = usePWAInstall()

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(true)
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  return (
    <>
      <div className='flex flex-col bg-white px-6'>
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

        {/* 아빠 이미지 및 인사말 섹션 */}
        <div className='flex items-start gap-[11px] mb-[46px]'>
          {/* 아빠 이미지 */}
          <div className='w-[134px] h-[134px] rounded-full bg-gray-200 flex-shrink-0'>
            {/* 아빠 이미지 플레이스홀더 */}
          </div>

          {/* 말풍선 */}
          <div className='relative mt-8'>
            <SpeechBubble className='w-full min-w-[180px] max-w-[220px]' />
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5/9 text-[16px] text-[#000000] font-medium leading-[130%] whitespace-nowrap text-center'>
              얘야, 이 험난한 세상에
              <br />
              경제를 모르면 되겠니
            </p>
          </div>
        </div>

        {/* 나의 진행중인 미션 섹션 */}
        <div className='mb-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-[16px] font-semibold text-[#000000]'>
              {role === 'parent' ?
                '내 아이의 진행중인 미션'
              : '나의 진행중인 미션'}
            </h2>
            <button
              onClick={handleMissionStatus}
              className='text-[12px] text-[#000000] opacity-70 hover:text-[#2c2c2c] transition-colors'
            >
              미션현황 &gt;
            </button>
          </div>
          {isMissionCreated ?
            <MissionCard />
          : <MissionCreateCard />}
        </div>
      </div>

      {/* PWA 설치 모달 */}
      <PWAInstallModal
        isOpen={showModal}
        onClose={handleClose}
        onInstall={handleInstall}
        onDismissToday={handleDismissToday}
        isIOS={isIOSPlatform}
      />
    </>
  )
}

export default Home
