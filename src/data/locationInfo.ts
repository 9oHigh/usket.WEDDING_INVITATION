// src/data/locationInfo.ts
export interface TransportInfo {
  line: string;
  station: string;
  exit: string;
  walkTime: string;
  color?: string; // 지하철 노선 색상
}

export interface LocationInfo {
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  parking?: string;
  subway?: TransportInfo[];
  bus?: TransportInfo[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// 서울 지하철 노선 색상 매핑
export const SUBWAY_COLORS: Record<string, string> = {
  '1': '#0052A4', // 1호선 - 다크블루
  '2': '#00A84D', // 2호선 - 그린
  '3': '#EF7C1C', // 3호선 - 오렌지
  '4': '#00A4E3', // 4호선 - 스카이블루
  '5': '#996CAC', // 5호선 - 퍼플
  '6': '#CD7C2F', // 6호선 - 브라운
  '7': '#747F00', // 7호선 - 올리브
  '8': '#E6186C', // 8호선 - 핑크
  '9': '#BDB092', // 9호선 - 베이지
  신분당: '#D4003B', // 신분당선 - 레드
  경의중앙: '#77C4A3', // 경의중앙선 - 민트
  공항철도: '#0090D2', // 공항철도 - 블루
  수인분당: '#FABE00', // 수인분당선 - 옐로우
};

// 샘플 위치 정보 (실제 사용 시 수정하세요)
export const sampleLocationInfo: LocationInfo = {
  name: '서울웨딩홀',
  address: '서울특별시 강남구 테헤란로 123',
  detailAddress: 'ABC빌딩 3층',
  phone: '02-1234-5678',
  parking: '건물 지하 1-3층 (3시간 무료주차)',
  coordinates: {
    lat: 37.5665,
    lng: 126.978,
  },
  subway: [
    {
      line: '2',
      station: '강남역',
      exit: '3번 출구',
      walkTime: '5분',
      color: SUBWAY_COLORS['2'],
    },
    {
      line: '신분당',
      station: '강남역',
      exit: '6번 출구',
      walkTime: '7분',
      color: SUBWAY_COLORS['신분당'],
    },
    {
      line: '3',
      station: '신사역',
      exit: '8번 출구',
      walkTime: '10분',
      color: SUBWAY_COLORS['3'],
    },
  ],
  bus: [
    {
      line: '146',
      station: '강남역 정류장',
      exit: '01번',
      walkTime: '3분',
    },
    {
      line: '740',
      station: '테헤란로 정류장',
      exit: '02번',
      walkTime: '5분',
    },
    {
      line: '6411',
      station: '강남대로 정류장',
      exit: '03번',
      walkTime: '8분',
    },
  ],
};

// 지역별 위치 정보 템플릿들
export const locationTemplates = {
  // 강남 지역 템플릿
  gangnam: {
    name: '강남 웨딩홀',
    address: '서울특별시 강남구 테헤란로 XX',
    subway: [
      {
        line: '2',
        station: '강남역',
        exit: 'X번 출구',
        walkTime: 'X분',
        color: SUBWAY_COLORS['2'],
      },
    ],
  },

  // 홍대 지역 템플릿
  hongdae: {
    name: '홍대 웨딩홀',
    address: '서울특별시 마포구 양화로 XX',
    subway: [
      {
        line: '2',
        station: '홍익대입구역',
        exit: 'X번 출구',
        walkTime: 'X분',
        color: SUBWAY_COLORS['2'],
      },
      {
        line: '6',
        station: '상수역',
        exit: 'X번 출구',
        walkTime: 'X분',
        color: SUBWAY_COLORS['6'],
      },
    ],
  },

  // 잠실 지역 템플릿
  jamsil: {
    name: '잠실 웨딩홀',
    address: '서울특별시 송파구 올림픽로 XX',
    subway: [
      {
        line: '2',
        station: '잠실역',
        exit: 'X번 출구',
        walkTime: 'X분',
        color: SUBWAY_COLORS['2'],
      },
      {
        line: '8',
        station: '잠실역',
        exit: 'X번 출구',
        walkTime: 'X분',
        color: SUBWAY_COLORS['8'],
      },
    ],
  },
};

// 유틸리티 함수들
export const locationUtils = {
  // 좌표를 이용한 카카오맵 링크 생성
  getKakaoMapCoordinateLink: (lat: number, lng: number, name: string) => {
    return `https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}`;
  },

  // 네이버맵 좌표 링크 생성
  getNaverMapCoordinateLink: (lat: number, lng: number, name: string) => {
    return `https://map.naver.com/v5/entry/place/1234567?c=${lng},${lat},15,0,0,0,dh`;
  },

  // 구글맵 좌표 링크 생성
  getGoogleMapCoordinateLink: (lat: number, lng: number) => {
    return `https://www.google.com/maps/@${lat},${lng},15z`;
  },

  // 전체 주소 포맷팅
  formatFullAddress: (locationInfo: LocationInfo) => {
    return `${locationInfo.name}\n${locationInfo.address}${
      locationInfo.detailAddress ? ` (${locationInfo.detailAddress})` : ''
    }`;
  },

  // 교통 정보 텍스트 포맷팅
  formatTransportInfo: (locationInfo: LocationInfo) => {
    let info = '';

    if (locationInfo.subway) {
      info += '🚇 지하철\n';
      locationInfo.subway.forEach((item) => {
        info += `${item.line}호선 ${item.station} ${item.exit} (도보 ${item.walkTime})\n`;
      });
      info += '\n';
    }

    if (locationInfo.bus) {
      info += '🚌 버스\n';
      locationInfo.bus.forEach((item) => {
        info += `${item.line}번 ${item.station} (도보 ${item.walkTime})\n`;
      });
    }

    return info.trim();
  },
};
