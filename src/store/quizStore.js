import { create } from 'zustand'

export const useQuizStore = create((set, get) => ({
  quizLevel: 'keyword-explain',
  setQuizLevel: (level) => {
    set({ quizLevel: level })
  },
}))
