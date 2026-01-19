import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackArrowIcon } from '../../components/icons/BackArrowIcon'
import { useAuthStore } from '../../store/authStore'
import { useUIOptionStore } from '@/store/uiOptionStore'
import apiClient from '../../api/client'
import { familyAPI } from '../../api/family'

const Members = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [inviteType, setInviteType] = useState('') // 'parent' or 'child'
  const setShowNavigation = useUIOptionStore((state) => state.setShowNavigation)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // authStore에서 role 가져오기
  const role = useAuthStore((state) => state.role)

  // 멤버가 있는지 여부
  const hasMembers = members.length > 0

  useEffect(() => {
    setShowNavigation(false)

    const fetchMembers = async () => {
      try {
        setLoading(true)
        const response = await familyAPI.getMembers()
        const memberList = response.data?.members || []
        setMembers(memberList)
      } catch (error) {
        console.error('멤버 조회 실패:', error)
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const handleInviteClick = (type) => {
    setInviteType(type)
    setShowModal(true)
  }

  // 현재 사용자 역할에 따라 초대할 대상 결정
  const getInviteType = () => {
    return role === 'parent' ? 'child' : 'parent'
  }

  const handleCopyLink = async () => {
    // 초대 링크 복사 로직
    try {
      const response = await apiClient.get('/api/family/invitations/code')
      const inviteCode = response.data.data.code
      const inviteLink = `${window.location.origin}/login?inviteCode=${inviteCode}`
      await navigator.clipboard.writeText(inviteLink)
      alert('초대 링크가 복사되었습니다!')
      setShowModal(false)
    } catch (e) {
      console.error('초대 링크 복사 실패', e)
      alert('초대 링크 복사에 실패했습니다.')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className='flex flex-col bg-white'>
      {/* 헤더 */}
      <div className='px-5 py-4 flex items-center justify-between border-gray-200'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 hover:opacity-70 transition-opacity'
        >
          <BackArrowIcon color='#2c2c2c' />
        </button>
        <h2 className='text-[#2c2c2c]'>멤버 추가</h2>
        <div className='w-[20px]'></div>
      </div>

      {/* 컨텐츠 */}
      <div className='flex-1 px-[20px]'>
        {
          !hasMembers ?
            <>
              {/* 안내 문구 */}
              <h1 className='font-bold mb-[28px] mt-[27px]'>
                가족을 초대하고 <br></br>원코 활동을 함께해 보세요!
              </h1>
              {/* 역할에 따라 초대 섹션 표시 */}
              {role === 'child' && (
                <div>
                  <p className='text-[16px] font-medium text-[#2c2c2c] mb-3'>
                    부모 초대
                  </p>
                  <button
                    onClick={() => handleInviteClick('parent')}
                    className='w-full h-[158px] bg-[#E2EFFF] rounded-lg flex items-center justify-center hover:bg-[#4070da] transition-colors'
                  >
                    <span className='text-[14px] text-black font-light'>+</span>
                  </button>
                </div>
              )}

              {role === 'parent' && (
                <div>
                  <p className='text-[16px] font-medium text-[#2c2c2c] mb-3'>
                    자식 초대
                  </p>
                  <button
                    onClick={() => handleInviteClick('child')}
                    className='w-full h-[158px] bg-[#E2EFFF] rounded-lg flex items-center justify-center hover:bg-[#4070da] transition-colors'
                  >
                    <span className='text-[14px] text-black font-light'>+</span>
                  </button>
                </div>
              )}
            </>
            // 멤버가 존재할 때
          : <div className='grid grid-cols-2 gap-[15px] mt-[53px]'>
              {/* 기존 멤버 카드들 */}
              {members.map((member) => (
                <div
                  key={member.memberId}
                  className='flex flex-col items-center justify-center bg-[#E2EFFF] border-2 border-gray-100 rounded-lg p-4 h-[178px] shadow'
                >
                  {/* 프로필 이미지 */}
                  <div className='w-[70px] h-[70px] rounded-full bg-gray-200 mb-[20px] overflow-hidden'>
                    {member.profileImageUrl && (
                      <img
                        src={member.profileImageUrl}
                        alt={member.nickname}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </div>
                  {/* 이름 */}
                  <p className='text-[18px] font-semibold text-[black] mb-[28px]'>
                    {member.nickname}
                  </p>
                </div>
              ))}

              {/* 멤버 추가 버튼 */}
              <button
                onClick={() => handleInviteClick(getInviteType())}
                className='flex flex-col items-center justify-center bg-[white] border-2 border-gray-100 rounded-lg h-[178px] shadow'
              >
                <span className='text-[40px] text-[black] font-light'>+</span>
              </button>
            </div>

        }
      </div>

      {/* 플로팅 모달 */}
      {showModal && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          onClick={handleCloseModal}
        >
          <div
            className='[box-shadow:0px_1px_5px_0px_rgba(0,0,0,0.15)] bg-white rounded-3xl w-[330px] h-[302px] px-[22px] py-[20px] [box_shadow'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-end items-center mb-6'>
              <button
                onClick={handleCloseModal}
                className='text-[24px] text-[#919191]'
              >
                ×
              </button>
            </div>

            <p className='text-[black] mb-[80px] font-semibold text-[20px] leading-[132%]'>
              초대 링크를 공유해 가족을 초대하고 <br></br> 원코 활동을 함께해
              보세요!
            </p>

            <button
              onClick={handleCopyLink}
              className='w-full h-[50px] bg-[#5188fb] rounded-[16px] text-white font-medium hover:bg-[#4070da] transition-colors'
            >
              초대 링크 복사
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Members
