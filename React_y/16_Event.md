# 16. 이벤트 핸들링

: 사용자의 행동이나 브라우저의 동작 등에 의해 발생할 때 이뤄져야 하는 동작들을 프로그래밍 <br />
: 함수의 "결과"가 아니라 함수 "자체"를 전달해야 함 <br />
: 이벤트에 배개변수를 전달하고 싶을 때는 화살표 함수로 인자 전달 <br />

## 16-1. 여러가지 이벤트 종류

- onClick: 클릭 시
- onChange: 입력값 변경 시
  - e.target.value 속성을 사용하면 입력 값을 가져올 수 있다.
- onSubmit: 폼 제출 시
- onKeyDown / onKeyUp: 키보드 키를 누를 때와 놓을 때
  - e.key 속성을 사용하면 눌린 키가 어느 키인지 확인가능
- onFocus / onBlur: 포커스 얻거나 잃을 때
- onDoubleCick: 마우스 더블클릭
- onContextMenu: 마우스 오른쪽 클릭
- onMouseEnter / onMouseLeave: 마우스가 요소에 들어오고 나갈 때

```bash
function App() {
  function handleClick() {
    console.log("Event 1");
  }

  return (
    <>
      <button onClick={handleClick}>Button 1</button>
      <button
        onClick={() => {
          console.log("Event 2");
        }}
      > Button 2
      </button>
    </>
  );
}
```

```bash
# e: 이벤트에 대한 상세 정보를 담는 객체
const handleEvent = (name, e) => {
  console.log(name, e);
  console.log(name, e.clientX, e.clientY);
  console.log(name, e.shiftKey);
};

const Button = ({ name }) => (
  <button onClick={(e) => handleEvent(name, e)}>{name}</button>
);
```

```bash
function App() {
  return (
    <>
      <input
        onFocus={() => console.log("Focus")}
        onBlur={() => console.log("Blur")}
        onChange={(e) => console.log(e.target.value)}
        onKeyDown={(e) => {
          console.log(e.key, "DOWN");
          if (e.key === "Enter" && e.shiftKey) {
            console.log("Shift + Enter DOWN");
          }
        }}
        onKeyUp={(e) => {
          console.log(e.key, "UP");
        }}
      />
    </>
  );
}
```

```bash

```
