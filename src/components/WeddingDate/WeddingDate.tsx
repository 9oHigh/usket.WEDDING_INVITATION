// src/components/WeddingDate/WeddingDate.tsx
import React, { useEffect, useState } from 'react';

interface WeddingDateProps {
  weddingDate: string; // "2024-12-25" 형식
  weddingTime: string;
  venue?: string;
}

// D-Day 계산 함수 (Flutter의 DateTime 계산과 비슷)
const calculateDaysLeft = (targetDate: string): number => {
  const today = new Date();
  const wedding = new Date(targetDate);
  const timeDiff = wedding.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

// 날짜 포맷팅 함수
const formatDate = (
  dateString: string,
): { year: string; month: string; day: string; weekday: string } => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    weekday: date.toLocaleDateString('ko-KR', options),
  };
};

const WeddingDate: React.FC<WeddingDateProps> = ({
  weddingDate,
  weddingTime,
  venue = '웨딩홀',
}) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // 날짜 정보 파싱
  const dateInfo = formatDate(weddingDate);

  useEffect(() => {
    // D-Day 계산
    setDaysLeft(calculateDaysLeft(weddingDate));

    // Intersection Observer로 애니메이션 트리거 (스크롤 시 나타나는 효과)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const element = document.getElementById('wedding-date-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [weddingDate]);

  return (
    <section
      id="wedding-date-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-white via-blue-50 to-purple-50"
    >
      <div
        className={`text-center max-w-sm w-full transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* 섹션 제목 */}
        <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <span className="mr-3">🗓️</span>
          결혼식 날짜
          <span className="ml-3">🗓️</span>
        </h2>

        {/* 메인 날짜 카드 */}
        <div
          className={`bg-white p-8 rounded-3xl shadow-2xl border-2 border-purple-100 mb-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* 년도 */}
          <div className="text-purple-600 text-lg font-medium mb-2">{dateInfo.year}년</div>

          {/* 월/일 */}
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {dateInfo.month}.{dateInfo.day}
          </div>

          {/* 요일 */}
          <div className="text-lg text-purple-700 font-medium mb-4">{dateInfo.weekday}</div>

          {/* 구분선 */}
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-4"></div>

          {/* 시간 */}
          <div className="text-xl text-gray-700 font-medium">{weddingTime}</div>

          {/* 장소 (옵셔널) */}
          {venue && <div className="text-gray-600 mt-2">{venue}</div>}
        </div>

        {/* D-Day 카운터 */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl text-white">
            <div className="text-sm font-medium mb-2">💕 D-Day 💕</div>

            {daysLeft > 0 ? (
              <>
                <div className="text-4xl font-bold mb-1">{daysLeft}</div>
                <div className="text-sm">일 남았어요!</div>
              </>
            ) : daysLeft === 0 ? (
              <>
                <div className="text-3xl font-bold mb-1">🎉 Today 🎉</div>
                <div className="text-sm">드디어 오늘이에요!</div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold mb-1">💒 Married 💒</div>
                <div className="text-sm">행복한 부부가 되었어요!</div>
              </>
            )}
          </div>
        </div>

        {/* 장식 요소들 */}
        <div
          className={`mt-8 flex justify-center space-x-4 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="animate-bounce delay-100">💐</div>
          <div className="animate-bounce delay-200">💕</div>
          <div className="animate-bounce delay-300">🌸</div>
          <div className="animate-bounce delay-400">💖</div>
          <div className="animate-bounce delay-500">🌺</div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDate;
