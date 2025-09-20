// src/components/Location/Location.tsx
import React, { useEffect, useState } from 'react';

// 위치 정보 타입 정의
interface LocationInfo {
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  parking?: string;
  subway?: TransportInfo[];
  bus?: TransportInfo[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface TransportInfo {
  line: string;
  station: string;
  exit: string;
  walkTime: string;
  color?: string; // 지하철 노선 색상
}

interface LocationProps {
  locationInfo: LocationInfo;
  title?: string;
}

// 개별 교통수단 정보 컴포넌트
const TransportCard: React.FC<{
  icon: string;
  title: string;
  items: TransportInfo[];
  type: 'subway' | 'bus';
}> = ({ icon, title, items, type }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className="flex items-center mb-3">
        <span className="text-xl mr-2">{icon}</span>
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center text-sm">
            {type === 'subway' && (
              <div
                className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: item.color || '#666' }}
              >
                {item.line}
              </div>
            )}
            <div className="flex-1">
              <span className="font-medium">{item.station}</span>
              <span className="text-gray-600 ml-1">
                {item.exit} • 도보 {item.walkTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 복사 버튼 컴포넌트
const CopyButton: React.FC<{ text: string; label: string }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-white border-2 border-amber-300 text-amber-700 hover:bg-amber-50'
      }`}
    >
      {copied ? '✅ 복사완료!' : `📋 ${label}`}
    </button>
  );
};

const Location: React.FC<LocationProps> = ({ locationInfo, title = '📍 오시는 길' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer로 스크롤 애니메이션
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const element = document.getElementById('location-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // 카카오맵 링크 생성
  const getKakaoMapLink = () => {
    const query = encodeURIComponent(`${locationInfo.name} ${locationInfo.address}`);
    return `https://map.kakao.com/link/search/${query}`;
  };

  // 네이버 지도 링크 생성
  const getNaverMapLink = () => {
    const query = encodeURIComponent(`${locationInfo.name} ${locationInfo.address}`);
    return `https://map.naver.com/v5/search/${query}`;
  };

  // 구글 지도 링크 생성
  const getGoogleMapLink = () => {
    const query = encodeURIComponent(`${locationInfo.name} ${locationInfo.address}`);
    return `https://www.google.com/maps/search/${query}`;
  };

  // 전화 걸기
  const handleCall = () => {
    if (locationInfo.phone) {
      window.location.href = `tel:${locationInfo.phone}`;
    }
  };

  return (
    <section
      id="location-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 text-amber-200 text-4xl animate-bounce delay-100">
          🗺️
        </div>
        <div className="absolute top-32 right-6 text-orange-200 text-5xl animate-pulse delay-300">
          📍
        </div>
        <div className="absolute bottom-40 left-4 text-red-200 text-3xl animate-bounce delay-500">
          🚇
        </div>
        <div className="absolute bottom-24 right-12 text-amber-200 text-4xl animate-pulse delay-700">
          🚗
        </div>
        <div className="absolute top-1/2 left-2 text-orange-200 text-3xl animate-bounce delay-900">
          🏢
        </div>
      </div>

      <div className="max-w-md w-full z-10">
        {/* 섹션 제목 */}
        <div
          className={`text-center mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text mb-4">
            {title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">소중한 분들을 모시는 곳입니다</p>
        </div>

        {/* 메인 정보 카드 */}
        <div
          className={`bg-white rounded-3xl shadow-2xl p-6 mb-6 border border-orange-100 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          {/* 장소명 */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <span className="mr-2">🏛️</span>
              {locationInfo.name}
            </h3>
            <div className="text-gray-600">
              <p className="mb-1">{locationInfo.address}</p>
              {locationInfo.detailAddress && (
                <p className="text-sm text-gray-500">({locationInfo.detailAddress})</p>
              )}
            </div>
          </div>

          {/* 지도 영역 (실제로는 카카오맵 API나 구글맵 API 사용) */}
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <div className="text-sm">지도 API 연동 예정</div>
              <div className="text-xs text-gray-400 mt-1">
                {locationInfo.coordinates &&
                  `위도: ${locationInfo.coordinates.lat}, 경도: ${locationInfo.coordinates.lng}`}
              </div>
            </div>

            {/* 지도 위 마커 애니메이션 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-bounce">
                <div className="text-3xl text-red-500">📍</div>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          {locationInfo.phone && (
            <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-orange-500 mr-3">📞</span>
                  <div>
                    <div className="font-medium text-gray-800">웨딩홀 연락처</div>
                    <div className="text-sm text-gray-600">{locationInfo.phone}</div>
                  </div>
                </div>
                <button
                  onClick={handleCall}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors duration-300"
                >
                  통화
                </button>
              </div>
            </div>
          )}

          {/* 주차 정보 */}
          {locationInfo.parking && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">🚗</span>
                <div>
                  <div className="font-medium text-gray-800 mb-1">주차 안내</div>
                  <div className="text-sm text-gray-600">{locationInfo.parking}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 교통수단 정보 */}
        <div
          className={`space-y-4 mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {/* 지하철 정보 */}
          {locationInfo.subway && locationInfo.subway.length > 0 && (
            <TransportCard icon="🚇" title="지하철" items={locationInfo.subway} type="subway" />
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <TransportCard icon="🚌" title="버스" items={locationInfo.bus} type="bus" />
          )}
        </div>

        {/* 액션 버튼들 */}
        <div
          className={`space-y-3 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {/* 지도 앱들 */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href={getKakaoMapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-yellow-500 text-white rounded-xl font-medium text-center hover:bg-yellow-600 transition-colors duration-300 shadow-lg"
            >
              🗺️ 카카오맵
            </a>
            <a
              href={getNaverMapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-green-500 text-white rounded-xl font-medium text-center hover:bg-green-600 transition-colors duration-300 shadow-lg"
            >
              🗺️ 네이버맵
            </a>
            <a
              href={getGoogleMapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-blue-500 text-white rounded-xl font-medium text-center hover:bg-blue-600 transition-colors duration-300 shadow-lg"
            >
              🗺️ 구글맵
            </a>
          </div>

          {/* 복사 버튼들 */}
          <div className="flex gap-3">
            <CopyButton text={`${locationInfo.name}\n${locationInfo.address}`} label="주소 복사" />
            <CopyButton text={locationInfo.phone || '연락처 없음'} label="연락처 복사" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
