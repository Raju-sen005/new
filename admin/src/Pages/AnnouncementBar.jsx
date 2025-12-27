import React from 'react'

function AnnouncementBar() {
    return (
        <>
            <>
                <header className="bg-white border-b border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2.5 space-y-2 md:space-y-0">
                        {/* Left side */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex items-center gap-2">
                                <button className="p-2">
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                                        <line x1={3} y1={9} x2={21} y2={9} />
                                    </svg>
                                </button>
                                <span className="font-semibold">SaaS Commerce</span>
                                <span className="text-blue-600 text-sm bg-blue-100 px-2 py-0.5 rounded">
                                    Live
                                </span>
                            </div>
                            <button className="p-2 md:hidden">•••</button>
                        </div>
                        {/* Center */}
                        <div className="flex flex-wrap items-center gap-4 justify-center w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                </svg>
                                <span>Default</span>
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span>Home Page</span>
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                            <button className="p-2">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                                </svg>
                            </button>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                            <div className="flex items-center border rounded p-1 gap-1">
                                <button className="p-1 bg-blue-600 rounded">
                                    <svg width={16} height={16} viewBox="0 0 24 24" fill="white">
                                        <rect x={3} y={3} width={18} height={18} rx={2} />
                                    </svg>
                                </button>
                                <button className="p-1">
                                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17 10h4v10H3V4h10v2H5v12h14v-6h2z" />
                                    </svg>
                                </button>
                                <button className="p-1">
                                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17 10h4v10H3V4h10v2H5v12h14v-6h2z" />
                                    </svg>
                                </button>
                            </div>
                            <button className="p-2">↩</button>
                            <button className="p-2">↪</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                Save Website
                            </button>
                        </div>
                    </div>
                </header>
                {/* Main Layout Container */}
                <div className="flex flex-col md:flex-row">
                    {/* Page Structure Sidebar */}
                    <div className="w-12 bg-white shadow-lg p-4 flex flex-col items-center">
                        <button className="mb-4 text-gray-600">
                            <img src="icons/tab.png" alt="" className="w-8 h-8" />
                        </button>
                        <button className="mb-4 text-gray-600">
                            <img src="icons/settings.png" alt="" className="w-8 h-5" />
                        </button>
                        <button className="mb-4 text-gray-600">
                            <img src="icons/Icon.png" alt="" className="w-12 h-8" />
                        </button>
                    </div>
                    <div className="w-80 bg-white shadow-lg p-6 ">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <button className="text-gray-600 mr-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <h2 className="text-lg font-semibold">Header</h2>
                            </div>
                            <button className="text-gray-600">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Color Scheme
                            </h3>
                            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded mr-2" />
                                    <span className="text-gray-700">Scheme 8</span>
                                </div>
                                <button className="text-blue-600 font-semibold">Edit</button>
                            </div>
                            <button className="w-full bg-gray-100 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-200">
                                Change Scheme
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                To edit all your theme's colors, go to your{" "}
                                <a href="#" className="text-blue-600 underline">
                                    color theme settings
                                </a>
                                .
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    defaultChecked=""
                                />
                                <span className="ml-2 text-gray-700">Show separator line</span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Social Media Icons
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                To display your social media accounts, link them in your{" "}
                                <a href="#" className="text-blue-600 underline">
                                    theme settings
                                </a>
                                .
                            </p>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    defaultChecked=""
                                />
                                <span className="ml-2 text-gray-700">Show icons on desktop</span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Announcements
                            </h3>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    defaultChecked=""
                                />
                                <span className="ml-2 text-gray-700">Auto-rotate announcements</span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Country/Region Selector
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                To add a country/region, go to your{" "}
                                <a href="#" className="text-blue-600 underline">
                                    market settings
                                </a>
                                .
                            </p>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">
                                    Enable country/region selector
                                </span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Language Selector
                            </h3>
                            <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
                                <option>Select language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                        <button className="w-full bg-red-50 text-red-600 py-2 rounded-md flex items-center justify-center hover:bg-red-100">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                                />
                            </svg>
                            Remove Section
                        </button>
                    </div>
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Announcement Bar */}
                        <div className="bg-black text-white text-center py-2.5 text-sm relative">
                            Sign up and get 20% off to your first order.
                            <a href="#" className="underline">
                                Sign up here
                            </a>
                            <button className="absolute right-4 top-2.5">
                                <svg
                                    width={24}
                                    height={24}
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* Header/Navigation */}
                        <header className="bg-white py-4 px-4 md:px-8">
                            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto space-y-4 md:space-y-0">
                                <h1 className="text-2xl font-bold tracking-wider">SHOP.CO</h1>
                                <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 w-full md:w-auto items-center">
                                    <a href="#" className="hover:text-gray-600">
                                        Shop
                                    </a>
                                    <a href="#" className="hover:text-gray-600">
                                        On Sale
                                    </a>
                                    <a href="#" className="hover:text-gray-600">
                                        New Arrivals
                                    </a>
                                    <a href="#" className="hover:text-gray-600">
                                        Brands
                                    </a>
                                </nav>
                                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                                    <div className="relative w-full md:w-[400px]">
                                        <input
                                            type="search"
                                            placeholder="Search for products..."
                                            className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm"
                                        />
                                        <svg
                                            className="w-5 h-5 absolute right-4 top-2.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href="#" className="p-2">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                />
                                            </svg>
                                        </a>
                                        <a href="#" className="p-2">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {/* Hero Section */}
                        <section className="bg-white">
                            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="max-w-full md:max-w-[600px] space-y-6 text-center md:text-left">
                                        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                                            FIND CLOTHES THAT MATCHES YOUR STYLE
                                        </h2>
                                        <p className="text-gray-600 text-base md:text-lg">
                                            Browse through our diverse range of meticulously crafted
                                            garments, designed to bring out your individuality and cater to
                                            your sense of style.
                                        </p>
                                        <button className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-base md:text-lg font-medium w-full md:w-auto">
                                            Shop Now
                                        </button>
                                        <div className="flex flex-col md:flex-row md:space-x-16 space-y-4 md:space-y-0 pt-8">
                                            <div>
                                                <h3 className="text-4xl font-bold">200+</h3>
                                                <p className="text-gray-600">International Brands</p>
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-bold">2,000+</h3>
                                                <p className="text-gray-600">High-Quality Products</p>
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-bold">30,000+</h3>
                                                <p className="text-gray-600">Happy Customers</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-full md:w-auto">
                                        <img
                                            src="images/tom.jpg"
                                            alt="Fashion Models"
                                            className="w-full md:w-[600px] rounded-lg"
                                        />
                                        <div className="absolute top-0 right-0 w-12 h-12 text-black">
                                            ★
                                        </div>
                                        <div className="absolute bottom-1/3 left-0 w-12 h-12 text-black">
                                            ★
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Brand Bar */}
                        <div className="bg-black py-6 md:py-8">
                            <div className="max-w-7xl mx-auto px-4 md:px-8">
                                <div className="grid grid-cols-3 md:flex md:justify-between items-center gap-6 text-white ">
                                    <div className="container mx-auto flex justify-center space-x-14">
                                        <span className="text-lg font-semibold">VERSACE</span>
                                        <span className="text-lg font-semibold">ZARA</span>
                                        <span className="text-lg font-semibold">GUCCI</span>
                                        <span className="text-lg font-semibold">PRADA</span>
                                        <span className="text-lg font-semibold">Calvin Klein</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mx-auto py-10 px-4">
                            {/* New Arrivals Section */}
                            <h2 className="text-4xl font-bold text-center mb-8">NEW ARRIVALS</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Product Card 1 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/shirt.webp"
                                        alt="T-shirt with Tape Details"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">
                                        T-shirt with Tape Details
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">4.5/5</span>
                                    </div>
                                    <p className="text-xl font-bold mt-2">$120</p>
                                </div>
                                {/* Product Card 2 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/pant.webp"
                                        alt="Skinny Fit Jeans"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">Skinny Fit Jeans</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">3.5/5</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <p className="text-xl font-bold text-gray-500 line-through">
                                            $240
                                        </p>
                                        <p className="text-xl font-bold text-black ml-2">$260</p>
                                        <span className="ml-2 bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded">
                                            20%
                                        </span>
                                    </div>
                                </div>
                                {/* Product Card 3 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/or-2.webp"
                                        alt="Checkered Shirt"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">Checkered Shirt</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">4.5/5</span>
                                    </div>
                                    <p className="text-xl font-bold mt-2">$180</p>
                                </div>
                                {/* Product Card 4 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/yellow.webp"
                                        alt="Sleeve Striped T-shirt"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">
                                        Sleeve Striped T-shirt
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">4.5/5</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <p className="text-xl font-bold text-gray-500 line-through">
                                            $130
                                        </p>
                                        <p className="text-xl font-bold text-black ml-2">$160</p>
                                        <span className="ml-2 bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded">
                                            50%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Top Selling Section */}
                            <h2 className="text-4xl font-bold text-center mt-12 mb-8">
                                TOP SELLING
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Product Card 5 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/black pant.webp"
                                        alt="Vertical Striped Shirt"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">
                                        Vertical Striped Shirt
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">5.0/5</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <p className="text-xl font-bold text-gray-500 line-through">
                                            $212
                                        </p>
                                        <p className="text-xl font-bold text-black ml-2">$232</p>
                                        <span className="ml-2 bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded">
                                            20%
                                        </span>
                                    </div>
                                </div>
                                {/* Product Card 6 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/orange t-shirt.webp"
                                        alt="Courage Graphic T-shirt"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">
                                        Courage Graphic T-shirt
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">4.0/5</span>
                                    </div>
                                    <p className="text-xl font-bold mt-2">$145</p>
                                </div>
                                {/* Product Card 7 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/lower.webp"
                                        alt="Loose Fit Bermuda Shorts"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">
                                        Loose Fit Bermuda Shorts
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">3.0/5</span>
                                    </div>
                                    <p className="text-xl font-bold mt-2">$80</p>
                                </div>
                                {/* Product Card 8 */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src="images/green shirt.webp"
                                        alt="Faded Skinny Jeans"
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-4">Faded Skinny Jeans</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="ml-2 text-gray-600">4.5/5</span>
                                    </div>
                                    <p className="text-xl font-bold mt-2">$210</p>
                                </div>
                            </div>
                            {/* View All Button */}
                            <div className="text-center mt-8">
                                <button className="border border-gray-400 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200">
                                    View All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default AnnouncementBar
