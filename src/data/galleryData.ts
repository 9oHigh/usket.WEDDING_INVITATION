// src/data/galleryData.ts

import weddingImage0 from "../assets/images/wedding-photos/0n.webp";
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
import weddingImage21 from "../assets/images/wedding-photos/21n.webp";
import weddingImage22 from "../assets/images/wedding-photos/22n.webp";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

// 🔹 고정해야 하는 이미지
const fixedStart = weddingImage0; // id = 1
const fixedEnd = weddingImage22; // id = 22

// 🔹 랜덤으로 섞을 이미지 목록 (2~21)
const shuffleTargets = [
  weddingImage1,
  weddingImage2,
  weddingImage3,
  weddingImage4,
  weddingImage5,
  weddingImage6,
  weddingImage7,
  weddingImage8,
  weddingImage9,
  weddingImage10,
  weddingImage11,
  weddingImage12,
  weddingImage13,
  weddingImage14,
  weddingImage15,
  weddingImage16,
  weddingImage18,
  weddingImage19,
  weddingImage20,
  weddingImage21,
];

// 🔹 Fisher–Yates 셔플
const shuffled = [...shuffleTargets].sort(() => Math.random() - 0.5);

// ─────────────────────────────────────────────
// 🔹 최종 랜덤 매핑된 weddingGalleryImages
// ─────────────────────────────────────────────
export const weddingGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: fixedStart,
    alt: "첫 만남",
    description: "운명처럼 만난 우리의 첫 만남",
  },

  // 🔹 id 2~21 → 랜덤 셔플된 이미지 매핑
  ...shuffled.map((img, idx) => ({
    id: idx + 2,
    src: img,
    alt: "기록된 순간",
    description: "우리의 소중한 추억",
  })),

  {
    id: 22,
    src: fixedEnd,
    alt: "산 여행",
    description: "함께 오른 아름다운 산 정상에서",
  },
];
