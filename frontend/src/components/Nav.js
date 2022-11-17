import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  const auth = localStorage.getItem("user");
  return (
    <div>
      <img
        src="data:image/jpeg;base64,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"
        alt="logo"
        className="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>{" "}
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {/* {" "} */}
            <Link to="/logout" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;