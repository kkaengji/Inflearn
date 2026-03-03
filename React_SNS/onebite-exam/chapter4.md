# 1. 서버 상태 관리와 TanStack Query

> 리액트 앱에서의 상태는 관리해야 되는 데이터의 특징에 따라서
> 특정 컴포넌트에서만 접근이 가능하다면 지역 상태 (Local State)
> 반대로 모든 컴포넌트에서 접근이 가능해야 된다면 전역 상태 (Global State)
>
> 복잡한 데이터들을 모두 포함하는 API 요청과 관련된 데이터들은 서버 상태라는 별도의 유형으로 관리

## 1.2 TanStack Query

: 가장 대표적인 서버 상태 관리 라이브러리

### TanStack Query 캐시의 5가지 상태

- fetching: 데이터를 불러오는 중 일때
- fresh: 데이터가 신선한 상태일 때
  ↕ staleTime (Like. 유통기한)
- stale: 데이터가 상한 상태
  ↑ 리페칭 (데이터 다시 불러옴, 임의로 키거나 끌 수 있음)
  1. Mount: 이 캐시 데이터를 사용하는 컴포넌트가 마운트 되었을 때
  2. WindowFocus: 사용자가 이 탭에 다시 돌아왔을 때
  3. Reconnect: 인터넷 연결이 끊어졌다가 다시 연결 되었을 때
  4. Interval: 특정 시간을 주기로

- inactive: 이 캐시 데이터를 활용하는 컴포넌트가 없을 때
  ↓ gcTime (Garbage Collecting Time)
- deleted

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
npm i @tanstack/react-query-devtools
'''

# 3. 낙관적 업데이트 onMutate

> 데이터 수정 요청이 성공할 것이라 낙관
> 요청을 보내자마자 데이터 업데이트
>
> 빠른 반응을 제공하는 SNS에 주로 사용된다

# 4. 캐시 정규화
