import { useNavigate } from 'react-router-dom'
import SpeechBubble from '@/components/SpeechBubble'
import { useUIOptionStore } from '../store/uiOptionStore'
import { useAuthStore } from '../store/authStore'
import { useEffect, useState } from 'react'
import { useMissionStore } from '../store/missionStore'
import MissionCard from '../components/MissionCard'
import MissionCreateCard from '../components/MissionCreateCard'
import PWAInstallModal from '@/components/PWAInstallModal'
import { usePWAInstall } from '@/hooks/usePWAInstall'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import apiClient from '../api/client'
import { FadeLoader } from 'react-spinners'

const Home = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(null)

  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const role = useAuthStore((state) => state.role)
  const isMissionCreated = useMissionStore((state) => state.isMissionCreated)
  const [activeMissionIndex, setActiveMissionIndex] = useState(0)
  const inviteCode = useAuthStore((state) => state.inviteCode)
  const setHasMembers = useAuthStore((state) => state.setHasMembers)
  const setUserData = useAuthStore((state) => state.setUserData)
  const selectRole = useAuthStore((state) => state.selectRole)
  const setIsMissionCreated = useMissionStore(
    (state) => state.setIsMissionCreated,
  )
  const setMissionIds = useMissionStore((state) => state.setMissionIds)
  const missionIds = useMissionStore((state) => state.missionIds)
  const missionDataList = useMissionStore((state) => state.missionDataList)
  const addMissionDataAtIndex = useMissionStore(
    (state) => state.addMissionDataAtIndex,
  )
  // PWA 설치 훅 사용
  const {
    showModal,
    isIOSPlatform,
    handleInstall,
    handleDismissToday,
    handleClose,
  } = usePWAInstall()

  useEffect(() => {
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

  // 홈 화면 첫 진입 시 UI 결정에 필요한 데이터 로드
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // 개인 정보 조회
        const userDataResponse = await apiClient.get('/api/members/info')
        const userData = userDataResponse.data.data
        console.log('사용자 정보 불러오는 API 실행 성공')
        setUserData(userData)
        selectRole(userData.familyRole.toLowerCase()) // CHILD or PARENT

        // 가족 정보 조회
        const familyResponse = await apiClient.get('/api/family/exists')
        const hasFamily = familyResponse.data.data.hasFamilyRelation // true or false
        console.log('가족 정보 불러오는 API 실행 성공')
        if (!hasFamily) {
          setLoading(false)
          return // 가족이 없으면 미션 조회 불필요
        }
        setHasMembers(true)

        // 미션 정보 조회
        const missionListResponse = await apiClient.get(
          '/api/home/missions/active',
        )
        const missionListData = missionListResponse.data.data
        // 만약 미션이 존재하면 미션 정보 업데이트
        if (missionListData.missionCount > 0) {
          // 모든 미션 정보 한 번에 불러오기
          const missionPromises = missionListData.activeMissionIds.map(
            (missionId) =>
              apiClient.get(`/api/home/dashboard?missionId=${missionId}`),
          )

          const missionResponses = await Promise.all(missionPromises)

          // 원본 데이터를 그대로 저장
          missionResponses.forEach((response, index) => {
            addMissionDataAtIndex(index, response.data.data)
          })

          setMissionIds(missionListData.activeMissionIds)
          setIsMissionCreated(true)
        } else {
          setIsMissionCreated(false)
        }
        console.log('미션 정보 조회하는 API 실행 성공')

        // 모든 API 정상적으로 실행 완료 후 로딩 종료
        setLoading(false)
      } catch (e) {
        setHasError(true)
        setLoading(false)
      }
    }
    loadHomeData()
  }, [])

  const handleAlarmClick = () => {
    navigate('/alarm')
  }

  const handleMissionStatus = () => {
    navigate('/mission/current')
  }

  // Swiper 슬라이드 변경 시 인덱스 업데이트
  const handleSlideChange = (swiper) => {
    setActiveMissionIndex(swiper.activeIndex)
  }

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center h-full'>
        <FadeLoader
          aria-label='Loading Spinner'
          cssOverride={{ left: '25px' }}
        />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className='flex flex-col justify-center items-center mt-5'>
        <p className='text-red-500 text-xl'>사용자 정보를 불러오는 도중</p>
        <p className='text-red-500 text-xl'>에러가 발생했습니다</p>
        <button
          className='bg-gray-500 rounded-2xl p-2 text-white mt-3'
          onClick={() => window.location.reload()}
        >
          한 번 더 시도하기
        </button>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col bg-white'>
        {/* 알림 아이콘 */}
        <div className='flex justify-end pb-[10px] px-6'>
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
          <div className='w-[115px] h-[139px] flex-shrink-0'>
            <img
              src={
                isMissionCreated ?
                  '/images/MainCharacter-sensitive.png'
                : '/images/MainCharacter-peaceful.png'
              }
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
              className={'flex items-center gap-2'}
              style={{ paddingLeft: 'calc((100% - 100% / 1.13) / 2 + 16px)' }}
            >
              <h2 className='text-[16px] font-semibold text-[#000000]'>
                {role === 'parent' ? '내 아이의 진행중인 미션' : '나의 미션'}
              </h2>
              {/* 페이지네이션 인디케이터 */}
              {isMissionCreated && missionIds && missionIds.length > 1 && (
                <div className='flex gap-1'>
                  {missionIds.map((_, index) => (
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
            missionIds && missionIds.length === 1 ?
              missionDataList[0] && (
                <div className='px-6'>
                  <MissionCard
                    mission={missionDataList[0]}
                    index={0}
                  />
                </div>
              )
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
                onSlideChange={handleSlideChange}
              >
                {missionIds &&
                  missionIds.map((missionId, index) => (
                    <SwiperSlide key={missionId}>
                      {missionDataList[index] && (
                        <MissionCard
                          mission={missionDataList[index]}
                          index={index}
                        />
                      )}
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
