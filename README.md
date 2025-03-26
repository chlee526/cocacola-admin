# [PaaS-Admin 예행] - 코카콜라

### 목차

1. [History](#history)
2. [Project 정보](#project-정보)
3. [브랜치 전략](#브랜치-전략)
4. [라이브러리](#라이브러리)
5. [구조 및 코딩 컨벤션](#구조-및-코딩-컨벤션)
6. [Server 정보](#server-정보)
7. [Local Server 설정](#local-server-설정)
8. [MSW 설정](#msw-설정)
9. [배포](#배포)

---

### History

| 일자       | 버전  | 내용          |
| ---------- | ----- | ------------- |
| 2024-07-18 | 0.0.1 | 프로젝트 생성 |

---

### Project 정보

- [PaaS-Admin] 예행 프로젝트 - 코카콜라
- node: - v18
- SSL

> <span style="color:red">env(환경설정) 파일은 외부로 유출되지 않도록 유의</span>

---

### 브랜치 전략

- `main`: 운영 [운영 서버 반영 용]
- `hotfix/경로-수정기능(페이지/컨텐츠/모듈/컴포넌트)`: 운영 긴급 패치
- `release`: 운영 반영 전 테스트 [개발 서버 반영 용]
- `devel`: 개발 통합
- `feature/경로-기능(페이지/컨텐츠/모듈/컴포넌트)`: 기능별 개발

---

### 라이브러리

- `msw`: MSW 목업
- `mui/material`: MUI 디자인 시스템
- `mui/icons-material`: MUI 디자인 시스템 - 아이콘
- `emotion/styled`: MUI CSS-in-JS
- `vite-plugin-mkcert`: 로컬 개발용 SSL
- `zustand`: 상태관리
- `react-cookie`: 쿠키관리
- `react-query`: 패칭
- `isomorphic-dompurify`: XSS보안
- `eslint-plugin-import`: eslint import 관리(순서)
- `lodash`: 유틸리티
- `rsn-react-ui`: 커스텀 UI(자체 제작한 UI로 추후에 추가)
- `framer-motion`: Animation 라이브러리
- `react-hook-form`: Form 유효성 검사

---

### 구조 및 코딩 컨벤션

#### 구조

FSD(Feature Sliced Design) 아키텍처로 구조 설계
Notion링크 참조(https://pebble-hose-a5c.notion.site/fsd-PaaS-Admin-19d17ddbfbfa80d69f32d0f2622b713f)

#### 코딩 컨벤션

Notion링크 참조(https://pebble-hose-a5c.notion.site/PaaS-Admin-19d17ddbfbfa8013acdeff40f2731ef3)

---

### Server 정보

- Admin(운영) : -
- Admin(개발) : -
- Dashboard(운영) : -
- Dashboard(개발) : -

---

### MSW 설정

- Local 개발용 Mockup API
- 기본 경로 : src/api/mocks/...
- browser.js ···························// msw 기본 셋팅
- common_handlers.js ···················// 공용 API
- keyword_mng_handlers.js ··············// 키워드 관리 API

```
// mockup service worker 실행파일 생성
npx msw init public/

// 크롬 브라우저 기준 ServiceWorker 추가
// 도메인에 아래 주소 입력
chrome://flags/#unsafely-treat-insecure-origin-as-secure

// 개발
```

- 크롬 브라우저 기준 ServiceWorker 추가
- 도메인에 아래 주소 입력
  chrome://flags/#unsafely-treat-insecure-origin-as-secure
- 입력창에 개발도메인, 실 API도메인 입력

---

### 배포

`개발` : CI/CD
`운영` : 백엔드에서만 배포

```
// 배포 버전 생성
npm run build

// 개발 버전 생성
npm run build:dev

// 개발/배포 버전 한번에 생성
npm run generate
```
