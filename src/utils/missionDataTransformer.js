const calculateRemainingDays = (endDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  const diffTime = end - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

const calculateStudyDay = (dateList) => {
  // dateList에서 IN_PROGRESS 상태의 인덱스를 찾아 반환 (1부터 시작)
  const inProgressIndex = dateList.findIndex(
    (item) => item.studyStatus === 'IN_PROGRESS',
  )

  if (inProgressIndex !== -1) {
    return inProgressIndex + 1
  }

  // IN_PROGRESS가 없으면 COMPLETED 중 가장 최신(마지막) 인덱스 찾기
  let lastCompletedIndex = -1
  for (let i = dateList.length - 1; i >= 0; i--) {
    if (dateList[i].studyStatus === 'COMPLETED') {
      lastCompletedIndex = i
      break
    }
  }

  return lastCompletedIndex !== -1 ? lastCompletedIndex + 1 : 1
}

const convertDateListToDailyRecords = (dateList) => {
  const statusMap = {
    COMPLETED: 'studied',
    IN_PROGRESS: 'not-studied',
  }

  return dateList.reduce((acc, item) => {
    // NOT_AVAILABLE은 포함하지 않음 (Calendar가 자동으로 미래 날짜로 처리)
    if (item.studyStatus !== 'NOT_AVAILABLE') {
      acc[item.date] = {
        studyStatus: statusMap[item.studyStatus],
      }
    }
    return acc
  }, {})
}

export const transformMissionData = (apiData) => {
  return {
    missionTheme: apiData.category.categoryTitle,
    progress: apiData.progress || 0, // 백엔드에서 추가될 때까지 0
    keyword: apiData.dailyContent.contentKeyword,
    remainingDays: calculateRemainingDays(apiData.endDate),
    studyDay: calculateStudyDay(apiData.dateList),
    studyPeriod: {
      startDate: apiData.startDate,
      endDate: apiData.endDate,
    },
    calendarData: {
      dailyRecords: convertDateListToDailyRecords(apiData.dateList),
    },
  }
}
