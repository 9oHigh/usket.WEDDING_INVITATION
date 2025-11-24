// src/pages/Home/Home.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import BackgroundMusic from "../../components/BackgroundMusic/BackgroundMusic";
import { weddingMusicSrc } from "../../data/musicData";
import MainScreen from "../../components/MainScreen/MainScreen";

import mainBgImage2 from "../../assets/images/main-bg.png";
import InvitationScreen from "../../components/InvitationScreen/InvitationScreen";
import DateScreen from "../../components/DateScreen/DateScreen";
import LocationScreen from "../../components/LocationScreen/LocationScreen";
import { weddingGalleryImages } from "../../data/galleryData";
import GalleryScreen from "../../components/GalleryScreen/GalleryScreen";
import AccountScreen from "../../components/AccountScreen/AccountScreen";
import { brideAccountData, groomAccountData } from "../../data/accountData";
import FooterSection from "../../components/FooterScreen/FooterScreen";

const Home: React.FC = () => {
  const weddingInfo = {
    brideName: "김유진",
    groomName: "이경후",
    weddingDate: "2026-01-31",
    weddingTime: "오전 11시 10분",
    venue: "라비니움 리츄얼홀",
    message: "평생을 함께할 우리의 소중한 시작에 함께해주세요.",
  };

  const groomParents = {
    father: "이금철",
    mother: null,
  };

  const brideParents = {
    father: "김종태",
    mother: "박효경",
  };

  return (
    <div className="bg-[#F5EFE6]">
      {/* 1. 메인 화면 */}
      <MainScreen
        backgroundImage={mainBgImage2}
        brideName={weddingInfo.brideName}
        groomName={weddingInfo.groomName}
        weddingDate={weddingInfo.weddingDate}
      />
      {/* 2. 초대장 화면 */}
      <InvitationScreen
        groomName={"경후"}
        brideName={"유진"}
        groomParents={groomParents}
        brideParents={brideParents}
      />
      {/* 3. 날짜 및 카운트다운 화면 */}
      <DateScreen
        weddingDate={weddingInfo.weddingDate}
        weddingTime={weddingInfo.weddingTime}
        groomName={weddingInfo.groomName}
        brideName={weddingInfo.brideName}
      />
      {/* 4. 갤러리 화면 */}
      <GalleryScreen images={weddingGalleryImages} />

      {/* 5. 오시는 길 화면 */}
      <LocationScreen
        venueName="라비니움 리츄얼홀"
        venueAddress="서울 강동구 천호대로 1017"
        venueDetail="라비니움 웨딩홀 3층"
        latitude={37.5384705}
        longitude={127.1224449}
        phone="02-476-7000"
      />
      {/* 6. 계좌 정보 화면 */}
      <AccountScreen />
      <BackgroundMusic
        src={weddingMusicSrc}
        autoPlay={true}
        defaultVolume={0.3}
        fadeInDuration={4500} // 4.5초 페이드인 (원하시면 5000으로 변경)
      />
      {/* 7. 푸터 화면 */}
      <FooterSection />
    </div>
  );
};

export default Home;
