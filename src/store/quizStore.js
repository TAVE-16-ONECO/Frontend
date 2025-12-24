import { create } from 'zustand'

export const useQuizStore = create((set, get) => ({
  quizLevel: 'keyword-explain', // quizLevel 타입: keyword-explain / test / result
  setQuizLevel: (level) => {
    set({ quizLevel: level })
  },
}))
