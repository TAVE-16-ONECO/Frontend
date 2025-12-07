import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import PlusIcon from './icons/PlusIcon'

const MissionCreateCard = () => {
  const navigate = useNavigate()

  const hasMembers = useAuthStore((state) => state.hasMembers)

  const handleAddMember = () => {
    navigate('/my/members')
  }

  const handleCreateMission = () => {
    navigate('/mission/make')
  }
  return (
    <>
      {/* 미션 생성 카드 */}
      <button
        onClick={() => (hasMembers ? handleCreateMission() : handleAddMember())}
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
    </>
  )
}

export default MissionCreateCard
