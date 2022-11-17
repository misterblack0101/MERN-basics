import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let res = await fetch("http://localhost:5002/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, brand, category, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    res = await res.json();
    if (res.status == 200) {
      setName("");
      setBrand("");
      setCategory("");
      setPrice("");
    }
  };

  return (
    <div className="addProduct">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputField"
        placeholder="Enter Product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputField"
        placeholder="Enter Product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />{" "}
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        className="inputField"
        placeholder="Enter Product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />{" "}
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputField"
        placeholder="Enter Product brand"
        onChange={(e) => setBrand(e.target.value)}
        value={brand}
      />{" "}
      {error && !brand && (
        <span className="invalid-input">Enter valid brand</span>
      )}
      <button className="signUpBtn" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
