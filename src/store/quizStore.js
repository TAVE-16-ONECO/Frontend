import { create } from 'zustand'

/* dailyContent 구성 요소
{
  "title": "실질소득",
  "bodyText": "실질소득은 물가(인플레이션)를 반영한 “구매력 기준 소득”이다.",
  "summary": "물가 반영 체감 소득(구매력 기준)",
  "keyword": "실질소득",
  "imageUrl": "https://example.com/images/moneyflow/01-real-income.png"
}
*/

export const useQuizStore = create((set) => ({
  studyRecordId: null,
  dailyContentId: null,
  dailyContent: null,
  daySequence: null,
  quizResultData: null,
  setStudyRecordId: (studyRecordId) => {
    set({ studyRecordId })
  },
  setDailyContentId: (dailyContentId) => {
    set({ dailyContentId })
  },
  setDailyContent: (dailyContent) => {
    set({ dailyContent })
  },
  updateDailyContentIdAndKeyword: (dailyContentId, keyword) => {
    set((state) => {
      const newDailyContent = { ...state.dailyContent, keyword }
      return { dailyContentId, dailyContent: newDailyContent }
    })
  },
  setDaySequence: (daySequence) => {
    set({ daySequence })
  },
  setQuizResultData: (quizResultData) => {
    set({ quizResultData })
  },
}))
