# useReducer

> - const [state, dispatch] = useReducer(reducer, initialState);
>   : useState의 대안으로 사용, 복잡한 상태 업데이트 로직을 명확하게 구조화하고 관리하기 위한 Hook
>   : reducer 함수는 우리가 직접 만들어야 하는 상태 로직 함수. (일반적으로 switch문 구조)

> - dispatch({ type: "add", payload: { text: "React 공부하기" } });
>   : type 어떤 동작을 할지 나타내는 문자열(필수), payload 상태 변경에 필요한 데이터(선택)
>   : 화면 표시와 직접 관련이 없는 추가 정보나 부가 데이터는 meta 속성에 담아 함께 전달가능

```bash
function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={state.name}
        # 입력값이 변경될 때 reducer에 SET_NAME 액션 전달
        onChange={(e) =>
          dispatch({
            type: "SET_NAME",
            payload: e.target.value,
          })
        }
      />
      <input
        type="number"
        placeholder="Enter birth year"
        value={state.year}
        # 입력값이 변경될 때 reducer에 SET_YEAR 액션 전달
        onChange={(e) =>
          dispatch({
            type: "SET_YEAR",
            payload: e.target.value,
          })
        }
      />
      {state.warning && <p style={{ color: "red" }}>{state.warning}</p>}
      <p>Name: {state.name}</p>
      <p>Year: {state.year}</p>
    </div>
  );
}
```

```bash
export const initialState = {
  name: "",
  year: "",
  warning: "",
};

# action에는 dispatch의 객체가 전달 됨
export function userReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload.trim().toLowerCase(),
      };
    case "SET_YEAR": {
      const age = new Date().getFullYear() - action.payload;
      if (age < 18) {
        return {
          ...state,
          warning: "Must be at least 18 yrs old!",
        };
      }
      return {
        ...state,
        year: action.payload,
        warning: "",
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}


```
