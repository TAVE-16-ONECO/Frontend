import React, { useEffect, useState, useRef } from 'react'
import HistoryCard from '../components/historycard.jsx'
import { useUIOptionStore } from '@/store/uiOptionStore'
const History = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(true)

    return () => {
      setShowHeader(true)
      setShowNavigation(true)
    }
  }, [setShowHeader, setShowNavigation])

  // 더미 데이터 생성
  const generateFakeData = () => {
    return {
      title: '제목',
      date: '2025.11.30',
      text: '물가가 전반적으로',
      items: [
        { img: '', text: '기사내용기사내용기사내용기사내용기사내용' },
        { img: '', text: '세인트루이스 연은 총재 인플레이션...' },
        { img: '', text: '세인트루이스 연은 총재 인플레이션...' },
      ],
    }
  }

  // 데이터 불러오기
  const fetchData = () => {
    const newData = Array.from({ length: 5 }, () => generateFakeData())
    setList((prev) => [...prev, ...newData])
  }

  // page가 변경될 때 데이터 로드
  useEffect(() => {
    fetchData()
  }, [page])

  // 무한 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1 },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className='w-full bg-white'>
      {/* 필터 버튼 UI */}
      <div className='flex flex-row w-full h-[57px] border-b-[0.7px] border-[#D9D9D9] px-[18px] gap-[5px]'>
        <FilterButtons />
      </div>

      {/* 카드 리스트 */}
      {list.map((item, index) => (
        <HistoryCard
          key={index}
          title={item.title}
          date={item.date}
          text={item.text}
          items={item.items}
        />
      ))}

      {/* 무한 스크롤 감지용 div */}
      <div
        ref={loaderRef}
        className='h-[50px]'
      ></div>
    </div>
  )
}

export default History

// 필터 버튼 컴포넌트
const FilterButtons = () => {
  const [activeFilter, setActiveFilter] = useState('latest')

  return (
    <>
      <button
        onClick={() => setActiveFilter('latest')}
        className={`w-[92px] h-[35px] rounded-[30px] text-[13px] font-bold flex items-center justify-center
          ${activeFilter === 'latest' ? 'bg-[#5188FB] text-white' : 'bg-white border'}`}
      >
        최신 순
      </button>

      <button
        onClick={() => setActiveFilter('bookmark')}
        className={`w-[92px] h-[35px] rounded-[30px] text-[13px] font-bold flex items-center justify-center
          ${activeFilter === 'bookmark' ? 'bg-[#5188FB] text-white' : 'bg-white border'}`}
      >
        북마크
      </button>
    </>
  )
}
