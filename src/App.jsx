import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index.jsx'
import { useEffect } from 'react'
import { usePWAStore } from '@/store/pwaStore'
import { isIOS } from '@/utils/pwaHelpers'

const App = () => {
  const setDeferredPrompt = usePWAStore((state) => state.setDeferredPrompt)
  const setIsIOSPlatform = usePWAStore((state) => state.setIsIOSPlatform)

  useEffect(() => {
    // iOS 플랫폼 감지
    setIsIOSPlatform(isIOS())

    // beforeinstallprompt 이벤트 리스너
    const handleBeforeInstallPrompt = (e) => {
      // 하단에 PWA 설치 배너 차단
      e.preventDefault()
      // PWA 설치 이벤트 객체 전역 상태에 저장
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [setDeferredPrompt, setIsIOSPlatform])

  return <RouterProvider router={router} />
}

export default App
