import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <NavigationBar />
    </>
  )
}
