// src/components/DateScreen/DateScreen.tsx
import React, { useEffect, useState } from "react";

interface DateScreenProps {
  weddingDate: string;
  weddingTime: string;
  groomName: string;
  brideName: string;
}

const DateScreen: React.FC<DateScreenProps> = ({
  weddingDate,
  weddingTime,
  groomName,
  brideName,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ✅ 안전한 날짜 파싱 함수 추가
  const parseDate = (dateString: string) => {
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  // 실시간 카운트다운 계산
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const wedding = parseDate(weddingDate); // ✅ 변경
      wedding.setHours(11, 10, 0, 0); // 결혼식 시간 설정

      const timeDiff = wedding.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  // 스크롤 인터섹션 효과
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("date-section");
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // ✅ 날짜 파싱 - parseDate 사용
  const date = parseDate(weddingDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "long" });

  // 캘린더 생성
  const generateCalendar = () => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const isWeddingDay = i === date.getDate();
      const isSunday =
        new Date(date.getFullYear(), date.getMonth(), i).getDay() === 0;

      days.push(
        <div
          key={i}
          className={`h-10 flex items-center justify-center ${
            isWeddingDay
              ? "bg-red-400 text-white rounded-full w-10 h-10 mx-auto font-medium"
              : isSunday
              ? "text-red-400"
              : "text-gray-600"
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <section
      id="date-section"
      className="bg-[#F5EFE6] relative w-full flex flex-col justify-center items-center px-8 py-20"
    >
      <div className="w-full max-w-md">
        {/* 날짜 표시 */}
        <div
          className={`text-center mb-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-cafe24 font-semibold text-gray-700 mb-3 tracking-wide">
            {year}.{month}.{day}
          </h2>
          <p className="font-cafe24 font-medium text-base text-gray-500 tracking-wide">
            {dayOfWeek} {weddingTime}
          </p>
        </div>

        {/* 구분선 */}
        <div
          className={`w-full h-px bg-gray-300 mb-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        ></div>

        {/* 캘린더 */}
        <div
          className={`w-full mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-light ${
                  index === 0 ? "text-red-400" : "text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-2">{generateCalendar()}</div>
        </div>

        {/* 구분선 */}
        <div
          className={`w-full h-px bg-gray-300 mb-8 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        ></div>

        {/* 카운트다운 타이머 */}
        <div
          className={`text-center mb-8 
             delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex justify-center gap-4">
            {/* DAYS */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-2 tracking-wider">
                DAYS
              </span>
              <div className="bg-[#E4D4C8] rounded-lg w-14 h-14 flex items-center justify-center text-white text-2xl font-cafe24 tabular-nums">
                {timeLeft.days}
              </div>
            </div>

            {/* HOURS */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-2 tracking-wider">
                HOUR
              </span>
              <div className="bg-[#E4D4C8] rounded-lg w-14 h-14 flex items-center justify-center text-white text-2xl font-cafe24 tabular-nums">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
            </div>

            {/* MINUTES */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-2 tracking-wider">
                MIN
              </span>
              <div className="bg-[#E4D4C8] rounded-lg w-14 h-14 flex items-center justify-center text-white text-2xl font-cafe24 tabular-nums">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
            </div>

            {/* SECONDS */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-2 tracking-wider">
                SEC
              </span>
              <div className="bg-[#E4D4C8] rounded-lg w-14 h-14 flex items-center justify-center text-white text-2xl font-cafe24 tabular-nums">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <div
          className={`text-center text-gray-600 text-sm transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p>
            <span className="font-cafe24">{groomName} </span>
            <span className="text-rose-500">♥</span>
            <span className="font-cafe24"> {brideName}의 결혼식이</span>{" "}
            <span className="font-cafe24">{timeLeft.days}일 남았습니다.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DateScreen;
