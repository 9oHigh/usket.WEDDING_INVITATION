// src/components/BackgroundMusic/BackgroundMusic.tsx
import React, { useEffect, useRef, useState } from 'react';

interface MusicTrack {
  title: string;
  artist: string;
  src: string;
  duration?: number;
}

interface BackgroundMusicProps {
  tracks: MusicTrack[];
  autoPlay?: boolean;
  defaultVolume?: number;
  showPlayer?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  tracks,
  autoPlay = false,
  defaultVolume = 0.3,
  showPlayer = true
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
    };

    const handleError = () => {
      console.error('오디오 로드 실패:', currentTrack.src);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audio.volume = volume;

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, volume, tracks.length, currentTrack.src]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        if (autoPlay && !isPlaying) {
          playMusic();
        }
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [autoPlay, isPlaying, userInteracted]);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('음악 재생 실패:', error);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const changeTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    changeTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    changeTrack(prevIndex);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!showPlayer) return null;

  return (
    <>
      {/* 히든 오디오 엘리먼트 */}
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        loop={false}
        preload="metadata"
      />

      {/* 플로팅 음악 플레이어 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-80 max-w-sm">
          
          {/* 트랙 정보 */}
          <div className="mb-3">
            <div className="text-sm font-semibold text-gray-800 truncate">
              🎵 {currentTrack?.title || '음악을 선택해주세요'}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {currentTrack?.artist || ''}
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="mb-3">
            <div 
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-300"
                style={{ 
                  width: duration ? `${(currentTime / duration) * 100}%` : '0%' 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 컨트롤 버튼들 */}
          <div className="flex items-center justify-center space-x-4 mb-2">
            
            {/* 이전 곡 */}
            <button
              onClick={prevTrack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              disabled={tracks.length <= 1}
            >
              ⏮️
            </button>

            {/* 재생/일시정지 */}
            <button
              onClick={togglePlayPause}
              className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              disabled={!isLoaded}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            {/* 다음 곡 */}
            <button
              onClick={nextTrack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              disabled={tracks.length <= 1}
            >
              ⏭️
            </button>

            {/* 볼륨 컨트롤 토글 */}
            <button
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
            </button>
          </div>

          {/* 볼륨 슬라이더 */}
          {showVolumeControl && (
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-gray-500">🔇</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-500">🔊</span>
            </div>
          )}

          {/* 트랙 리스트 (간단 버전) */}
          {tracks.length > 1 && (
            <div className="border-t border-gray-200 pt-2">
              <div className="flex flex-wrap gap-1">
                {tracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => changeTrack(index)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      index === currentTrackIndex
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 사용자 상호작용 안내 */}
          {!userInteracted && (
            <div className="text-xs text-gray-500 text-center mt-2">
              음악 재생을 위해 화면을 터치해주세요
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;