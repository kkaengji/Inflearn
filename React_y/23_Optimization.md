# 최적화 Optimization

: 불필요한 연산 재실행을 방지하고 어플리케이션의 성능을 최적화하는 데 사용

## 1. useMemo

> : 값의 메모이제이션(Memoization) 을 위해 사용 <br />
> : 비용이 큰 연산 결과를 캐싱할 때, 하위 컴포넌트에 동일한 참조 전달할때 사용

```bash
function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  # 무거운 연산
  const heavyCalculation = (num) => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  };

  # useMemo 사용
  const calculatedValue = useMemo(() => heavyCalculation(count2), [count2]);

  return (
    <>
      <p>Counter 1: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>+</button>
      <button onClick={() => setCount1(count1 - 1)}>-</button>
      <p>Counter 2: {calculatedValue}</p>
      <button onClick={() => setCount2(count2 + 1)}>+</button>
      <button onClick={() => setCount2(count2 - 1)}>-</button>
    </>
  );
}
```

```bash
import React from "react";

function Child({ active }) {
  console.log("Child rendered");
  return <p>Child: {active ? "Active" : "Not active"}</p>;
}

export default React.memo(Child);

```

## 2. useCallback

> : 함수(Function) 를 메모이제이션하는 훅 <br />
> : 하위 컴포넌트에 콜백 함수를 props로 넘길 때, useEffect의 의존성에 함수를 넣을 때 사용

```bash
function App() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <>
      <h2>Parent</h2>
      <button onClick={() => setActive((a) => !a)}>Toggle Active</button>
      <p>Count: {count}</p>
      <Child active={active} onClick={handleClick} />
    </>
  );
}
```
