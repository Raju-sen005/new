import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function parseArrayish(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  let parsed = value;
  try {
    parsed = JSON.parse(value);
    if (typeof parsed === "string") parsed = JSON.parse(parsed);
  } catch {}
  return Array.isArray(parsed) ? parsed : [parsed];
}

const ThemeProducts = () => {
  const { themeName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.VITE_BACKEND_URL;
  

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();

        const products = Array.isArray(data) ? data : [data];
        const allVariants = products.flatMap((p) =>
          Array.isArray(p.ProductVariants) ? p.ProductVariants : []
        );

        // const normalized = allVariants.map((v) => {
        //   const themes = parseArrayish(v.themes);
        //   const images = parseArrayish(v.images);
        //   const prices = parseArrayish(v.price);

        //   return {
        //     id: v.id,
        //     productId: v.productId || v.id,
        //     title: v.title || v.name || "Untitled",
        //     themes,
        //     image: images[0] || null,
        //     price: prices.length ? Number(prices[0].replace(/"/g, "")) : null,
        //   };
        // });

const normalized = allVariants.map((v) => {
  const themes = parseArrayish(v.themes);
  const images = parseArrayish(v.images);
  const prices = parseArrayish(v.price);

  let priceValue = prices.length ? prices[0] : null;

  // Ensure price is number
  if (typeof priceValue === "string") {
    // Remove quotes/commas if any
    priceValue = Number(priceValue.replace(/"/g, "").replace(/,/g, ""));
  }

  return {
    id: v.id,
    productId: v.productId || v.id,
    title: v.title || v.name || "Untitled",
    themes,
    image: images[0] || null,
    price: priceValue,
  };
});


        const filtered = normalized.filter((v) =>
          v.themes.some(
            (t) => String(t).toLowerCase() === String(themeName).toLowerCase()
          )
        );

        setItems(filtered);
      } catch (e) {
        console.error("Fetch/parse error:", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [themeName]);

  if (loading)
    return (
      <div className="p-6 text-center text-lg animate-pulse">
        ⏳ Loading products…
      </div>
    );

  return (
    <section className="container mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Products for <span className="text-pink-600">{themeName}</span>
      </h2>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          😔 No products found for{" "}
          <span className="font-semibold">{themeName}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/product/${item.productId}/${item.id}`)}
            >
              {/* Product Image */}
              {item.image ? (
                <img
                  src={`${API_BASE_URL.replace(/\/api$/, "")}/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* Title */}
              <h3 className="text-center text-2xl font-semibold mt-2">
                {item.title}
              </h3>

              {/* Price */}
              {item.price != null && (
                <p className="text-center text-pink-600 font-bold text-lg mt-1">
                  ₹{item.price}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ThemeProducts;
