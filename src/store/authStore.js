import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      userData: null, // 유저 정보(ex 유저 이메일, 이름 등)
      role: null, // 부모/자녀 역할 정보
      isAuthenticated: true, // 로그인 여부
      hasMembers: false, // 구성원 존재 여부
      isNew: false,
      accessToken: null,
      refreshToken: null,
      onboardingToken: null,
      newUserLogin: (onboardingToken) => {
        set({ onboardingToken, isNew: true })
      },
      existUserLogin: (accessToken, refreshToken) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },
      setIsNew: (bool) => {
        set({
          isNew: bool,
          onboardingToken: bool ? get().onboardingToken : null,
        })
      },
      selectRole: (role) => {
        // 부모/자녀 선택
        set({ role })
      },
      fetchMemberStatus: async () => {
        // TODO: 백엔드 API 연결 후 구성원 존재 여부 조회
        // const response = await api.get('/members/status')
        // set({ hasMembers: response.data.hasMembers })

        // 임시: 기본값 false 유지
        set({ hasMembers: false })
      },
      logout: () => {
        set({
          userData: null,
          role: null,
          isAuthenticated: false,
          hasMembers: false,
          isNew: false,
          accessToken: null,
          refreshToken: null,
          onboardingToken: null,
        })
        get().persist.clearStorage() // localStorage에 저장된 유저 정보 제거
      },
    }),
    // TODO: 토큰 만료시 로그아웃 기능 추가
    {
      name: 'auth-storage', // 로컬 스토리지 저장 키
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
