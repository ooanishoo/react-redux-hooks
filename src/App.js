import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import { fetchData } from "./api";
import giffReducer from "./redux/reducer";

const INITIAL_STATE = {
  isLoading: false,
  giffs: [],
};

const useSetToLocalStorage = (giffs) => {
  useEffect(() => {
    localStorage.setItem("giffs", JSON.stringify(giffs));
  }, [giffs]);
};

export default function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [state, dispatch] = useReducer(giffReducer, INITIAL_STATE);
  const { giffs, isLoading } = state;

  const didReload = useRef(false);

  useEffect(() => {
    if (!didReload.current) {
      const data = JSON.parse(localStorage.getItem("giffs"));
      console.log({ data });
      if (data !== null) dispatch({ type: "load_giff", payload: data });
      didReload.current = true;
    }
  }); // this useEffect runs only once

  useSetToLocalStorage(giffs);

  // useEffect(() => {
  //   localStorage.setItem("giffs", JSON.stringify(giffs));
  // }, [giffs]);

  // Create context objects

  const searchGifs = (e) => {
    e.preventDefault();
    setQuery(search);
    dispatch({ type: "search_start" });
  };

  useEffect(() => {
    console.log("query useEffect");
    if (query !== "") {
      fetchData(query).then((giffs) =>
        dispatch({
          type: "search_complete",
          payload: giffs,
        })
      );
    }
  }, [query]);

  return (
    <div>
      <h1>Async React hooks</h1>
      <form onSubmit={searchGifs}>
        <input
          placeholder="Search giffs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* {giffs.map((giff) => (
          <video key={giff} src={giff} />
        ))} */}

      {isLoading ? (
        <h1>Searching...</h1>
      ) : (
        giffs.map((giff) => <video key={giff} src={giff} />)
      )}
    </div>
  );
}
