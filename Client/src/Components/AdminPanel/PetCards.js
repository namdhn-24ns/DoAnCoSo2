import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const PetCards = (props) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setshowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const maxLength = 40;

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`http://localhost:4000/approving/${props.pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        setShowErrorPopup(true);
      } else {
        setShowApproved(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
    } finally {
      setIsApproving(false);
    }
  }

  const deleteFormsAdoptedPet = async () => {
    setIsDeleting(true)
    try {
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${props.pet._id}`, {
        method: 'DELETE'
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    }finally{
      handleReject();
    }
  }

  const handleReject = async () => {
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
          <p><b>Tuổi:</b> {props.pet.age}</p>
          <p><b>Địa chỉ:</b> {props.pet.area}</p>
          <p><b>Email người gửi:</b> {props.pet.email}</p>
          <p><b>SĐT người gửi:</b> {props.pet.phone}</p>
          <p>
            <b>Lí do:</b>
            <span>
              {truncateText(props.pet.justification, maxLength)}
              {props.pet.justification.length > maxLength && (
                <span onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='read-more-btn'>
                  Xem thêm
                </span>
              )}
            </span>
          </p>
          <p>{formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={deleteFormsAdoptedPet} disabled={isDeleting || isApproving}>{isDeleting ? (<p>Đang từ chối</p>) : (props.deleteBtnText)}</button>
          {props.approveBtn ?
            <button disabled={isDeleting || isApproving} onClick={handleApprove}>{isApproving ? (<p>Chấp nhận</p>) : 'Phê Duyệt'}</button>
            : ''
          }
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Lí do:</h4>
              <p>{props.pet.justification}</p>
            </div>
            <button onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Thành công.</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Đã phê duyệt</p>
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
              <p>Đã xóa.</p>
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

export default PetCards;
