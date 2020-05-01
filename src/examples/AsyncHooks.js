import React, { useEffect } from "react";
import { useState } from "react";
import {useGiphy} from '../hooks/hooks';

export default function AsyncHooks() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  
  // call custom hooks
  const results = useGiphy(query);

  const searchGifs = (e) => {
    e.preventDefault();
    setQuery(search);
  };

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
      {results.map((item) => (
        <video key={item} src={item} loop autoPlay />
      ))}
    </div>
  );
}
