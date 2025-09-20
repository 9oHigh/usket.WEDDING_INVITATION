// src/components/Gallery/Gallery.tsx
import React, { useEffect, useState } from 'react';

// 갤러리 이미지 타입 정의
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  description?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

// 이미지 모달 컴포넌트
const ImageModal: React.FC<{
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const currentImage = images[currentIndex];

  // 키보드 이벤트 처리 (ESC, 화살표 키)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      {/* 배경 클릭으로 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 내용 */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
        >
          ✕
        </button>

        {/* 이전 버튼 */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
        >
          ←
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
        >
          →
        </button>

        {/* 이미지 */}
        <div className="text-center">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-2xl"
          />

          {/* 이미지 정보 */}
          <div className="mt-4 text-white text-center">
            <h3 className="text-lg font-medium mb-2">{currentImage.alt}</h3>
            {currentImage.description && (
              <p className="text-sm text-gray-300">{currentImage.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ images, title = '📷 Our Story' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // 카테고리 목록 추출
  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

  // 필터된 이미지 목록
  const filteredImages =
    filter === 'all' ? images : images.filter((img) => img.category === filter);

  useEffect(() => {
    // Intersection Observer로 스크롤 애니메이션
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('gallery-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset'; // 스크롤 복원
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1,
      );
    }
  };

  return (
    <section
      id="gallery-section"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-8 text-emerald-200 text-4xl animate-pulse delay-100">
          📸
        </div>
        <div className="absolute top-32 right-6 text-teal-200 text-5xl animate-bounce delay-300">
          🌿
        </div>
        <div className="absolute bottom-40 left-4 text-cyan-200 text-3xl animate-pulse delay-500">
          ✨
        </div>
        <div className="absolute bottom-24 right-12 text-emerald-200 text-4xl animate-bounce delay-700">
          🍃
        </div>
        <div className="absolute top-1/2 left-6 text-teal-200 text-3xl animate-pulse delay-900">
          💫
        </div>
      </div>

      <div className="max-w-md w-full z-10">
        {/* 섹션 제목 */}
        <div
          className={`text-center mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text mb-4">
            {title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">우리가 함께 만들어온 소중한 순간들</p>
        </div>

        {/* 카테고리 필터 */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              {category === 'all' ? '전체' : category}
            </button>
          ))}
        </div>

        {/* 이미지 그리드 */}
        <div
          className={`grid grid-cols-2 gap-4 mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-sm font-medium">{image.alt}</div>
                </div>
              </div>

              {/* 카테고리 뱃지 */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-white bg-opacity-80 rounded-full text-xs font-medium text-gray-700">
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div
          className={`text-center transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="mr-2">📱</span>더 많은 사진 보기
          </button>
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
};

export default Gallery;
