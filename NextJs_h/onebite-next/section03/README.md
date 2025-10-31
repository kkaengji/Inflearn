# 1. App Router 시작하기

: Next.js에서는 라우팅 방식이 App Router과 Pages Router로 나누어짐.

```bash
# 최신 버전 @latest
npx create-next-app@latest [프로젝트명]
```

<img width="566" height="141" alt="캡처" src="https://github.com/user-attachments/assets/9064622a-4883-45a0-b870-980a87cca050" />

#### eslintrc.config.json

```bash
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 이 부분 추가
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", //사용하지 않는 변수가 있을 때 경고로 표시
      "@typescript-eslint/no-explicit-any": "off", //any 타입을 명시적으로 정의할 수 있도록 허용
    },
  },
];
```

---

# 2. 페이지 라우팅 설정하기

- App 폴더 밑에 구조를 기반으로 "page"라는 이름의 파일이 페이지 역할을하는 파일로 자동 설정 됨
  ex) app/search/page.tsx
- book/1 같은 URL 파라미터를 사용하는 동적 경로에 대응하게 되는 페이지는
  ex) app/books/[id]/page.tsx
  - URL 파라미터가 중첩으로 여러개 전달되는 경로에도 대응려면 폴더명을[...id]로 변경
    ex) app/book/[...id]/page.tsx
    - 이 경우 URL 파라미터가 아예 존재하지 않는 값에는 대응이 되지 않음! 되게 하려면 [[...id]]로 변경

```bash
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search 페이지: {q}</div>;
}
```

```bash
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>book/[id] 페이지: {id}</div>;
}
```

- 쿼리스트링이나 또는 URL 파라미터와 같은 경로상에 포함되는 값들은 이 페이지 컴포넌트에게 props로써 promise 객체 형태로 전달이 됨.
  - /search?q=123 → { searchParams: Promise<{ q: string }> }
  - app/books/[id]/page.tsx → { params: Promise<{ id: string }> }

---

# 3. 레이아웃

: App Router를 사용할 때 여러 경로(route)에서 **공유되는 UI(사용자 인터페이스)**를 정의
: 경로 폴더 내에 **layout.js**라는 이름으로 정의

- Root Layout (필수)
  : app/layout.js에 정의되는 최상위 레이아웃으로, 전체 애플리케이션에 적용
- 중첩
  : Layout은 폴더 구조에 따라 중첩될 수 있다.
  : 현재 배치된 경로로부터 시작하는 모든 하위의 경로에도 다 똑같이 적용이 됨
- children Prop
  : 모든 Layout 컴포넌트는 반드시 children prop을 받아야함
