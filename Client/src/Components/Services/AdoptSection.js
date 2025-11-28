import React from "react";
import adoptPet from "./images/adoptPet.png";
import { Link } from "react-router-dom";

const AdoptSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="adopt-section">
      <h2>Nhận nuôi</h2>
      <img src={adoptPet} alt="Happy Pet" />

      <p>
        Chào mừng bạn đến với chương trình nhận nuôi thú cưng của chúng tôi! Nhận nuôi thú cưng là một cách tuyệt vời để mang lại niềm vui và tình bạn cho cuộc sống của bạn.
      </p>

      <h3>Lợi ích của việc nhận nuôi thú cưng</h3>
      <ul>
        <li>Cung cấp một ngôi nhà yêu thương cho một con vật cưng đang cần giúp đỡ</li>
        <li>Trải nghiệm tình yêu vô điều kiện của thú cưng</li>
        <li>Tạo ra những kỷ niệm lâu dài và khoảnh khắc đáng trân trọng</li>
      </ul>

      <h3>Quy trình áp dụng</h3>
      <ol>
        <li>Điền vào đơn xin nhận con nuôi</li>
        <li>Gặp gỡ trực tiếp những thú cưng tiềm năng</li>
        <li>Hoàn thành các thủ tục giấy tờ cần thiết</li>
      </ol>

      <h3>Trách nhiệm</h3>
      <p>
        Việc nhận nuôi thú cưng đi kèm với nhiều trách nhiệm, bao gồm cho ăn, chải chuốt, tập thể dục thường xuyên và chăm sóc y tế.
      </p>

      <Link to="/pets">
        <button className="cta-button" onClick={scrollToTop}>Tìm thú cưng hoàn hảo của bạn</button>
      </Link>
    </section>
  );
};

export default AdoptSection;
