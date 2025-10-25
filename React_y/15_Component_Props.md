# 15. 컴포넌트의 Props

## Props

: 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하는 방법 (읽기 전용)

```bash
# 기본 개념
const InfoCard = (props) => (
  <div>
    <h2>{props.title}</h2>
    <p>{props.content}</p>
    <p>Author: {props.author}</p>
  </div>
)
```

```bash
# 구조분해할당 + 초기값 설정
# const InfoCard = ({ title, content, author}) => (
const InfoCard = ({ title = "(No Title)", content, author = "Anonymous" }) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <p>Author: {author}</p>
  </div>
);
```

```bash
# 리스트렌더링 + 스프레딩
const cards = [
  {
    idx: 1,
    title: "Props in React",
    content: "Props pass data from one component to another.",
    author: "Alice"
  }, {
    idx: 2,
    title: "React Composition",
    content: "Composition makes your components more reusable"
  }
]

function App() {
  return (
    <>
      {cards.map(cardData => (
        <InfoCard key={cardData.idx} {...cardData} />
      ))}
    </>
  )
}
```

```bash
# 함수
const App = () => {
  const product = {
    name: "Laptop",
    price: 123.4567
  };

  return (
    <ProductCard
    {...product}
    formatPrice={(p) => `$${p.toFixed(2)}`}
    />
  );
}
```

```bash
# Children
# 컴포넌트 태그 사이에 들어가는 내용을 전달할 때 사용
const CardLayout = ({ title, children }) => (
  <div className={styles.card}>
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
);

const App = () => (
  <div>
    <CardLayout title="About">
      <p>Props of Components</p>
    </CardLayout>
  </div>
);
```
