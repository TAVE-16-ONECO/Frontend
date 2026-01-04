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
          <div className='w-[75px] h-[75px] rounded-2xl flex items-center justify-center'>
            <img
              src='/pwa-512x512.png'
              alt='원코 앱 아이콘'
              className='w-full h-full object-contain rounded-2xl'
            />
          </div>
        </div>

        {/* 안내 텍스트 */}
        <p className='text-center text-[18px] text-[#000000] font-medium leading-[150%] mb-4'>
          홈 화면에 원코 앱을 추가해서
          <br />
          원코를 더 빠르고 편하게 이용해보세요.
        </p>

        {/* iOS 안내 메시지 (조건부) */}
        {isIOS && (
          <div className='bg-blue-50 rounded-lg p-4 mb-4 flex flex-col justify-center items-center'>
            <div>
              <span className='font-semibold inline-flex items-center gap-1'>
                공유 버튼 (
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='inline-block'
                >
                  <path d='M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z' />
                </svg>
                )
              </span>
              을 누른 후
            </div>
            <div>
              <span className='font-semibold'>"홈 화면에 추가"</span>를
              선택해주세요.
            </div>
          </div>
        )}

        {/* 설치 버튼 */}
        {!isIOS && (
          <button
            onClick={onInstall}
            className='w-full py-2 bg-[#6FAEFF] text-white rounded-2xl font-normal text-[16px] hover:bg-[#5188FB] transition-colors mb-4'
          >
            간편하게 원코 앱 추가하기
          </button>
        )}

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
