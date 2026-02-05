# 1. 서버 상태 관리와 TanStack Query

> 리액트 앱에서의 상태는 관리해야 되는 데이터의 특징에 따라서
> 특정 컴포넌트에서만 접근이 가능하다면 지역 상태 (Local State)
> 반대로 모든 컴포넌트에서 접근이 가능해야 된다면 전역 상태 (Global State)
>
> 복잡한 데이터들을 모두 포함하는 API 요청과 관련된 데이터들은 서버 상태라는 별도의 유형으로 관리

## TanStack Query

: 가장 대표적인 서버 상태 관리 라이브러리

# 2. 실습용 서버 설정

'''bash
// 설치
// JSON 형태의 파일을 이용해서 간단한 API 서버를 만들도록 도와주는 도구
npm i json-server -D

// vite.config.ts 설정
server: {
watch: {
ignored: ["**/server/**"],
},
},

// 실행
npx json-server server/db.json

// tanstack 설치
npm i @tanstack/react-query
'''
