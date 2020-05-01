import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";

const INITIAL_STATE = {
  isLoading: false,
  giffs: [],
};

function giffReducer(state, { type, payload }) {
  switch (type) {
    case "load_giff":
      console.log({payload});
      return {
        ...state,
        giffs: payload
      }

    case "search_start":
      return {
        ...state,
        isLoading: true,
      };
    case "search_complete":
      return {
        ...state,
        giffs: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

const fetchData = async (query) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=w2yRw08pa8gLRyryPwXRzx0eAkDWqYbj&q=${query}&limit=10&offset=0&rating=G&lang=en`
    );

    const json = await response.json();
    return json.data.map((item) => item.images.preview.mp4);
  } catch (error) {}
};

export default function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [state, dispatch] = useReducer(giffReducer, INITIAL_STATE);
  const { giffs, isLoading } = state;

  const didReload = useRef(false);

  useEffect(() => {

    if(!didReload.current){
      console.log('running.....');
      const data = JSON.parse(localStorage.getItem("giffs"));
      console.log({data});
      dispatch({ type: "load_giff", payload: data });
      didReload.current = true;
    }
  }); // this useEffect runs only once

  useEffect(() => {
    localStorage.setItem("giffs", JSON.stringify(giffs));
  }, [giffs]);

  // Create context objects
  const DispatchContext = React.createContext();

  const searchGifs = (e) => {
    e.preventDefault();
    setQuery(search);
    dispatch({ type: "search_start" });
  };

  useEffect(() => {
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
    <DispatchContext.Provider value={dispatch}>
      <h1>Async React hooks</h1>
      <form onSubmit={searchGifs}>
        <input
          placeholder="Search giffs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <h1>Searching...</h1>
      ) : (
        giffs.map((giff) => <video key={giff} src={giff} />)
      )}
    </DispatchContext.Provider>
  );
}
