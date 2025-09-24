// src/components/GuestBook/GuestBook.tsx
import React, { useEffect, useState } from 'react';

// 방명록 메시지 타입
interface GuestMessage {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  relation?: string; // 예: "대학친구", "회사동료", "가족"
}

interface GuestBookProps {
  messages: GuestMessage[];
  onAddMessage?: (message: Omit<GuestMessage, 'id' | 'timestamp'>) => void;
  title?: string;
}

// 개별 메시지 카드 컴포넌트
const MessageCard: React.FC<{ 
  message: GuestMessage; 
  index: number; 
  isVisible: boolean; 
}> = ({ message, index, isVisible }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`} style={{ transitionDelay: `${index * 100}ms` }}>
      
      <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        
        {/* 메시지 헤더 */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {message.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{message.name}</div>
              {message.relation && (
                <div className="text-xs text-gray-500">{message.relation}</div>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {formatDate(message.timestamp)}
          </div>
        </div>

        {/* 메시지 내용 */}
        <div className="pl-13">
          <p className="text-gray-700 leading-relaxed">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

// 메시지 작성 폼 컴포넌트
const MessageForm: React.FC<{
  onSubmit: (message: Omit<GuestMessage, 'id' | 'timestamp'>) => void;
  isVisible: boolean;
}> = ({ onSubmit, isVisible }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [relation, setRelation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // 전송 시뮬레이션
    setTimeout(() => {
      onSubmit({
        name: name.trim(),
        message: message.trim(),
        relation: relation.trim() || undefined
      });
      
      // 폼 초기화
      setName('');
      setMessage('');
      setRelation('');
      setIsSubmitting(false);
    }, 1000);
  };

  const relationOptions = [
    '가족', '친구', '대학친구', '회사동료', '선후배', '지인', '기타'
  ];

  return (
    <div className={`transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-center">
          <span className="mr-2">💝</span>
          축하 메시지를 남겨주세요
          <span className="ml-2">💝</span>
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 이름 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
              placeholder="이름을 입력해주세요"
              maxLength={20}
            />
          </div>

          {/* 관계 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              관계
            </label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
            >
              <option value="">선택해주세요</option>
              {relationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 메시지 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              축하 메시지 *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 resize-none"
              placeholder="따뜻한 축하 메시지를 남겨주세요..."
              maxLength={200}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {message.length}/200
            </div>
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : !name.trim() || !message.trim()
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSubmitting ? '전송 중...' : '💌 메시지 남기기'}
          </button>
        </form>
      </div>
    </div>
  );
};

const GuestBook: React.FC<GuestBookProps> = ({ 
  messages, 
  onAddMessage,
  title = "💌 방명록" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localMessages, setLocalMessages] = useState<GuestMessage[]>(messages);
  const [showForm, setShowForm] = useState(false);

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

    const element = document.getElementById('guestbook-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // 메시지 추가 핸들러
  const handleAddMessage = (newMessage: Omit<GuestMessage, 'id' | 'timestamp'>) => {
    const message: GuestMessage = {
      ...newMessage,
      id: Date.now(),
      timestamp: new Date()
    };

    setLocalMessages(prev => [message, ...prev]);
    setShowForm(false);

    if (onAddMessage) {
      onAddMessage(newMessage);
    }

    // 성공 피드백
    alert('감사합니다! 메시지가 성공적으로 등록되었습니다. 💕');
  };

  return (
    <section 
      id="guestbook-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden"
    >
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 text-violet-200 text-4xl animate-bounce delay-100">💌</div>
        <div className="absolute top-32 right-6 text-purple-200 text-5xl animate-pulse delay-300">📝</div>
        <div className="absolute bottom-40 left-4 text-pink-200 text-3xl animate-bounce delay-500">💕</div>
        <div className="absolute bottom-24 right-12 text-violet-200 text-4xl animate-pulse delay-700">✨</div>
        <div className="absolute top-1/2 left-2 text-purple-200 text-3xl animate-bounce delay-900">📖</div>
      </div>

      <div className="max-w-sm w-full z-10">
        
        {/* 섹션 제목 */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text mb-4">
            {title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">
            소중한 추억이 될 따뜻한 메시지를 남겨주세요
          </p>
        </div>

        {/* 메시지 작성 버튼 */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">✍️</span>
              축하 메시지 작성하기
            </button>
          )}
        </div>

        {/* 메시지 작성 폼 */}
        {showForm && (
          <div className="mb-8">
            <MessageForm 
              onSubmit={handleAddMessage}
              isVisible={isVisible}
            />
            
            <div className="text-center mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300"
              >
                작성 취소
              </button>
            </div>
          </div>
        )}

        {/* 메시지 목록 */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {localMessages.length > 0 ? (
            localMessages.map((message, index) => (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
                isVisible={isVisible}
              />
            ))
          ) : (
            <div className={`text-center py-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500">
                아직 메시지가 없습니다.<br/>
                첫 번째 축하 메시지를 남겨주세요!
              </p>
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        {localMessages.length > 0 && (
          <div className={`text-center mt-6 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600">
                💕 총 <span className="font-bold text-purple-600">{localMessages.length}</span>개의 축하 메시지
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GuestBook;