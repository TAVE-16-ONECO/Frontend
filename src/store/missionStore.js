import { create } from 'zustand'

export const useMissionStore = create((set, get) => ({
  isMissionCreated: false,
  setIsMissionCreated: (bool) => {
    set({ isMissionCreated: bool })
  },
}))
