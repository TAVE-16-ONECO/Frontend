import { useState } from 'react'

const RewardRequestModal = ({ isOpen, onClose, completedMissions }) => {
  const [selectedMissionId, setSelectedMissionId] = useState(null)

  if (!isOpen) return null

  // 미션완료 상태인 미션들만 필터링
  const completedOnlyMissions = completedMissions.filter(
    (mission) => mission.status === '미션완료',
  )

  const handleSubmit = () => {
    if (!selectedMissionId) {
      alert('보상을 요청할 미션을 선택해주세요.')
      return
    }
    // 보상 요청 API 호출 로직 추가
    console.log('보상 요청할 미션 ID:', selectedMissionId)
    alert('보상 요청이 완료되었습니다.')
    onClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none'>
      <div className='bg-white rounded-2xl p-6 w-[90%] max-w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl pointer-events-auto'>
        {/* 헤더 */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>보상 요청하기</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl'
          >
            ×
          </button>
        </div>

        {/* 설명 */}
        <p className='text-sm text-gray-600 mb-4'>
          보상을 요청할 미션을 선택해주세요.
        </p>

        {/* 미션 목록 */}
        {completedOnlyMissions.length > 0 ?
          <div className='space-y-3 mb-6'>
            {completedOnlyMissions.map((mission) => (
              <label
                key={mission.id}
                className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
              >
                <input
                  type='radio'
                  name='mission'
                  value={mission.id}
                  checked={selectedMissionId === mission.id}
                  onChange={() => setSelectedMissionId(mission.id)}
                  className='w-5 h-5 text-blue-600 mr-3'
                />
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800'>{mission.title}</p>
                  {mission.reward && (
                    <p className='text-sm text-blue-600 mt-1'>
                      보상: {mission.reward}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        : <p className='text-center text-gray-400 py-8'>
            보상을 요청할 수 있는 미션이 없습니다.
          </p>
        }

        {/* 버튼 */}
        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors'
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedMissionId}
            className='flex-1 py-3 bg-[#6FAEFF] text-white rounded-lg font-semibold hover:bg-[#5188FB] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
          >
            요청하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default RewardRequestModal
