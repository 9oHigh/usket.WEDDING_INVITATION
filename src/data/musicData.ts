// src/data/musicData.ts
export interface MusicTrack {
  title: string;
  artist: string;
  src: string;
  duration?: number;
}

// 샘플 음악 트랙들 (실제 사용시 실제 음악 파일로 교체)
export const sampleMusicTracks: MusicTrack[] = [
  {
    title: "Wedding March",
    artist: "Wedding Music",
    src: "/music/wedding-march.mp3", // 실제 파일 경로로 교체 필요
    duration: 180
  },
  {
    title: "Canon in D",
    artist: "Johann Pachelbel",
    src: "/music/canon-in-d.mp3", // 실제 파일 경로로 교체 필요
    duration: 240
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "/music/perfect.mp3", // 실제 파일 경로로 교체 필요
    duration: 263
  }
];

// 웨딩 음악 추천 목록
export const recommendedWeddingTracks: MusicTrack[] = [
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    src: "/music/a-thousand-years.mp3",
    duration: 285
  },
  {
    title: "All of Me",
    artist: "John Legend",
    src: "/music/all-of-me.mp3",
    duration: 269
  },
  {
    title: "Marry Me",
    artist: "Train",
    src: "/music/marry-me.mp3",
    duration: 240
  },
  {
    title: "Beautiful Boy",
    artist: "John Lennon",
    src: "/music/beautiful-boy.mp3",
    duration: 215
  },
  {
    title: "Make You Feel My Love",
    artist: "Adele",
    src: "/music/make-you-feel-my-love.mp3",
    duration: 213
  }
];

// 음악 관련 유틸리티 함수들
export const musicUtils = {
  // 시간 포맷팅 (초 → mm:ss)
  formatDuration: (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  },

  // 음악 파일 유효성 검사
  validateMusicFile: (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.onloadeddata = () => resolve(true);
      audio.onerror = () => resolve(false);
      audio.src = src;
    });
  },

  // 플레이리스트 셔플
  shufflePlaylist: <T,>(tracks: T[]): T[] => {
    const shuffled = [...tracks];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // 음악 메타데이터 추출
  getMusicMetadata: (file: File): Promise<{ title?: string; artist?: string; duration?: number }> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      const url = URL.createObjectURL(file);
      
      audio.onloadedmetadata = () => {
        resolve({
          title: file.name.replace(/\.[^/.]+$/, ""), // 확장자 제거
          duration: audio.duration
        });
        URL.revokeObjectURL(url);
      };
      
      audio.onerror = () => {
        resolve({});
        URL.revokeObjectURL(url);
      };
      
      audio.src = url;
    });
  }
};

// 브라우저 호환성 체크
export const audioSupport = {
  // 오디오 재생 지원 여부
  canPlayAudio: (): boolean => {
    try {
      const audio = new Audio();
      return !!(audio.canPlayType && audio.canPlayType('audio/mpeg'));
    } catch {
      return false;
    }
  },

  // 자동 재생 정책 체크
  checkAutoPlayPolicy: (): Promise<boolean> => {
    const audio = new Audio();
    audio.volume = 0;
    
    return audio.play()
      .then(() => {
        audio.pause();
        return true;
      })
      .catch(() => false);
  },

  // 지원 오디오 포맷 확인
  getSupportedFormats: (): string[] => {
    const audio = new Audio();
    const formats: string[] = [];
    
    if (audio.canPlayType('audio/mpeg')) formats.push('mp3');
    if (audio.canPlayType('audio/wav')) formats.push('wav');
    if (audio.canPlayType('audio/ogg')) formats.push('ogg');
    if (audio.canPlayType('audio/aac')) formats.push('aac');
    
    return formats;
  }
};