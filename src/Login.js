import React, { useState } from "react";
// import firebase from "firebase";
import { auth } from "./firebase";
import "./Login.css";
// import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");

  const [{ user }, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {})
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    if ((email, password)) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          let name = prompt("Enter username");
          let photo = prompt("Enter PhotoURL");

          const user = auth.currentUser;
          return user.updateProfile({
            displayName: name,
            photoURL: photo,
          });
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Requires all fields are completed");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>TWITTER CLONE</h1>
        <h2>Sign-In</h2>

        <form>
          <h5>Email</h5>
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <h5>Password</h5>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
          {/* <h5>Username</h5>
          <input
            value={username}
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username..."
          /> */}
          <button
            onClick={signIn}
            type="submit"
            className="login__signInButton"
          >
            Sign-In
          </button>
        </form>
        <button
          onClick={register}
          type="submit"
          className="login__registerButton"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
