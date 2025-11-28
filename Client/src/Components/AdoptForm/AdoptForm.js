import React, { useState } from "react";

function AdoptForm(props) {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [familyComposition, setFamilyComposition] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ErrPopup, setErrPopup] = useState(false);
  const [SuccPopup, setSuccPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);

    if (
      !email ||
      !phoneNo ||
      !livingSituation ||
      !previousExperience ||
      !familyComposition
    ) {
      setFormError(true);
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    try {

      setIsSubmitting(true)

      const response = await fetch('http://localhost:4000/form/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          phoneNo,
          livingSituation,
          previousExperience,
          familyComposition,
          petId: props.pet._id
        })
      })

      if (!response.ok) {
        setErrPopup(true)
        return;
      } else {
        setSuccPopup(true)
      }
    }
    catch (err) {
      setErrPopup(true)
      console.error(err);
      return;
    } finally {
      setIsSubmitting(false)

    }

    setEmailError(false);
    setFormError(false);
    setEmail("");
    setPhoneNo("");
    setLivingSituation("");
    setPreviousExperience("");
    setFamilyComposition("");
  };

  return (
    <div className="custom-adopt-form-container">
      <h2 className="custom-form-heading">Đơn nhận nuôi</h2>
      <div className="form-pet-container">
        <div className="pet-details">
          <div className="pet-pic">
            <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name} />
          </div>
          <div className="pet-info">
            <h2>{props.pet.name}</h2>
            <p>
              <b>Loại thú cưng:</b> {props.pet.type}
            </p>
            <p>
              <b>Tuổi:</b> {props.pet.age}
            </p>
            <p>
              <b>Địa chỉ:</b> {props.pet.location}
            </p>
          </div>
        </div>
        <div className="form-div">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="custom-input-box">
              <div className="email-not-valid">
                <label className="custom-label">Email:</label>
                {emailError && (
                  <p>
                    Cung cấp email hợp lệ.
                  </p>
                )}
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">SĐT</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Bạn đã chuẩn bị những gì: </label>
              <input
                type="text"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Kinh nghiệm nuôi thú cưng trước đây: </label>
              <input
                type="text"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Hiện bạn có đang nuôi thú cưng nào không: </label>
              <input
                type="text"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
                className="custom-input"
              />
            </div>
            {formError && (
              <p className="error-message">Vui lòng không để trống.</p>
            )}
            <button disabled={isSubmitting} type="submit" className="custom-cta-button custom-m-b">
              {isSubmitting ? 'Đang gửi' : 'Gửi yêu cầu nhận'}
            </button>
            {ErrPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    @@@
                  </h4>
                </div>
                <button onClick={(e) => (setErrPopup(!ErrPopup))} className="close-btn">
                  Đóng <i className="fa fa-times"></i>
                </button>
              </div>
            )}
            {SuccPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Đơn xin nhận "{props.pet.name}" đã được gửi. Chúng tôi sẽ liên lạc với bạn sớm nhất.
                  </h4>
                </div>
                <button onClick={(e) => {
                  setSuccPopup(!SuccPopup);
                  props.closeForm();
                }} className="close-btn">
                  Đóng <i className="fa fa-times"></i>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm;
