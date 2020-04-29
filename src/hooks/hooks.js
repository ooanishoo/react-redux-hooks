import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(localStorage.getItem(key) || defaultValue);
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}
