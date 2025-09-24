// src/components/Contact/Contact.tsx
import React, { useEffect, useState } from 'react';

// 연락처 정보 타입 정의
interface ContactPerson {
  name: string;
  relation: string; // 예: "아버지", "어머니"
  phone: string;
}

interface FamilyContact {
  side: 'groom' | 'bride';
  title: string;
  contacts: ContactPerson[];
  color: {
    primary: string;
    secondary: string;
    background: string;
    border: string;
  };
}

interface ContactProps {
  groomContacts: ContactPerson[];
  brideContacts: ContactPerson[];
  onRSVP?: (attending: boolean) => void;
  onShare?: () => void;
}

// RSVP 상태 타입
type RSVPStatus = 'none' | 'attending' | 'not-attending';

// 개별 연락처 카드 컴포넌트
const ContactCard: React.FC<{ 
  familyContact: FamilyContact; 
  isVisible: boolean; 
  delay: number; 
}> = ({ familyContact, isVisible, delay }) => {
  return (
    <div className={`transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      
      <div className={`bg-white rounded-2xl shadow-xl p-6 mb-6 border ${familyContact.color.border}`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center justify-center ${familyContact.color.primary}`}>
          <span className="mr-2">
            {familyContact.side === 'groom' ? '🤵🏻‍♂️' : '👰🏻‍♀️'}
          </span>
          {familyContact.title}
        </h3>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${familyContact.color.background}`}>
            {familyContact.contacts.map((contact, index) => (
              <div key={index} className={`flex justify-between items-center ${
                index > 0 ? 'mt-2 pt-2 border-t border-gray-200' : ''
              }`}>
                <span className="font-medium text-gray-700">
                  {contact.relation} {contact.name}
                </span>
                <a 
                  href={`tel:${contact.phone}`} 
                  className={`transition-colors duration-300 ${familyContact.color.secondary} hover:opacity-80`}
                >
                  📞
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// RSVP 카드 컴포넌트
const RSVPCard: React.FC<{ 
  rsvpStatus: RSVPStatus; 
  onRSVP: (attending: boolean) => void;
  isVisible: boolean;
  delay: number;
}> = ({ rsvpStatus, onRSVP, isVisible, delay }) => {
  return (
    <div className={`transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-6 rounded-2xl text-white shadow-xl mb-4">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-center">
          <span className="mr-2">💌</span>
          참석 여부를 알려주세요
          <span className="ml-2">💌</span>
        </h3>
        
        <p className="text-sm mb-4 opacity-90 text-center">
          정확한 식사 준비를 위해<br/>
          참석 여부를 미리 알려주시면 감사하겠습니다.
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onRSVP(true)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
              rsvpStatus === 'attending' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
          >
            ✅ 참석합니다
          </button>
          <button 
            onClick={() => onRSVP(false)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
              rsvpStatus === 'not-attending' 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
          >
            ❌ 불참합니다
          </button>
        </div>
        
        {rsvpStatus !== 'none' && (
          <div className={`mt-4 p-3 rounded-xl text-center font-medium ${
            rsvpStatus === 'attending' 
              ? 'bg-green-500 bg-opacity-20 text-green-100' 
              : 'bg-red-500 bg-opacity-20 text-red-100'
          }`}>
            {rsvpStatus === 'attending' 
              ? '🎉 참석해주셔서 감사합니다!' 
              : '😢 아쉽지만 다음 기회에 만나요!'
            }
          </div>
        )}
      </div>
    </div>
  );
};

// 공유 카드 컴포넌트
const ShareCard: React.FC<{ 
  onShare: () => void;
  isVisible: boolean;
  delay: number;
}> = ({ onShare, isVisible, delay }) => {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setShared(true);
    onShare();
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className={`transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      
      <button 
        onClick={handleShare}
        className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${
          shared
            ? 'bg-green-500 text-white'
            : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:shadow-xl'
        }`}
      >
        <span className="mr-2">{shared ? '✅' : '💬'}</span>
        {shared ? '공유 완료!' : '카카오톡으로 공유하기'}
      </button>
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ 
  groomContacts, 
  brideContacts, 
  onRSVP,
  onShare 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [rsvpStatus, setRSVPStatus] = useState<RSVPStatus>('none');

  useEffect(() => {
    // Intersection Observer로 스크롤 애니메이션
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('contact-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // RSVP 처리
  const handleRSVP = (attending: boolean) => {
    const newStatus: RSVPStatus = attending ? 'attending' : 'not-attending';
    setRSVPStatus(newStatus);
    
    if (onRSVP) {
      onRSVP(attending);
    }

    // 로컬 스토리지에 저장 (실제 앱에서는 서버로 전송)
    localStorage.setItem('wedding-rsvp', JSON.stringify({
      status: newStatus,
      timestamp: new Date().toISOString()
    }));
  };

  // 공유 처리
  const handleShare = () => {
    // 웹 공유 API 사용 (지원하는 브라우저에서)
    if (navigator.share) {
      navigator.share({
        title: '결혼식에 초대합니다 💕',
        text: '저희의 결혼식에 참석해주세요!',
        url: window.location.href,
      }).catch(err => console.log('공유 실패:', err));
    } else {
      // 폴백: 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 복사되었습니다! 원하는 곳에 붙여넣어주세요.');
      });
    }

    if (onShare) {
      onShare();
    }
  };

  // 가족 연락처 데이터 구성
  const groomFamily: FamilyContact = {
    side: 'groom',
    title: '신랑측 연락처',
    contacts: groomContacts,
    color: {
      primary: 'text-purple-700',
      secondary: 'text-purple-600 hover:text-purple-800',
      background: 'bg-purple-50',
      border: 'border-purple-100'
    }
  };

  const brideFamily: FamilyContact = {
    side: 'bride', 
    title: '신부측 연락처',
    contacts: brideContacts,
    color: {
      primary: 'text-pink-700',
      secondary: 'text-pink-600 hover:text-pink-800', 
      background: 'bg-pink-50',
      border: 'border-pink-100'
    }
  };

  return (
    <section 
      id="contact-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden"
    >
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 text-purple-200 text-4xl animate-pulse delay-100">💌</div>
        <div className="absolute top-32 right-6 text-indigo-200 text-5xl animate-bounce delay-300">📞</div>
        <div className="absolute bottom-40 left-4 text-blue-200 text-3xl animate-pulse delay-500">💕</div>
        <div className="absolute bottom-24 right-12 text-purple-200 text-4xl animate-bounce delay-700">✨</div>
        <div className="absolute top-1/2 left-2 text-indigo-200 text-3xl animate-pulse delay-900">💬</div>
      </div>

      <div className="max-w-sm w-full z-10">
        
        {/* 섹션 제목 */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text mb-4">
            💌 연락처 & 참석 확인 📞
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">
            궁금한 점이 있으시면 언제든 연락주세요
          </p>
        </div>

        {/* 신랑측 연락처 */}
        <ContactCard 
          familyContact={groomFamily} 
          isVisible={isVisible} 
          delay={300} 
        />

        {/* 신부측 연락처 */}
        <ContactCard 
          familyContact={brideFamily} 
          isVisible={isVisible} 
          delay={500} 
        />

        {/* RSVP 카드 */}
        <RSVPCard 
          rsvpStatus={rsvpStatus}
          onRSVP={handleRSVP}
          isVisible={isVisible}
          delay={700}
        />

        {/* 공유 카드 */}
        <ShareCard 
          onShare={handleShare}
          isVisible={isVisible}
          delay={900}
        />
      </div>
    </section>
  );
};

export default Contact;