import { useState, useEffect } from "react";

const FuncComp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("1. Mounted");
    return () => {
      console.log("3. Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("1. Mounted / 2. Updated");
  }, [count]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  console.log("-- Rendering --");

  return (
    <div>
      <h2>Function Component</h2>
      <h3>Count: {count}</h3>
      <button onClick={handleIncrement}>Increase</button>
    </div>
  );
};

export default FuncComp;
