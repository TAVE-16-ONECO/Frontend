import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import { BackArrowIcon } from '../components/icons/BackArrowIcon'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const Alarm = () => {
  const navigate = useNavigate()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
  })

  const handleBack = () => {
    navigate('/')
  }

  return (
    <>
      {/* 상단 바 */}
      <div className='w-full h-[30px] flex relative'>
        <div className='absolute left-4 top-1'>
          <button onClick={handleBack}>
            <BackArrowIcon color='#404040' />
          </button>
        </div>
        <p className='w-full text-center text-[18px] font-medium leading-[130%]'>
          알림
        </p>
      </div>
      {/* 오늘 받은 알림 */}
      <div className='mt-3'>
        <p className='text-[#2c2c2c] font-semibold ms-5'>오늘 받은 알림</p>
        <div className='mt-2'>
          <AlarmInfo
            label={'미션'}
            message={'첫째공주님이 미션 보상을 요청했어요.'}
            time={'16:41'}
            highlighted={true}
          />
          <AlarmInfo
            label={'미션'}
            message={'첫째공주님이 오늘 학습을 완료했어요.'}
            time={'13:03'}
            highlighted={true}
          />
        </div>
      </div>
      {/* 이전 알림 */}
      <div>
        <p className='text-[#2c2c2c] font-semibold ms-5 mt-6'>이전 알림</p>
        <div className='mt-2'>
          <AlarmInfo
            label={'미션'}
            message={'첫째공주님이 미션을 완료하지 못했어요.'}
            time={'11:49'}
            highlighted={true}
          />
          <AlarmInfo
            label={'미션'}
            message={'첫째공부님의 미션이 거절되었어요.'}
            time={'11:41'}
            highlighted={true}
          />
          <AlarmInfo
            label={'미션'}
            message={'첫째공부님이 미션 승인을 요청했어요.'}
            time={'11:41'}
          />
          <AlarmInfo
            label={'미션'}
            message={'첫째공부님이 오늘 학습을 완료했어요.'}
            time={'10:03'}
          />
        </div>
      </div>
    </>
  )
}

const AlarmInfo = ({
  profileImgLink,
  label,
  message,
  time,
  highlighted = false,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center px-[20px] py-[18px]',
        highlighted && 'bg-[#e2efff]',
      )}
    >
      {/* 프로필 사진 */}
      <div className='w-[44px] h-[44px] rounded-full bg-gray-200 flex-shrink-0'>
        {/* 프로필 플레이스 홀더 */}
      </div>
      {/* 알림 정보 */}
      <div className='flex-1'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col items-start ms-2'>
            <div className='w-[38px] h-[18px] bg-[#b2d6ff] px-1 py-0.5 rounded-2xl  text-center leading-[130%] text-[10px] text-[#595959] font-semibold'>
              {label}
            </div>
            <p className='mt-1 text-[12px] text-[#404040] font-semibold'>
              {message}
            </p>
          </div>
          <div className='w-[35px] text-center'>
            <p className='text-[#919191] text-[12px]'>{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Alarm
