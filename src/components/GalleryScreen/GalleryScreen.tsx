// src/components/GalleryScreen/GalleryScreen.tsx
import React, { useEffect, useState } from "react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GalleryScreenProps {
  images: GalleryImage[];
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ images }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false); // 한 번 눌리면 접기 없음
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("gallery-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const displayedImages = showAll ? images : images.slice(0, 6);

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedImage !== null)
      setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedImage !== null)
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
  };

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage]);

  return (
    <section
      id="gallery-section"
      className="w-full flex flex-col items-center bg-[#F5EFE6] px-6 py-20"
    >
      <div className="w-full max-w-4xl">
        {/* 타이틀 */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-m font-cafe24 text-gray-600 mb-2 tracking-wide">
            GALLERY
          </h2>
          <h2 className="text-xl font-cafe24 font-bold text-gray-800">
            웨딩 갤러리
          </h2>
        </div>

        {/* 이미지 그리드 (3열, 중앙 정렬) */}
        <div
          className={`grid grid-cols-3 gap-3 mb-8 justify-items-center transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {displayedImages.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square w-full max-w-[200px] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt="비공개 이미지"
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()} // 우클릭 방지
                draggable={false} // 드래그 방지
              />
            </div>
          ))}
        </div>

        {/* ✅ 더보기 버튼 (중앙 정렬 + 작은 사이즈) */}
        {!showAll && images.length > 6 && (
          <div
            className={`flex justify-center transform transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-1 border border-gray-300 text-gray-500 rounded-full hover:bg-gray-100 flex items-center justify-center gap-1 text-sm font-cafe24"
            >
              사진 더보기
              <span className="text-gray-500 text-sm">▼</span>
            </button>
          </div>
        )}

        {/* ✅ 접기 버튼 제거 */}
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeModal} // ✅ 배경 클릭 시 닫힘
        >
          {/* 닫기 버튼 (좌측 상단) */}
          <button
            onClick={closeModal}
            className="absolute top-6 left-6 z-20 w-12 h-12 flex items-center justify-center text-white text-2xl hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
          >
            ✕
          </button>

          {/* 스크롤 가능한 이미지 컨테이너 */}
          <div
            className="w-full h-full overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} // ✅ 이미지 클릭 시 닫히지 않게
          >
            <div className="relative w-full max-w-6xl px-4">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-auto max-h-[90vh] object-contain rounded-md select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* 이전 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute bottom-6 left-8 z-20 w-10 h-10 flex items-center justify-center text-white text-xl hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
              >
                ←
              </button>

              {/* 이미지 카운터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute bottom-6 right-8 z-20 w-10 h-10 flex items-center justify-center text-white text-xl hover:bg-white hover:bg-opacity-10 rounded-full transition-all"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryScreen;
