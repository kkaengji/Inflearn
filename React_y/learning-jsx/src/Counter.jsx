import { useState, useRef } from "react";

function Counter() {
  const count1 = useRef(0);
  const [count2, setCount2] = useState(0);

  const incrementRef = () => {
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

export default Counter;
