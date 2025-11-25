import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      userData: null, // 유저 정보(ex 유저 이메일, 이름 등)
      authToken: null, // jwt 토큰값
      role: null, // 부모/자녀 역할 정보
      isAuthenticated: false, // 로그인 여부
      login: (userData, authToken) => {
        set({
          userData,
          authToken,
          isAuthenticated: true,
        })
      },
      selectRole: (role) => {
        // 부모/자녀 선택
        set({ role })
      },
      logout: () => {
        set({
          userData: null,
          authToken: null,
          role: null,
          isAuthenticated: false,
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
