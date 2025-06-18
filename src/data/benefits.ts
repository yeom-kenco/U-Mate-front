export interface BenefitItem {
  title: string;
  description: string[];
  icon: string; // 이미지 경로 (예: '/public/images/benefit/family.png')
}

export const benefitList: BenefitItem[] = [
  {
    title: 'U+투게더 결합',
    description: [
      'U+ 휴대폰을 쓰는 친구, 가족 결합하면 데이터 무제한 요금제를 최대 20,000원 저렴하게 이용할 수 있어요.',
      '만 18세 이하 청소년은 매달 10,000원 더 할인 받을 수 있어요.',
    ],
    icon: '/images/benefit/together.png',
  },
  {
    title: '5G 시그니처 가족할인',
    description: [
      '만 18세 이하 자녀가 만 20세가 되는 날까지 휴대폰 1개 월정액을 최대 33,000원 할인',
      '5G 시그니처 요금제에 가입한 부모님이 자녀의 법정대리인으로 등록되어 있어야 할인',
      '요금제 가입 후 매장 또는 고객센터 114(무료)를 통해 따로 신청해야 할인받을 수 있어요.',
    ],
    icon: '/images/benefit/family.png',
  },
  {
    title: '태블릿/스마트기기 월정액 할인',
    description: [
      '태블릿/워치 등 휴대폰을 제외한 내 명의 스마트기기 2대 월정액을 1대당 최대 11,000원씩, 최대 22,000원을 할인받을 수 있어요.',
      '5G시그니처/프리미어 슈퍼 요금제 가입 고객님은 그 중 1대 월정액 11,000원을 추가로 할인받아 최대 33,000원을 할인받을 수 있어요.',
    ],
    icon: '/images/benefit/device.png',
  },
  {
    title: '프리미어 요금제 약정할인',
    description: [
      '약정 기간 24개월 동안 통신요금을 매달 5,250원 추가 할인받을 수 있어요.',
      '혜택을 받으려면 LG유플러스 매장 또는 고객센터 114(무료)에서 별도 신청해야 합니다.',
    ],
    icon: '/images/benefit/crown.png',
  },
  {
    title: '로밍 혜택 프로모션',
    description: [
      '※ 기간: 2025년 4월 1일(화) ~ 2025년 10월 31일(금)',
      '5G 월정액 85,000원 이상 요금제를 사용하시면 로밍패스 요금제 가입 시 로밍 패스 요금제 기본 데이터를 2배로 받을 수 있습니다.',
    ],
    icon: '/images/benefit/crown.png',
  },
  {
    title: 'U+ 모바일tv',
    description: [
      '70여 개의 실시간 채널, 영화, 해외시리즈, 애니메이션, 다큐멘터리 등 20만 여 편의 동영상 중 내게 맞는 동영상을 추천해주는 앱 서비스',
    ],
    icon: '/images/benefit/mobile-tv.png',
  },
  {
    title: 'U+ 멤버십 VVIP 등급 혜택',
    description: [
      '가입 한 달 후 바로 VIP콕 혜택 이용 가능',
      '멤버십 기본 혜택 외 무료 영화, 무료 커피 등 원하는 혜택 추가 선택 가능',
    ],
    icon: '/images/benefit/membership.png',
  },
  {
    title: 'U+ 멤버십 VIP 등급 혜택',
    description: [
      '가입 한 달 후 바로 VIP콕 혜택 이용 가능',
      '멤버십 기본 혜택 외 무료 영화, 무료 커피 등 원하는 혜택 추가 선택 가능',
    ],
    icon: '/images/benefit/membership.png',
  },
  {
    title: '바이브 300회 음악감상',
    description: ['기존에 없던 새로운 오디오 경험과 취향에 맞는 음악을 제공하는 뮤직 앱'],
    icon: '/images/benefit/vibe.png',
  },
  {
    title: '실버지킴이',
    description: ['1시간~3시간마다 문자메시지로 내 위치를 보호자에게 알려주는 서비스'],
    icon: '/images/benefit/silver.png',
  },
];
