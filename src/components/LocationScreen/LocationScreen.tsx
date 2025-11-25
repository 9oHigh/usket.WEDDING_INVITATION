// src/components/LocationScreen/LocationScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import naverMapLogo from "../../assets/images/naver-map-logo.png";
import tmapLogo from "../../assets/images/t-map-logo.png";
import kakaoMapLogo from "../../assets/images/kakao-map-logo.png";

interface LocationScreenProps {
  venueName: string;
  venueAddress: string;
  venueDetail?: string;
  latitude: number;
  longitude: number;
  phone?: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

const LocationScreen: React.FC<LocationScreenProps> = ({
  venueName,
  venueAddress,
  latitude,
  longitude,
  phone,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    );
    const el = document.getElementById("location-section");
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const existingScript = document.getElementById("naver-map-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_KEY}`;
    script.async = true;

    script.onload = () => {
      if (!mapRef.current || !window.naver) return;
      const loc = new window.naver.maps.LatLng(latitude, longitude);
      const map = new window.naver.maps.Map(mapRef.current, {
        center: loc,
        zoom: 17,
      });
      new window.naver.maps.Marker({ position: loc, map, title: venueName });
    };

    document.head.appendChild(script);
  }, [latitude, longitude, venueName]);

  const openNaverMap = () =>
    window.open(
      `nmap://place?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(
        venueName
      )}&appname=com.wedding.invitation`,
      "_blank"
    );

  const openTmap = () =>
    window.open(
      `tmap://route?goalname=${encodeURIComponent(
        venueName
      )}&goalx=${longitude}&goaly=${latitude}`,
      "_blank"
    );

  const openKakaoNavi = () =>
    window.open(
      `kakaomap://route?ep=${latitude},${longitude}&by=CAR`,
      "_blank"
    );
  {
    /*
    이거 아이콘 주소임 넣어줘야함
    <a href="https://www.flaticon.com/kr/free-icons/" title="public transport 아이콘">public transport 아이콘 아이콘 제작자: Freepik - Flaticon</a> */
  }
  return (
    <section
      id="location-section"
      className="w-full flex flex-col justify-center items-center px-6 py-20 bg-[#F5EFE6]"
    >
      <div className="w-full max-w-2xl">
        {/* 타이틀 */}
        <div
          className={`text-center mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-sm font-cafe24 text-gray-500 mb-1 tracking-widest">
            LOCATION
          </h2>
          <h2 className="text-xl font-cafe24 font-bold text-gray-800">
            오시는 길
          </h2>

          {/* 장소 정보 */}
          <p className="text-base text-gray-900 font-cafe24 mt-5">
            {venueName}
          </p>
          <p className="text-xs text-gray-500 font-cafe24 mt-2">
            {venueAddress}
          </p>
        </div>

        {/* ✅ 지도 + 버튼을 하나의 카드로 묶음 */}
        <div
          className={`rounded-3xl shadow-xs bg-[#E4D4C8] overflow-hidden transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* 지도 영역 */}
          <div ref={mapRef} className="w-full h-72" />

          {/* 버튼 영역 */}
          <div className="flex justify-center items-center">
            {[
              { logo: naverMapLogo, text: "네이버지도", onClick: openNaverMap },
              { logo: tmapLogo, text: "티맵", onClick: openTmap },
              {
                logo: kakaoMapLogo,
                text: "카카오내비",
                onClick: openKakaoNavi,
              },
            ].map(({ logo, text, onClick }, i, arr) => (
              <React.Fragment key={i}>
                <button
                  onClick={onClick}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-[#E4D4C8] transition-colors rounded-lg"
                >
                  <img
                    src={logo}
                    alt={text}
                    className="w-5 h-6 object-contain opacity-90" // 🔹 아이콘 크기 살짝 줄임
                  />
                  <span className="text-[12px] text-gray-700 font-cafe24">
                    {text}
                  </span>
                </button>
                {/* 버튼 사이에만 얇은 텍스트 구분선 표시 */}
                {i < arr.length - 1 && (
                  <span className="mx-1 text-gray-300 text-sm">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* 교통 정보 - 세로 배치 */}
        <div
          className={` ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* 지하철 */}
          <div className="p-6">
            <h3 className="text-base font-cafe24 font-bold text-gray-800 mt-4 mb-4 flex items-center">
              <img
                src={require("../../assets/images/subway.png")}
                alt="지하철 아이콘"
                className="w-5 h-5 mr-2 object-contain"
              />
              지하철
            </h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-start space-x-3">
                {/* 우측 텍스트 */}
                <div className="flex flex-row">
                  <span className="font-cafe24 text-gray-900 text-sm">
                    8호선 천호역 10번 출구 도보 약 5분
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 버스 */}
          <div className="p-6">
            <h3 className="text-base font-cafe24 font-bold text-gray-800 mb-4 flex items-center">
              <img
                src={require("../../assets/images/bus.png")}
                alt="버스 아이콘"
                className="w-5 h-5 mr-2 object-contain"
              />
              버스
            </h3>

            {/* 🔹 좌측 정렬 고정 */}
            <div className="text-gray-700 text-left">
              <div className="flex flex-col space-y-1">
                <span className="font-cafe24 text-gray-900 text-sm">
                  간선 - 30-3, 3214, 3216, 3220, 3315
                </span>
                <span className="font-cafe24 text-gray-900 text-sm">
                  지선 - 4211, 4212, 4213, 4214
                </span>
                <span className="font-cafe24 text-gray-900 text-sm">
                  직행 - 1100, 1200, 1300, 1400
                </span>
              </div>
            </div>
          </div>

          {/* 자가용 */}
          <div className="p-6">
            <h3 className="text-base font-cafe24 font-bold text-gray-800 mb-4 flex items-center">
              <img
                src={require("../../assets/images/car.png")}
                alt="자가용 아이콘"
                className="w-5 h-5 mr-2 object-contain"
              />
              자가용
            </h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-start space-x-3">
                {/* 우측 텍스트 */}
                <div className="flex flex-row">
                  <span className="font-cafe24 text-gray-900 text-sm">
                    “라비니움 리츄얼홀” 또는 서울시 강동구 천호대로 1017
                  </span>
                </div>
              </div>
            </div>
            <div className="text-left mt-4">
              <span className="font-cafe24 text-base">주차안내</span>
              <p className="font-cafe24 text-gray-900 text-sm mt-2">
                ※ 웨딩홀 주차장이 협소하여 공영주차장 이용 부탁드립니다.
                <br />
                <br />
                ※ 서울시 강동구 천호대로 1026-1(성내동 57-12) 혹은 천호역 6번
                출구 앞 “천호역 공영주차장” 지하 1층과 2층 이용해주시면
                감사하겠습니다.
                <br />
                <br />※ 공영주차장 셔틀버스 상시 운행 <br />- A~D 기둥 20-60번
                사이 탑승가능
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationScreen;
