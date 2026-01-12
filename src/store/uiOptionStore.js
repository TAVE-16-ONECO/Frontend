import { create } from 'zustand'

export const useUIOptionStore = create((set, get) => ({
  showNavigationBar: false,
  showHeader: false,
  isMonthView: false,
  setShowNavigation: (bool) => {
    set({ showNavigationBar: bool })
  },
  setShowHeader: (bool) => {
    set({ showHeader: bool })
  },
  setIsMonthView: (bool) => {
    set({ isMonthView: bool })
  },
}))
