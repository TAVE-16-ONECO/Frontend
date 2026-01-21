import { useRegisterSW } from 'virtual:pwa-register/react'
import { useEffect } from 'react'

function ReloadPrompt() {
  // useRegisterSW 훅을 사용하여 업데이트 상태를 관리
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  // 컴포넌트 마운트 시 이미 waiting 중인 SW가 있는지 체크
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          console.log('Found waiting SW on mount!')
          setNeedRefresh(true)
        }
      })
    }
  }, [setNeedRefresh])

  const close = () => {
    setNeedRefresh(false)
  }

  // 업데이트가 필요하지 않다면(false) 아무것도 렌더링하지 않음.
  if (!needRefresh) return null

  return (
    <div className='w-[300px] fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col gap-2'>
      <div className='flex flex-col'>
        <p className='font-bold text-gray-900'>업데이트 알림</p>
        <p className='text-sm text-gray-600 mt-1'>새로운 버전이 출시되었구나</p>
        <p className='text-sm text-gray-600'>
          최신 기능 쓰려면 새로고침을 눌러보렴
        </p>
      </div>

      <div className='flex gap-2 mt-2'>
        <button
          className='px-4 py-2 bg-[#5188fb] text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors w-full cursor-pointer'
          onClick={() => updateServiceWorker(true)}
        >
          새로고침
        </button>
        <button
          className='px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors w-full cursor-pointer'
          onClick={close}
        >
          나중에
        </button>
      </div>
    </div>
  )
}

export default ReloadPrompt
