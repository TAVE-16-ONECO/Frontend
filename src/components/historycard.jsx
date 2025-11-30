import React from 'react'

const HistoryCard = ({ title, date, text, items }) => {
  return (
    <div className='w-full h-[340px] bg-white border-b-[0.7px] border-[#D9D9D9]'>
      <div className='flex flex-col mt-[23px] ml-[18px] gap-[20px]'>
        {/* 제목 + 날짜 + 저장/공유 */}
        <div className='flex flex-col gap-[13px] w-full pr-[18px]'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-[8px]'>
              <p className='text-black text-[16px] font-[700]'>{title}</p>
              <p className='text-[#BABABA] text-[12px] font-[600]'>{date}</p>
            </div>

            <div className='flex items-center gap-[24px]'>
              {/* 저장 아이콘 */}
              <div className='w-[17.6px] h-[22px] shrink-0 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='22'
                  viewBox='0 0 18 22'
                  fill='none'
                >
                  <path
                    d='M17.5996 22L8.7998 15.6816L0 22V0H17.5996V22Z'
                    fill='#BABABA'
                  />
                </svg>
              </div>

              {/* 공유 아이콘 */}
              <div className='w-[17px] h-[22px] shrink-0 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17'
                  height='22'
                  viewBox='0 0 17 22'
                  fill='none'
                >
                  <path
                    d='M5.48328 7.17969C5.89746 7.17961 6.23316 7.51551 6.23328 7.92969C6.23328 8.34384 5.89745 8.67961 5.48328 8.67969H2.82214C2.13227 8.68006 1.57244 9.23982 1.57214 9.92969V19.2324C1.57235 19.9225 2.13212 20.4822 2.82214 20.4824H7.95105C8.36524 20.4824 8.70101 20.8182 8.70105 21.2324C8.70085 21.6465 8.36514 21.9824 7.95105 21.9824H2.82214C1.3037 21.9822 0.072345 20.7509 0.0721436 19.2324V9.92969C0.0724408 8.4115 1.30394 7.1802 2.82214 7.17969H5.48328ZM14.1776 7.18066C15.6961 7.18101 16.9266 8.41215 16.9266 9.93066V19.2324C16.9264 20.751 15.6953 21.9824 14.1766 21.9824H12.3387C11.9249 21.9822 11.5889 21.6463 11.5887 21.2324C11.5888 20.8184 11.9248 20.4827 12.3387 20.4824H14.1766C14.8669 20.4824 15.4264 19.9226 15.4266 19.2324V9.93066C15.4266 9.2404 14.8669 8.68074 14.1766 8.68066L12.4755 8.67969C12.0615 8.67939 11.7254 8.34375 11.7255 7.92969C11.7257 7.51581 12.0616 7.17989 12.4755 7.17969L14.1776 7.18066ZM7.98816 0.21875C8.2762 -0.0499874 8.72346 -0.0498371 9.0116 0.21875L12.8505 3.7998C13.1531 4.08235 13.169 4.55657 12.8866 4.85938C12.604 5.16216 12.1299 5.17897 11.827 4.89648L9.24988 2.49219V13.0459C9.24988 13.4601 8.91402 13.7958 8.49988 13.7959C8.0858 13.7957 7.74988 13.46 7.74988 13.0459V2.49219L5.17273 4.89648C4.86986 5.17897 4.39472 5.16222 4.11218 4.85938C3.83033 4.55652 3.84678 4.08217 4.14929 3.7998L7.98816 0.21875Z'
                    fill='#BABABA'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 내용 텍스트 */}
          <p className='text-black text-[14px] leading-[132%] tracking-[-0.28px]'>
            {text}
          </p>
        </div>

        {/* 가로 카드 스크롤 영역 */}
        <div className='flex gap-[11px] w-full overflow-x-scroll scrollbar-hide pr-[18px]'>
          {items?.map((item, idx) => (
            <div
              key={idx}
              className='flex w-[230px] h-[219px] flex-col justify-end items-center gap-[5px] rounded-[7px] shadow-[0_1px_5px_rgba(0,0,0,0.10)] bg-lightgray bg-cover'
            >
              {item.img ?
                <img
                  src={item.img}
                  className='w-full h-[170px] object-cover rounded-t-[7px]'
                />
              : <div className='w-full h-[170px] bg-gray-200 rounded-t-[7px]' />
              }

              <div className='flex w-[230px] h-[49px] justify-center items-center bg-[#FDFDFD] rounded-b-[7px]'>
                <p className='w-[214px] text-[14px] font-[600] leading-[130%]'>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryCard
