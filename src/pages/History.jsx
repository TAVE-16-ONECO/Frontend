import React, { useEffect, useState, useRef, useCallback } from 'react'
import HistoryCard from '../components/historycard.jsx'
import { useUIOptionStore } from '@/store/uiOptionStore'
import { useAuthStore } from '@/store/authStore'
import { studyRecordsAPI } from '@/api/studyRecords'

const History = () => {
  const [historyItems, setHistoryItems] = useState([])
  const [memberItems, setMemberItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [cursor, setCursor] = useState({ nextId: null, nextSubmittedDate: null })

  // 자식: viewMode (ALL/BOOKMARKED), 부모: selectedChildId
  const [viewMode, setViewMode] = useState('ALL')
  const [selectedChildId, setSelectedChildId] = useState(null)

  const loaderRef = useRef(null)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const role = useAuthStore((state) => state.role)

  const isParent = role === 'PARENT'

  // 데이터 불러오기
  const fetchHistory = useCallback(
    async (isInitial = false) => {
      if (isLoading || (!hasNext && !isInitial)) return

      setIsLoading(true)
      try {
        const params = {
          size: 20,
          viewMode: isParent ? 'ALL' : viewMode,
          lastStudyRecordId: isInitial ? null : cursor.nextId,
          lastSubmittedDate: isInitial ? null : cursor.nextSubmittedDate,
          childId: isParent ? selectedChildId : null,
        }

        const response = await studyRecordsAPI.getHistory(params)
        const data = response.data

        // 멤버 목록 저장 (부모용)
        if (data.memberItems?.length > 0) {
          setMemberItems(data.memberItems)
          // 첫 로드 시 선택된 자녀가 없으면 첫 번째 자녀 선택
          if (isInitial && selectedChildId === null) {
            setSelectedChildId(data.memberItems[0].memberId)
          }
        }

        // 히스토리 아이템 추가
        if (isInitial) {
          setHistoryItems(data.historyItems || [])
        } else {
          setHistoryItems((prev) => [...prev, ...(data.historyItems || [])])
        }

        // 커서 및 hasNext 업데이트
        setCursor({
          nextId: data.nextId,
          nextSubmittedDate: data.nextSubmittedDate,
        })
        setHasNext(data.hasNext)
      } catch (error) {
        console.error('히스토리 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, hasNext, cursor, viewMode, selectedChildId, isParent],
  )

  // 초기 로드
  useEffect(() => {
    setShowNavigation(true)
    fetchHistory(true)
  }, [])

  // viewMode 변경 시 커서 초기화 후 재조회 (자식용)
  useEffect(() => {
    if (!isParent) {
      setHistoryItems([])
      setCursor({ nextId: null, nextSubmittedDate: null })
      setHasNext(true)
      fetchHistory(true)
    }
  }, [viewMode])

  // 선택된 자녀 변경 시 커서 초기화 후 재조회 (부모용)
  useEffect(() => {
    if (isParent && selectedChildId !== null) {
      setHistoryItems([])
      setCursor({ nextId: null, nextSubmittedDate: null })
      setHasNext(true)
      fetchHistory(true)
    }
  }, [selectedChildId])

  // 무한 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !isLoading) {
          fetchHistory(false)
        }
      },
      { threshold: 1 },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [fetchHistory, hasNext, isLoading])

  return (
    <div className='flex flex-col h-screen'>
      {/* 필터 버튼 UI */}
      <div className='shrink-0 flex flex-row items-center w-full h-[57px] border-b-[0.7px] border-[#D9D9D9] px-[18px] gap-[5px]'>
        {isParent ? (
          <ChildSelectButtons
            members={memberItems}
            selectedChildId={selectedChildId}
            onSelect={setSelectedChildId}
          />
        ) : (
          <FilterButtons
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
          />
        )}
      </div>
      <div className='w-full bg-white flex-1 overflow-y-auto'>
        {/* 카드 리스트 */}
        {historyItems.map((item) => (
          <HistoryCard
            key={item.studyRecordId}
            studyRecordId={item.studyRecordId}
            title={item.dailyContentSummary?.title}
            date={item.quizAttemptDate}
            text={item.dailyContentSummary?.summary}
            isBookmarked={item.isBookmarked}
            showBookmark={!isParent}
            items={item.dailyContentSummary?.newsItemSummaryList?.map((news) => ({
              img: news.imageUrl,
              text: news.title,
              url: news.url,
            }))}
          />
        ))}

        {/* 로딩 표시 */}
        {isLoading && (
          <div className='flex justify-center items-center py-4'>
            <div className='w-6 h-6 border-2 border-[#5188FB] border-t-transparent rounded-full animate-spin' />
          </div>
        )}

        {/* 무한 스크롤 감지용 div */}
        <div
          ref={loaderRef}
          className='h-[50px]'
        ></div>
      </div>
    </div>
  )
}

export default History

// 자식용 필터 버튼 컴포넌트 (최신순/북마크)
const FilterButtons = ({ viewMode, onChangeViewMode }) => {
  return (
    <>
      <button
        onClick={() => onChangeViewMode('ALL')}
        className={`w-[92px] h-[35px] rounded-[30px] text-[13px] font-bold flex items-center justify-center
          ${viewMode === 'ALL' ? 'bg-[#5188FB] text-white' : 'bg-white border'}`}
      >
        최신 순
      </button>

      <button
        onClick={() => onChangeViewMode('BOOKMARKED')}
        className={`w-[92px] h-[35px] rounded-[30px] text-[13px] font-bold flex items-center justify-center
          ${viewMode === 'BOOKMARKED' ? 'bg-[#5188FB] text-white' : 'bg-white border'}`}
      >
        북마크
      </button>
    </>
  )
}

// 부모용 자녀 선택 버튼 컴포넌트
const ChildSelectButtons = ({ members, selectedChildId, onSelect }) => {
  return (
    <>
      {members.map((member) => (
        <button
          key={member.memberId}
          onClick={() => onSelect(member.memberId)}
          className={`px-[16px] h-[35px] rounded-[30px] text-[13px] font-bold flex items-center justify-center
            ${selectedChildId === member.memberId ? 'bg-[#5188FB] text-white' : 'bg-white border'}`}
        >
          {member.name}
        </button>
      ))}
    </>
  )
}
