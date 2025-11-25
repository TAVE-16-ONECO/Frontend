import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIOptionStore = create()(
  persist((set, get) => ({
    showNavigationBar: true,
    showHeader: true,
    setShowNavigation: (bool) => {
      set({ showNavigation: bool })
    },
    setShowHeader: (bool) => {
      set({ showHeader: bool })
    },
  })),
)
