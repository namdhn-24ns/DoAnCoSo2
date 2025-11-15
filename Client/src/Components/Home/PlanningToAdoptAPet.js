import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <div className='planning-container'>
        <h1>Bạn đang có ý định nhân nuôi thú cưng?</h1>
        <div className='boxes-container'>
            <Card title="Niềm Vui Khi Nhận Nuôi Thú Cưng" description="Nhận nuôi một bé thú cưng mang đến nhiều cảm xúc tích cực và sự gắn kết đặc biệt. Một mái ấm mới không chỉ thay đổi cuộc sống của thú cưng, mà còn giúp mỗi ngày của bạn trở nên ấm áp và ý nghĩa hơn."/>
            <Card title="Hướng Dẫn Nhận Nuôi" description="Nếu bạn đang cân nhắc có một bạn đồng hành mới, nhận nuôi là lựa chọn đáng để thử. Chỉ cần một chút chuẩn bị và tìm hiểu, bạn sẽ tìm được người bạn phù hợp để đồng hành thật lâu dài."/>
            <Card title="Chữa Lành Từ Động Vật" description="Động vật có thể xoa dịu căng thẳng và mang lại cảm giác an yên. Sự hiện diện của chúng giúp cải thiện tinh thần, mang đến sự thoải mái và cân bằng cho cuộc sống hàng ngày."/>
        </div>
    </div>
  )
}

export default PlanningToAdoptAPet;