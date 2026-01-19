import apiClient from './client'

export const studyRecordsAPI = {
  /**
   * 공부 기록 히스토리 조회 (커서 기반 페이지네이션)
   * @param {Object} params
   * @param {number} params.size - 페이지 크기 (기본값: 20)
   * @param {'ALL' | 'BOOKMARKED'} params.viewMode - 조회 모드 (기본값: 'ALL')
   * @param {number | null} params.lastStudyRecordId - 커서: 마지막 학습 기록 ID (첫 페이지면 null)
   * @param {string | null} params.lastSubmittedDate - 커서: 마지막 제출일자 yyyy-MM-dd (첫 페이지면 null)
   * @param {number | null} params.childId - 부모가 자녀 기록 조회 시 사용 (자녀 계정이면 null)
   */
  getHistory: async ({
    size = 20,
    viewMode = 'ALL',
    lastStudyRecordId = null,
    lastSubmittedDate = null,
    childId = null,
  } = {}) => {
    try {
      const params = { size, viewMode }

      // 커서 파라미터 (첫 페이지가 아닌 경우에만 전송)
      if (lastStudyRecordId !== null) {
        params.lastStudyRecordId = lastStudyRecordId
      }
      if (lastSubmittedDate !== null) {
        params.lastSubmittedDate = lastSubmittedDate
      }

      // 부모 계정이 자녀 조회 시
      if (childId !== null) {
        params.childId = childId
      }

      const response = await apiClient.get('/api/study-records/history', {
        params,
      })
      return response.data
    } catch (error) {
      console.error('공부 기록 히스토리 조회 API 에러:', error)
      throw error
    }
  },

  /**
   * 북마크 토글
   * @param {number} studyRecordId - 학습 기록 ID (필수)
   * @param {boolean} isBookmarked - 북마크 여부
   */
  toggleBookmark: async (studyRecordId, isBookmarked) => {
    try {
      const response = await apiClient.patch(
        `/api/study-records/${studyRecordId}/bookmark`,
        { isBookmarked },
      )
      return response.data
    } catch (error) {
      console.error('북마크 토글 API 에러:', error)
      throw error
    }
  },
}
