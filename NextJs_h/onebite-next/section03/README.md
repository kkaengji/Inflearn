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

## 2.1. searchParams

: URL 쿼리스트링(query string) 정보를 담고 있는 객체
: ?q=apple → searchParams = { q: "apple" }

- searchParams가 Promise 타입으로 선언되어 있으면 await로 풀어야만 접근 가능

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

## 2.2. params

: 동적 경로(book/[id])에 대응
: /book/123 → params = { id: "123" }

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

## Route Group

: 폴더 구조를 깔끔하게 유지하면서 URL 경로에 영향을 주지 않는 디렉토리를 만드는 기능
: 라우트 그룹은 폴더 이름을 괄호 () 로 감싸서 생성

---

# 4. React 컴포넌트의 실행 환경

## 4.1. Server Component

: 서버측에서 사전 렌더링을 진행할 때 딱 한번 서버측에서만 실행 됨
: 링크는 HTML 고유의 기능이라 server 컴포넌트로 생성

## 4.2. Client Component

: 브라우저에서 하이드레이션되어 실행되는 React 컴포넌트
: 사전 렌더링 진행할 때 한번, 하이드레이션 진행할 때 한번 총 2번 실행

- 상단에 "use client"; 추가
- 자바스크립트의 기능을 활용하는 상호작용이 있는 컴포넌트는 전부 client component로 생성해야함
  : useEffect() 같은 Hock이나 이벤트 핸들러의 경우 해당

### Server Component 주의 사항

- Server Component에는 브라우저에서 실행될 코드가 포함되면 안된다
- Client Component는 클라이언트에서만 실행되지 않는다
- Client Component에서 Server Component를 import 할 수 없다
  : import 했을 경우 NextJS가 자동으로 Server Component를 Client Component로 변환시킴 (좋은 방법이 아님)
  : 클라이언트 컴퍼넌트가 서버 컴퍼넌트를 반드시 자식으로 둬야하는 경우엔 children props를 이용
- Server Component에서 Client Component에게 직렬화 되지 않는 Props는 전달 불가하다. (함수)
  - 직렬화(Serialization)?
    : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는 것

#### RSC Payload

: React Server Component를 직렬화한 순수한 데이터(결과물)

- RSC Payload에는 서버 컴포넌트의 모든 데이터가 포함됨
  - 서버 컴포넌트의 렌더링 결과
  - 연결된 클라이언트 컴포넌트의 위치
  - 클라이언트 컴포넌트에게 전달하는 Props 값

---

# 5. Navigating

: 현재 페이지에서 다른 경로로 이동하는 모든 행위

## 클라이언트 사이드 네비게이션 (Client-side Navigation)

: 브라우저 전체 새로고침 없이, JS로 URL을 바꾸고 React 트리 일부만 교체하는 네비게이션 방식.

- App Router에서도 기본적으로 이와 같은 원리로 동작하지만,
  서버 컴포넌트(Server Component) 와 클라이언트 컴포넌트(Client Component) 의 존재로 인해 차이가 있다.
  - 서버 컴포넌트(Server Component) → RSC Payload 형태로 전달된다.
  - 클라이언트 컴포넌트(Client Component) → 자바스크립트 번들(JS Bundle) 형태로 전달된다.

## 프리패칭 (Prefetching)

: 사용자가 다음에 방문할 가능성이 높은 페이지의 리소스를 미리 다운로드하여 대기 시간을 줄이는 기술

---

# 6. App Router의 데이터 페칭

## 6.1. 서버 우선(Server-First)

: App Router는 React Server Components를 기반으로 동작
: 기본적으로 모든 컴포넌트는 서버에서 실행되며, 서버에서 직접 데이터를 가져올 수 있다.

## 6.2. Async/Await 지원

: 서버 컴포넌트에서는 컴포넌트 함수를 async로 선언할 수 있다.
: 이를 통해 await 키워드를 사용해 데이터를 직접 비동기적으로 불러올 수 있음
→ 별도의 getServerSideProps나 getStaticProps 함수 없이, 컴포넌트 내부에서 자연스럽게 서버 데이터 페칭이 가능

## 6.3. Next.js의 fetch() 확장

: Next.js의 fetch()는 일반 브라우저 fetch보다 확장된 기능을 제공
: 자동 캐싱, 데이터 재검증(Revalidation), ISR(Incremental Static Regeneration) 등이 내장

- 데이터 캐시란?

: fetch 메서드를 활용해 불러온 데이터를 Next 서버에서 보관하는 기능
: 영구적으로 데이터를 보관하거나, 특정 시간을 주기로 갱신 시키는 것도 가능

### fetch 함수의 데이터 페칭 옵션

```bash
# fetch()의 두 번째 인수 옵션
const response = await fetch(`~/api` {cache: "force-cache"});
```

- { cache: "no-store" } (기본 값)
  : 데이터 페칭의 결과를 저장하지 않음, 캐싱을 아예 하지 않도록 설정하는 옵션
- { cache: "force-cache"}
  : 요청의 결과를 무조건 캐싱하며, 한번 호출 된 이후에는 다시는 호출되지 않음
- { next: { revalidate: 3 } }
  : 특정 시간을 주기로 캐시를 업데이트함, 마치 Page Router의 ISR방식과 유사
- { next: { tags: ['a'] } }
  : On-Demand Revalidate, 요청이 들어왔을 때 데이터를 최신화 함

## 6.4. 환경변수

: 서버 또는 클라이언트에서 API 요청을 보낼 때, 환경 변수를 사용하면 URL을 안전하게 관리

```bash
# .env
NEXT_PUBLIC_API_SEVER_URL=http://localhost:12345

# 컴포넌트에서 사용
await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);

# next.config.ts
# next에서 발생하는 모든 데이터 패칭이 다 로그로써 자동으로 콘솔에 출력
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

- NEXT*PUBLIC*이 붙은 변수 → 클라이언트와 서버 양쪽에서 접근 가능
- NEXT*PUBLIC*이 없는 변수 → 서버 전용 (클라이언트 접근 불가)

## 6.5 Request Memoization

: 같은 서버 요청(request)이 한 렌더링 동안 여러 번 발생해도 실제 네트워크 요청은 한 번만 수행되고, 이후 호출에서는 캐시된 결과를 재사용하는 기법
: 렌더링이 종료되면 모든 캐시가 소멸됨

---

# 7. 풀 라우트 캐시 (Full Route Cache)

: Nest 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능 (정적 페이지에만 적용)

## 데이터 페칭 전략과 렌더링 방식

- Static Page (정적 페이지)
  : Dynamic Page가 아니면 모두 Static Page가 됨
  : 동적함수x , 데이터캐시 o

- Dynamic Page (동적 페이지)
  : 특정 페이지가 접속 요청을 받을 때 마다 매번 변화가 생기거나, 데이터가 달라질 경우
  - 캐시되지 않는 Data Fetching을 사용할 경우
  - 동적 함수(쿠키, 헤더, 쿼리스트링)를 사용하는 컴포넌트가 있을 때

## export function generateStaticParams()

: 동적 페이지를 빌드 시점(Build Time)에 미리 생성하여 정적 페이지(Static Pages)로 만드는 것

```bash
# generateStaticParams 옵션
# generateStaticParams에서 정의되지 않은 동적 경로는 절대 렌더링하지 마라
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
```

---

# 8. 라우트 세그먼트 옵션
