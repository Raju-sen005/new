import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state; // category object
  const [personalization, setPersonalization] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      axios
        .get(
          `http://localhost:8000/api/products/category/${category.category.toLowerCase()}`
        )
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [category]);

  if (!category)
    return <p className="text-center mt-10">No category selected</p>;
  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (!products.length)
    return <p className="text-center mt-10">No products found</p>;
  const checkPincode = () => {
    alert("Checking delivery for pincode...");
  };
  return (
    <section className="container mx-auto px-5 py-10">
      {/* <h2 className="text-3xl font-bold text-center mb-10">
        {category.category}
      </h2>  */}

      {/* Product List - Detail Style */}
      <div className="flex flex-col gap-16">
        {products.map((product) => {
          const variant = product.ProductVariants?.[0] || {};
          const productImage = variant.images
            ? `http://localhost:8000/uploads/${JSON.parse(variant.images)[0]}`
            : "/placeholder.jpg";

          const productPrice = variant.price || product.price || 0;

          return (
            <div
              key={product.id}
              className="flex flex-col md:flex-row container mx-auto  transition overflow-hidden"
            >
              {/* Left - Image */}
              <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
                <img
                  src={productImage}
                  alt={variant.title || product.category}
                  className="w-full max-w-md h-auto rounded-lg object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                 onClick={() =>
                    navigate(`/product/${variant.productId}/${variant.id}`)
                  }
                />
              </div>
              
              {/* Right - Product Info */}
              <div className="w-full md:w-1/2 flex flex-col px-6 md:px-10 py-8 bg-[#F6F4F0]">
                <div className="mb-6">
                  <h1 className="text-lg md:text-xl font-medium text-[#AA8265] mb-1">
                    {variant.title}
                  </h1>
                  <p className="text-2xl md:text-3xl font-bold text-[#5B3E38]">
                    {variant.categories
                      ? JSON.parse(variant.categories).join(", ")
                      : product.category}
                  </p>
                </div>

                {/* Ratings (Static Example) */}
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-red-500 ml-2">
                    20 products sold in last 7 hours
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold">Estimated Delivery Time</h3>
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      placeholder="302005"
                      className="border rounded-l p-2 w-full max-w-xs"
                    />
                    <button
                      className="bg-pink-600 text-white px-4 py-2 rounded-r"
                      onClick={checkPincode}
                    >
                      Check
                    </button>
                  </div>
                  <p className="text-gray-600 mt-3">
                    Free Delivery by Monday, 31st March
                  </p>
                </div>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div>6-Month Warranty</div>
                  <div>Easy 30 Day Return</div>
                  <div>Lifetime Plating</div>
                  <div>925 Fine Silver</div>
                </div>

                {/* Price */}
                <div className="flex items-center my-6">
                  <span className="text-2xl md:text-3xl font-bold">
                    ${JSON.parse(productPrice)[0]}
                  </span>

                  {/* <span className="text-gray-500 line-through ml-3">
                    ${Math.round(productPrice * 1.1)}
                  </span> */}
                </div>

                {/* Personalization */}
                <div className="mb-6">
                  <label
                    htmlFor="personalization"
                    className="block font-medium text-[#5B3E38]"
                  >
                    Personalization (optional)
                  </label>
                  <input
                    type="text"
                    id="personalization"
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    placeholder="Enter your message (e.g. name, initials, etc.)"
                    className="mt-2 w-full p-2 border border-gray-300 rounded focus:ring-[#5B3E38] focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-[#5B3E38]">
                    {product?.description || "Delivery in 15-20 days"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() =>
                      navigate("/checkout", { state: { product: variant } })
                    }
                    className="bg-white border border-pink-300 px-4 py-3 rounded hover:bg-pink-100 hover:scale-105 transition"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => console.log("Add to Cart", variant)}
                    className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600 hover:scale-105 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryDetailPage;
