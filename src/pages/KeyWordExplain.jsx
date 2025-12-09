import { useEffect } from 'react'
import { useUIOptionStore } from '../store/uiOptionStore'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useAuthStore } from '../store/authStore'

const KeyWordExplain = ({ keywordData, doQuiz }) => {
  const role = useAuthStore((state) => state.role)
  const setShowHeader = useUIOptionStore((state) => state.setShowHeader)
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)

  useEffect(() => {
    setShowHeader(false)
    setShowNavigation(false)
  })

  const handleStudyCompleted = () => {
    doQuiz()
  }

  return (
    <>
      <div className='px-[16px] py-7'>
        {/* 키워드 설명 */}
        <div className='pb-5'>
          {/* 마크다운 콘텐츠 */}
          <div className='markdown-content'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {keywordData.explanation}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      {role === 'child' && (
        <div className='flex justify-center'>
          <button
            className='text-[18px] text-[#fdfdfd] bg-[#91c4ff] px-9 py-4 rounded-2xl hover:bg-[#3b96ff] hover:cursor-pointer'
            onClick={handleStudyCompleted}
          >
            퀴즈 도전하기
          </button>
        </div>
      )}
    </>
  )
}

export default KeyWordExplain
