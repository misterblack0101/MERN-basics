import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  const loginUser = async () => {
    let res = await fetch("http://localhost:5002/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    res = await res.json();
    const user = res.result;
    console.log(user);
    if (user.name) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(res.token));
      if (res) {
        navigate("/");
      }
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputField"
        placeholder="Enter Email"
        onChange={(val) => setEmail(val.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputField"
        placeholder="Enter Password"
        onChange={(val) => setPassword(val.target.value)}
        value={password}
      />
      <button className="signUpBtn" type="button" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;
