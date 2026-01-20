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
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // dateList에서 오늘 날짜보다 작거나 같은 날짜 중 가장 마지막 인덱스 찾기
  let targetIndex = -1
  for (let i = 0; i < dateList.length; i++) {
    const itemDate = new Date(dateList[i].date)
    itemDate.setHours(0, 0, 0, 0)

    if (itemDate.getTime() <= today.getTime()) {
      targetIndex = i
    } else {
      // 날짜가 오늘보다 크면 더 이상 찾을 필요 없음
      break
    }
  }

  // 인덱스 + 1 (1부터 시작), 없으면 1
  return targetIndex !== -1 ? targetIndex + 1 : 1
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
        dailyContentId: item.dailyContentId,
      }
    }
    return acc
  }, {})
}

export const transformMissionData = (apiData) => {
  return {
    missionTheme: apiData.category.categoryTitle,
    progress: apiData.progressPercentage,
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
