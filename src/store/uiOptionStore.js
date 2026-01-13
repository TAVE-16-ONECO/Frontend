import { create } from 'zustand'

export const useUIOptionStore = create((set, get) => ({
  showNavigationBar: false,
  isMonthView: false,
  setShowNavigation: (bool) => {
    set({ showNavigationBar: bool })
  },
  setIsMonthView: (bool) => {
    set({ isMonthView: bool })
  },
}))
