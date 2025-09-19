import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productdetail.css';

const ProductHighlightSection = ({ product, multiproduct }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const url = import.meta.env.VITE_BACKEND_URL;

    // State management
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedMetalIndex, setSelectedMetalIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [wishlisted, setWishlisted] = useState(false);
    const [personalization, setPersonalization] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    // Parse the JSON strings from the API
    const categories = JSON.parse(product?.categories || '[]');
    const prices = JSON.parse(product?.price || '[]');
    const metals = JSON.parse(product?.metal || '[]');
    const sizes = JSON.parse(product?.sizes || '[]');
    const selectedGemId = product?.id;

    // Gemstone images mapping
    const gemstoneImages = {
        garnet: '/stone/download (1).jpeg',
        amethyst: '/stone/download (2).jpeg',
        gemstone3: '/stone/download.jpeg',
        gemstone4: '/stone/download (3).jpeg',
        // Add more if needed
    };

    // Carousel settings
    const mainSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2,
        ref: (slider) => setNav1(slider),
    };

    const thumbSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
        asNavFor: nav1,
        ref: (slider) => setNav2(slider),
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 3 }
            }
        ]
    };

    // Handlers
    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handleMetalChange = (index) => {
        setSelectedMetalIndex(index);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setErrorMessages(prev => ({ ...prev, size: null }));
    };

    const toggleWishlist = () => {
        setWishlisted(!wishlisted);
    };

    const handleAddToCart = (check = false) => {
        if (!selectedSize && sizes?.length > 0) {
            setErrorMessages({ size: "Please select a size" });
            return;
        }

        addToCart(
            product?.productId,
            product?.id,
            selectedSize,
            selectedMetalIndex
        );

        if (check) {
            navigate("/cart");
        }
    };


    const [deliveryDate, setDeliveryDate] = useState("");
    const [pincode, setPincode] = useState("");

    const checkPincode = () => {
        if (!pincode.trim()) {
            alert("Please enter a pincode");
            return;
        }

        // Calculate delivery date (15 days from today)
        const today = new Date();
        const delivery = new Date(today);
        delivery.setDate(today.getDate() + 15);

        // Format the date as "Day, Month Date"
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = delivery.toLocaleDateString('en-US', options);

        setDeliveryDate(formattedDate);
    };
    return (
        <section className="product-section px-6 py-12">
            <div className="flex flex-col md:flex-row w-full bg-[#F6F4F0]">
                {/* Image Carousel Section */}
                <div className="w-full md:w-1/2 p-4 bg-[#E9E2D8]">
                    {/* Main Image Carousel */}
                    <div className="main-carousel">
                        <Slider {...mainSettings}>
                            {product?.images?.map((img, index) => (
                                <div key={index} className="px-2">
                                    <div className="block relative bg-white h-[500px] md:h-[600px]">
                                        <img
                                            alt={product?.title}
                                            className="object-cover object-center w-full h-full block"
                                            src={`${url}/uploads/${img}`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/placeholder.png';
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="bg-[#AA8265] text-white py-1 px-3 font-bold rounded-full text-sm">
                            10% Off
                        </span>
                    </div>

                    {/* Thumbnail Carousel */}
                    <div className="thumbnail-carousel mt-4">
                        <Slider {...thumbSettings}>
                            {product?.images?.map((img, index) => (
                                <div key={index} className="px-1">
                                    <img
                                        src={`${url}/uploads/${img}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-20 h-20 object-cover cursor-pointer border-2 ${currentImageIndex === index ? 'border-[#AA8265]' : 'border-transparent'}`}
                                        onClick={() => handleImageClick(index)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder.png';
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="w-full md:w-1/2 flex flex-col px-6 md:px-10 py-8 bg-[#F6F4F0]">
                    <div className="mb-6">
                        <h1 className="text-lg md:text-xl font-medium text-[#AA8265] mb-1">
                            {product?.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-[#5B3E38]">
                            {categories?.join(', ')}
                        </p>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center mb-6">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}
                        </div>
                        <span className="text-red-500 ml-2">20 products sold in last 7 hours</span>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6">
                        <h3 className="font-semibold">Estimated Delivery Time</h3>
                        <div className="flex items-center mt-2 relative">
                            <div className="relative flex items-center w-80">
                                <input
                                    type="text"
                                    id="pincode-input"
                                    placeholder="302005"
                                    className="border rounded-l p-2 w-full"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                                <button
                                    className="bg-pink-600 text-white px-4 py-2 rounded-r border border-pink-600"
                                    onClick={checkPincode}
                                >
                                    Check
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-3 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                            </svg>
                            {deliveryDate ? (
                                `Estimated Delivery by ${deliveryDate} (15 working days)`
                            ) : (
                                "Enter your pincode to check delivery date"
                            )}
                        </p>
                    </div>

                    {/* Product Features */}
                    <div className="mt-4 flex flex-wrap items-center">
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                6-Month Warranty
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                                </svg>
                                Easy 30 Day Return
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Lifetime Plating
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                925 Fine Silver
                            </div>
                        </div>
                    </div>

                    {/* Gemstone Selection */}
                    {multiproduct?.length > 0 && (
                        <div className="mb-4 mt-6">
                            <h3 className="text-sm font-semibold mb-2">Gemstone Type</h3>
                            <div className="flex flex-wrap gap-2">
                                {multiproduct?.map((metal, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-1">
                                        <button
                                            onClick={() => navigate(`/product/${metal?.productId}/${metal?.id}`)}
                                            className={`flex-shrink-0 w-16 h-16 border-2 ${selectedGemId === metal?.id ? 'border-[#AA8265]' : 'border-gray-200'} rounded-md overflow-hidden`}
                                        >
                                            <img
                                                src={gemstoneImages[metal?.gemstone] || '/images/placeholder.png'}
                                                alt={metal?.gemstone}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                        <span className="text-xs text-center text-gray-700">
                                            {metal?.gemstone}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metal Selection */}
                    {metals?.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-2">Metal Type</h3>
                            <div className="flex flex-wrap gap-2">
                                {metals.map((metal, index) => (
                                    <button
                                        key={index}
                                        className={`w-16 h-16 rounded-md flex items-center justify-center border transition-colors
            ${selectedMetalIndex === index ?
                                                'bg-[#AA8265] text-white border-[#AA8265]' :
                                                'border-[#AA8265] text-[#5B3E38] hover:bg-[#AA8265] hover:text-white'}`}
                                        onClick={() => handleMetalChange(index)}
                                    >
                                        <span className="text-xs font-medium">{metal}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center my-6">
                        <span className="text-2xl md:text-3xl font-bold">${prices[selectedMetalIndex]}</span>
                        <span className="text-gray-500 text-base line-through ml-3">
                            ${Math.round(parseFloat(prices[selectedMetalIndex]) + parseFloat(prices[selectedMetalIndex]) * 0.10)}
                        </span>
                    </div>

                    {/* Size Selector */}
                    {sizes?.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-2">Size</h3>
                            <select
                                className="w-full p-2 border border-[#AA8265] rounded-md bg-white text-[#5B3E38]"
                                value={selectedSize || ""}
                                onChange={(e) => handleSizeSelect(e.target.value)}
                            >
                                <option value="">Select a size</option>
                                {sizes.map((size, index) => (
                                    <option key={index} value={size}>{size}</option>
                                ))}
                            </select>
                            {errorMessages.size && (
                                <p className="text-red-500 text-sm mt-1">{errorMessages.size}</p>
                            )}
                        </div>
                    )}

                    {/* Personalization */}
                    <div className="mb-6">
                        <label htmlFor="personalization" className="block text-[#5B3E38] font-medium">
                            Personalization (optional)
                        </label>
                        <input
                            type="text"
                            id="personalization"
                            name="personalization"
                            placeholder="Enter your message (e.g. name, initials, etc.)"
                            className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5B3E38]"
                            value={personalization}
                            onChange={(e) => setPersonalization(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-[#5B3E38]">
                            {product?.description || "Delivery in 15-20 days"}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                        <button
                            onClick={() => handleAddToCart(true)}
                            className="bg-white text-black border border-pink-300 px-4 py-3 rounded hover:bg-pink-100 hover:scale-105 transition duration-300"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={() => handleAddToCart(false)}
                            className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600 hover:scale-105 transition duration-300"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={toggleWishlist}
                            className={`flex justify-center hover:scale-105 transition duration-300 ${wishlisted ? 'text-pink-300' : 'text-black'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductHighlightSection;