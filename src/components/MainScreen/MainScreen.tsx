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
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  // 🔹 100vh 버그 해결 - resize 시 업데이트
  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight * 0.01);
    };

    updateVh(); // 최초 1회 실행
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 날짜 파싱
  const parseDate = (dateString: string) => {
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const date = parseDate(weddingDate);
  const day = date.getDate();
  const month = "Jan";
  const year = date.getFullYear();

  if (isNaN(date.getTime())) {
    console.error("Invalid date:", weddingDate);
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#F5EFE6]">
      <div
        className="relative w-full max-w-[720px] mx-auto"
        style={{ height: `calc(${vh}px * 100)` }} // ← 100vh 대체
      >
        {/* 배경 이미지 */}
        <img
          src={backgroundImage}
          alt="Wedding Background"
          className="w-full h-full object-cover"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Getting 텍스트 */}
        <span
          className={`absolute text-white font-andreaBellarosa font-light transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            bottom: "37.5%",
            left: "5%",
            fontSize: "clamp(80px, 10vw, 120px)",
            lineHeight: 1.2,
            willChange: "opacity",
          }}
        >
          We're getting
        </span>

        {/* Married 텍스트 */}
        <span
          className={`absolute text-white font-andreaBellarosa text-right transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            bottom: "22.5%",
            right: "10%",
            fontSize: "clamp(80px, 10vw, 120px)",
            lineHeight: 1,
            willChange: "opacity",
          }}
        >
          Married
        </span>

        {/* 날짜 + 인디케이터 */}
        <div
          className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] text-white transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity" }}
        >
          <div className="flex justify-between text-[4vw] sm:text-xl font-light tracking-widest">
            <span className="font-semibold">{day}th</span>
            <span className="font-semibold">{month}</span>
            <span className="font-semibold">{year}</span>
          </div>

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
