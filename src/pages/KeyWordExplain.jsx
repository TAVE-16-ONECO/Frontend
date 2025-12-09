import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import { BackArrowIcon } from '../components/icons/BackArrowIcon'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const keywordExplanationMockData = {
  keyword: '실질소득',
  explanation: `
얘야, 우리가 돈을 벌고 쓰면서 제일 중요한 게 하나 있어.

바로 **“돈의 액수보다, 그 돈으로 뭘 할 수 있느냐”** 하는 거야.

이걸 경제에서는 **실질소득**이라고 불러.

명목소득은 그냥 통장에 찍혀 있는 금액이야.

그런데 실제로 우리가 살아가는 데 중요한 건

그 돈으로 **얼마나 많은 물건과 서비스를 살 수 있는지**란다.

이 차이를 이해하면, 경제가 돌아가는 큰 흐름도 자연스럽게 보이기 시작해.

---

### 🧺 1) “물건 값을 고려해야 진짜 내 소득이 보인다”

예를 들어, 네가 매달 용돈 5만 원을 받는다고 해보자.

이 돈으로 네가 하고 싶은 걸 사기도 하고, 먹고 싶은 걸 사먹기도 하지?

그런데 말이야…

- 작년에 과자가 1,000원이었는데 올해 1,500원이 되면 어때?
- 작년에 버스 한 번 타는 데 1,200원이었는데 올해 1,500원이 되면?
- 학교 앞 떡볶이가 작년엔 3,000원이었는데 올해 4,000원이 되면?

똑같이 **용돈 5만 원**을 받아도

살 수 있는 양이 줄어들지?

그럼 사실상 네가 **받는 돈의 가치는 줄어든 것**이야.

이게 바로 **실질소득이 감소한다**는 뜻이야.

---

### 🍱 2) 아빠랑 예를 하나 더 들어 보자

작년에 도시락이 4,000원이었는데 올해 5,000원이 됐다고 치자.

아빠가 너에게 이번 달 용돈 10,000원을 똑같이 줬다고 해도,

- 작년엔 도시락 2개를 사 먹을 수 있었지만
- 올해는 도시락 1개만 살 수 있어

그럼 어떨까?

용돈 금액은 똑같아도 너 입장에서는 **덜 여유롭고**,

더 아껴 써야 할 것 같지?

이걸 경제에서는

> “실질소득이 떨어졌다”

라고 말한단다.

---

### 🛍 3) 왜 실질소득이 중요할까?

사람들은 월급이 올랐다고 해도

물가가 더 크게 오르면 **체감적으로 더 힘들게 느껴져.**

예를 들어,

- 월급이 10만 원 올랐는데
- 장보기 비용이 20만 원 늘었으면

사실은 지난달보다 더 빠듯하게 살아야 하잖아?

그래서 경제를 볼 때는

“얼마 받느냐?”보다도

“얼마나 살 수 있느냐?”가 훨씬 중요해.

바로 이것을 보기 위해 **실질소득**이란 개념을 쓰는 거야.

---

### ✏️ 4) 아빠가 간단하게 정리해줄게

> 실질소득 = 내 돈으로 실제로 살 수 있는 물건의 양

돈의 액수보다 ‘구매력’을 더 중요하게 본 개념이야.

물가가 오르면

같은 돈을 가지고 있어도 **가난해진 것처럼 느껴지고**,

물가가 내려가면 실질소득이 올라가서 **같은 돈으로 더 여유롭게 산단다.**
`,
  dayCount: 9,
}

const KeyWordExplain = () => {
  const navigate = useNavigate()

  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
  })

  const handleBack = () => {
    navigate('/')
  }

  const goToQuiz = () => {
    navigate('/quiz')
  }

  return (
    <>
      {/* 상단 바 */}
      <div className='w-full h-[30px] flex relative'>
        <div className='absolute left-4 top-1'>
          <button onClick={handleBack}>
            <BackArrowIcon color='#404040' />
          </button>
        </div>
        <p className='w-full text-center text-[18px] font-medium leading-[130%]'>
          마스터하기
        </p>
      </div>
      {/* 키워드 설명 */}
      <div className='flex-1 overflow-y-auto pb-5'>
        <div className='px-6 py-4'>
          {/* 키워드 헤더 */}
          <div className='mb-6 flex items-center gap-1'>
            <div className='px-[10px] py-[2px] border-1 border-[#2c2c2c] rounded-2xl text-[14px] font-medium'>
              {keywordExplanationMockData.dayCount}일차
            </div>
            <h1 className='text-[22px] font-bold text-[#000000]'>
              {keywordExplanationMockData.keyword}
            </h1>
          </div>

          {/* 마크다운 콘텐츠 */}
          <div className='markdown-content'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {keywordExplanationMockData.explanation}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button
          className='text-[18px] text-[#fdfdfd] bg-[#91c4ff] px-9 py-4 rounded-2xl hover:bg-[#3b96ff] hover:cursor-pointer'
          onClick={goToQuiz}
        >
          퀴즈 도전하기
        </button>
      </div>
    </>
  )
}

export default KeyWordExplain
