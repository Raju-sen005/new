// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const url = import.meta.env.VITE_BACKEND_URL;
  const iurl = import.meta.env.VITE_BACKEND_URL.replace(/\/api$/, "");

  // Helper to parse JSON safely
  const parseSafeArray = (data) => {
    if (!data) return [];
    let parsed = data;

    while (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        break;
      }
    }

    if (Array.isArray(parsed)) return parsed.flat();
    return [parsed];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = location.search;
      try {
        const res = await fetch(`${url}/products${query}`);
        const data = await res.json();

        const processedData = data.map((product) => ({
          ...product,
          ProductVariants: (product.ProductVariants || []).map((variant) => ({
            ...variant,
            price: parseSafeArray(variant.price),
            metal: parseSafeArray(variant.metal),
            sizes: parseSafeArray(variant.sizes),
            images: parseSafeArray(variant.images).map((img) =>
              img.startsWith("http") ? img : `${iurl}/uploads/${img}`
            ),
            categories: parseSafeArray(variant.categories),
            purpose: parseSafeArray(variant.purpose),
            type: parseSafeArray(variant.type),
            gemstone: parseSafeArray(variant.gemstone),
            theme: parseSafeArray(variant.theme),
          })),
        }));

        setProducts(processedData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="container mx-auto py-6 px-4 mt-40">
        {products.length > 0 ? (
          <section className="container mx-auto px-5 py-10">
            <h3 className="text-3xl font-bold text-center mb-10">
              Matching Products
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => {
                const firstVariant = product.ProductVariants[0] || {};
                const imageSrc = firstVariant.images?.[0] || "/placeholder.png";

                return (
                  <div
                    key={product.id}
                    className="cursor-pointer group rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={imageSrc}
                      alt={firstVariant.title || "Product Image"}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                     onClick={() =>
                    navigate(`/product/${firstVariant.productId}/${firstVariant.id}`)
                  }
                    />

                    <div className="p-4">
                      <h4 className="text-lg font-medium mb-2">
                        {firstVariant.title || product.name || "Product"}
                      </h4>

                      <p className="text-sm text-gray-600">
                        Metal: {parseSafeArray(firstVariant.metal).join(", ")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Sizes: {parseSafeArray(firstVariant.sizes).join(", ")}
                      </p>
                      <p className="text-lg font-semibold mt-2">
                        ₹ {parseSafeArray(firstVariant.price)[0] || "0"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <p className="mt-10 text-gray-500">No products found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
