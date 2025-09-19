// CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryName) return;

    fetch(`http://localhost:8000/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Invalid response from server");
        }
      })
      .catch((err) => setError("Failed to fetch products"));
  }, [categoryName]);

  return (
    <div>
      <h2>Products in {categoryName}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
