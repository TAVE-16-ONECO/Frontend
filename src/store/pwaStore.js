import { create } from 'zustand'

export const usePWAStore = create((set) => ({
  deferredPrompt: null,
  isIOSPlatform: false,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
  setIsIOSPlatform: (isIOS) => set({ isIOSPlatform: isIOS }),
}))
