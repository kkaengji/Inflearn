# 1. useTransition

> : UI를 차단하지 않고 상태(state)를 업데이트할 수 있게 해줌 <br />
> : React의 동시성(Concurrency) 기능을 활용하여, 상태 업데이트에 우선순위를 부여

```bash
import { useState, useTransition } from "react";
import { rollDice } from "./asynctasks";

const App = () => {
  const [dice, setDice] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleRoll = () => {
    setError(null);
    # 인자로 비동기 함수를 넣어 실행
    # 해당 작업이 진행되는 동안만 isPending의 값이 true가 됨
    startTransition(async () => {
      try {
        const result = await rollDice();
        setDice(result);
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <div>
      <button onClick={handleRoll} disabled={isPending}>
        {isPending ? "Rolling..." : "Roll Dice"}
      </button>
      {error && <p>Error: {error}</p>}
      {!error && !isPending && dice && <p>Dice result: {dice}</p>}
    </div>
  );
};
```

# 2. useActionState

: form 태그의 상태를 추적해서, form이 제출될 때 발생하는 비동기 작업에 따른 상태를 자동으로 업데이트

> - const [state, formAction, isPending] = useActionState(fn, initialState);
>   - state: 현재 상태
>   - formAction: 액션 핸들러
>   - inPending: 로딩 상태

```bash
import { useActionState } from "react";
import { rollDice } from "./asynctasks";

const App = () => {
  # 해당 작업이 실행되는 동안 배열의 세 번째 요소가 true가 됨
  const [dice, submitAction, isPending] = useActionState(async () => {
    try {
      const result = await rollDice();
      return result;
    } catch (e) {
      return e;
    }
  }, 7 # 해당 state의 초기값
);

  return (
    <form action={submitAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Rolling..." : "Roll Dice"}
      </button>
      {dice instanceof Error && <p>Error: {dice.message}</p>}
      {!(dice instanceof Error) && !isPending && dice && (
        <p>Dice result: {dice}</p>
      )}
    </form>
  );
};
```

# 3. useOptimistic

: 사용자의 즉각적인 피드백(UI 응답성) 을 위해 서버 응답을 기다리지 않고 “낙관적 업데이트(Optimistic Update)”를 쉽게 구현하는 Hook

```bash
import { useState, useOptimistic } from "react";
import { updateName } from "./asynctasks";

const App = () => {
  const [name, setName] = useState("(Empty)");
  const [optName, setOptName] = useOptimistic(name);

  const submitAction = async (formData) => {
    const newName = formData.get("name");
    setOptName(`⏳ ${newName}`);
    const updatedName = await updateName(newName);
    setName(updatedName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optName}</p>
      <p>
        <label>Change Name:</label>
        <input type="text" name="name" />
        <button type="submit">Update</button>
      </p>
    </form>
  );
};
```
