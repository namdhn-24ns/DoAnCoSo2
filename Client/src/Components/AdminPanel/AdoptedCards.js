import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const AdoptedCards = (props) => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setshowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale:vi });
  };

 const handleReject = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`http://localhost:4000/delete/${props.pet._id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error('Failed to delete pet');
      } else {
        setshowDeletedSuccess(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error deleting pet:', err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{props.pet.name}</h2>
          <p><b>Loại thú cưng:</b> {props.pet.type}</p>
          <p><b>Email người nhận:</b> {props.pet.email}</p>
          <p><b>SĐT người nhận:</b> {props.pet.phone}</p>
          <p>Đã nhận cách đây {formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={handleReject} disabled={isDeleting}>{isDeleting ? (<p>Đang xóa</p>) : (props.deleteBtnText)}</button>

        </div>
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>@@@</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Phê duyệt thành công...</p>
            </div>
            <button onClick={() => {
              setShowApproved(!showApproved)
              props.updateCards()
            }} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Xóa thành công...</p>
            </div>
            <button onClick={() => {
              setshowDeletedSuccess(!showDeletedSuccess)
              props.updateCards()
            }} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdoptedCards;
