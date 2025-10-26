# State

: 컴포넌트 내부에서 변경되는 데이터를 저장할 때 사용 (가장 기본적인 상태 관리 Hook)

> const [state, setState] = useState(initialState); <br />
> : 값이 바뀌면 화면(UI)이 자동으로 다시 렌더링 <br />
> : state는 직접 바꾸면 안됨 setter 함수로 바꿔야함 <br />
> : 문자열, 숫자, 객체, 배열, 불리언 등.. 다양한 값 가능 <br />
> : 부모 컴포넌트의 state가 props로 자식 컴포넌트에 전달되어 사용될 수 있다. <br />
> : 컴포넌트는 state가 변경될때, props가 변경될 때, 부모가 리렌더링될 때 리렌더링 된다. <br />

```bash
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isPinned, setPinned] = useState(false);

  const togglePinned = () => {
    setPinned((p) => !p);
  };

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <button onClick={togglePinned}>{isPinned && "📌"} Pinn This!</button>
    </>
  );
}
```

## 상태 끌어올리기

> : 여러 개의 자식 컴포넌트가 동일한 데이터를 필요로 할 때, 그 데이터를 가장 가까운 공통 부모 컴포넌트로 이동시켜 관리하는 것.

- 상태 이동
- 데이터 전달
- 상태 변경 로직 전달
