import { useState, useEffect, useCallback } from 'react'
import { setDismissDate, shouldShowPWAModal } from '@/utils/pwaHelpers'
import { usePWAStore } from '@/store/pwaStore'

export const usePWAInstall = () => {
  const deferredPrompt = usePWAStore((state) => state.deferredPrompt)
  const isIOSPlatform = usePWAStore((state) => state.isIOSPlatform)
  const setDeferredPrompt = usePWAStore((state) => state.setDeferredPrompt)

  const [showModal, setShowModal] = useState(false)

  // Home 마운트 시 모달 표시 여부 결정
  useEffect(() => {
    if (!shouldShowPWAModal()) {
      return
    }

    // iOS이거나, deferredPrompt가 있으면 모달 표시
    if (isIOSPlatform || deferredPrompt) {
      setShowModal(true)
    }
  }, [isIOSPlatform, deferredPrompt])

  // 설치 버튼 클릭 핸들러
  const handleInstall = useCallback(async () => {
    // iOS는 프로그래밍적으로 설치 불가능
    if (isIOSPlatform || !deferredPrompt) {
      return
    }

    // 네이티브 설치 프롬프트 표시
    deferredPrompt.prompt()

    // 프롬프트는 한 번만 사용 가능
    setDeferredPrompt(null)
    setShowModal(false)
  }, [deferredPrompt, isIOSPlatform, setDeferredPrompt])

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
