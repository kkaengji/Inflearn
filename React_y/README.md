# React + JavaScript

## 1. 프로젝트 생성

```bash
npm create vite@latest
npm i
npm run dev
npm run build
npm run preview
```

> 프로젝트 생성 후 정리 해야할 파일
> : App.jsx <br />
> : App.css / index.css <br />
> : vite.svg / react.svg <br />

## 2. 컴포넌트

: 이름이 대문자로 시작해야 컴포넌트로 인식된다.

```bash
import React, { Component } from "react";

# 클래스 형식 컴포넌트(초기의 리액트)
class ClassComp extends Component {
  render() {
    return <p>Class Comp</p>;
  }
}

# 일반 함수형 컴포넌트
function FunctionComp() {
  return <p>Function Comp</p>;
}

# 화살표 함수형 컴포넌트
const ArrowFunctionComp = () => {
  return <p>Arrow Function Comp</p>;
};

export { ClassComp, FunctionComp, ArrowFunctionComp };
```

## 3. JSX 문법 기초

### 중괄호 표현식 {}

: JavaScript 코드를 작성하고 그 결과를 렌더링하는 데 사용

#### ✅ 가능한 것

: 중괄호 안에는 값을 생성하는 모든 JavaScript 표현식이 들어갈 수 있다.

- 변수 및 상수: name, count
- 수학 연산: 1 + 2, a \* b
- 함수 호출: formatDate(date), user.getName() (함수가 값을 반환해야 함)
- 삼항 연산자: isLoggedIn ? <Button /> : <Login />
- 배열 map함수: items.map(item => <li key={item.id}>{item.name}</li>)
- 객체 속성 접근: user.profile.age

#### ❌ 불가능한 것

: 값을 생성하지 않는 JavaScript 구문은 직접 포함될 수 없다

- if문
- for루프
- 변수 선언
- switch문

#### 주의

: Boolean값이나 null, undefined는 렌더링되지 않는다.

## 4-1. 조건부 렌더링

### 삼항 연산자 A ? B : C

```bash
function getUserContent(userStatus) {
  return userStatus === "admin" ? (
    <>
      <h2>Admin Dashboard</h2>
      <button>Manage Users</button>
    </>
  ) : userStatus === "member" ? (
    <p>Welcome to the community!</p>
  ) : (
    <a href="/signup">Sign up here</a>
  );
}

function App() {
  return <>{getUserContent("admin")}</>;
}
```

### AND 연산자 &&

```bash
const hasMessages = true;
const message = "Hello, World!";

function App() {
  return (
    <>
      # 앞의 값이 참이면 뒤의 JSX 요소가 그대로 반환
      {hasMessages && <h2>You have new messages!</h2>}
      {message && <p>Message: {message}</p>}
    </>
  );
}
```

### null 병합연산자, OR 연산자 ||

: 앞에 null 또는 undefined가 들어 올경우 뒤에 오는 값 반환
: 특정 값이 비어있거나 null일 때 기본값을 제공하는 용도로 자주 사용
: truthy 값이 들어오면 해당 값을 그대로 반환

```bash
const hasMessages = true;
const message = null;

function App() {
  return (
    <>
      {hasMessages && <h2>You have new messages!</h2>}
      {message && <p>Message: {message}</p>}

      # null 병합연산자
      <p>Message: {message ?? <em>No message</em>}</p>
      # falsy값이 들어오면 OR 연산자만 뒤의 값을 반환
      <p>Message: {message || <em>No message</em>}</p>
    </>
  );
}
```

## 4-2. 리스트 렌더링

: 배열 데이터를 반복해서 여러 개의 컴포넌트나 엘리먼트를 화면에 그리는 것
: 반복될 요소에 key라는 속성을 설정해주어야 함 (고유한 값o, 인덱스는 비권장)

```bash
function App() {
  const books = [
    { id: 1, title: "React Basics", published: true, publisher: "Manning" },
    { id: 2, title: "Advanced Hooks", published: false, publisher: "OReilly" },
    { id: 3, title: "JSX in Depth", published: true, publisher: "Packt" },
  ];

  const publisheds = books.filter((book) => book.published);

  return (
    <>
      {publisheds.length > 0 && <h2>Published Books</h2>}
      {publisheds.length ? (
        publisheds.map((book) => (
          <article key={book.id}>
            <strong>{book.title}</strong>
            <em> - {book.publisher}</em>
          </article>
        ))
      ) : (
        <p>No published books found.</p>
      )}
    </>
  );
}

```

> array.map(callbackFn, thisArg);
> : 배열의 모든 요소를 순회하며, 각 요소를 변환하여 새로운 배열을 반환 (불변성)

> array.filter(callbackFn, thisArg);
> : 배열에서 특정 조건을 만족하는 요소만 추려내서 새로운 배열을 반환 (불변성)

## 5. JSX 속성과 스타일링

### 객체 스프레딩을 이용한 스타일링

: 기존 객체의 속성들을 활용하여 새로운 객체를 만드는 데 사용

```bash
function App() {
  const divStyle = {
    backgroundColor: "lightblue",
    margin: "12px",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <>
      <div style={divStyle}>DIV 1</div>
      <div
        style={{
          ...divStyle,
          backgroundColor: "lightgreen",
          color: "darkblue",
          fontWeight: "bold",
        }}
      >
        DIV 2
      </div>
    </>
  );
}
```

### 동적 스타일링

```bash
function App() {
  const styleA = {
    color: "darkred",
    fontWeight: "bold",
  };
  const styleB = {
    color: "navy",
    textDecoration: "underline",
  };

  const isPrimary = true;

  return (
    <>
      <div style={isPrimary ? styleA : styleB}>
        This text has dynamic styling
      </div>
      <span
        style={{
          fontSize: isPrimary ? "1.5em" : "lem",
          opacity: isPrimary ? 1 : 0.5,
        }}
      >
        So does this text.
      </span>
    </>
  );
}

```
