import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const CustomLoginPage = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setErrors] = useState({});
  const handleLogin = (e: any) => {
    e.preventDefault();
    props.handleLogin(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrors({ errorCode, errorMessage });
      });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        Email: <input name="email" onChange={(e) => setEmail(e.target.value)} />
        Password:{" "}
        <input name="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
