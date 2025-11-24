// src/components/BackgroundMusic/BackgroundMusic.tsx
import React, { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  src: string;
  autoPlay?: boolean;
  defaultVolume?: number;
  fadeInDuration?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  autoPlay = true,
  defaultVolume = 0.3,
  fadeInDuration = 4500,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true); // 초기엔 muted 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fadeIn = (
    audio: HTMLAudioElement,
    targetVolume: number,
    duration: number
  ) => {
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeIncrement = targetVolume / steps;
    let currentStep = 0;
    audio.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(volumeIncrement * currentStep, targetVolume);
      audio.volume = newVolume;
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        console.log("🎵 페이드인 완료, 최종 볼륨:", audio.volume);
      }
    }, stepDuration);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.muted = true; // 초기에는 muted로 시작 (정책 회피용)

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        console.log("✅ 자동 재생 성공");

        // iOS Safari에서는 muted=true로만 자동재생 가능하므로
        // 짧은 지연 후 unmute + 페이드인 시도
        setTimeout(() => {
          if (!isMuted) return; // 이미 해제된 경우
          audio.muted = false;
          setIsMuted(false);
          fadeIn(audio, defaultVolume, fadeInDuration);
        }, 1000);
      } catch (err) {
        console.warn("❌ 자동재생 차단됨, 사용자 인터랙션 대기", err);
        // 클릭/터치 시 재시도
        const unlock = async () => {
          try {
            await audio.play();
            audio.muted = false;
            setIsMuted(false);
            fadeIn(audio, defaultVolume, fadeInDuration);
            setIsPlaying(true);
            document.removeEventListener("click", unlock);
            document.removeEventListener("touchstart", unlock);
          } catch {}
        };
        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
      }
    };

    // 페이지 로드 후 자동 재생 시도
    if (autoPlay) {
      tryPlay();
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [src]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      fadeIn(audio, defaultVolume, fadeInDuration);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" loop>
        <source src={src} type="audio/mpeg" />
        브라우저가 오디오를 지원하지 않습니다.
      </audio>

      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? "음소거 해제" : "음소거"}
      >
        {isMuted ? (
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
