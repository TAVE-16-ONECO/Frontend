import { FadeLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <FadeLoader
        aria-label='Loading Spinner'
        cssOverride={{ left: '25px' }}
        margin={-5}
        height={8}
      />

      <img
        src='/images/MainCharacter-sorry.png'
        className='w-[25%] mr-4 mt-2'
      />
      <p className='text-[18px] text-[#2c2c2c] mt-3'>잠시만 기다려주겠니</p>
    </div>
  )
}

export default Loading
