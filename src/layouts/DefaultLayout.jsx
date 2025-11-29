import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'
import { useUIOptionStore } from '@/store/uiOptionStore'
import clsx from 'clsx'

export const DefaultLayout = () => {
  const showNavigationBar = useUIOptionStore((state) => state.showNavigationBar)
  const showHeader = useUIOptionStore((state) => state.showHeader)
  return (
    <div className='w-full flex justify-center bg-[#f1f1f1] font-body'>
      <div
        className={clsx(
          'w-full min-w-[360px] max-w-[600px] min-h-screen flex flex-col bg-white pt-[60px]',
          showNavigationBar ? 'pb-[86px]' : '',
        )}
      >
        {showHeader && <Header />}
        <Outlet />
      </div>
      {showNavigationBar && (
        <div className='fixed left-1/2 bottom-0 -translate-x-1/2 w-full h-[86px] min-w-[360px] max-w-[600px]'>
          <NavigationBar />
        </div>
      )}
    </div>
  )
}

export default DefaultLayout
