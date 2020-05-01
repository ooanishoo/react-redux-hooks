import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

// custom hook fn to fetch gifs, takes query as an arg
export function useGiphy(query) {
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    console.log("inside fetch data");
    console.log({ query });
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=w2yRw08pa8gLRyryPwXRzx0eAkDWqYbj&q=${query}&limit=10&offset=0&rating=G&lang=en`
    );

    const json = await response.json();
    try {
      setResults(json.data.map((item) => item.images.preview.mp4));
    } catch (error) {}
  };

  useEffect(() => {
    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return results;
}
