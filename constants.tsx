
import React from 'react';
import { Star, List, Layout } from 'lucide-react';
import { Feature, PainPoint } from './types';

export const COLORS = {
  background: '#16151D',
  backgroundPure: '#000000',
  text: '#FFFFFF',
  primary: '#5CA6CE',
  secondary: '#5A5B9F',
  dark: '#263056',
};

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "상황 1",
    scenario: "내가 구독한 크리에이터, 왜 피드에 안 뜨죠?",
    content: "알고리즘에 밀려 정작 내가 좋아하는 사람을 보기 어려워요..! 매번 검색해서 찾아 들어가는 피로함을 올와치가 해결합니다."
  },
  {
    id: "상황 2",
    scenario: "정주행 방해꾼, '추천 영상'의 유혹",
    content: "시리즈 영상을 쭉 보고 싶은데 자꾸만 다른 주제의 영상을 추천하나요? 올와치에선 알고리즘 없이, 오직 선택한 시리즈에만 몰입할 수 있습니다."
  },
  {
    id: "상황 3",
    scenario: "열 때마다 어지러운 무한 추천의 늪",
    content: "앱을 열자마자 쏟아지는 자극적인 썸네일들 사이에서 길을 잃으신 적 있나요? 내가 고른 사람들로만 채워진 깨끗한 홈 화면을 경험해 보세요."
  }
];

export const FEATURES: Feature[] = [
  {
    title: "상단 고정석 5개",
    description: "가장 소중한 크리에이터 5명을 고정하세요. 새 영상이 올라오면 알고리즘을 거치지 않고 가장 먼저 뜹니다.",
    icon: <Star className="text-[#5CA6CE]" size={24} />
  },
  {
    title: "순수 구독 리스트",
    description: "알고리즘의 간섭 없이 내가 구독한 크리에이터만 최신순으로 정렬됩니다. 스크롤만 내리면 끝나요.",
    icon: <List className="text-[#5CA6CE]" size={24} />
  },
  {
    title: "시리즈 자동 정리",
    description: "영상들이 시리즈별로 묶여 있어 '어디까지 봤지?' 고민할 필요가 없습니다. 다음 화로 바로 연결됩니다.",
    icon: <Layout className="text-[#5CA6CE]" size={24} />
  }
];
