import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      userData: null, // 유저 정보(ex 유저 이메일, 이름 등)
      role: null, // 부모/자녀 역할 정보
      isAuthenticated: false, // 로그인 여부
      hasMembers: false, // 구성원 존재 여부
      isNew: false,
      inviteCode: null,
      accessToken: null,
      refreshToken: null,
      onboardingToken: null,
      _hasHydrated: false, // Hydration 완료 여부 추적
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
      setInviteCode: (inviteCode) => {
        set({ inviteCode })
      },
      setHasHydrated: (status) => {
        set({ _hasHydrated: status })
      },
      logout: () => {
        set({
          userData: null,
          role: null,
          isAuthenticated: false,
          hasMembers: false,
          isNew: false,
          inviteCode: null,
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

      // Hydration callback - persist가 localStorage에서 데이터를 복원할 때 호출
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate auth store:', error)
        }
        // 성공이든 실패든 hydration 완료로 표시 (무한 로딩 방지)
        state?.setHasHydrated?.(true)
      },

      // _hasHydrated는 localStorage에 저장하지 않음 (항상 false로 시작)
      partialState: (state) => {
        const { _hasHydrated, ...rest } = state
        return rest
      },
    },
  ),
)
