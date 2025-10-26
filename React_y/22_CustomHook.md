# 커스텀 훅(Coustom Hook)

> : 내장 Hook(useState, useEffect 등)을 조합해서 만든, 재사용 가능한 함수 <br />
> : 반드시 이름이 use로 시작, 오직 함수 컴포넌트의 최상위 레벨에서만 호출해야 함.

```bash
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return { count, increment, decrement };
}

export default useCounter;
```

```bash
const App = () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
};
```

# useFetch

> : API나 서버에서 데이터를 가져오는(fetch) 과정을 하나의 함수로 추상화한 커스텀 훅(Custom Hook) <br />
> : 컴포넌트에서 간단히 데이터 요청 + 로딩 + 에러 상태를 관리할 수 있게 해주는 도우미 Hook

```bash
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
```
