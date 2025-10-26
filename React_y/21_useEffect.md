# 1. 리액트 컴포넌트의 생명주기와 useEffect

> - useEffect(() => {...}) <br />
>   : 컴포넌트 마운트 + 모든 렌더링 시마다 실행 (성능 저하 위험) <br />

> - useEffect(() => {...}, [state]) <br />
>   : 컴포넌트 마운트 시 1회 + state 변경 시마다 <br />

## Mounting 생성

: 컴포넌트가 처음으로 렌더링되는 시점

```bash
  # 처음 마운트 시 1회만 실행
  useEffect(() => {
    console.log('1. Mounted')
  }, []) # 빈 배열
```

## Updating 업데이트

: 컴포넌트의 state 또는 props가 변경되어 컴포넌트가 다시 렌더링되는 단계

```bash
  # 컴포넌트 마운트 시 1회 + state 변경 시마다
  useEffect(() => {
    console.log('1. Mounted / 2. Updated')
  }, [count1]) # [count1, count2]처럼 여러 의존성 배열도 가능
```

## Unmounting 제거

: 컴포넌트가 DOM에서 제거되는 순간

```bash
  useEffect(() => {
    console.log('1. Mounted')

    # cleanup 함수 (메모리 누수 방지)
    return () => {
      console.log('3. Unmounted')
    }
  }, [])
```

## 실무에서 많이 사용되는 useEffect의 활용 예

> : API를 사용해서 서버에서 받아온 데이터를 렌더링하는 용도로 많이 사용
