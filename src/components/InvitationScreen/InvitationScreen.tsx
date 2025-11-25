// src/components/InvitationScreen/InvitationScreen.tsx
import React, { useEffect, useState } from "react";
import introImage from "../../assets/images/intro-image.jpeg";

interface ParentInfo {
  father: string;
  mother: string | null;
}

interface InvitationScreenProps {
  groomName: string;
  brideName: string;
  groomParents: ParentInfo;
  brideParents: ParentInfo;
  message?: string;
}

const InvitationScreen: React.FC<InvitationScreenProps> = ({
  groomName,
  brideName,
  groomParents,
  brideParents,
  message = "친구로, 연인으로 걸어온 열 해의 여정\n\n이제는 부부로서 또 다른 내일을 맞이하려 합니다.\n\n그 시작을 축복으로 채워 주시면 감사하겠습니다.",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("invitation-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="invitation-section"
      className="w-full flex flex-col justify-center items-center bg-[#F5EFE6] px-8 py-20"
    >
      {/* Invitation 타이틀 */}
      <div
        className={`text-center mb-12  ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-m font-cafe24 text-gray-600 mb-2 tracking-wide">
          INVITATION
        </h2>

        {/* 소중한 분들을 초대합니다 */}
        <p className="font-cafe24 text-l font-bold text-gray-800 mb-0">
          소중한 분들을 초대합니다
        </p>
      </div>

      {/* 인사말 */}
      <div
        className={`text-center mb-12 max-w-md  delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="font-cafe24 text-gray-700 leading-relaxed whitespace-pre-line text-sm">
          {message}
        </p>
      </div>

      {/* 사진 - 고정 비율 유지 */}
      <div
        className={`mb-8 w-[80vw] max-w-md relative rounded-lg overflow-hidden shadow-lg  delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* ✅ 배경 이미지 */}
        <img
          src={introImage}
          alt="Invitation"
          className="w-full h-full object-cover"
          style={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        />

        {/* ✅ 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 부모님 정보 */}
      <div
        className={`w-full max-w-sm space-y-6  delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* 신랑측 */}
        <div className="font-cafe24 text-center text-gray-800">
          <span className="text-m">
            {groomParents.father}
            {groomParents.mother ? ` · ${groomParents.mother}` : ""}의 장남
          </span>{" "}
          <span className="font-semibold">{groomName}</span>
        </div>

        {/* 신부측 */}
        <div className="font-cafe24 text-center text-gray-800">
          <span className="text-m">
            {brideParents.father}
            {brideParents.mother ? ` · ${brideParents.mother}` : ""}의 장녀
          </span>{" "}
          <span className="font-semibold">{brideName}</span>
        </div>
      </div>
    </section>
  );
};

export default InvitationScreen;
