// src/data/galleryData.ts

import weddingImage1 from "../assets/images/wedding-photos/1n.webp";
import weddingImage2 from "../assets/images/wedding-photos/2n.webp";
import weddingImage3 from "../assets/images/wedding-photos/3n.webp";
import weddingImage4 from "../assets/images/wedding-photos/4n.webp";
import weddingImage5 from "../assets/images/wedding-photos/5n.webp";
import weddingImage6 from "../assets/images/wedding-photos/6n.webp";
import weddingImage7 from "../assets/images/wedding-photos/7n.webp";
import weddingImage8 from "../assets/images/wedding-photos/8n.webp";
import weddingImage9 from "../assets/images/wedding-photos/9n.webp";
import weddingImage10 from "../assets/images/wedding-photos/10n.webp";
import weddingImage11 from "../assets/images/wedding-photos/11n.webp";
import weddingImage12 from "../assets/images/wedding-photos/12n.webp";
import weddingImage13 from "../assets/images/wedding-photos/13n.webp";
import weddingImage14 from "../assets/images/wedding-photos/14n.webp";
import weddingImage15 from "../assets/images/wedding-photos/15n.webp";
import weddingImage16 from "../assets/images/wedding-photos/16n.webp";
import weddingImage18 from "../assets/images/wedding-photos/17n.webp";
import weddingImage19 from "../assets/images/wedding-photos/18n.webp";
import weddingImage20 from "../assets/images/wedding-photos/19n.webp";
import weddingImage17 from "../assets/images/wedding-photos/20n.webp";
import weddingImage21 from "../assets/images/wedding-photos/21n.webp";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

// 샘플 갤러리 이미지 데이터
export const weddingGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: weddingImage1,
    alt: "첫 만남",
    description: "운명처럼 만난 우리의 첫 만남",
  },
  {
    id: 2,
    src: weddingImage2,
    alt: "첫 데이트",
    description: "설레는 마음으로 함께한 첫 데이트",
  },
  {
    id: 3,
    src: weddingImage3,
    alt: "생일 축하",
    description: "함께 축하한 소중한 생일",
  },
  {
    id: 4,
    src: weddingImage4,
    alt: "첫 여행",
    description: "함께 떠난 잊을 수 없는 첫 여행",
  },
  {
    id: 5,
    src: weddingImage5,
    alt: "프러포즈",
    description: "평생을 약속한 특별한 순간",
  },
  {
    id: 6,
    src: weddingImage6,
    alt: "약혼식",
    description: "두 가족이 하나가 된 약혼식",
  },
  {
    id: 7,
    src: weddingImage7,
    alt: "웨딩촬영 1",
    description: "아름다운 자연 속에서의 웨딩촬영",
  },
  {
    id: 8,
    src: weddingImage8,
    alt: "웨딩촬영 2",
    description: "행복한 미소가 가득한 순간",
  },
  {
    id: 9,
    src: weddingImage9,
    alt: "웨딩촬영 3",
    description: "영원한 사랑을 약속하는 순간",
  },
  {
    id: 10,
    src: weddingImage10,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 11,
    src: weddingImage11,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 12,
    src: weddingImage12,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 13,
    src: weddingImage13,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 14,
    src: weddingImage14,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 15,
    src: weddingImage15,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 16,
    src: weddingImage16,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 17,
    src: weddingImage17,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 18,
    src: weddingImage18,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 19,
    src: weddingImage19,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 20,
    src: weddingImage20,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
  {
    id: 21,
    src: weddingImage21,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
];
