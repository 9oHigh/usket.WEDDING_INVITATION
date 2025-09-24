// src/data/contactInfo.ts
export interface ContactPerson {
  name: string;
  relation: string; // "아버지", "어머니", "형", "누나" 등
  phone: string;
}

// 샘플 연락처 정보
export const sampleGroomContacts: ContactPerson[] = [
  {
    name: "이철수",
    relation: "아버지",
    phone: "010-1111-2222"
  },
  {
    name: "김영희", 
    relation: "어머니",
    phone: "010-3333-4444"
  }
];

export const sampleBrideContacts: ContactPerson[] = [
  {
    name: "김대수",
    relation: "아버지", 
    phone: "010-5555-6666"
  },
  {
    name: "박미영",
    relation: "어머니",
    phone: "010-7777-8888"
  }
];

// 연락처 유틸리티 함수들
export const contactUtils = {
  // 전화번호 포맷팅
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  },

  // 연락처 텍스트 생성
  getContactText: (contacts: ContactPerson[], title: string): string => {
    let text = `${title}\n`;
    contacts.forEach(contact => {
      text += `${contact.relation} ${contact.name}: ${contact.phone}\n`;
    });
    return text.trim();
  },

  // 전체 연락처 정보 텍스트
  getAllContactsText: (
    groomContacts: ContactPerson[], 
    brideContacts: ContactPerson[]
  ): string => {
    const groomText = contactUtils.getContactText(groomContacts, '신랑측');
    const brideText = contactUtils.getContactText(brideContacts, '신부측');
    return `${groomText}\n\n${brideText}`;
  }
};