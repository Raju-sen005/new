import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import { API_BASE_URL } from '../lib'

=======
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/category`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (cat) => {
    navigate("/category-detail", { state: cat });
  };

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  if (!categories.length)
    return <p className="text-center mt-10">No categories found</p>;

  return (
    <section className="container mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Shop By Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer group"
            onClick={() => handleCategoryClick(cat)}
          >
            <img
              src={
                cat.image?.startsWith("http")
                  ? cat.image
                  : `${import.meta.env.VITE_BACKEND_URL}${cat.image}`
              }
              alt={cat.category}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform rounded-lg"
            />
            <h3 className="text-center text-2xl font-semibold mt-2">
              {cat.category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
