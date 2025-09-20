// src/components/CoupleInfo/CoupleInfo.tsx
import React, { useEffect, useState } from 'react';

// 개인 정보 타입 정의
interface PersonInfo {
  name: string;
  role: 'groom' | 'bride';
  description: string;
  phone?: string;
  relation: string; // 예: "홍길동의 아들", "김철수의 딸"
  profileImage?: string; // 나중에 실제 사진으로 교체 가능
}

interface CoupleInfoProps {
  groomInfo: PersonInfo;
  brideInfo: PersonInfo;
}

// 개별 프로필 카드 컴포넌트
const ProfileCard: React.FC<{
  person: PersonInfo;
  isVisible: boolean;
  delay: number;
}> = ({ person, isVisible, delay }) => {
  const isGroom = person.role === 'groom';

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`bg-white p-6 rounded-3xl shadow-2xl border-2 ${
          isGroom ? 'border-blue-100' : 'border-pink-100'
        } hover:shadow-3xl hover:scale-105 transition-all duration-300`}
      >
        {/* 프로필 이미지/아바타 */}
        <div className="relative mb-4">
          <div
            className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center shadow-lg transform transition-all duration-500 hover:rotate-12 ${
              isGroom
                ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
                : 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600'
            }`}
          >
            <span className="text-4xl">{isGroom ? '🤵🏻‍♂️' : '👰🏻‍♀️'}</span>
          </div>

          {/* 장식 하트 */}
          <div
            className={`absolute -top-2 -right-2 text-2xl animate-pulse ${
              isGroom ? 'text-blue-400' : 'text-pink-400'
            }`}
          >
            💕
          </div>
        </div>

        {/* 이름과 역할 */}
        <div className="text-center mb-4">
          <h3 className={`text-2xl font-bold mb-2 ${isGroom ? 'text-blue-700' : 'text-pink-700'}`}>
            {person.name}
          </h3>

          <div
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              isGroom ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
            }`}
          >
            {isGroom ? '신랑' : '신부'}
          </div>
        </div>

        {/* 소개글 */}
        <div className="mb-4">
          <p className="text-gray-600 text-center leading-relaxed">{person.description}</p>
        </div>

        {/* 가족 관계 */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">{person.relation}</p>
        </div>

        {/* 연락처 (옵셔널) */}
        {person.phone && (
          <div className="text-center">
            <a
              href={`tel:${person.phone}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isGroom
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              📞 연락하기
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const CoupleInfo: React.FC<CoupleInfoProps> = ({ groomInfo, brideInfo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer로 스크롤 애니메이션 트리거
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const element = document.getElementById('couple-info-section');
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
      id="couple-info-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 text-purple-200 text-5xl animate-bounce delay-100">
          🌸
        </div>
        <div className="absolute top-32 right-8 text-pink-200 text-4xl animate-pulse delay-300">
          💐
        </div>
        <div className="absolute bottom-40 left-12 text-blue-200 text-3xl animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-20 right-6 text-purple-200 text-6xl animate-pulse delay-700">
          🌹
        </div>
        <div className="absolute top-1/2 left-2 text-pink-200 text-4xl animate-bounce delay-900">
          🦋
        </div>
        <div className="absolute top-1/3 right-2 text-blue-200 text-3xl animate-pulse delay-1100">
          ✨
        </div>
      </div>

      <div className="max-w-md w-full z-10">
        {/* 섹션 제목 */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text mb-4">
            💕 We are getting married 💕
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">서로 다른 우리가 하나가 되어 새로운 시작을 합니다</p>
        </div>

        {/* 신랑 프로필 */}
        <div className="mb-8">
          <ProfileCard person={groomInfo} isVisible={isVisible} delay={300} />
        </div>

        {/* 하트 구분선 */}
        <div
          className={`flex justify-center items-center my-8 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink-300"></div>
            <div className="text-3xl animate-pulse text-red-500">💖</div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-300"></div>
          </div>
        </div>

        {/* 신부 프로필 */}
        <div className="mb-8">
          <ProfileCard person={brideInfo} isVisible={isVisible} delay={900} />
        </div>

        {/* 메시지 카드 */}
        <div
          className={`bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white border-opacity-50 text-center transform transition-all duration-1000 delay-1200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <p className="text-gray-700 leading-relaxed text-sm">
            "두 사람이 사랑으로 만나 하나의 가정을 이루게 되었습니다.
            <br />
            저희의 새로운 시작을 축복해 주시고
            <br />
            앞으로도 따뜻한 관심과 사랑 부탁드립니다."
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <span className="text-blue-600 font-medium">{groomInfo.name}</span>
            <span className="text-gray-500">&</span>
            <span className="text-pink-600 font-medium">{brideInfo.name}</span>
            <span className="text-red-500 ml-2">💕</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleInfo;
