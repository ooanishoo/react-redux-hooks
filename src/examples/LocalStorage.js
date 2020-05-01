import React from "react";
import {useLocalStorage} from "../hooks/hooks";

export default function App() {
  const [name, setName] = useLocalStorage("name", "Anish");
  return (
    <div>
      <input
        placeholder="Enter new name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      hello {name}
    </div>
  );
}
