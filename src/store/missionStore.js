import { create } from 'zustand'

export const useMissionStore = create((set, get) => ({
  isMissionCreated: false,
  missionIds: null,
  missionDataList: [],
  setIsMissionCreated: (bool) => {
    set({ isMissionCreated: bool })
  },
  setMissionIds: (missionIds) => {
    set({ missionIds })
  },
  addMissionData: (missionData) => {
    set((state) => ({
      missionDataList: [...state.missionDataList, missionData],
    }))
  },
  addMissionDataAtIndex: (index, missionData) => {
    set((state) => {
      const newList = [...state.missionDataList]
      newList[index] = missionData
      return { missionDataList: newList }
    })
  },
}))
