# useRef

: 변수를 사용하거나 DOM 요소에 접근할 때 사용되는 기능 (리렌더링 x) <br />

> - const ref = useRef(initialValue); <br />
>   : useRef를 호출하면 { current: initialValue } 형태의 객체가 반환됨 <br />
>   : DOM 요소에 접근 할때는 초기값 null을 명시

```bash
function Counter() {
  const count1 = useRef(0);
  const [count2, setCount2] = useState(0);

  const incrementRef = () => {
    # .current 속성으로 접근
    count1.current += 1;
    console.log("Ref Count:", count1.current);
  };

  return (
    <>
      <h2>Counter Counter</h2>
      <p>Count 1: {count1.current}</p>
      <p>Count 2: {count2}</p>
      <button onClick={incrementRef}>useRef</button>
      <button onClick={() => setCount2((c) => c + 1)}>useState</button>
    </>
  );
}
```

```bash
const App = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    console.log(inputRef.current);
    inputRef.current.focus();
  };

  return (
    <div>
      # input DOM 요소를 직접 참조
      <input ref={inputRef} type="text" placeholder="Type..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};
```
