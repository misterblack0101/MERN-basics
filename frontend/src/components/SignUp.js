import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    // console.log(name, email, password);
    let result = await fetch("http://localhost:5002/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    const user = result.result;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/");
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <h1>Sign Up</h1>
      <input
        className="inputField"
        type="text"
        name="name"
        id="name"
        placeholder="Enter name"
        value={name}
        onChange={(val) => setName(val.target.value)}
      />
      <input
        className="inputField"
        type="text"
        name="email"
        id="email"
        placeholder="Enter e-mail"
        value={email}
        onChange={(val) => setEmail(val.target.value)}
      />
      <input
        className="inputField"
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(val) => setPassword(val.target.value)}
      />
      <button type="button" className="signUpBtn" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
