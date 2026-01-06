import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import { Outlet } from 'react-router-dom'

const QuizLayout = () => {
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default QuizLayout
