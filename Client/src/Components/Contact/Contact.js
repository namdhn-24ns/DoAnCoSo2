import React from "react";
import developerPng from "./images/developer-png.png";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Liên hệ với chúng tôi thông qua</h3>

        <div>
          <div className="contact-icons">
            <i class="fa fa-envelope"></i>
            <a class="mail-links" href="https://mail.google.com/">
              AlimalFamily@gmail.com
            </a>
          </div>

          <div className="contact-icons">
            <i class="fa fa-facebook"></i>
            <a class="mail-links" href="https://www.facebook.com/">
              Alimal Fanpage
            </a>
          </div>

          <div className="contact-icons">
            <i class="fa fa-instagram"></i>
            <a class="mail-links" href="https://www.instagram.com/">
              Alimal Ins
            </a>
          </div>

          <div className="contact-icons">
            <i class="fa fa-phone"></i>
            <a class="mail-links" href="tel:+84 00000000">
              +84 00000000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
