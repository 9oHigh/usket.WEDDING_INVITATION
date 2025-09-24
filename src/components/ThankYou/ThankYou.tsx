// src/components/ThankYou/ThankYou.tsx
import React, { useEffect, useState } from 'react';

interface ThankYouProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  message?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  venue,
  message = "소중한 분들의 축복 속에서 아름다운 사랑의 결실을 맺고자 합니다. 오셔서 저희의 새로운 시작을 함께 축하해 주시면 더없는 기쁨이겠습니다."
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Intersection Observer로 스크롤 애니메이션
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 하트 애니메이션을 조금 늦게 시작
          setTimeout(() => setShowHearts(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('thank-you-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // 날짜 포맷팅
  const formatDisplayDate = (dateString: string): string => {
    return dateString.replace(/-/g, '년 ').replace(/년 (\d+)년/, '년 $1월 ') + '일';
  };

  return (
    <section 
      id="thank-you-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden"
    >
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 text-rose-200 text-5xl animate-pulse delay-100">🌹</div>
        <div className="absolute top-32 right-6 text-pink-200 text-4xl animate-bounce delay-300">💐</div>
        <div className="absolute bottom-40 left-4 text-purple-200 text-6xl animate-pulse delay-500">💕</div>
        <div className="absolute bottom-24 right-12 text-rose-200 text-3xl animate-bounce delay-700">🌸</div>
        <div className="absolute top-1/2 left-2 text-pink-200 text-4xl animate-pulse delay-900">💖</div>
        <div className="absolute top-1/3 right-2 text-purple-200 text-5xl animate-bounce delay-1100">✨</div>
      </div>

      <div className="max-w-sm w-full z-10">
        
        {/* 메인 제목 */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text mb-4">
            💕 감사합니다 💕
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* 메인 카드 */}
        <div className={`bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-pink-200 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
        }`}>
          
          {/* 웨딩 아이콘 */}
          <div className={`text-center mb-6 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            <div className="text-6xl mb-4">💒</div>
          </div>

          {/* 커플 이름 */}
          <div className={`text-center mb-6 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {groomName} ❤️ {brideName}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          </div>

          {/* 감사 메시지 */}
          <div className={`mb-6 transform transition-all duration-1000 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-700 leading-relaxed text-center">
              "{message.split('.').map((sentence, index) => (
                sentence.trim() && (
                  <React.Fragment key={index}>
                    {sentence.trim()}.<br/>
                    {index === 0 && <br/>}
                  </React.Fragment>
                )
              ))}"
            </p>
          </div>

          {/* 결혼식 정보 요약 */}
          <div className={`text-center mb-6 transform transition-all duration-1000 delay-1100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-4 rounded-xl border border-pink-200">
              <p className="text-sm text-gray-600 mb-1">
                {formatDisplayDate(weddingDate)} {weddingTime}
              </p>
              <p className="text-sm text-gray-600">{venue}</p>
            </div>
          </div>

          {/* 하트 애니메이션 */}
          <div className={`flex justify-center space-x-4 text-2xl transform transition-all duration-1000 delay-1300 ${
            showHearts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <span className="animate-bounce delay-100">💐</span>
            <span className="animate-bounce delay-200">🌸</span>
            <span className="animate-bounce delay-300">💕</span>
            <span className="animate-bounce delay-400">🌺</span>
            <span className="animate-bounce delay-500">💖</span>
          </div>
        </div>

        {/* 서명 */}
        <div className={`text-center mt-8 transform transition-all duration-1000 delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-gray-600 text-sm mb-2">
            {groomName} & {brideName}
          </div>
          <div className="text-xs text-gray-500">
            © 2024 Wedding Invitation
          </div>
        </div>

        {/* 플로팅 하트들 (선택적 애니메이션) */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`absolute animate-pulse text-2xl text-pink-300 opacity-70`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                💕
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ThankYou;