// src/pages/Home/Home.tsx (4단계 업데이트)
import React from 'react';
import WeddingHeader from '../../components/WeddingHeader/WeddingHeader';
import WeddingDate from '../../components/WeddingDate/WeddingDate';
import CoupleInfo from '../../components/CoupleInfo/CoupleInfo';
import Gallery from '../../components/Gallery/Gallery';
import { sampleGalleryImages } from '../../data/galleryImages';

const Home: React.FC = () => {
  // 결혼식 정보 (나중에 별도 파일로 분리할 예정)
  const weddingInfo = {
    brideName: '김예쁘',
    groomName: '이잘생',
    weddingDate: '2024-12-25', // YYYY-MM-DD 형식
    weddingTime: '오후 2시',
    venue: '서울웨딩홀',
    message: '평생을 함께할 우리의 소중한 시작에 함께해주세요',
  };

  // 신랑신부 상세 정보
  const groomInfo = {
    name: weddingInfo.groomName,
    role: 'groom' as const,
    description:
      '따뜻한 마음과 성실한 모습으로 가정을 이끌어갈 멋진 남자입니다. 항상 웃음을 잃지 않으며 주변 사람들에게 힘이 되어주는 사람입니다.',
    phone: '010-1234-5678', // 실제로는 진짜 번호를 넣거나 제거
    relation: '이철수 • 김영희의 아들',
  };

  const brideInfo = {
    name: weddingInfo.brideName,
    role: 'bride' as const,
    description:
      '밝고 긍정적인 에너지로 모든 사람을 행복하게 만드는 아름다운 여성입니다. 사랑과 배려가 넘치는 따뜻한 마음의 소유자입니다.',
    phone: '010-8765-4321', // 실제로는 진짜 번호를 넣거나 제거
    relation: '김대수 • 박미영의 딸',
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
        <CoupleInfo groomInfo={groomInfo} brideInfo={brideInfo} />

        {/* 4. 갤러리 섹션 */}
        <Gallery images={sampleGalleryImages} title="📷 Our Love Story 📸" />

        {/* 5. 위치 안내 섹션 (아직 컴포넌트로 분리 안함 - 5단계에서 할 예정) */}
        <section className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="text-center w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
              <span className="mr-3">📍</span>
              오시는 길<span className="ml-3">🗺️</span>
            </h2>

            {/* 예시 지도 영역 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <div className="text-sm">지도가 여기에 표시됩니다</div>
                </div>
              </div>

              <div className="text-left space-y-3">
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">📍</span>
                  <div>
                    <div className="font-medium text-gray-800">{weddingInfo.venue}</div>
                    <div className="text-sm text-gray-600">서울시 강남구 예시로 123</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">🚇</span>
                  <div>
                    <div className="font-medium text-gray-700">지하철</div>
                    <div className="text-sm text-gray-600">2호선 강남역 3번 출구 도보 5분</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">🚗</span>
                  <div>
                    <div className="font-medium text-gray-700">주차</div>
                    <div className="text-sm text-gray-600">건물 지하 1-3층 (3시간 무료)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                📱 길찾기
              </button>
              <button className="flex-1 py-3 bg-white border-2 border-amber-300 text-amber-700 rounded-xl font-medium hover:bg-amber-50 transition-all duration-300">
                📋 복사하기
              </button>
            </div>
          </div>
        </section>

        {/* 더 많은 섹션들이 추가될 예정... */}
      </div>
    </div>
  );
};

export default Home;
