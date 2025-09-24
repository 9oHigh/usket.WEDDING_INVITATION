// src/data/guestBookData.ts
export interface GuestMessage {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  relation?: string;
}

// 샘플 방명록 메시지들
export const sampleGuestMessages: GuestMessage[] = [
  {
    id: 1,
    name: "박진수",
    message: "정말 축하해! 두 사람이 행복한 모습을 보니까 나도 덩달아 기분이 좋아진다. 평생 지금처럼 서로 아끼고 사랑하며 살아가길 바라. 결혼 축하해! 🎉",
    timestamp: new Date('2024-11-15T14:30:00'),
    relation: "대학친구"
  },
  {
    id: 2,
    name: "김수진",
    message: "언니 결혼 정말 축하해요! 신랑분도 정말 좋은 분 같고, 두 분이 너무 잘 어울려요. 행복한 가정 꾸리시고 건강하게 오래오래 함께 해주세요 💕",
    timestamp: new Date('2024-11-15T13:45:00'),
    relation: "회사동료"
  },
  {
    id: 3,
    name: "이민호",
    message: "결혼 축하합니다! 신부님과 신랑님 모두 정말 아름다운 커플이네요. 앞으로도 지금처럼 서로를 아끼고 사랑하며 행복한 가정 이루시길 바랍니다.",
    timestamp: new Date('2024-11-15T12:20:00'),
    relation: "선후배"
  },
  {
    id: 4,
    name: "최영희",
    message: "우리 딸 결혼하는 날이 드디어 왔네요. 어린 시절부터 지켜봐온 예쁜 우리 딸이 이제 행복한 가정을 이룬다니 정말 기쁩니다. 두 분 모두 축복합니다! ❤️",
    timestamp: new Date('2024-11-15T11:55:00'),
    relation: "가족"
  },
  {
    id: 5,
    name: "정현우",
    message: "형 결혼 축하해! 형수님도 정말 예쁘고 좋은 분이야. 두 분이 만나서 정말 다행이라고 생각해. 앞으로 행복한 일만 가득하길 바라고, 우리도 자주 보자!",
    timestamp: new Date('2024-11-15T10:30:00'),
    relation: "친구"
  }
];

// 방명록 유틸리티 함수들
export const guestBookUtils = {
  // 메시지 개수별 통계
  getMessageStats: (messages: GuestMessage[]) => {
    const total = messages.length;
    const relationCount = messages.reduce((acc, msg) => {
      const relation = msg.relation || '기타';
      acc[relation] = (acc[relation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, relationCount };
  },

  // 최근 메시지 가져오기
  getRecentMessages: (messages: GuestMessage[], count: number = 5) => {
    return messages
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, count);
  },

  // 메시지 필터링 (관계별)
  filterByRelation: (messages: GuestMessage[], relation: string) => {
    if (relation === '전체') return messages;
    return messages.filter(msg => msg.relation === relation);
  },

  // 메시지 검색
  searchMessages: (messages: GuestMessage[], query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return messages.filter(msg => 
      msg.name.toLowerCase().includes(lowercaseQuery) ||
      msg.message.toLowerCase().includes(lowercaseQuery) ||
      (msg.relation?.toLowerCase().includes(lowercaseQuery) ?? false)
    );
  },

  // 메시지 유효성 검사
  validateMessage: (message: Partial<GuestMessage>): string[] => {
    const errors: string[] = [];
    
    if (!message.name?.trim()) {
      errors.push('이름을 입력해주세요.');
    } else if (message.name.trim().length > 20) {
      errors.push('이름은 20자 이하로 입력해주세요.');
    }

    if (!message.message?.trim()) {
      errors.push('메시지를 입력해주세요.');
    } else if (message.message.trim().length > 200) {
      errors.push('메시지는 200자 이하로 입력해주세요.');
    }

    return errors;
  }
};