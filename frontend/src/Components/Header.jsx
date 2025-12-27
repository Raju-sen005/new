import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import ShopByThemeDropdown from "./ShopByThemeDropdown";
import UserProfileHover from "./UserProfile";
import { API_BASE_URL } from '../lib'
<<<<<<< HEAD
import { IoIosArrowForward } from "react-icons/io";
=======
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df

function Header({ searchTerm, setSearchTerm }) {
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOopen, setDropdownOopen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [purposes, setPurposes] = useState([]);
  const [types, setTypes] = useState([]);
  const [themeOptions, setThemeOptions] = useState([]);
  const [gemstones, setGemstones] = useState([]);
  const [products, setProducts] = useState([]); // 👉 fetched products
  const [dropdownnOpen, setDropdownnOpen] = useState(false);
  const [dropdownnOpeen, setDropdownnOpeen] = useState(false);
  const fetchData = async () => {
    try {
      const [categoriesRes, themesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/category`),
        fetch(`${API_BASE_URL}/theme`),
      ]);
      setCategories(await categoriesRes.json());
      setThemes(await themesRes.json());
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const [purposeRes, typeRes, themeRes, gemstoneRes] = await Promise.all([
        fetch(`${API_BASE_URL}/purpose/?categoryId=${categoryId}`),
        fetch(`${API_BASE_URL}/subcategory/?categoryId=${categoryId}`),
        fetch(`${API_BASE_URL}/theme/?categoryId=${categoryId}`),
        fetch(`${API_BASE_URL}/gemstone/?categoryId=${categoryId}`),
      ]);
      setPurposes(await purposeRes.json());
      setTypes(await typeRes.json());
      setThemeOptions(await themeRes.json());
      setGemstones(await gemstoneRes.json());
    } catch (err) {
      console.error("Error fetching category details:", err);
    }
  };

  const handleCategoryClick = (catId) => {
    if (expandedCategoryId === catId) {
      setExpandedCategoryId(null);
      setProducts([]);
    } else {
      setExpandedCategoryId(catId);
      fetchCategoryDetails(catId);
      setProducts([]); // clear product cards
    }
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
    fetchData();
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setExpandedCategoryId(null);
    setProducts([]);
  };

  const handleMoouseEnter = () => {
    setDropdownOopen(true);
    fetchData();
  };

  const handleMoouseLeave = () => {
    setDropdownOopen(false);
    setExpandedCategoryId(null);
    setProducts([]);
  };

  const handleMousseEnter = () => {
    setDropdownnOpen(true);
    fetchData();
  };

  const handleMousseLeave = () => {
    setDropdownnOpen(false);
    setExpandedCategoryId(null);
    setProducts([]);
  };

  const handleMousseeEnter = () => {
    setDropdownnOpeen(true);
    fetchData();
  };

  const handleMousseeLeave = () => {
    setDropdownnOpeen(false);
    setExpandedCategoryId(null);
    setProducts([]);
  };

  const handleItemClick = (type, value) => {
    navigate(`/products?${type}=${encodeURIComponent(value)}`);
  };

  ////////////////////////////

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showRingSubMenu, setShowRingSubMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNecklaceOpen, setIsNecklaceOpen] = useState(false);
  const [isBraceletOpen, setIsBraceletOpen] = useState(false);
  const [showNatureMenu, setShowNatureMenu] = useState(false);
  const [showJewelryFor, setShowJewelryFor] = useState(false);
  const [iisOpen, setIisOpen] = useState(false);
  const [showJewellryFor, setShowJewellryFor] = useState(null); // initially no dropdown is open
  const [showDroopdown, setShowDroopdown] = useState(false);

  const toggleDroopdown = () => {
    setShowDroopdown((prev) => !prev);
  };

  const toggleBox = () => {
    setIisOpen(!isOpen);
  };
  const handleJewelryForClick = () => {
    setShowJewelryFor(!showJewelryFor);
  };

  const handleJewellryForClick = () => {
    setShowJewellryFor((prev) => (prev === "theme" ? null : "theme"));
  };

  const handleNatureClick = () => {
    setShowNatureMenu(!showNatureMenu);
  };
  const toggleBraceletDropdown = (e) => {
    e.preventDefault();
    setIsBraceletOpen(!isBraceletOpen);
  };
  const toggleNecklaceDropdown = (e) => {
    e.preventDefault(); // stop page navigation
    setIsNecklaceOpen(!isNecklaceOpen);
  };
  const earingDropdown = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    setShowRingSubMenu(false); // reset ring submenu if closing
  };

  const handleRingClick = (e) => {
    e.preventDefault();
    setShowRingSubMenu(!showRingSubMenu);
  };
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Get cart data from context
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubSubMenu, setShowSubSubMenu] = useState(false);
  const [showSubSubSubMenu, setShowSubSubSubMenu] = useState(false);

  return (
    <>
      <Helmet>
        <title>Jewelry Store | Home</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <meta
          name="description"
          content="Shop the best jewelry collections online."
        />
      </Helmet>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          id="sidebar"
          className="fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <section className="fixed top-0 right-0 xl:w-[1354px] mx-auto head-realative lg:px-0 md:px-10 ">
          <nav className="flex items-center px-10 py-0 mx-auto relative justify-between">
            {/* Mobile Menu Button */}
            <div className="relative lg:hidden">
              {/* Menu Button */}
              <button
                id="menu-btn"
                className="p-2"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg
                  className="w-6 h-6 text-[#5B3E38]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>

              {/* Sidebar */}
              <div
                className={`fixed z-40 inset-y-0 left-0 w-[66%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-[#5B3E38]">Menu</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <svg
                      className="w-6 h-6 text-[#5B3E38]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sidebar Links */}
                <div className="flex flex-col p-4 space-y-4 overflow-y-auto h-[calc(100vh-70px)]">
                  <ul className="space-y-3 font-[400]">
                    <li
                      className="relative group"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button className="hover:text-black flex items-center focus:outline-none">
                        SHOP BY CATEGORY{" "}
                        <i className="bi bi-chevron-down ml-1" />
                      </button>

                      {dropdownOpen && (
                        <div className="relative left-0 top-full mt-2 bg-white shadow-lg z-50 p-4 w-[100%]">
                          <div className="me">
                            {/* Column 1: Jewellery (Category) */}
                            <div>
                              <ul
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "2fr 2fr",
                                  gap: "25px",
                                }}
                              >
                                {categories.map((cat) => (
                                  <li
                                    key={cat.id}
                                    style={{
                                      border: "1px solid #ccc",
                                      borderRadius: "7px",
                                    }}
                                  >
                                    <div
                                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                                      onClick={() =>
                                        handleCategoryClick(cat.id)
                                      }
                                    >
                                      {cat.image && (
                                        <img
                                          src={
                                            cat.image.startsWith("http")
                                              ? cat.image
                                              : `${
                                                  import.meta.env
                                                    .VITE_BACKEND_URL
                                                }${cat.image}`
<<<<<<< HEAD
                                                
=======
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df
                                          }
                                          alt={cat.category}
                                          className="h-8 w-8 object-cover rounded"
                                        />
                                      )}
<<<<<<< HEAD
                                      <span className="flex items-center gap-2 text-gray-800">{cat.category}<IoIosArrowForward className="bg-pink-500 text-white rounded-full w-5 h-5" /></span>
=======
                                      <span>{cat.category}</span>
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df
                                    </div>

                                    {expandedCategoryId === cat.id && (
                                      <div
                                        className="mt-2 border border-gray-300 p-3 rounded bg-gray-50 space-y-2"
                                        style={{
                                          position: "absolute",
                                          top: "100%",
                                        }}
                                      >
                                        {purposes.length > 0 && (
                                          <div>
                                            <strong>Purpose:</strong>
                                            <ul className="list-disc pl-5">
                                              {purposes.map((p, i) => (
                                                <li
                                                  key={i}
                                                  className="cursor-pointer text-blue-600 hover:underline"
                                                  onClick={() =>
                                                    handleItemClick(
                                                      "purpose",
                                                      p.name
                                                    )
                                                  }
                                                >
                                                  {p.name}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {types.length > 0 && (
                                          <div>
                                            <strong>Type:</strong>
                                            <ul className="list-disc pl-5">
                                              {types.map((t, i) => (
                                                <li
                                                  key={i}
                                                  className="cursor-pointer text-blue-600 hover:underline"
                                                  onClick={() =>
                                                    handleItemClick(
                                                      "type",
                                                      t.name
                                                    )
                                                  }
                                                >
                                                  {t.name}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {themeOptions.length > 0 && (
                                          <div>
                                            <strong>Theme:</strong>
                                            <ul className="list-disc pl-5">
                                              {themeOptions.map((t, i) => (
                                                <li
                                                  key={i}
                                                  className="cursor-pointer text-blue-600 hover:underline"
                                                  onClick={() =>
                                                    handleItemClick(
                                                      "theme",
<<<<<<< HEAD
                                                      t.theme
                                                    )
                                                  }
                                                >
                                                  {t.theme}
=======
                                                      t.name
                                                    )
                                                  }
                                                >
                                                  {t.name}
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {gemstones.length > 0 && (
                                          <div>
                                            <strong>Gemstone:</strong>
                                            <ul className="list-disc pl-5">
                                              {gemstones.map((g, i) => (
                                                <li
                                                  key={i}
                                                  className="cursor-pointer text-blue-600 hover:underline"
                                                  onClick={() =>
                                                    handleItemClick(
                                                      "gemstone",
                                                      g.name
                                                    )
                                                  }
                                                >
                                                  {g.name}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* 👇 Product Cards (If products fetched) */}
                          {products.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h3 className="text-xl font-semibold mb-4">
                                Matching Products
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                  <div
                                    key={index}
                                    className="border p-2 rounded shadow hover:shadow-lg"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-40 w-full object-cover mb-2"
                                    />
                                    <h4 className="text-lg font-medium">
                                      {product.name}
                                    </h4>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                    <hr />
                    <li
                      className="relative group"
                      onMouseEnter={handleMoouseEnter}
                      onMouseLeave={handleMoouseLeave}
                    >
                      <button className="hover:text-black flex items-center focus:outline-none">
                        SHOP BY THEME <i className="bi bi-chevron-down ml-1" />
                      </button>

                      {dropdownOopen && (
                        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg z-50 p-0 w-100%">
                          <div className="grid grid-cols-0 gap-2">
                            {/* Column 2: Theme */}
                            <div>
                              <ul
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "2fr 2fr",
                                  gap: "25px",
                                  padding: 0,
                                  listStyle: "none",
                                }}
                              >
                                {themes.map((theme) => (
                                  <li
                                    key={theme.id}
                                    className="hover:text-blue-600 cursor-pointer flex items-center gap-2 p-0 w-full"
                                    style={{
                                      border: "1px solid #ccc",
                                      borderRadius: "7px",
                                    }}
                                  >
                                    {theme.image && (
                                      <img
                                        src={
                                          theme.image.startsWith("http")
                                            ? theme.image
<<<<<<< HEAD
                                            : `${import.meta.env.VITE_BACKEND_URL.replace(/\/api$/, "")}/uploads/${theme.image}`
=======
                                            : `${import.meta.env.VITE_BACKEND_URL.replace(
                                                /\/$/,
                                                ""
                                              )}/uploads/${theme.image}`
>>>>>>> d0bd68f264cf6afdede23774441409dc299d02df
                                        }
                                        alt={theme.theme}
                                        className="h-8 w-8 object-cover rounded"
                                      />
                                    )}
                                    <Link
                                      to={`/theme/${theme.theme}`}
                                      className="flex-1"
                                    >
                                      {theme.theme}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* 👇 Product Cards (If products fetched) */}
                          {products.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h3 className="text-xl font-semibold mb-4">
                                Matching Products
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                  <div
                                    key={index}
                                    className="border p-2 rounded shadow hover:shadow-lg"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-40 w-full object-cover mb-2"
                                    />
                                    <h4 className="text-lg font-medium">
                                      {product.name}
                                    </h4>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                    <hr />
                    <li
                      className="relative group"
                      onMouseEnter={handleMousseEnter}
                      onMouseLeave={handleMousseLeave}
                    >
                      <button className="hover:text-black flex items-center focus:outline-none">
                        Jewelry for <i className="bi bi-chevron-down ml-1" />
                      </button>

                      {dropdownnOpen && (
                        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg z-50 p-4 w-[100%]">
                          <div className="grid grid-cols-3 gap-4">
                            {/* Column 2: Theme */}
                            <div>
                              <ul>
                                {themes.map((theme) => (
                                  <li
                                    key={theme.id}
                                    className="hover:text-blue-600 cursor-pointer"
                                  >
                                    <Link to={`/theme/${theme.theme}`}>
                                      {theme.theme}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* 👇 Product Cards (If products fetched) */}
                          {products.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h3 className="text-xl font-semibold mb-4">
                                Matching Products
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                  <div
                                    key={index}
                                    className="border p-2 rounded shadow hover:shadow-lg"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-40 w-full object-cover mb-2"
                                    />
                                    <h4 className="text-lg font-medium">
                                      {product.name}
                                    </h4>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                    <hr />
                    <li
                      className="relative group"
                      onMouseEnter={handleMousseeEnter}
                      onMouseLeave={handleMousseeLeave}
                    >
                      <button className="hover:text-black flex items-center focus:outline-none">
                        More By Vinston Designs{" "}
                        <i className="bi bi-chevron-down ml-1" />
                      </button>

                      {dropdownnOpeen && (
                        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg z-50 p-4 w-[100%]">
                          <div className="ip">
                            {/* Column 3: More */}
                            <div>
                              {/* <h4 className="font-semibold mb-2">More</h4> */}
                              <ul>
                                <li>
                                  <Link
                                    to="/about-us"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    About Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/contact"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    Contact Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/blog"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    Blog
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/terms-conditions"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    Terms & Conditions
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/privacy-policy"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    Privacy Policy
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* 👇 Product Cards (If products fetched) */}
                          {products.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h3 className="text-xl font-semibold mb-4">
                                Matching Products
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                  <div
                                    key={index}
                                    className="border p-2 rounded shadow hover:shadow-lg"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-40 w-full object-cover mb-2"
                                    />
                                    <h4 className="text-lg font-medium">
                                      {product.name}
                                    </h4>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>

                    <Link to="/login" className="block">
                      <div className="bg-pink-100 py-2 px-4 rounded-lg flex items-center hover:bg-pink-200 transition cursor-pointer">
                        <div className="flex items-center">
                          <span className="l-box mr-2 rounded-full bg-white w-16 h-16 flex items-center justify-center">
                            <i className="bi text-pink-500 bi-person-fill text-3xl"></i>
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div className="grid">
                            <span className="text-[18px] font-semibold">
                              Guest User
                            </span>
                            <button className="text-pink-500 text-left">
                              Tap to Login/Sign up
                            </button>
                          </div>
                          <div className="flex items-end">
                            <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm">
                              <i className="bi bi-chevron-right"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <button onClick={() => navigate("/")}>
                <img
                  src="/icons/Lgo Vinston 1.png"
                  alt="Logo"
                  className="lg:w-58 md:w-26 w-22"
                />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative items-center sm:block hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH"
                className="xl:w-[882px] lg:w-[600px] px-14 lg:py-3 md:py-2 sm:py-1 rounded-full bg-[#EEEAEA] focus:outline-none text-black md:text-[16px] sm:text-[12px]"
              />
              <span className="absolute left-3 md:top-3 sm:top-2 flex">
                <img
                  src="icons/search.png"
                  alt=""
                  className="md:w-[20px] sm:w-[15px] lg:w-[25px]"
                />
                <span className="border-r-1 text-[#5B3E38] ms-3"></span>
              </span>
            </div>
            {/* Icons */}
            <div className="flex md:space-x-6 space-x-4 text-gray-700 text-[18px] lg:ms-6">
              {/* 🔍 Search Icon (Mobile Only) */}
              <span className="md:hidden block">
                <button
                  className="cursor-pointer text-2xl md:text-3xl"
                  onClick={() => navigate("/search")}
                >
                  <i className="bi bi-search"></i>
                </button>
              </span>

              {/* 👤 User Profile */}
              <div className="hidden md:block">
                <UserProfileHover />
              </div>

              {/* ❤️ Wishlist Icon */}
              {/* <span>
        <button className="cursor-pointer text-2xl md:text-3xl" onClick={() => navigate("/wishlist")}>
            <i className="bi bi-heart"></i>
        </button>
    </span> */}

              {/* 🛒 Cart Icon */}
              <span className="relative">
                <button
                  className="cursor-pointer relative"
                  onClick={() => navigate("/cart")}
                >
                  <i className="bi bi-cart3 text-2xl md:text-3xl"></i>
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#AA8265] text-white text-xs px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </span>
            </div>
          </nav>

          {/* Desktop Nav Menu */}
          <div className="flex justify-center py-4 head-absolute hidden lg:block">
            <ul className="flex lg:space-x-8 md:space-x-4 text-[#5B3E38] text-[17px]">
              <li>
                <Link to="/" className="hover:text-black">
                  HOME
                </Link>
              </li>

              {/* Hover Dropdown Menu */}
              {/* <li className="relative group">
                                <button className="hover:text-black flex items-center focus:outline-none">
                                    SHOP BY THEME <i className="bi bi-chevron-down ml-1" />
                                </button>
                            </li> */}

              <ShopByThemeDropdown />

              <li>
                <Link to="/custom-jewelry" className="hover:text-black">
                  CUSTOM JEWELRY
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-black">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  BLOG
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
