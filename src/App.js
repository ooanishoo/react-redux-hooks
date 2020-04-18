import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

// create a reducer function
function reducer(state, action){
  return state;
}

// iniitalize initial state
const INITIAL_STATE = {
  count: 0
}

// create a global store
const store = createStore(reducer, INITIAL_STATE);

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  return (
    <div>
      <h1>Counter:</h1>
    </div>
  );
}
