import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const FormCard = (props) => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`http://localhost:4000/approving/${props.form.petId}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: props.form.email,
          phone: props.form.phoneNo,
          status: "Adopted"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setShowErrorPopup(true);
      } else {
        setShowApproved(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
    } finally {
      deleteFormAdoptedPet();
    }
  };
  
  const deleteFormAdoptedPet = async () => {
    try {
      const deleteResponse = await fetch(`http://localhost:4000/form/delete/many/${props.form.petId}`, {
        method: 'DELETE'
      });
      if (!deleteResponse.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    }finally{;
      setIsApproving(false);
    }
  }


  const handleReject = async () => {
    console.log(props);
    setIsDeleting(true)
    try {
      const response = await fetch(`http://localhost:4000/form/reject/${props.form._id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error('Failed to delete form');
      } else {
        setShowDeletedSuccess(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error deleting form:', err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='form-card-details'>
          <p><b>Email: </b> {props.form.email}</p>
          <p><b>SĐT: </b> {props.form.phoneNo}</p>
          <p><b>Bạn đã chuẩn bị những gì: </b> {props.form.livingSituation}</p>
          <p><b>Kinh nghiệm nuôi thú cưng: </b> {props.form.previousExperience}</p>
          <p><b>Bạn có nuôi thú cưng nào khác? </b> {props.form.familyComposition}</p>
          <p>{formatTimeAgo(props.form.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={handleReject} disabled={isDeleting || isApproving}>{isDeleting ? (<p>Đang từ chối</p>) : 'Từ chối'}</button>
          <button onClick={() => setShowDetailsPopup(true)}>Xem chi tiết</button>
          {props.approveBtn ?
            <button onClick={handleApprove} disabled={isDeleting || isApproving} >{isApproving ? (<p>Đang duyệt</p>) : 'Phê duyệt'}</button>
            : ''
          }
        </div>
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>...</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Đã nhận nuôi thành công</p>
            </div>
            <button onClick={() => {
              props.updateCards()
              setShowApproved(!showApproved)
            }} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Đã từ chối yêu cầu.</p>
            </div>
            <button onClick={() => {
              setShowDeletedSuccess(!showDeletedSuccess)
              props.updateCards()
            }} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {showDetailsPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h2>{props.pet.name}</h2>
              <p><b>Email: </b> {props.form.email}</p>
              <p><b>SĐT: </b> {props.form.phoneNo}</p>
              <p><b>Trạng thái hiện tại của thú cưng: </b> {props.form.livingSituation}</p>
              <p><b>Kinh nghiệm nuôi thú cưng: </b> {props.form.previousExperience}</p>
              <p><b>Bạn có nuôi thú cưng nào khác? </b> {props.form.familyComposition}</p>
              <p>{formatTimeAgo(props.form.updatedAt)}</p>
            </div>
            <button onClick={() => setShowDetailsPopup(false)} className='close-btn'>
              Đóng <i className="fa fa-times"></i>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FormCard;
