const Result = () => {
  return (
    <div className='flex flex-col items-center px-[16px]'>
      {/* 아빠 이미지 */}
      <div className='w-[137px] h-[137px] bg-gray-300 mt-10'></div>
      <p className='text-[16px] font-semibold mt-4'>너가 정말 대견하구나.</p>
      {/* 결과 정보 카드 */}
      <div className='w-full bg-[#e2efff] mt-7 rounded-xl flex flex-col items-center'>
        <div className='w-fit mt-4 px-[10px] py-[4px] rounded-2xl border-1 border-[#2c2c2c] text-[14px] font-medium'>
          마스터 도전
        </div>
        <p className='mt-4 text-[14px] font-medium'>2마리 획득</p>
        <div className='mt-2 flex gap-4'>
          <img
            src='/images/DidShell.png'
            alt='조개 아이콘'
            className='w-[30px] h-[28px]'
          />
          <img
            src='/images/DidShell.png'
            alt='조개 아이콘'
            className='w-[30px] h-[28px]'
          />
        </div>
        <div className='px-[10px] pb-[10px] flex justify-center'>
          <div className='h-[215px] px-[14px] py-[19px] mt-[44px] bg-[#fdfdfd] rounded-xl'>
            <p className='text-[16px] font-bold text-[#2c2c2c]'>인플레이션</p>
            <p className='mt-[19px] text-[12px] text-[#595959] leading-[100%]'>
              은행이 망해도 내 예금을 일정 금액까지 국가가 대신 지켜주는
              안전장치야.(150~300자 내외)
            </p>
          </div>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className='mt-4 w-full flex justify-around'>
        <button className='w-[170px] h-[56px] text-center bg-[#91c4ff] rounded-2xl text-[#fdfdfd] text-[18px]'>
          기회 1번 더
        </button>
        <button className='w-[170px] h-[56px] text-center bg-[#91c4ff] rounded-2xl text-[#fdfdfd] text-[18px]'>
          보상 요청하기
        </button>
      </div>
    </div>
  )
}

export default Result
