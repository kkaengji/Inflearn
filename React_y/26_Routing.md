# 라우팅 Routing

: 주어진 URL에 따라 페이지 및 컨텐츠를 제공하는 방식

## React Router

: 클라이언트 측 라우팅을 구현하기 위해 가장 널리 사용되는 라이브러리

> React Router 설치
> $ npm i react-router-dom

### 1. BrowserRouter

> : 어플리케이션이 URL을 다룰 수 있고 새로고침 없이 페이지를 전환할 수 있도록 해줌

```bash
main.jsx
import { BrowserRouter } from "react-router-dom";
```

> - <Routes> 라우트 그룹
>   : 여러 <Route> 컴포넌트를 감싸는 역할

> - <Routes> 경로 정의
>   : path 속성에 URL 경로를, element 속성에 해당 경로에서 렌더링할 컴포넌트를 지정

> - <Link> 경로 이동
>   : 각각에 지정된 경로로 URL을 변경하여 다른 페이지로 이동하는데 사용되는 컴포넌트
>   : HTML의 <a> 태그와 유사하지만, 페이지를 새로고침하지 않고 to 속성에 지정된 URL로 이동

```bash
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
```

### 2. useNavigate

: 함수형 컴포넌트 내에서 버튼 클릭 이벤트 등 특정 로직 후 페이지 이동을 강제로 수행할 때 사용하는 Hook

```bash
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const navigate = useNavigate();

  const navTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <button onClick={() => navTo("/")}>Home</button>
      <button onClick={() => navTo("/about")}>About</button>
      <button onClick={() => navTo("/contact")}>Contact</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
```

## URL을 통해 주어지는 정보들에 접근하는 방법

### 1. useLocation

: 현재 브라우저의 위치(URL) 정보를 담고 있는 객체를 반환하는 Hook

> - .pathname
>   : 현재 URL의 경로 부분 (쿼리스트링 및 해시 제외) "/search"

> - .search
>   : URL의 쿼리스트링 부분 (맨 앞의 ? 문자 포함)
>   - 쿼리 파라미터 "?keyword=react"
>     : 한 URL에 하나 이상의 데이터를 추가적으로 전달하는데 사용
>   - const queryParams = new URLSearchParams(location.search);
>     : 브라우저 API에 속한 기능 'keyword=react'와 같은 쿼리 문자열을 파싱하여 인스턴스로 저장

> - .hash
>   : URL의 해시 부분 (맨 앞의 # 문자 포함). 주로 페이지 내의 특정 위치를 가리킴 "#reviews"

> - .state
>   : useNavigate나 <Link> 컴포넌트를 통해 페이지를 이동할 때 함께 전달된 상태 객체 { from: 'home' }

> - .key
>   : 현재 위치를 고유하게 식별하는 값

### 2. useParams

: 현재 URL 경로에 포함된 동적인 매개변수(URL Parameter) 값을 가져올 때 사용하는 Hook

```bash
navigate("details");  # 현재 경로 기준으로 /details 로 이동
navigate("../home");  # 상위 경로로 이동

navigate(-1); # 뒤로 가기
navigate(1);  # 앞으로 가기

navigate("/profile", { state: { userId: 123 } }); # 상태값 전달

# 조건부 네비게이션
useEffect(() => {
  if (!isLoggedIn) navigate("/login");
}, [isLoggedIn, navigate]);
```

```bash
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

function Home() {
  const location = useLocation();

  # 다른 경로로 이동하여 location 객체가 변경될 때 업데이트
  useEffect(() => {
    console.log("Current Path:", location.pathname);
  }, [location]);

  return <h1>Home Page</h1>;
}

function User() {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("URL Parameter (id):", id);
  }, [id, location]);

  return <h1>User ID: {id}</h1>;
}

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("Query Parameter (keyword):", keyword);
  }, [keyword, location]);

  return <h1>Search Keyword: {keyword}</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<User />} />  # :id 동적 파라미터
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
```

## 잘못된 URL을 처리하는 방법

```bash
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/wrong-path">Wrong Path</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/about" element={<h2>About Page</h2>} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
};
```
