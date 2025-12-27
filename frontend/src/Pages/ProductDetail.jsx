import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductTabs from "./ProductTabs";
import { API_BASE_URL } from '../lib'

const ProductDetail = () => {
  const { state } = useLocation();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [gemstones, setGemstones] = useState([]);
  const [metals, setMetals] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGem, setSelectedGem] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);

  const handleMetalClick = (metalName) => {
    setSelectedMetal(metalName);
    console.log("Selected Metal:", metalName);
  };

  const handleGemClick = (gemstone) => {
    setSelectedGem(gemstone);
    console.log("Selected Gemstone:", gemstone);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    console.log("Selected Size:", size);
  };

  // Fetch Sizes
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/size`);
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    fetchSizes();
  }, []);

  // Fetch Metals
  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/material`);
        setMetals(response.data);
      } catch (error) {
        console.error("Error fetching metals:", error);
      }
    };
    fetchMetals();
  }, []);

  // Fetch Gemstones
  useEffect(() => {
    const fetchGemstones = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/gemstone`);
        setGemstones(res.data);
      } catch (err) {
        console.error("Error fetching gemstones:", err);
      }
    };
    fetchGemstones();
  }, []);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  if (!state) return <div>Loading...</div>;

  const product = state;
  const images = product.images || [
    product.image,
    product.image,
    product.image,
  ];

  return (
    <>
      <div className="container mx-auto px-5 py-10 flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2" style={{ maxWidth: "600px" }}>
          {/* Main Image Slider */}
          <Slider asNavFor={nav2} ref={slider1} arrows={false} fade={true}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Main ${index}`}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            ))}
          </Slider>

          {/* Thumbnail Slider */}
          <div className="w-full px-5">
            <Slider
              asNavFor={nav1}
              ref={slider2}
              slidesToShow={4}
              focusOnSelect={true}
              swipe={false}
              infinite={false}
              arrows={false}
              centerMode={false}
              className="mt-5"
            >
              {images.map((img, index) => (
                <div key={index} className="px-1">
                  <img
                    src={img}
                    alt={`Thumb ${index}`}
                    className="border border-pink-300 p-0.5 rounded-md cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Detail Section */}
        <div
          className="w-full lg:w-1/2"
          style={{ position: "relative", left: "20px" }}
        >
          <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
          <div className="text-red-500 mb-3">
            {product.soldInfo || "Free Shipping Available"}
          </div>

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
              Free Delivery by {product.deliveryDate || "7-10 days"}
            </p>
          </div>

          {/* Warranty & Material Info */}
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
                  className={`px-4 py-2 border rounded cursor-pointer transition 
                                        ${
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

          {/* Material Selection */}
          <div>
            <h4 className="font-semibold mb-2">Metal</h4>
            <ul className="flex flex-wrap gap-2">
              {metals.map((metal, index) => (
                <li
                  key={metal._id || index}
                  onClick={() => handleMetalClick(metal.name)} // ✅ idhar metal.name bhejna h
                  className={`px-3 py-1 border rounded cursor-pointer text-center transition
          ${
            selectedMetal === metal.name // ✅ idhar bhi metal.name compare karna h
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
                  className={`px-3 py-1 border rounded cursor-pointer transition
                                        ${
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
            <input className="border px-3 py-2 rounded w-1/2" type="text" />
          </div>

          {/* Gift Wrap */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="gift-wrap" className="mr-2" />
            <label htmlFor="gift-wrap" className="text-sm">
              Add gift wrap to your order (₹50)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-white border border-pink-300 px-4 py-3 rounded hover:bg-pink-100">
              Buy Now
            </button>
            <button className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600">
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
      <ProductTabs />
    </>
  );
};

export default ProductDetail;
