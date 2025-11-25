import { NavLink } from 'react-router-dom'

const menus = [
  { to: '/', label: '홈' },
  { to: '/history', label: '히스토리' },
  { to: '/my', label: '마이' },
]

export const NavigationBar = () => {
  return (
    <nav className='h-full flex items-center justify-around bg-white'>
      {menus.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className='flex flex-col items-center gap-[2px]'
        >
          <div className='w-[30px] h-[30px] rounded-full bg-gray-300' />
          <span className='text-[10px]'>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default NavigationBar
