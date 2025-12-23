import { useState, useEffect, useCallback } from 'react'
import { isIOS, setDismissDate, shouldShowPWAModal } from '@/utils/pwaHelpers'

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isIOSPlatform, setIsIOSPlatform] = useState(false)

  // 초기 설정: 플랫폼 감지 및 조건 확인
  useEffect(() => {
    setIsIOSPlatform(isIOS())

    // 모달 표시 조건 확인
    if (!shouldShowPWAModal()) {
      return
    }

    // iOS인 경우 즉시 모달 표시
    if (isIOS()) {
      setShowModal(true)
    }
  }, [])

  // beforeinstallprompt 이벤트 리스너 등록
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)

      // 조건 확인 후 모달 표시
      if (shouldShowPWAModal()) {
        setShowModal(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  // 설치 버튼 클릭 핸들러
  const handleInstall = useCallback(async () => {
    // iOS는 프로그래밍적으로 설치 불가능
    if (isIOSPlatform) {
      return
    }

    if (!deferredPrompt) {
      return
    }

    // 네이티브 설치 프롬프트 표시
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    console.log(`PWA install outcome: ${outcome}`)

    // 프롬프트는 한 번만 사용 가능
    setDeferredPrompt(null)
    setShowModal(false)
  }, [deferredPrompt, isIOSPlatform])

  // "오늘은 그만 보기" 클릭 핸들러
  const handleDismissToday = useCallback(() => {
    setDismissDate()
    setShowModal(false)
  }, [])

  // 모달 닫기 핸들러 (배경 클릭)
  const handleClose = useCallback(() => {
    setShowModal(false)
  }, [])

  return {
    showModal,
    isIOSPlatform,
    handleInstall,
    handleDismissToday,
    handleClose,
  }
}
