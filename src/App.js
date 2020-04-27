import React, { useReducer } from "react";
import login from "./utils/utils";

export default function App() {
  const loginReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case "success":
        return { isLoggedIn: true, isLoading: false };
      case "error":
        return {
          error: "Incorrect email or password. Try again!",
          isLoading: false,
          email:'',
          password:''
        };
      case "logout":
        return {
          isLoggedIn: false,
          email: "",
          password: "",
        };
      case "field":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      default:
        return state;
    }
  };

  const initialState = {
    email: "",
    password: "",
    isLoading: false,
    error: "",
    isLoggedIn: false,
  };
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { email, password, isLoading, error, isLoggedIn } = state;

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

  return isLoggedIn ? (
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
        <button type="submit">{!isLoading ? "Login" : "Logging in..."}</button>
      </form>
    </div>
  );
}
