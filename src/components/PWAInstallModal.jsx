import { useEffect } from 'react'

const PWAInstallModal = ({
  isOpen,
  onClose,
  onInstall,
  onDismissToday,
  isIOS,
}) => {
  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black/50 z-50 flex items-end justify-center'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl w-[353px] px-[40px] pb-5 shadow-2xl mb-6'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 아이콘 영역 */}
        <div className='flex justify-center mt-8 mb-4'>
          <div className='w-[75px] h-[75px] bg-[#6FAEFF] rounded-2xl flex items-center justify-center p-3'>
            <img
              src='/pwa-512x512.png'
              alt='원코 앱 아이콘'
              className='w-full h-full object-contain'
            />
          </div>
        </div>

        {/* 안내 텍스트 */}
        <p className='text-center text-[18px] text-[#000000] font-medium leading-[150%] mb-4'>
          홈 화면에 원코 앱을 추가하고
          <br />
          원코를 더 빠르게 편하게 이용해보세요.
        </p>

        {/* iOS 안내 메시지 (조건부) */}
        {isIOS && (
          <div className='bg-blue-50 rounded-lg p-4 mb-4'>
            <p className='text-sm text-[#000000] leading-[150%]'>
              Safari에서 <span className='font-semibold'>공유 버튼</span>을 누른
              후
              <br />
              <span className='font-semibold'>"홈 화면에 추가"</span>를
              선택해주세요.
            </p>
          </div>
        )}

        {/* 설치 버튼 */}
        <button
          onClick={onInstall}
          className='w-full py-2 bg-[#6FAEFF] text-white rounded-2xl font-normal text-[16px] hover:bg-[#5188FB] transition-colors mb-4'
        >
          간편하게 원코 앱 추가하기
        </button>

        {/* 오늘은 그만 보기 링크 */}
        <button
          onClick={onDismissToday}
          className='w-full text-center text-[14px] text-[#000000] opacity-50 hover:opacity-100 transition-opacity'
        >
          오늘은 그만 볼게요.
        </button>
      </div>
    </div>
  )
}

export default PWAInstallModal
