import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5002/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let res = await fetch(`http://localhost:5002/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    res = await res.json;
    if (res) {
      getProducts();
    }
  };

  const handleSearch = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5002/search/${key}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else getProducts();
  };

  return (
    <div className="products-list">
      <h1>Products List</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Products"
        onChange={handleSearch}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Brand</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.brand}</li>
            <li>
              <button
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete
              </button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h3>No Products Found!</h3>
      )}
    </div>
  );
}

export default ProductsList;
