import "./App.css";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

function Home() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname);
  }, [location]);

  return <h1>Home Page</h1>;
}

function User() {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("URL Parameter (id):", id);
  }, [id, location]);

  return <h1>User ID: {id}</h1>;
}

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("Query Parameter (keyword):", keyword);
  }, [keyword, location]);

  return <h1>Search Keyword: {keyword}</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
