import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'
import { useUIOptionStore } from '@/store/uiOptionStore'
import clsx from 'clsx'

export const DefaultLayout = () => {
  const location = useLocation()
  const showNavigationBar = useUIOptionStore((state) => state.showNavigationBar)
  return (
    <div className='w-full flex justify-center bg-[#f1f1f1] font-body'>
      <div
        className={clsx(
          'w-full min-w-[360px] max-w-[600px] min-h-screen flex flex-col bg-white pt-[30px] pb-[50px]',
          showNavigationBar && 'pb-[86px]',
        )}
      >
        {location.pathname === '/login' && <Header />}
        <Outlet />
      </div>
      {showNavigationBar && (
        <div className='fixed left-1/2 bottom-0 -translate-x-1/2 w-full h-[86px] min-w-[360px] max-w-[600px] z-10'>
          <NavigationBar />
        </div>
      )}
    </div>
  )
}

export default DefaultLayout
