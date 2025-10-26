import "./App.css";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/books");

  return (
    <>
      <h2>Book List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((book) => (
            <li key={book.id}>
              <strong>{book.title} </strong>
              by {book.author}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default App;
