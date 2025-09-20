// src/components/WeddingHeader/WeddingHeader.tsx
import React, { useEffect, useState } from 'react';

// TypeScript 타입 정의 (Flutter의 클래스 속성과 비슷)
interface WeddingHeaderProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  message?: string; // 옵셔널 속성 (Flutter의 nullable과 비슷)
}

const WeddingHeader: React.FC<WeddingHeaderProps> = ({
  brideName,
  groomName,
  weddingDate,
  weddingTime,
  message = '우리의 소중한 날에 함께해주세요',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Flutter의 initState()와 비슷한 역할
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer); // Flutter의 dispose()와 비슷
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-pink-200 text-6xl animate-pulse">🌸</div>
        <div className="absolute top-20 right-16 text-purple-200 text-4xl animate-bounce delay-100">
          💕
        </div>
        <div className="absolute bottom-32 left-8 text-blue-200 text-5xl animate-pulse delay-200">
          🌺
        </div>
        <div className="absolute bottom-20 right-12 text-pink-200 text-3xl animate-bounce delay-300">
          💖
        </div>
        <div className="absolute top-1/2 left-4 text-purple-200 text-4xl animate-pulse delay-500">
          🌹
        </div>
        <div className="absolute top-1/3 right-4 text-blue-200 text-3xl animate-bounce delay-700">
          💐
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className={`text-center z-10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* 타이틀 */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text mb-4 animate-pulse">
            💕 Wedding Invitation 💕
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* 메시지 */}
        <p
          className={`text-lg text-gray-600 mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {message}
        </p>

        {/* 신랑신부 이름 */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤵🏻</span>
              </div>
              <p className="text-xl font-semibold text-blue-700">{groomName}</p>
            </div>

            <div className="flex items-center justify-center mx-6">
              <div className="text-3xl animate-pulse text-red-400">❤️</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg">
                <span className="text-2xl">👰🏻</span>
              </div>
              <p className="text-xl font-semibold text-pink-700">{brideName}</p>
            </div>
          </div>
        </div>

        {/* 결혼식 정보 */}
        <div
          className={`bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white border-opacity-50 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-2xl font-bold text-purple-800 mb-2">{weddingDate}</p>
          <p className="text-lg text-gray-700 font-medium">{weddingTime}</p>
        </div>

        {/* 스크롤 안내 */}
        <div
          className={`mt-12 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="animate-bounce">
            <p className="text-sm text-gray-500 mb-2">아래로 스크롤해주세요</p>
            <div className="text-2xl">👇</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHeader;
