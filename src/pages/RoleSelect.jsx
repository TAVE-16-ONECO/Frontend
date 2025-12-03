import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useAuthStore } from '@/store/authStore'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { BackArrowIcon } from '../components/icons/BackArrowIcon'

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()
  const { selectRole } = useAuthStore()
  const { setShowHeader, setShowNavigation } = useUIOptionStore()

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
    return () => {
      setShowNavigation(true)
    }
  }, [])

  const handleBack = () => {
    navigate('/login')
  }

  const handleNext = () => {
    if (selectedRole) {
      selectRole(selectedRole)
      navigate('/')
    }
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  return (
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

        {/* 취소 버튼 */}
        <button
          onClick={handleBack}
          className='text-[14px] text-[#2c2c2c] hover:opacity-70 transition-opacity'
        >
          취소
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className='flex flex-col flex-1 px-6'>
        {/* 타이틀 섹션 */}
        <div className='mt-[36px] mb-[43px] leading-[130%]'>
          <h1 className='text-[22px] text-[#2c2c2c] mb-[16px] font-bold'>
            부모 <span className='text-[#5188fb]'>vs</span> 자녀
          </h1>
          <p className='text-[16px] text-[#919191]'>
            원코에서의 역할을 선택해 주세요
          </p>
        </div>

        {/* 역할 선택 카드 */}
        <div className='flex gap-[15px] justify-center mb-[42px]'>
          {/* 부모 카드 */}
          <button
            onClick={() => handleRoleSelect('parent')}
            className={clsx(
              'w-full max-w-[200px] h-[180px] rounded-2xl flex flex-col items-center justify-center gap-[20px] transition-all',
              '[box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]',
              selectedRole === 'parent' ?
                'border-2 border-[#b2d6ff] bg-[#E2EFFF]'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
            )}
            aria-selected={selectedRole === 'parent'}
          >
            {/* 아이콘 플레이스홀더 */}
            <div className='w-[85px] h-[85px] rounded-full bg-gray-200'></div>
            <span className='text-[18px] text-[#2c2c2c] font-semibold'>
              부모
            </span>
          </button>

          {/* 자녀 카드 */}
          <button
            onClick={() => handleRoleSelect('child')}
            className={clsx(
              'w-full max-w-[200px] h-[180px] rounded-2xl flex flex-col items-center justify-center gap-[20px] transition-all',
              '[box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)]',
              selectedRole === 'child' ?
                'border-2 border-[#b2d6ff] bg-[#E2EFFF]'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
            )}
            aria-selected={selectedRole === 'child'}
          >
            {/* 아이콘 플레이스홀더 */}
            <div className='w-[85px] h-[85px] rounded-full bg-gray-200'></div>
            <span className='text-[18px] text-[#2c2c2c] font-semibold'>
              자녀
            </span>
          </button>
        </div>

        {/* 안내 메시지 */}
        {selectedRole ?
          <div className='mb-[42px] flex flex-col gap-[19px] text-[#919191]'>
            <div className='flex items-start gap-2'>
              <span className='text-[12px]'>•</span>
              {selectedRole === 'parent' ?
                <p className='text-[16px]'>보상을 줄 수 있어요.</p>
              : <p className='text-[16px]'>보상을 받을 수 있어요.</p>}
            </div>
            <div className='flex items-start gap-2'>
              <span className='text-[12px]'>•</span>
              {selectedRole === 'parent' ?
                <p className='text-[16px]'>
                  내 아이의 금융지식 학습 활동을 공유 받아 함께 볼 수 있어요.
                </p>
              : <p className='text-[16px]'>
                  금융지식을 하루에 하나씩 학습할 수 있어요.
                </p>
              }
            </div>
          </div>
        : null}

        {/* 정보 박스 */}
        <div className='h-[90px] mb-[60px] bg-[#f4f4f4] rounded-2xl p-4 flex justify-center items-center text-[16px] font-medium text-[#919191] leading-[130%]'>
          <div>
            <p>이용방법을 정한 후 변경을 원하시면 </p>
            <p>
              <span className='text-[#4A90E2] font-semibold'>
                회원 해지 후 다시 가입{' '}
              </span>
              <span>해야 합니다.</span>
            </p>
          </div>
        </div>
        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          disabled={!selectedRole}
          className={clsx(
            'w-full h-[56px] rounded-xl text-[16px] font-medium transition-colors [box-shadow:0px_4px_0px_0px_rgba(0,0,0,0.25)]',
            selectedRole ?
              'bg-[#6FAEFF] text-white hover:bg-[#5188fb]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          )}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default RoleSelect
