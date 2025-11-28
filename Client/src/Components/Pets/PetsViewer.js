import React, { useState } from 'react';
import AdoptForm from '../AdoptForm/AdoptForm';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const PetsViewer = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  };

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>
        <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name} />
      </div>
      <div className='pet-card-details'>
        <h2>{props.pet.name}</h2>
        <p><b>Loại thú cưng:</b> {props.pet.type}</p>
        <p><b>Tuổi:</b> {props.pet.age}</p>
        <p><b>Địa chỉ:</b> {props.pet.area}</p>
        <p>{formatTimeAgo(props.pet.updatedAt)}</p>
      </div>
      <div className='show-interest-btn'>
        <button onClick={togglePopup}>Chọn bé<i className="fa fa-paw"></i></button>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <AdoptForm closeForm={togglePopup} pet={props.pet}/>
          </div>
          <button onClick={togglePopup} className='close-btn'>
            Đóng <i className="fa fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetsViewer;
