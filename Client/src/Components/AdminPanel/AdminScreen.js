import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('postingPet')}>Đơn gửi thú cưng đến trung tâm</p>
          <p onClick={() => setScreen('adoptingPet')}>Đơn nhận nuôi của khách hàng</p>
          <p onClick={() => setScreen('approvedRequests')}>Thú cưng đang hiển thị</p>
          <p onClick={() => setScreen('adoptedHistory')}>Lịch sử nhận nuôi</p>

        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
      </div>
    </div>
  )
}

export default AdminScreen
