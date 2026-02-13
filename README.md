# OLWaty Landing

OLWaty(올와티) 사전 신청용 랜딩 페이지입니다.  
핵심 목표는 런칭 전 이메일 수집이며, 일반 신청자와 테스터 관심 신청자를 함께 받습니다.

## Overview

- Single-page React 랜딩 페이지
- 강한 브랜드 카피 중심의 모바일 시뮬레이션 UI
- 이메일 등록 폼 2회 배치(상단/하단 CTA)
- Google Apps Script Web App으로 이메일 데이터 전송

## Tech Stack

- React 19
- TypeScript
- Vite 6
- lucide-react (아이콘)
- Tailwind 유틸리티 클래스(CDN 스크립트 기반)

## Project Structure

```txt
.
├─ App.tsx                    # 랜딩 페이지 메인 레이아웃/섹션 구성
├─ components/
│  └─ EmailForm.tsx           # 이메일 수집 폼 + 제출 로직
├─ constants.tsx              # 섹션 카피/기능 소개 데이터
├─ types.ts                   # 타입 정의
├─ index.tsx                  # React 엔트리
├─ index.html                 # 폰트, 전역 스타일, import map, root 마운트
└─ vite.config.ts             # Vite 설정
```

## Prerequisites

- Node.js 18+ (권장: 20+)
- npm

## Getting Started

1. 의존성 설치

```bash
npm install
```

2. 환경변수 파일 생성 (`.env.local`)

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/<YOUR_SCRIPT_ID>/exec
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 확인  
기본 포트는 `3000`입니다.

## Environment Variables

- `VITE_GOOGLE_SCRIPT_URL` (required)
  - 이메일 폼 제출 대상 Google Apps Script Web App URL
  - 값이 없으면 폼이 정상 수집되지 않습니다.

## Email Collection Flow

`components/EmailForm.tsx` 동작:

1. 이메일/테스터 체크 입력
2. `fetch(..., { method: "POST", mode: "no-cors" })` 전송
3. 전송 시도 성공 시 UI에서 완료 상태 표시

전송 payload 예시:

```json
{
  "email": "user@example.com",
  "type": "tester"
}
```

`type` 값:
- `tester`: 테스터 참여 체크한 사용자
- `user`: 일반 사용자

## Scripts

```bash
npm run dev       # 로컬 개발 서버
npm run build     # TypeScript 체크 + 프로덕션 빌드
npm run preview   # 빌드 결과 로컬 프리뷰
```

## Build & Deploy

1. 빌드

```bash
npm run build
```

2. `dist/` 폴더를 정적 호스팅(Vercel/Netlify/S3 등)에 배포
3. 배포 환경에도 `VITE_GOOGLE_SCRIPT_URL` 설정

## Content & Copy Updates

- 랜딩 카피/문구 수정: `constants.tsx`, `App.tsx`
- 폼 문구/동작 수정: `components/EmailForm.tsx`
- 메타 타이틀/폰트/전역 스타일: `index.html`

## Troubleshooting

- `index.css` 경고가 빌드 시 표시될 수 있습니다.
  - 현재 `index.html`에 `/index.css` 링크가 있으나 파일이 없으면 경고가 납니다.
  - 필요 없으면 링크를 제거하거나, 빈 `index.css`를 추가해 정리할 수 있습니다.

- 폼 제출은 되는데 서버 응답 확인이 안 됩니다.
  - `no-cors` 특성상 응답 본문/상태를 읽을 수 없습니다.
  - 서버 측 로그(Apps Script 실행 로그/시트 적재 여부)로 성공 여부를 확인하세요.

## Security Notes

- `.env.local`은 커밋하지 마세요.
- Webhook URL이 외부에 노출되지 않도록 접근 정책을 점검하세요.

## License

내부 프로젝트 기준으로 운영 중이라면, 필요 시 라이선스 정책을 별도로 명시하세요.
