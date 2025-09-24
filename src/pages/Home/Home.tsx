// src/pages/Home/Home.tsx (7단계 최종 완성 버전)
import React from 'react';
import WeddingHeader from '../../components/WeddingHeader/WeddingHeader';
import WeddingDate from '../../components/WeddingDate/WeddingDate';
import CoupleInfo from '../../components/CoupleInfo/CoupleInfo';
import Gallery from '../../components/Gallery/Gallery';
import Location from '../../components/Location/Location';
import Contact from '../../components/Contact/Contact';
import GuestBook from '../../components/GuestBook/GuestBook';
import ThankYou from '../../components/ThankYou/ThankYou';
import BackgroundMusic from '../../components/BackgroundMusic/BackgroundMusic';
import { sampleGalleryImages } from '../../data/galleryImages';
import { sampleLocationInfo } from '../../data/locationInfo';
import { sampleGroomContacts, sampleBrideContacts } from '../../data/contactInfo';
import { sampleGuestMessages } from '../../data/guestBookData';
import { sampleMusicTracks } from '../../data/musicData';

const Home: React.FC = () => {
  // 결혼식 정보 (나중에 별도 파일로 분리할 예정)
  const weddingInfo = {
    brideName: "김예쁘",
    groomName: "이잘생",
    weddingDate: "2024-12-25", // YYYY-MM-DD 형식
    weddingTime: "오후 2시",
    venue: "서울웨딩홀",
    message: "평생을 함께할 우리의 소중한 시작에 함께해주세요"
  };

  // 신랑신부 상세 정보
  const groomInfo = {
    name: weddingInfo.groomName,
    role: 'groom' as const,
    description: "따뜻한 마음과 성실한 모습으로 가정을 이끌어갈 멋진 남자입니다. 항상 웃음을 잃지 않으며 주변 사람들에게 힘이 되어주는 사람입니다.",
    phone: "010-1234-5678", // 실제로는 진짜 번호를 넣거나 제거
    relation: "이철수 • 김영희의 아들"
  };

  const brideInfo = {
    name: weddingInfo.brideName,
    role: 'bride' as const, 
    description: "밝고 긍정적인 에너지로 모든 사람을 행복하게 만드는 아름다운 여성입니다. 사랑과 배려가 넘치는 따뜻한 마음의 소유자입니다.",
    phone: "010-8765-4321", // 실제로는 진짜 번호를 넣거나 제거
    relation: "김대수 • 박미영의 딸"
  };

  // RSVP 및 공유 핸들러
  const handleRSVP = (attending: boolean) => {
    console.log('RSVP:', attending ? '참석' : '불참');
    // 실제로는 서버로 데이터 전송
  };

  const handleShare = () => {
    console.log('청첩장 공유됨');
    // 실제로는 SNS 공유 API 호출
  };

  // 방명록 메시지 추가 핸들러
  const handleAddGuestMessage = (message: any) => {
    console.log('새 방명록 메시지:', message);
    // 실제로는 서버로 메시지 저장
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* 전체 컨테이너 */}
      <div className="max-w-md mx-auto bg-white shadow-lg">
        
        {/* 1. 웨딩 헤더 섹션 */}
        <WeddingHeader
          brideName={weddingInfo.brideName}
          groomName={weddingInfo.groomName}
          weddingDate={`${weddingInfo.weddingDate.replace(/-/g, '년 ').replace(/년 (\d+)년/, '년 $1월 ')}일`}
          weddingTime={weddingInfo.weddingTime}
          message={weddingInfo.message}
        />

        {/* 2. 웨딩 날짜 섹션 */}
        <WeddingDate
          weddingDate={weddingInfo.weddingDate}
          weddingTime={weddingInfo.weddingTime}
          venue={weddingInfo.venue}
        />

        {/* 3. 커플 정보 섹션 */}
        <CoupleInfo
          groomInfo={groomInfo}
          brideInfo={brideInfo}
        />

        {/* 4. 갤러리 섹션 */}
        <Gallery
          images={sampleGalleryImages}
          title="📷 Our Love Story 📸"
        />

        {/* 5. 위치 안내 섹션 */}
        <Location
          locationInfo={sampleLocationInfo}
          title="🗺️ 오시는 길"
        />

        {/* 6. 연락처 & RSVP 섹션 */}
        <Contact
          groomContacts={sampleGroomContacts}
          brideContacts={sampleBrideContacts}
          onRSVP={handleRSVP}
          onShare={handleShare}
        />

        {/* 7. 방명록 섹션 */}
        <GuestBook
          messages={sampleGuestMessages}
          onAddMessage={handleAddGuestMessage}
          title="💌 축하 메시지"
        />

        {/* 8. 마무리 인사 섹션 */}
        <ThankYou
          groomName={weddingInfo.groomName}
          brideName={weddingInfo.brideName}
          weddingDate={weddingInfo.weddingDate}
          weddingTime={weddingInfo.weddingTime}
          venue={weddingInfo.venue}
        />
        
      </div>

      {/* 배경 음악 플레이어 (플로팅) */}
      <BackgroundMusic
        tracks={sampleMusicTracks}
        autoPlay={false} // 사용자 경험을 위해 자동재생 비활성화
        defaultVolume={0.3}
        showPlayer={true}
      />
    </div>
  );
};

export default Home;