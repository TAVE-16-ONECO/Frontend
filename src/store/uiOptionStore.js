import { create } from 'zustand'

export const useUIOptionStore = create((set, get) => ({
  showNavigationBar: true,
  showHeader: true,
  setShowNavigation: (bool) => {
    set({ showNavigationBar: bool })
  },
  setShowHeader: (bool) => {
    set({ showHeader: bool })
  },
}))
