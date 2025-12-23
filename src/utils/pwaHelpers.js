// localStorage 키
const PWA_DISMISS_KEY = 'pwa-install-dismiss-date'

// iOS 플랫폼 감지
export const isIOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

// PWA 설치 여부 확인
export const isPWAInstalled = () => {
  // iOS standalone 모드
  if (window.navigator.standalone === true) {
    return true
  }

  // Android/Chrome display-mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  return false
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 오늘 이미 dismiss 했는지 확인
export const isTodayDismissed = () => {
  const dismissDate = localStorage.getItem(PWA_DISMISS_KEY)
  if (!dismissDate) return false

  const today = getTodayDate()
  return dismissDate === today
}

// 오늘 날짜를 dismiss 날짜로 저장
export const setDismissDate = () => {
  const today = getTodayDate()
  localStorage.setItem(PWA_DISMISS_KEY, today)
}

// PWA 모달을 표시해야 하는지 확인
export const shouldShowPWAModal = () => {
  if (isPWAInstalled()) return false
  if (isTodayDismissed()) return false
  return true
}
