// src/data/galleryImages.ts
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  description?: string;
}

// 샘플 갤러리 이미지 데이터
// 실제 사용 시에는 실제 사진 URL로 교체하세요
export const sampleGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop',
    alt: '첫 만남',
    category: '데이트',
    description: '운명처럼 만난 우리의 첫 만남',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=500&fit=crop',
    alt: '첫 데이트',
    category: '데이트',
    description: '설레는 마음으로 함께한 첫 데이트',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop',
    alt: '생일 축하',
    category: '기념일',
    description: '함께 축하한 소중한 생일',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop',
    alt: '첫 여행',
    category: '여행',
    description: '함께 떠난 잊을 수 없는 첫 여행',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1464822759844-d150ad6caea8?w=500&h=500&fit=crop',
    alt: '바다 여행',
    category: '여행',
    description: '푸른 바다와 함께한 로맨틱한 순간',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    alt: '프러포즈',
    category: '프러포즈',
    description: '평생을 약속한 특별한 순간',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&h=500&fit=crop',
    alt: '약혼식',
    category: '프러포즈',
    description: '두 가족이 하나가 된 약혼식',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=500&fit=crop',
    alt: '웨딩촬영 1',
    category: '웨딩촬영',
    description: '아름다운 자연 속에서의 웨딩촬영',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=500&fit=crop',
    alt: '웨딩촬영 2',
    category: '웨딩촬영',
    description: '행복한 미소가 가득한 순간',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&h=500&fit=crop',
    alt: '웨딩촬영 3',
    category: '웨딩촬영',
    description: '영원한 사랑을 약속하는 순간',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=500&fit=crop',
    alt: '카페 데이트',
    category: '데이트',
    description: '여유로운 오후 카페에서',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    alt: '산 여행',
    category: '여행',
    description: '함께 오른 아름다운 산 정상에서',
  },
];

// 카테고리별 한국어 라벨
export const categoryLabels: Record<string, string> = {
  all: '전체',
  데이트: '데이트',
  기념일: '기념일',
  여행: '여행',
  프러포즈: '프러포즈',
  웨딩촬영: '웨딩촬영',
};
