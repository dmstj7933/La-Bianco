# 🛠️ [La. Bianco (라비앙코)] MVP 랜딩페이지 기술명세서 (Tech Spec)

> **버전**: 1.2.0 (단품 패키지 구성 업데이트)  
> **기획 기반**: `비앙코_Business_Planning_Log.md` 및 공식 브랜드 무드보드/프로토타입  
> **목적**: 2030 뷰티/위생 고관여 여성을 위한 손톱 밑 전용 데일리 네일 클리닝 브러시 'La. Bianco'의 페이크도어(Fake-door) MVP 랜딩페이지 기술 명세  
> **핵심 목표**: 모바일(인스타그램/틱톡 광고 유입) 최적화, 3초 내 가치 전달, 노-마찰(Zero-friction) 사전 예약 전환 극대화

---

## 1. 프로젝트 개요 및 기술 스택 (Tech Stack)

### 1.1 기술 스택 선정 이유
* **순수성 및 범용성**: 외부 복잡한 빌드/번들링 도구 없이 브라우저에서 즉시 렌더링되며, Vercel, Netlify, GitHub Pages, 카페24 등 어디서든 손쉽게 실행/배포 가능한 **HTML5 / CSS3 / Vanilla JavaScript** 기반으로 설계합니다.
* **유지보수성 & 속도**: 정적 독립 CSS 시스템을 통해 런타임 CDN 경고 및 보안 오리진 에러가 없는 0-Error 환경을 보장합니다.

| 분류 | 기술 / 라이브러리 | 버전 / 소스 | 용도 |
| :--- | :--- | :--- | :--- |
| **Markup** | HTML5 Semantic | W3C Standard | 접근성 및 검색엔진(SEO/OpenGraph) 최적화 |
| **Styling** | Custom Standalone CSS | CSS3 Standard | 라비앙코 시그니처 컬러 테마 및 반응형 유틸리티 |
| **Typography** | Pretendard + Cormorant Garamond | Google & CDN | 감각적인 에디토리얼 세리프 로고 & 모던 산세리프 본문 |
| **Icons** | Phosphor Icons | `@phosphor-icons/web` (CSS) | 세련되고 일관된 1.5pt 라인 아이콘 시스템 |
| **Scripting** | Vanilla JavaScript | ES6+ Standard | 스마트 폰 번호 포맷팅, 모달, FAQ 아코디언, 스크롤 인터랙션 |
| **Form/Data** | LocalStorage Mock API | Standard Web API | 페이크도어 사전 예약 리드 데이터 수집 |

---

## 2. 디자인 시스템 및 토큰 (Design Tokens)

'Clean & Refresh Daily Care' 무드보드에서 정의된 3대 시그니처 컬러를 중심으로 구성합니다.

### 2.1 Color Palette
```css
:root {
  /* Brand Signature Colors (Moodboard Verified) */
  --sig-mint: #EBF7E9;       /* 01. Soft Pale Mint */
  --sig-aqua: #D3E5E4;       /* 02. Soft Sage Aqua */
  --sig-ice-sky: #D1EFF9;    /* 03. Ice Sky Blue */

  /* Brand Primary Accents */
  --color-primary: #0284C7;       /* Sky Blue 600 - 청량한 클린 포인트 */
  --color-primary-hover: #0369A1; /* Sky Blue 700 */

  /* Neutrals & Surfaces */
  --color-bg-main: #F8FBF9;       /* 맑고 깨끗한 클린 스파 베이스 */
  --color-bg-card: #FFFFFF;       /* 카드 및 모달 컨테이너 */
  --color-text-primary: #11222C;  /* 본문 및 주요 헤드라인 (딥 아쿠아 차콜) */
  --color-text-secondary: #4A606E;/* 부제목 및 설명 */
  --color-border: #E2ECE8;        /* 디바이더 및 카드 테두리 */
}
```

### 2.2 Typography Scale
* **기본 서체**: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif`
* **브랜드 서체 (로고/무드)**: `Cormorant Garamond, Georgia, serif`
* **헤드라인 (Hero H1)**: `text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight`
* **섹션 타이틀 (H2)**: `text-2xl sm:text-3xl font-bold tracking-tight text-gray-950`
* **본문 (Body)**: `text-base sm:text-lg text-gray-600 leading-relaxed max-w-[65ch]`

---

## 3. 파일 및 디렉토리 구조 (File Structure)

```text
landing-page-workshop/
├── index.html             # 단일 페이지 마크업 (SEO, OpenGraph, Semantic 구조)
├── css/
│   └── style.css          # 라비앙코 디자인 토큰, 타이포그래피, 애니메이션
├── js/
│   └── app.js             # 스마트 인풋 포맷터, 모달 팝업, FAQ 토글, 전환 트래킹
└── assets/
    ├── images/            # 공식 실물 프로토타입 에셋
    │   ├── la-bianco-usage.jpg          # 1번째 사진: 실사용 컷 (Hero)
    │   ├── la-bianco-package-single.jpg # 2번째 사진: 단품 패키지 컷 (Feature 2)
    │   └── la-bianco-moodboard.png
    └── favicon.ico
```

---

## 4. 섹션별 상세 마크업 및 기능 명세 (Section Breakdown)

### 4.1 Header / Global Navigation
* **목표**: 이탈 링크 없이 브랜드 로고와 1차 CTA 버튼 1개만 배치
* **마크업 구조**:
  * 좌측: 라비앙코 세리프 로고 (`La. Bianco` + 미니멀 블루 도트)
  * 우측: `[50% 얼리버드 신청]` 고정 버튼 (클릭 시 폼으로 이동)

---

### 4.2 Hero Section (Above the Fold)
* **목표**: 3초 내에 제품 용도(손톱 밑 정밀 세정 데일리 브러시)와 혜택을 이해하고 이탈 방지
* **요소 명세**:
  1. **Eyebrow 뱃지**: `✨ CLEAN & REFRESH · DAILY NAIL CARE`
  2. **메인 카피 (H1)**:  
     *"젤네일 하며 긴 손톱에 끼이는 이물질을<br>칫솔질하듯 깨끗하게 씻어내주는 뷰티툴"*
  3. **서브 카피 (Body)**:  
     *"손톱 밑 미세 이물질과 세균을 자극 없이 씻어내는 정밀 클리닝 브러시.<br>파우치에 쏙 넣어 언제 어디서나 3초 만에 꺼내 쓰는 라비앙코(La. Bianco)"*
  4. **CTA 영역**:
     * Primary CTA 버튼: `[지금 50% 얼리버드 혜택받기]`
     * 소셜 프루프 마이크로 텍스트: `🔥 사전 예약금 0원 · 출시 전 한정 수량 알림`
  5. **히어로 비주얼**:
     * 라비앙코 공식 패키지 프로토타입 렌더링 (`la-bianco-product.jpg`)

---

### 4.3 Problem & Agitation Section (문제 제기 & 공감)
* **목표**: 타겟 고객이 일상에서 느끼는 3대 고통(손톱 밑 세균/때, 일반 비누의 한계, 피자/팝콘 식사 후 손끝 찝찝함)을 생생하게 짚음
* **레이아웃**: 3열 반응형 그리드 (`grid grid-cols-1 md:grid-cols-3 gap-6`)
* **카드 구성**:
  1. **Point 1: 손톱 밑 이물질 & 세균 번식** (스마트폰 터치·렌즈 착용 시 계속 신경 쓰이는 손끝)
  2. **Point 2: 일반 비누로는 닿지 않는 0.2mm 틈새** (적합하지 않은 대체도구를 쓰다가 상처 발생)
  3. **Point 3: 우아함은 보이지 않는 손끝에서** (피자·팝콘 식사 후 손잡기 망설여지는 순간)

---

### 4.4 Solution & Features Section (핵심 기능)
* **목표**: 라비앙코의 손톱 밑 전용 데일리 케어 솔루션 입증
* **기능 명세**:
  * **Feature 1. [Under Nails Deep Clean] 초미세 저자극 세정 팁**
    * *설명*: 손톱과 살 사이의 좁고 민감한 공간에 맞춘 0.1mm 초미세 브러시 노즐로 아프지 않게 3초 딥클렌징.
  * **Feature 2. [Compact Pocket Design] 압도적인 휴대성**
    * *설명*: 립스틱 크기의 슬림한 펜 타입으로 파우치나 작은 핸드백에 쏙 들어가 언제 어디서나 손쉽게 케어.
  * **Feature 3. [Hygienic Safety Cap] 투명 세이프티 캡**
    * *설명*: 파우치 속 먼지로부터 브러시 팁을 안전하게 보호하는 전용 위생 캡 적용.

---

### 4.6 Social Proof / Early Tester Reviews (사회적 증거)
* **리뷰 1 (28세 뷰티 마케터 제니님)**: *"파우치에 쏙 넣고 다니니 너무 편해요! 렌즈 끼기 전에 쓱 닦아내면 찝찝함 제로입니다."*
* **리뷰 2 (25세 대학생 민경님)**: *"손톱 밑 닦겠다고 면봉이나 물티슈로 닦다가 솜이 더 끼어서 답답했는데, 라비앙코 브러시는 부드럽게 틈새만 쏙 닦아줘서 감동했어요."*
* **리뷰 3 (31세 필라테스 강사 김수님)**: *"회원님들 티칭할 때 손끝이 바로 보여서 신경 쓰였는데, 라비앙코로 관리한 뒤로는 손끝에 자신감이 생겼습니다."*

---

### 4.7 Early-bird Offer & FAQ Section (혜택 & 의문 해소)
* **사전 예약자 한정 혜택 안내**:
  * 혜택 1: 라비앙코 단품 정가 `18,000원` ➔ **얼리버드 50% 할인가 `9,000원`**
  * 혜택 2: 정식 런칭 시 **무료 배송 쿠폰 자동 지급**
  * 혜택 3: 선착순 100명 한정 알림 발송

---

### 4.8 Final CTA & Fake-Door Form Section (전환 섹션)
* **목표**: **휴대폰 번호 단 1개**만 입력받아 즉시 전환
* **피드백 모달**: 접수 완료 및 50% 할인 대상 등록 안내 모달 노출

---

## 5. JavaScript 인터랙션 및 상태 관리 명세 (JS Logic)

* **스마트 전화번호 포맷터**: 백스페이스 및 고속 타이핑 시 하이픈에 갇히지 않는 유연한 입력 지원
* **Fake-Door 리드 파이프라인**: LocalStorage `bianco_leads` 배열에 실시간 저장
* **FAQ 싱글 아코디언**: CSS 클래스 기반의 부드럽고 꼬임 없는 슬라이드 토글
* **rAF 스크롤 플로팅 바**: 모바일 60fps 부드러운 하단 플로팅 CTA 전환

---
*본 기술명세서는 La. Bianco의 공식 무드보드와 단품 패키지 사양을 완벽히 반영하여 설계되었습니다.*
