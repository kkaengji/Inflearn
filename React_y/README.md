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
> : App.jsx
> : App.css / index.css
> : vite.svg / react.svg

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
