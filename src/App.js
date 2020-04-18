import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// create a reducer function
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1,
      };

    case "CHANGE_NAME":
      return{
        ...state,
        name: state.name
      }
    default:
      return state;
  }
}

// iniitalize initial state
const INITIAL_STATE = {
  count: 0,
  name:""
};

// create a global store
const store = createStore(reducer, INITIAL_STATE);

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
      <Name />
    </Provider>
  );
}

function Name() {
  const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  function handleNameChange(event){
    dispatch({
      type: "CHANGE_NAME",
      payload: event.target.value
    });
  }
  return (
    <div>
      <h3>Your name is: {name}</h3>
      <h2>Name:</h2>
      <input onChange={handleNameChange}></input>
    </div>
  );
}

function Counter() {
  // useSelector is used to retrieve state from redux store
  const count = useSelector((state) => state.count);

  // useDispatch is used to dispatch an action to redux store
  const dispatch = useDispatch();

  function increment() {
    dispatch({
      type: "INCREMENT_COUNT",
    });
  }
  function decrement() {
    dispatch({
      type: "DECREMENT_COUNT",
    });
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
