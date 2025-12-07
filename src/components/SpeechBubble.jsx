const SpeechBubble = ({ className = 'w-[217px]' }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 217 75'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_917_2784)'>
        <path
          d='M195.5 4H24.5C15.6634 4 8.5 11.1634 8.5 20V44.5V53.0303C8.5 54.3385 8.33956 55.6418 8.02228 56.9109L5 69L22.829 62.9121C24.5976 62.3082 26.4536 62 28.3224 62H195.5C204.337 62 211.5 54.8366 211.5 46V20C211.5 11.1634 204.337 4 195.5 4Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_917_2784'
          x='0'
          y='0'
          width='216.5'
          height='75'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite
            in2='hardAlpha'
            operator='out'
          />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_917_2784'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_917_2784'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}

export default SpeechBubble
