// src/components/MainScreen/MainScreen.tsx
import React, { useEffect, useState } from "react";

interface MainScreenProps {
  backgroundImage: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
}

const MainScreen: React.FC<MainScreenProps> = ({
  backgroundImage,
  weddingDate,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ 날짜 파싱 개선
  const parseDate = (dateString: string) => {
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 월은 0부터 시작
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const date = parseDate(weddingDate);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();

  // 날짜가 유효한지 확인
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", weddingDate);
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full h-[100lvh] max-w-[720px] mx-auto">
        {/* 🔹 배경 이미지 */}
        <img
          src={backgroundImage}
          alt="Wedding Background"
          className="w-full h-full object-cover"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* 🔹 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black/25" />

        {/* 🔹 Getting 텍스트 */}
        <span
          className={`absolute text-white font-blacksWord font-light transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            bottom: "37.5%",
            left: "15%",
            fontSize: "clamp(60px, 10vw, 120px)",
            lineHeight: 1.2,
            willChange: "opacity",
          }}
        >
          Getting
        </span>

        {/* 🔹 Married 텍스트 */}
        <span
          className={`absolute text-white font-blacksWord text-right transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            bottom: "22.5%",
            right: "15%",
            fontSize: "clamp(60px, 10vw, 120px)",
            lineHeight: 1,
            willChange: "opacity",
          }}
        >
          Married
        </span>

        {/* 🔹 날짜 + 인디케이터 */}
        <div
          className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] text-white transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity" }}
        >
          {/* 🔹 날짜 */}
          <div className="flex justify-between text-[4vw] sm:text-xl font-light tracking-widest">
            <span className="font-semibold">{day}TH</span>
            <span className="font-semibold">{month}</span>
            <span className="font-semibold">{year}</span>
          </div>

          {/* 🔹 인디케이터 */}
          <div
            className={`mt-3 flex justify-center animate-bounce transition-opacity duration-1000 delay-1000 ${
              isVisible ? "opacity-60" : "opacity-0"
            }`}
          >
            <svg
              className="w-[5vw] h-[5vw] max-w-6 max-h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainScreen;
