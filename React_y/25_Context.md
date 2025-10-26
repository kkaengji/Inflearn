# Context

: props 없이 컴포넌트 트리 전반에 데이터를 전달할 수 있게 해주는 도구

## 1. Context 생성

```bash
import { createContext, useState } from "react";

# 컨텍스트 객체 생성
const CountContext = createContext();

# 프로바이더 컴포넌트
function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return <CountContext value={{ count, setCount }}>{children}</CountContext>;
}

export { CountContext, CountProvider };
```

## 2. Provider로 데이터 전달(값, state, 함수)

```bash
import { CountProvider } from "./contexts/CountContext";
import Child1 from "./Child1";

function App() {
  return (
    # Provider 요소 안에 들어가는 컴포넌트들은 해당 컨텍스트 데이터를 사용할 수 있음
    <CountProvider>
      <h2>App</h2>
      <Child1 />
    </CountProvider>
  );
}
```

## 3. 데이터 사용

```bash
import { CountContext } from "./contexts/CountContext";

function Child2() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <h2>Child2</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

#### Props Drilling

: 컴포넌트 트리의 상위에 있는 데이터(state)를 아주 깊은 하위 컴포넌트에 전달해야 할 때, 중간에 있는 수많은 컴포넌트들을 거쳐 props를 연쇄적으로 계속 전달해야 하는 상황
