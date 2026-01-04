import { useNavigate } from 'react-router-dom'
import SpeechBubble from '@/components/SpeechBubble'
import { useUIOptionStore } from '../store/uiOptionStore'
import { useAuthStore } from '../store/authStore'
import { useEffect, useState } from 'react'
import { useMissionStore } from '../store/missionStore'
import MissionCard, { missionMockData } from '../components/MissionCard'
import MissionCreateCard from '../components/MissionCreateCard'
import PWAInstallModal from '@/components/PWAInstallModal'
import { usePWAInstall } from '@/hooks/usePWAInstall'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import apiClient from '../api/client'

const Home = () => {
  const navigate = useNavigate()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const role = useAuthStore((state) => state.role)
  const isMissionCreated = useMissionStore((state) => state.isMissionCreated)
  const [activeMissionIndex, setActiveMissionIndex] = useState(0)
  const inviteCode = useAuthStore((state) => state.inviteCode)
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

  // 초대 코드가 저장되어 있다면 초대 수락 api 실행
  useEffect(() => {
    const acceptInvite = async () => {
      if (!inviteCode) return
      try {
        const response = await apiClient.post(
          '/api/family/invitations/accept',
          {
            code: inviteCode,
          },
        )
        console.log('초대 수락 성공')
      } catch (e) {
        console.log('초대 링크 수락 중 에러 발생', e)
      }
    }
    acceptInvite()
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  return (
    <>
      <div className='flex flex-col bg-white'>
        {/* 알림 아이콘 */}
        <div className='flex justify-end pt-4 pb-[10px] px-6'>
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
        <div className='flex items-start gap-[11px] mb-[46px] px-6'>
          {/* 아빠 이미지 */}
          <div className='w-[134px] h-[134px] flex-shrink-0'>
            <img
              src='/images/MainCharacter.png'
              alt='메인 캐릭터'
            />
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
            <div
              className='flex items-center gap-2'
              style={{ paddingLeft: 'calc((100% - 100% / 1.13) / 2 + 24px)' }}
            >
              <h2 className='text-[16px] font-semibold text-[#000000]'>
                {role === 'parent' ?
                  '내 아이의 진행중인 미션'
                : '나의 진행중인 미션'}
              </h2>
              {/* 페이지네이션 인디케이터 */}
              {isMissionCreated && missionMockData.length > 1 && (
                <div className='flex gap-1'>
                  {missionMockData.map((_, index) => (
                    <div
                      key={index}
                      className={`w-[6px] h-[6px] rounded-full transition-colors ${
                        index === activeMissionIndex ? 'bg-[#919191]' : (
                          'bg-[#d9d9d9]'
                        )
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleMissionStatus}
              className='text-[12px] text-[#000000] opacity-70 hover:text-[#2c2c2c] transition-colors pr-6'
            >
              미션현황 &gt;
            </button>
          </div>
          {isMissionCreated ?
            missionMockData.length === 1 ?
              <MissionCard
                mission={missionMockData[0]}
                index={0}
              />
            : <Swiper
                spaceBetween={13}
                slidesPerView={1.13}
                centeredSlides={true}
                slideToClickedSlide={true}
                threshold={10}
                longSwipesRatio={0.3}
                longSwipes={true}
                resistance={true}
                resistanceRatio={0.5}
                speed={300}
                keyboard={false}
                onSlideChange={(swiper) =>
                  setActiveMissionIndex(swiper.activeIndex)
                }
              >
                {missionMockData.map((mission, index) => (
                  <SwiperSlide key={index}>
                    <MissionCard
                      mission={mission}
                      index={index}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

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
