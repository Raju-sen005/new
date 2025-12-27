import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../lib'

const ShopByThemeDropdown = () => {
    const [categories, setCategories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);
    const [purposes, setPurposes] = useState([]);
    const [types, setTypes] = useState([]);
    const [themeOptions, setThemeOptions] = useState([]);
    const [gemstones, setGemstones] = useState([]);
    const [products, setProducts] = useState([]); // 👉 fetched products
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [categoriesRes, themesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/category`),
                fetch(`${API_BASE_URL}/theme`)
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
                fetch(`${API_BASE_URL}/purpose?categoryId=${categoryId}`),
                fetch(`${API_BASE_URL}/subcategory/?categoryId=${categoryId}`),
                fetch(`${API_BASE_URL}/theme/?categoryId=${categoryId}`),
                fetch(`${API_BASE_URL}/gemstone?categoryId=${categoryId}`)
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
const handleItemClick = (type, value) => {
    navigate(`/products?${type}=${value}`);
};
    // // 👇 when any purpose/type/theme/gemstone is clicked, fetch products
    // const handleItemClick = async (type, value) => {
    //     try {
    //         const res = await fetch(`http://localhost:8000/products?${type}=${value}`);
    //         const data = await res.json();
    //         setProducts(data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };

    return (
        <li className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="hover:text-black flex items-center focus:outline-none">
                SHOP BY THEME <i className="bi bi-chevron-down ml-1" />
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white shadow-lg z-50 p-4 w-[1000px]">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Column 1: Jewellery (Category) */}
                        <div>
                            <h4 className="font-semibold mb-2">Jewellery</h4>
                            <ul>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <div
                                            className="hover:text-blue-600 cursor-pointer"
                                            onClick={() => handleCategoryClick(cat.id)}
                                        >
                                            {cat.category}
                                        </div>

                                        {expandedCategoryId === cat.id && (
                                            <div className="mt-2 border border-gray-300 p-3 rounded bg-gray-50 space-y-2">

                                                {purposes.length > 0 && (
                                                    <div>
                                                        <strong>Purpose:</strong>
                                                        <ul className="list-disc pl-5">
                                                            {purposes.map((p, i) => (
                                                                <li key={i} className="cursor-pointer text-blue-600 hover:underline"
                                                                    onClick={() => handleItemClick("purpose", p.name)}>
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
                                                                <li key={i} className="cursor-pointer text-blue-600 hover:underline"
                                                                    onClick={() => handleItemClick("type", t.name)}>
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
                                                                <li key={i} className="cursor-pointer text-blue-600 hover:underline"
                                                                    onClick={() => handleItemClick("theme", t.theme)}>
                                                                    {t.theme}
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
                                                                <li key={i} className="cursor-pointer text-blue-600 hover:underline"
                                                                    onClick={() => handleItemClick("gemstone", g.name)}>
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

                        {/* Column 2: Theme */}
                        <div>
                            <h4 className="font-semibold mb-2">Theme</h4>
                            <ul>
                                {themes.map((theme) => (
                                    <li key={theme.id} className="hover:text-blue-600 cursor-pointer">
                                        <Link to={`/theme/${theme.theme}`}>{theme.theme}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: More */}
                        <div>
                            <h4 className="font-semibold mb-2">More</h4>
                            <ul>
                                <li><Link to="/custom-jewelry">Custom Jewelry</Link></li>
                                <li><Link to="/about-us">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* 👇 Product Cards (If products fetched) */}
                    {products.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-xl font-semibold mb-4">Matching Products</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                    <div key={index} className="border p-2 rounded shadow hover:shadow-lg">
                                        <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
                                        <h4 className="text-lg font-medium">{product.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </li>
    );
};

export default ShopByThemeDropdown;
