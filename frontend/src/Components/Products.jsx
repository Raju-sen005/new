import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const ProductGrid = ({ products }) => {
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const url = import.meta.env.VITE_BACKEND_URL;
  const iurl = import.meta.env.VITE_BACKEND_URL.replace(/\/api$/, "");


  const parseJSON = (data) => {
    try {
      return typeof data === "string" ? JSON.parse(data) : data;
    } catch {
      return data;
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleLike = (product) => {
    addToWishlist(product);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setLiked(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((variant) => {
          const images = parseJSON(variant.images) || [];
          const priceArray = parseJSON(variant.price) || [];
          const price = Array.isArray(priceArray) ? priceArray[0] : priceArray;
          const discountPercent = 15;
          const originalPrice = Math.round(
            price + (price * discountPercent) / 100
          );

          return (
            <div
              key={variant.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden relative"
            >
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <button
                  className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
                  onClick={() => handleLike(variant)}
                >
                  <i className="bi bi-heart text-lg"></i>
                </button>

                <button
                  className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
                  onClick={() => handleView(variant)}
                >
                  <i className="bi bi-eye text-lg"></i>
                </button>
              </div>

              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="h-[300px] bg-[#F6F4F0]"
              >
                {images.slice(0, 5).map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${iurl}/uploads/${img}`}
                      alt={variant.title}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="p-4">
                {variant.rating > 4.5 && (
                  <p className="text-sm text-red-600 font-semibold">
                    BEST SELLER
                  </p>
                )}
                <h2
                  className="text-lg font-bold text-gray-800 cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${variant.productId}/${variant.id}`)
                  }
                >
                  {variant.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {variant.description}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-gray-900">
                    {price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p className="line-through text-gray-400 text-sm">
                    {originalPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <span className="text-green-600 font-semibold text-sm">
                    {discountPercent}% OFF
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-4xl relative grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✖
            </button>

            {/* Image Slider inside popup */}
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full h-80 rounded bg-gray-100"
            >
              {parseJSON(selectedProduct.images).map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${iurl}/uploads/${img}`}
                    alt={`Image ${index + 1}`}
                    className="w-full h-80 object-cover rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-600 mb-3">
                  {selectedProduct.description}
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {(() => {
                    const priceArray = parseJSON(selectedProduct.price);
                    const price =
                      Array.isArray(priceArray) && priceArray.length > 0
                        ? parseFloat(priceArray[0])
                        : 0;
                    return price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    });
                  })()}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="bg-gray-200 w-8 h-8 rounded"
                  >
                    −
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="bg-gray-200 w-8 h-8 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  const itemId =
                    selectedProduct.productId || selectedProduct.id;
                  const variantId = selectedProduct.id;
                  const defaultSize = "M";
                  const defaultMetalIndex = 0;

                  console.log("Adding to cart:", {
                    itemId,
                    variantId,
                    defaultSize,
                    defaultMetalIndex,
                  });

                  addToCart(itemId, variantId, defaultSize, defaultMetalIndex);

                  toast.success("Item added to cart!", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                }}
                className="
    w-full
    md:w-auto
    bg-pink-500 
    text-white 
    font-semibold 
    px-6 
    py-3 
    rounded-lg 
    shadow-lg 
    hover:bg-pink-600 
    hover:shadow-xl 
    transition 
    duration-300 
    ease-in-out
    flex 
    items-center 
    justify-center
    gap-2
  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6H19m-12.5-6L5 5m0 0L3 3"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
