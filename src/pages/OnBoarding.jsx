import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useUIOptionStore } from '../store/uiOptionStore'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const onBoardingData = {
  child: [
    {
      image: '/images/MainCharacter-peaceful.png',
      title: '약속은 함께 정하는 거야',
      description:
        '얘야, 경제 공부도 약속이 있어야 힘이 나지.\n이번 주에 배울 키워드와 기간을 아빠와 함께 정해보자.',
    },
    {
      image: '/images/ShellGroup.png',
      title: '하루에 하나, 아빠가 설명해줄게',
      description:
        '평일마다 아빠가 경제 이야기를 들려줄게.\n키워드 하나 배우고, 퀴즈 3문제만 풀면 오늘은 끝!\n출석 조개를 하나씩 모아보렴.',
    },
    {
      image: '/images/Coin.png',
      title: '약속을 지키면, 보상이 따라온단다',
      description:
        '약속한 기간 동안 빠짐없이 공부하고\n퀴즈 진행률이 80%를 넘기면, 미션 성공!\n그때 보상을 당당하게 요청해도 된단다.',
    },
  ],
  parent: [
    {
      image: '/images/MainCharacter-peaceful.png',
      title: '경제 공부의 시작은 ‘약속’이에요',
      description:
        '아이에게 학습 미션을 제안하거나\n아이가 제안한 학습 미션을 함께 조율해보세요.',
    },
    {
      image: '/images/Coin.png',
      title: '보상은 공부를 이어가게 하는 힘이에요',
      description:
        '작은 보상으로도 아이가 경제 학습을 지속하게\n만드는 동기가 될 수 있어요.',
    },
    {
      image: '/images/StudyFeed.png',
      title: '아이의 학습을 한눈에 볼 수 있어요',
      description:
        '아이가 어떤 키워드를 배웠는지에 대한 학습 현황을\n학습피드에서 바로 확인할 수 있어요.',
    },
  ],
}

const OnBoarding = () => {
  const navigate = useNavigate()

  const role = useAuthStore((state) => state.role)
  const [pageIndex, setPageIndex] = useState(0) // 온보딩 설명 인덱스
  const [swiperInstance, setSwiperInstance] = useState(null)

  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowNavigation(false)
  }, [setShowNavigation])

  const handleNextClick = () => {
    // 마지막 설명 페이지에서 다음 클릭 시 홈으로 이동
    if (pageIndex === 2) {
      navigate('/')
      return
    }
    // Swiper 인스턴스를 통해 다음 슬라이드로 이동
    if (swiperInstance) {
      swiperInstance.slideNext()
    }
  }

  // 건너뛰기 버튼 클릭시 홈으로 바로 이동
  const handlePassBtnClick = () => {
    navigate('/')
  }

  const handleIndexPointClick = (movePageIndexTo) => {
    if (swiperInstance) {
      swiperInstance.slideTo(movePageIndexTo, 500)
      setPageIndex(movePageIndexTo)
    }
  }

  return (
    <div className='flex flex-col'>
      {/* 건너뛰기 버튼 */}
      <div className='flex justify-end'>
        <button
          className='text-[14px] font-medium leading-[130%] text-[#2C2C2C] mr-[25px]'
          onClick={handlePassBtnClick}
        >
          건너뛰기
        </button>
      </div>

      {/* Swiper 컨테이너 */}
      <div className='flex flex-col'>
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setPageIndex(swiper.activeIndex)}
          className='w-full'
          allowTouchMove={true}
        >
          {onBoardingData[role].map((data, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className='flex flex-col'>
                  {/* 메인 이미지 */}
                  <div className='mt-[90px] flex justify-center mr-3'>
                    <img
                      className='h-[140px]'
                      src={data.image}
                      alt='메인 설명 이미지'
                    />
                  </div>

                  {/* 설명 타이틀 */}
                  <div className='text-center font-bold text-[22px] text-[#2c2c2c] leading-[130%] mt-[50px]'>
                    {data.title}
                  </div>

                  {/* 설명 내용 */}
                  <div className='mt-[45px] text-[15.5px] font-medium leading-[150%] text-[#717171] px-[27px] whitespace-pre-line text-center'>
                    {data.description}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* 인덱스 바 */}
        <div className='mt-[60px] flex justify-center gap-[18px]'>
          {Array(3)
            .fill(0)
            .map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={clsx(
                    'h-[10px] rounded-2xl transition-all duration-500 ease-in-out',
                    pageIndex === idx ?
                      'w-[20px] bg-[#5188fb]'
                    : ' w-[10px] bg-[#d9d9d9]',
                  )}
                  onClick={() => handleIndexPointClick(idx)}
                ></div>
              )
            })}
        </div>

        {/* 다음 버튼 */}
        <div className='w-full px-[20px] mt-[60px] pb-[40px]'>
          <button
            className='w-full h-[56px] bg-[#6FAEFF] text-white rounded-2xl text-center hover:bg-[#378dfd]'
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnBoarding
