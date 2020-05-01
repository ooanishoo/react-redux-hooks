import React, { useReducer, useContext, useState, useEffect } from "react";
import login from "./utils/utils";
import useLocalStorage from "./hooks/hooks";

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
            console.log(todo.name, "found it");
            console.log(!todo.done, "setting it to :");
            todo.done = !todo.done;
          }
          return todo;
        }),
      };

    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "delete_todo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "set_localStorage":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export default function App() {
  const [states, dispatch] = useReducer(loginReducer, initialState);

  const [state, setState] = useLocalStorage("state", states);
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
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
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
        <h1>Todo List ({todos.length})</h1>
        <AddTodo />
        <ListTodo todos={todos} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

function AddTodo() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [name, setName] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (state.isLoggedIn) {
      dispatch({
        type: "add_todo",
        payload: {
          id: Math.random(),
          name: name,
          done: false,
        },
      });
      setName("");
    } else {
      alert("Please login to click !");
    }
  };

  return (
    <div>
      <form type="submit" onSubmit={onSubmit}>
        <input
          placeholder="Enter name"
          onChange={(evt) => setName(evt.target.value)}
          value={name}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function ListTodo({ todos }) {
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

function TodoItem({ todo, isLoggedIn }) {
  const { id, name, done } = todo;
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const deleteTodo = () => {
    dispatch({
      type: "delete_todo",
      payload: id,
    });
  };

  return (
    <>
      <li key={id}>
        <input
          type="checkbox"
          checked={done}
          onChange={(evt) => {
            if (state.isLoggedIn !== true) {
              alert("Please login to click !");
              evt.preventDefault();
            } else {
              console.log("changing...");
              dispatch({
                type: "toggle_todo",
                payload: id,
              });
            }
          }}
        />
        {name}
        <button onClick={deleteTodo}>Delete</button>
      </li>
    </>
  );
}
