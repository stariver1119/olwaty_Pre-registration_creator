
import React from 'react';
import { Star, List, Layout, Banknote } from 'lucide-react';
import { Feature, PainPoint } from './types';

export const COLORS = {
  background: '#050505',
  backgroundPure: '#000000',
  text: '#FFFFFF',
  primary: '#a78bfa',
  secondary: '#a78bfa',
  dark: '#222222',
};

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "상황 1",
    scenario: "구독은 약속입니다, 지켜져야 합니다",
    content: "진짜 팬은 별로인 영상도 직접 보고 판단하고 싶어해요. 근데 알고리즘에 밀려서 영상이 올라온 줄도 몰라요."
  },
  {
    id: "상황 2",
    scenario: "팬이 있는데 썸네일 무한 경쟁은 불필요합니다",
    content: "내용보다 썸네일로 먼저 이겨야 하는 구조, 지치지 않으셨나요?"
  },
  {
    id: "상황 3",
    scenario: "좋은 영상은 다시 찾기 쉬워야 합니다",
    content: "정주행하고 싶은 팬도 있어요. 근데 알고리즘 구조에선 과거 영상이 묻히고, 다시 찾아오기가 어렵습니다."
  }
];

export const FEATURES: Feature[] = [
  {
    title: "상단 고정석 5개",
    description: "시청자 홈에서 가장 소중한 크리에이터 5명을 고정합니다. 찐팬들이 고정을 한다면 노출도 100%",
    icon: <Star className="text-[#a78bfa]" size={24} />
  },
  {
    title: "시리즈 기반 리스트",
    description: "영상들이 시리즈별로 묶여 있고, 각 개별 영상을 설명하는 텍스트가 추가되어 썸네일 경쟁이 필요 없습니다.",
    icon: <List className="text-[#a78bfa]" size={24} />
  },
  {
    title: "내 의도대로 재생목록 정리",
    description: "유튜브 영상을 쉽게 가져오고 내 의도대로 1,2,3화 이어지는 시리즈로 정리해서, 팬이 정주행하기 쉬워집니다.",
    icon: <Layout className="text-[#a78bfa]" size={24} />
  }
];
