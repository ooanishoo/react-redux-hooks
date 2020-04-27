import React, { useEffect } from "react";
import { useState } from "react";
import login from "./utils/utils";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login({ email, password });
      setIsLoggedIn(true);
    } catch (er) {
      setError("Incorrect email or password. Try again!");
      console.log(er);
    }
    setIsLoading(false);
  };

  const logout = () =>{
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    console.log(error);
  }, [error]);
  return isLoggedIn ? (
    <div>
      <h1>Welcome {email} !</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>Login Form (useState)</h1>
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
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">{!isLoading ? "Login" : "Logging in..."}</button>
      </form>
    </div>
  );
}
