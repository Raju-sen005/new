import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(liked);
  }, []);

  const getImageSrc = (images) => {
    if (!images) return "/images/default.jpg";
    try {
      const parsed = typeof images === "string" ? JSON.parse(images) : images;
      return `${url}/uploads/${parsed[0]}`;
    } catch {
      return "/images/default.jpg";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-wide">
        💖 My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          कोई पसंदीदा ज्वेलरी नहीं मिली 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
            >
              <div className="overflow-hidden rounded-t-2xl h-64 bg-gray-50">
                <img
                  src={getImageSrc(product.images)}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-4">
                  <span className="text-lg font-bold text-pink-600">
                    {product.price?.toLocaleString?.("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>

                <div className="mt-5 flex justify-end">
                  <button className="text-sm bg-pink-600 text-white px-4 py-2 rounded-full shadow hover:bg-pink-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
