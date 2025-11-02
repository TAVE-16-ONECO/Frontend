import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      userData: null, // 유저 정보(ex 유저 이메일, 이름 등)
      authToken: null, // jwt 토큰값
      isAuthenticated: false,
      login: (userData, authToken) => {
        set({
          userData,
          authToken,
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({
          userData: null,
          authToken: null,
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
