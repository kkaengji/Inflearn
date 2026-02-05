# 1. React 프로젝트 생성 (Vite + TypeScript)

```bash
$ npm create vite@latest [프로젝트명]
```

## TypeScript 설정 파일 역할

- tsconfig.json
  - 프로젝트 전체에 공통으로 적용되는 기본 설정
  - 다른 tsconfig들의 베이스 역할
- tsconfig.app.json
  - 브라우저에서 실행되는 React 앱 코드용
  - JSX, DOM, strict 옵션 등이 주로 여기에 영향
- tsconfig.node.json
  - Node.js 환경에서 실행되는 코드용
  - Vite 설정 파일, 서버 스크립트 등에 사용
- main.tsx <StrictMode>
  : 리액트 앱의 잠재적인 문제를 검사하는 태그

# 2. Tailwind CSS

: 유틸리티 퍼스트(Utility-first) CSS 프레임워크 <br />
: 빠른 스타일링 + 일관된 디자인 유지

## Tailwind CSS 설치 및 클래스

https://tailwindcss.com/docs/installation/using-vite

```bash
# 설치 (Vite 기준)
@import "tailwindcss";

# Prettier + Tailwind 플러그인
npm i -D prettier prettier-plugin-tailwindcss

# .prettierrc
# 최대한 레이아웃과 관련된 클래스들이 앞으로 이동
# 텍스트의 스타일링을 설정하는 클래스들은 최대한 뒤로
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

# 3. Shadcn/ui

https://ui.shadcn.com/docs/installation
https://lucide.dev/icons/

: 현대 웹 개발에 필요한 거의 대부분의 필수적인 UI 요소들을 제공하는 디자인 라이브러리
: Tailwind CSS 기반으로 제작
: 홈페이지에서 ctrl + k로 검색하여 사용

# 4. React Router 정리

```bash
$ npm i react-router@latest

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  # URL에 맞는 컴포넌트를 렌더링하도록 기반 환경을 제공
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

```bash
function AuthLayout() {
  return (
    <div>
      <header>Auth!</header>
      <Outlet /> # 현재 경로와 일치하는 중첩된 자식 라우트가 렌더링될 위치를 지정
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
```

# 5. 전역 상태 관리와 Zustand

## 5.1 전역 상태?

: 여러 컴포넌트에서 공유되는 상태 <br />
: ex) 사용자 인증 정보, 테마 정보, 장바구니 정보, 언어 설정

### 대표적인 상태 관리 라이브러리

: Redux, Zustand, MobX, Jotai, Recoil

### Context API 정리

: 전역 상태 관리를 위한 기능이라기 보다는 Props Drilling 이슈를 해결하기 위해 제공되는 기능

- 컴포넌트 트리 깊숙한 곳까지 props 전달을 피하기 위해 사용
- 값이 변경되면 하위 컴포넌트 전부 리렌더링
- 대규모 상태, 잦은 업데이트에는 비효율적

## 5.2 Zustand

- 많은 사람들이 사용
- 용량이 매우 가벼움
- 매우 직관적이어서 배우기 쉬움

```bash
npm i zustand
```

```bash
import { create } from "zustand";

create(() => {
  return {};
});
```

Tip. F12 -> Components -> 톱니바퀴 -> Highlight updates when components render 체크

### Zustand 미들웨어

- combine: Store의 타입을 자동 추론
- immer: Store의 내부의 상태 업데이트를 보다 편리하게 해줌 'npm i immer'
- subscribeWithSelector: Store 내의 특정 값 변화시, 이벤트 핸들러 호출
- persist: Store를 로컬, 세션 스토리지 등에 보관함
  - 액션 함수가 기본적으로 저장 되지 않는 이유는 함수는 JSON으로 직렬화 할 수 없기 때문
  - createJSONStorage: 세션 스토리지에 보관
- devtools: Store의 값을 개발자 도구에서 확인할 수 있음

```bash
// 되도록 미들웨어는 아래 순서대로 적용
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increaseOne: () => {
                set((state) => {
                  state.count += 1;
                });
              },
              decreaseOne: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        partialize: (store) => ({ count: store.count }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "CountStore" },
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count) => {
    // Listner: count 값이 변경될 때마다 호출됨
    console.log(count);

    const store = useCountStore.getState();
  },
);
```
