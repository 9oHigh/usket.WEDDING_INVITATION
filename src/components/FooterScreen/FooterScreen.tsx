// src/components/FooterSection/FooterSection.tsx
import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    // Kakao SDK 로드 확인
    const checkKakao = setInterval(() => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
        setKakaoReady(true);
        clearInterval(checkKakao);
      } else if (window.Kakao && window.Kakao.isInitialized()) {
        setKakaoReady(true);
        clearInterval(checkKakao);
      }
    }, 100);

    return () => clearInterval(checkKakao);
  }, []);

  // 링크 복사
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 카카오톡 커스텀 템플릿 공유
  const handleKakaoShare = () => {
    if (!kakaoReady || !window.Kakao) {
      alert("카카오톡 공유 기능을 불러오는 중입니다.");
      return;
    }

    try {
      window.Kakao.Share.sendCustom({
        templateId: parseInt(process.env.REACT_APP_KAKAO_TEMPLATE_ID || "0"),
        templateArgs: {},
      });
    } catch (error) {
      console.error("Kakao share error:", error);
      alert("카카오톡 공유 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="relative w-full bg-[#F5EFE6] py-16 px-8">
      <div className="max-w-md mx-auto">
        {/* Thank You 메시지 */}
        <div className="text-center mb-12">
          <h3 className="font-cafe24 text-2xl text-gray-700 mb-4">Thank You</h3>
          <p className="font-cafe24 text-sm text-gray-600 leading-relaxed">
            소중한 시간 내어 참석해 주시는
            <br />
            모든 분들께 감사드립니다.
          </p>
        </div>

        {/* 공유하기 버튼 */}
        <div className="mb-12">
          <h4 className="font-cafe24 text-center text-gray-600 mb-4 text-sm">
            청첩장 공유하기
          </h4>
          <div className="flex justify-center gap-4">
            {/* 카카오톡 공유 버튼 */}
            <button
              onClick={handleKakaoShare}
              disabled={!kakaoReady}
              className="flex flex-col items-center justify-center w-16 h-16 bg-[#FEE500] rounded-full hover:bg-[#FDD835] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="카카오톡 공유"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 6C10.477 6 6 9.582 6 14c0 2.891 1.889 5.419 4.719 6.891-.197.725-.638 2.419-.731 2.809-.113.469.169.463.356.337.15-.1 2.419-1.65 3.4-2.325.731.1 1.481.163 2.256.163 5.523 0 10-3.582 10-8S21.523 6 16 6z"
                  fill="#3C1E1E"
                />
              </svg>
            </button>
          </div>

          {copied && (
            <p className="text-center text-sm text-green-600 mt-3 font-cafe24">
              ✓ 링크가 복사되었습니다!
            </p>
          )}
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 mb-8"></div>

        {/* Made by */}
        <div className="text-center text-gray-500 text-xs space-y-2">
          <p className="font-cafe24">
            Made with{" "}
            <span className="text-red-400 inline-block animate-pulse">♥</span>{" "}
            by
          </p>
          <p className="font-cafe24 text-gray-400">경후 & 유진</p>
          <p className="font-cafe24 text-gray-400 text-[10px] mt-4">
            © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
