import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_BASE_URL } from '../lib'

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [gemstones, setGemstones] = useState([]);
  const [selectedGem, setSelectedGem] = useState(null);
  const [metals, setMetals] = useState([]);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart } = useCart();

  // Handlers
  const handleSizeClick = (size) => setSelectedSize(size);
  const handleMetalClick = (metalName) => setSelectedMetal(metalName);
  const handleGemClick = (gemstone) => setSelectedGem(gemstone);

  // Fetch Sizes
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/size`)
      .then((res) => setSizes(res.data))
      .catch((err) => console.error("Error fetching sizes:", err));
  }, []);

  // Fetch Metals
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/material`)
      .then((res) => setMetals(res.data))
      .catch((err) => console.error("Error fetching metals:", err));
  }, []);

  // Fetch Gemstones
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/gemstone`)
      .then((res) => setGemstones(res.data))
      .catch((err) => console.error("Error fetching gemstones:", err));
  }, []);

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();

        // Safe parsing for ProductVariants[0]
        if (data?.ProductVariants?.length > 0) {
          const variant = data.ProductVariants[0];
          data.title = variant.title;
          data.description = variant.description;

          try {
            data.images = JSON.parse(variant.images || "[]");
            data.price = JSON.parse(variant.price || "[]")[0] || "";
            data.metal = JSON.parse(variant.metal || "[]")[0] || "";
            data.sizes = JSON.parse(variant.sizes || "[]");
            data.gemstone = variant.gemstone || "";
          } catch (err) {
            console.error("Error parsing product variant fields:", err);
            data.images = [];
            data.price = "";
            data.metal = "";
            data.sizes = [];
          }
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  // Images array (fallback)
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/placeholder.png"];

  // Slider Settings
  const mainSettings = {
    asNavFor: thumbSlider.current,
    ref: mainSlider,
    arrows: false,
    fade: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  const thumbSettings = {
    asNavFor: mainSlider.current,
    ref: thumbSlider,
    slidesToShow: 4,
    focusOnSelect: true,
    swipe: false,
    infinite: false,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row w-full">
        {/* Images Section */}
        {/* Images Section */}
        <div className="w-full md:w-1/2 p-4">
          <div className="lg:w-3/4 mx-auto" style={{ maxWidth: "700px" }}>
            {/* Main Slider */}
            <Slider {...mainSettings}>
              {images?.map((img, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={`${API_BASE_URL}/uploads/${img}`}
                    alt={`Product ${index}`}
                    className="w-full h-[500px] object-cover rounded-lg "
                  />
                </div>
              ))}
            </Slider>

            {/* Thumbnail Slider */}
            <div className="mt-4 px-5">
              <Slider {...thumbSettings}>
                {images?.map((img, index) => (
                  <div key={index} className="px-1 flex justify-center">
                    <img
                      src={`${API_BASE_URL}/uploads/${img}`}
                      alt={`Thumb ${index}`}
                      onClick={() => mainSlider.current.slickGoTo(index)}
                      className={`w-28 h-28 object-cover cursor-pointer border-2 rounded transition-all duration-200 ${
                        currentSlide === index
                          ? "border-pink-500"
                          : "border-transparent"
                      }`}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-semibold mt-4 mb-5">{product.title}</h2>
          <div className="text-red-500 mb-3">{product.soldInfo}</div>

          {/* Delivery */}
          <div className="mb-4">
            <h3 className="font-semibold">Estimated Delivery Time</h3>
            <input
              placeholder="302005"
              className="border p-2 mr-2 rounded w-1/2"
            />
            <button className="bg-pink-600 text-white px-4 py-2 rounded">
              Check
            </button>
            <p className="text-gray-600 mt-3">
              Free Delivery by {product.deliveryDate}
            </p>
          </div>

          {/* Warranty Info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div>6-Month Warranty</div>
            <div>Easy 30 Day Return</div>
            <div>Lifetime Plating</div>
            <div>925 Fine Silver</div>
          </div>

          {/* Gemstone Selection */}
          <div>
            <h4 className="font-semibold mb-2">Gemstones</h4>
            <ul className="flex flex-wrap gap-2">
              {gemstones.map((gem, index) => (
                <li
                  key={gem._id || index}
                  onClick={() => handleGemClick(gem.gemstone)}
                  className={`px-4 py-2 border rounded cursor-pointer transition ${
                    selectedGem === gem.gemstone
                      ? "border-pink-500 text-pink-600 font-semibold"
                      : "border-gray-400 hover:border-pink-300 hover:text-pink-400"
                  }`}
                >
                  {gem.gemstone}
                </li>
              ))}
            </ul>
          </div>

          {/* Metal Selection */}
          <div>
            <h4 className="font-semibold mb-2">Metal</h4>
            <ul className="flex flex-wrap gap-2">
              {metals.map((metal, index) => (
                <li
                  key={metal._id || index}
                  onClick={() => handleMetalClick(metal.name)}
                  className={`px-3 py-1 border rounded cursor-pointer text-center transition ${
                    selectedMetal === metal.name
                      ? "border-pink-500 text-pink-600 font-semibold"
                      : "border-gray-400 hover:border-pink-300 hover:text-pink-400"
                  }`}
                >
                  {metal.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selection */}
          <div>
            <h4 className="font-semibold mb-2">Size</h4>
            <ul className="flex gap-2 flex-wrap">
              {sizes.map((size, index) => (
                <li
                  key={size._id || index}
                  onClick={() => handleSizeClick(size.size)}
                  className={`px-3 py-1 border rounded cursor-pointer transition ${
                    selectedSize === size.size
                      ? "border-pink-500 text-pink-600 font-semibold"
                      : "border-gray-400 hover:border-pink-300 hover:text-pink-400"
                  }`}
                >
                  {size.size}
                </li>
              ))}
            </ul>
          </div>

          {/* Personalization */}
          <div className="my-3">
            <h3 className="font-medium text-[15px]">
              Add your Personalization (optional)
            </h3>
            <p className="text-gray-500 text-[13px] mb-2">
              Personalization: Name, Date or Message
            </p>
            <input
              className="border px-3 py-2 rounded w-1/2"
              type="text"
              placeholder="Enter text"
            />
          </div>

          {/* Gift Wrap */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="gift-wrap" className="mr-2" />
            <label htmlFor="gift-wrap" className="text-sm">
              Add gift wrap to your order (₹50)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-white border border-pink-300 px-4 py-3 rounded hover:bg-pink-100">
              <a href="/checkout">Buy Now</a>
            </button>

            <button
              className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600 mt-2"
              onClick={() => {
                if (!selectedSize || !selectedMetal) {
                  toast.error(
                    "Please select size and metal before adding to cart!",
                    { position: "top-center" }
                  );
                  return;
                }

                const metalIndex = metals.findIndex(
                  (m) => m.name === selectedMetal
                );

                addToCart(
                  product.id, // productId
                  product.id, // variantId
                  selectedSize,
                  metalIndex
                );

                toast.success(" Item added to cart!");
              }}
            >
              Add to Cart
            </button>

            <button className="hover:scale-105">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
