import React, { useReducer } from "react";
import login from "./utils/utils";

export default function LoginContext() {
  const initialState = {
    email: "",
    password: "",
    isLoading: false,
    error: "",
    isLoggedIn: false,
    todos: [
      {
        id: Math.random(),
        name: "go to gym",
        done: true,
      },
      {
        id: Math.random(),
        name: "go to groccery",
        done: false,
      },
    ],
  };
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case "success":
        return { ...state, isLoggedIn: true, isLoading: false };
      case "error":
        return {
          ...state,
          error: "Incorrect email or password. Try again!",
          isLoading: false,
          email: "",
          password: "",
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
          email: "",
          password: "",
        };
      case "field":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      case "toggle_todo":
        return {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.payload) {
              todo.done = !todo.done;
            }
            return todo;
          }),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { email, password, isLoading, error, isLoggedIn, todos } = state;

  const onSubmit = async (evt) => {
    dispatch({ type: "login" });
    evt.preventDefault();
    try {
      await login({ email, password });
      dispatch({ type: "success" });
    } catch (er) {
      dispatch({ type: "error" });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome {email} !</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login Form (useReducer)</h1>
          <form
            style={{ display: "flex", flexDirection: "column", padding: 10 }}
            onSubmit={onSubmit}
          >
            <p>{error && <span>{error}</span>}</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) =>
                dispatch({
                  type: "field",
                  payload: { field: "email", value: event.target.value },
                })
              }
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                dispatch({
                  type: "field",
                  payload: { field: "password", value: event.target.value },
                })
              }
            ></input>
            <button type="submit">
              {!isLoading ? "Login" : "Logging in..."}
            </button>
          </form>
        </div>
      )}
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            value={todo.done}
            onClick={(evt) => {
              if (isLoggedIn !== true) {
                alert("Please login to click !");
                evt.preventDefault();
              } else {
                dispatch({
                  type: "toggle_todo",
                  payload: todo.id,
                });
              }
            }}
          />
          {todo.name}
        </li>
      ))}
    </div>
  );
}
