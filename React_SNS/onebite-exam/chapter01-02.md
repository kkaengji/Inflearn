# 1. React 프로젝트 생성

```bash
$ npm create vite@latest [프로젝트명]
```

## 주요 TypeScript 옵션 파일과 StrictMode

- tsconfig.json
  : 프로젝트 전체의 기본 설정을 담고 있는 루트(Root) 설정 파일
- tsconfig.app.json
  : 브라우저에서 실행되는 클라이언트 측 코드 (즉, React 컴포넌트, 로직 등 실제 웹 앱 코드)에 대한 설정을 정의
- tsconfig.node.json
  : Node.js 환경에서 실행되는 코드에 대한 설정을 정의
- main.tsx <StrictMode>
  : 리액트 앱의 잠재적인 문제를 검사하는 태그

# 2. Tailwind CSS

: 스타일링을 보다 빠르고 또 간결하게 진행할 수 있도록 도와주는 도구

## 2.1. Tailwind CSS 설치 및 클래스

https://tailwindcss.com/docs/installation/using-vite

```bash
# index.css
@import "tailwindcss";

# Prettier와 Tailwind CSS 플러그인을 개발 종속성으로 설치
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

: 현대 웹 개발에 필요한 거의 대부분의 필수적인 UI 요소들을 제공하는 디자인 라이브러리
: Tailwind CSS 기반으로 제작
: 홈페이지에서 ctrl + k로 검색하여 사용

## 3.1. Shadcn/ui 설치
