import { create } from 'zustand'

export const useQuizStore = create((set, get) => ({
  isStudyCompleted: false,
  setIsStudyCompleted: (bool) => {
    set({ isStudyCompleted: bool })
  },
}))
