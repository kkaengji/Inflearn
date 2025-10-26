import "./App.css";
import { CountProvider } from "./contexts/CountContext";
import { ToggleProvider } from "./contexts/ToggleContext";
import Child1 from "./Child1";
import Child3 from "./Child3";

function App() {
  return (
    <>
      <h2>App</h2>
      <CountProvider>
        <Child1 />
      </CountProvider>
      <ToggleProvider>
        <Child3 />
      </ToggleProvider>
    </>
  );
}

export default App;
