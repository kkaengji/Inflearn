import { createContext, useState } from "react";

const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return <CountContext value={{ count, setCount }}>{children}</CountContext>;
}

export { CountContext, CountProvider };
