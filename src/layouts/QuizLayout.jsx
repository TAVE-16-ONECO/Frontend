import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import { Outlet } from 'react-router-dom'

const QuizLayout = () => {
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowNavigation(false)
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default QuizLayout
