import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponents";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {/* <h1>E-Dashboard</h1> */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductsList />}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/update/:id" element={<UpdateProduct />}></Route>
            <Route
              path="/logout"
              element={<h1>Logout User component</h1>}
            ></Route>
            <Route
              path="/profile"
              element={<h1>User Profile component</h1>}
            ></Route>
          </Route>
          {/*
          //
          */}
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
