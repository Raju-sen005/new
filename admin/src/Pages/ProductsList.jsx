import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slidebar1 from "../Components/Slidebar1";
import MultiSelectDropdown from "./MultiSelectDropdown";

const ProductList = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const iURL = import.meta.env.VITE_BACKEND_URL.replace(/\/api$/, "");


  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const [formData, setFormData] = useState({ name: '', price: '', category: '', image: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [variants, setVariants] = useState([
    {
      title: "",
      gemstone: "",
      description: "",
      price: [""],
      quantity: "",
      images: [],
      categories: [],
      subCategories: [],
      themes: [],
      purposes: [],
      festivals: [],
      sizes: [],
      metal: [],
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [metals, setMetals] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [gemstone, setGemstone] = useState([]);
  const safeParseArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return value.split(",").map(v => v.trim()).filter(Boolean);
      }
    }
    return [];
  };


  useEffect(() => {
    async function fetchDropdowns() {
      try {
        const [
          categoryRes,
          subCategoryRes,
          themeRes,
          festivalRes,
          purposeRes,
          metalRes,
          sizeRes,
          gemstone,
        ] = await Promise.all([
          axios.get(baseURL + "/category"),
          axios.get(baseURL + "/subcategory"),
          axios.get(baseURL + "/theme"),
          axios.get(baseURL + "/festival"),
          axios.get(baseURL + "/purpose"),
          axios.get(baseURL + "/material"),
          axios.get(baseURL + "/size"),
          axios.get(baseURL + "/gemstone"),
        ]);

        setCategories(categoryRes.data);
        setSubCategories(subCategoryRes.data);
        setThemes(themeRes.data);
        setFestivals(festivalRes.data);
        setPurposes(purposeRes.data);
        setMetals(metalRes.data); // should already return { id, name }
        setSizes(sizeRes.data);
        setGemstone(gemstone.data);
      } catch (error) {
        console.error("Failed to load dropdown data:", error);
      }
    }

    fetchDropdowns();
  }, []);

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        title: editingProduct?.title || "",
        gemstone: editingProduct?.gemstone || "",
        description: editingProduct?.description || "",
        quantity: editingProduct?.quantity || "",
        images: [], // old images won't be pre-filled in file input
        categories: safeParseArray(editingProduct?.categories || "[]"),
        subCategories: safeParseArray(editingProduct?.subCategories || "[]"),
        themes: safeParseArray(editingProduct?.themes || "[]"),
        purposes: safeParseArray(editingProduct?.purposes || "[]"),
        festivals: safeParseArray(editingProduct?.festivals || "[]"),
        sizes: safeParseArray(editingProduct?.sizes || "[]"),
        price: safeParseArray(editingProduct?.price || "[]"),
        metal: safeParseArray(editingProduct?.metal || "[]"),

      },
    ]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };
  const [priceErrors, setPriceErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;

    if (!token) return console.error("No token found");

    // Reset previous errors
    setPriceErrors({});

    // Price-Metal validation
    let hasError = false;
    const newErrors = {};
    variants.forEach((variant, index) => {
      if ((variant.metal?.length || 0) !== (variant.price?.length || 0)) {
        newErrors[index] = "Metal and price counts must be equal.";
        hasError = true;
      }
    });
    if (hasError) {
      setPriceErrors(newErrors);
      return;
    }

    // FormData
    const form = new FormData();


    // Variants without images
    const variantsWithoutImages = variants.map((v) => {
      const { images, ...rest } = v;
      return rest;
    });
    form.append("variants", JSON.stringify(variantsWithoutImages));

    // Images with correct field names
    variants.forEach((v, idx) => {
      v.images.forEach((file) => {
        form.append(`variants[${idx}][images]`, file); // must match backend
      });
    });



    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      if (editingProduct) {

       await axios.put(
  `${baseURL}/products/${editingProduct.productId}`,
  form,
  { headers }
);

      } else {
        await axios.post(`${baseURL}/products`, form, { headers });
      }

      // Reset form
      setVariants([
        {
          title: "",
          gemstone: "",
          description: "",
          price: [""],
          quantity: "",
          images: [],
          categories: [],
          subCategories: [],
          themes: [],
          purposes: [],
          festivals: [],
          sizes: [],
          metal: [],
        },
      ]);
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/products`);
      console.log(res.data);

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Set edit mode for a variant
  // const handleEdit = (variant) => {
  //   setEditingProduct(variant);

  //   const editedVariant = {
  //     title: variant.title || "",
  //     gemstone: variant.gemstone || "",
  //     description: variant.description || "",
  //     // price: variant.price || '',
  //     quantity: variant.quantity || "",
  //     images: [], // old images won't be pre-filled in file input
  //     categories: safeParseArray(variant.categories || "[]"),
  //     subCategories: safeParseArray(variant.subCategories || "[]"),
  //     themes: safeParseArray(variant.themes || "[]"),
  //     purposes: safeParseArray(variant.purposes || "[]"),
  //     festivals: safeParseArray(variant.festivals || "[]"),
  //     sizes: safeParseArray(variant.sizes || "[]"),
  //     price: safeParseArray(variant.price || "[]"),
  //     metal: safeParseArray(variant.metal || "[]"),
  //   };

  //   setVariants([editedVariant]); // Overwrite with the variant to edit
  //   setShowForm(true);
  // };
  const handleEdit = (product, variant) => {
  setEditingProduct({ productId: product.id });

  setVariants([{
    id: variant.id, // 👈 variant id IMPORTANT
    title: variant.title || "",
    gemstone: variant.gemstone || "",
    description: variant.description || "",
    quantity: variant.quantity || "",
    images: [],
    categories: safeParseArray(variant.categories),
    subCategories: safeParseArray(variant.subCategories),
    themes: safeParseArray(variant.themes),
    purposes: safeParseArray(variant.purposes),
    festivals: safeParseArray(variant.festivals),
    sizes: safeParseArray(variant.sizes),
    price: safeParseArray(variant.price),
    metal: safeParseArray(variant.metal),
  }]);

  setShowForm(true);
};


  // Delete a variant
  // const handleDelete = async (variantId) => {
  //   const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;

  //   if (!token) {
  //     console.error("No token found");
  //     return;
  //   }

  //   try {
  //     await axios.delete(`${baseURL}/products/${variantId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     fetchProducts(); // Refresh list after deletion
  //   } catch (err) {
  //     console.error("Error deleting variant:", err);
  //   }
  // };

  const handleDelete = async (productId) => {
  const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
  if (!token) return;

  await axios.delete(`${baseURL}/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  fetchProducts();
};



  return (
    <>
      {/* Sidebar */}
      <Slidebar1 />
      {/* Main Content */}
      <div className="lg:ml-64  ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-neutral-800 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative hs-dropdown [--placement:bottom-left] me-5 lg:me-0 flex items-center w-50 bg-black rounded-lg hidden md:block">
                <button
                  id="flow-shop-dropdown-btn"
                  type="button"
                  className="inline-flex items-center gap-x-2 py-2.5 px-4 text-sm font-medium text-white rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-100"
                >
                  <img src="icons/Storefront-white.png" alt="" />
                  Flow Shop
                  <svg
                    className="w-4 h-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id="flow-shop-dropdown-menu"
                  className="absolute top-[20%] left-0 mt-12 w-48 bg-white shadow-md rounded-lg opacity-0 invisible transition-all duration-200"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Products
                  </a>
                </div>
              </div>
              {/* Mobile menu button */}
              <button
                id="menuButton"
                className="lg:hidden p-2 rounded-md"
                title="Toggle Menu"
              >
                <i className="bi bi-list text-2xl" />
              </button>
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-3 text-gray-400"
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
            </div>
            <div className="flex items-center space-x-4">
              {/* Mobile search button and container */}
              <div className="lg:hidden relative">
                <button
                  id="mobileSearchBtn"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Search"
                >
                  <i className="bi bi-search" />
                </button>
                {/* Add this mobile search container */}
                <div
                  id="mobileSearchContainer"
                  className="hidden fixed inset-x-0 top-16 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      id="searchInput"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-3 text-gray-400"
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
                    {/* Search Results Dropdown */}
                    <div
                      id="searchResults"
                      className="hidden absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
                    >
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          Recent Searches
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <i className="bi bi-clock-history mr-2" />
                            <span>T-Shirts</span>
                          </div>
                          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <i className="bi bi-clock-history mr-2" />
                            <span>Jackets</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t dark:border-gray-700 p-2">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          Suggestions
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <i className="bi bi-search mr-2" />
                            <span>Products</span>
                          </div>
                          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <i className="bi bi-search mr-2" />
                            <span>Orders</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative inline-block w-11 h-5 hidden lg:block">
                <input
                  defaultChecked=""
                  id="switch-component"
                  type="checkbox"
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                  onClick={() => toggleDarkMode()}
                />
                <label
                  htmlFor="switch-component"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>
              <div className="relative">
                <button
                  id="notificationBtn"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                  title="Notifications"
                >
                  <i className="bi bi-bell" />
                  {/* Optional: Add notification indicator */}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                {/* Mobile backdrop */}
                <div
                  id="notificationBackdrop"
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"
                />
                {/* Notification dropdown */}
                <div
                  className="fixed lg:absolute top-0 lg:top-auto right-0 mt-0 lg:mt-2 w-full lg:w-[400px] h-full lg:h-auto bg-white dark:bg-gray-800 rounded-none lg:rounded-lg shadow-lg border dark:border-gray-700 hidden z-50 overflow-hidden"
                  id="notificationDropdown"
                >
                  <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold">Alert</h3>
                    <div className="flex gap-4">
                      <i className="bi bi-list cursor-pointer" />
                      <i
                        className="bi bi-check-circle cursor-pointer"
                        id="clearNotifications"
                      />
                    </div>
                  </div>
                  <div className="max-h-[60vh] lg:max-h-96 overflow-y-auto">
                    <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-start">
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <i className="bi bi-dot text-blue-500" />
                            <p className="text-xs text-gray-500">
                              App - 2 minutes ago
                            </p>
                          </div>
                          <h2 className="text-lg font-semibold mb-2">
                            Theres an issue with shop
                          </h2>
                          <p className="text-xs text-gray-500">
                            Review an issue that may impact sales or how you
                            promote products. Go to the channel for more
                            details.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-start">
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <i className="bi bi-dot text-blue-500" />
                            <p className="text-xs text-gray-500">
                              App - 2 minutes ago
                            </p>
                          </div>
                          <h2 className="text-lg font-semibold mb-2">
                            Theres an issue with shop
                          </h2>
                          <p className="text-xs text-gray-500">
                            Review an issue that may impact sales or how you
                            promote products. Go to the channel for more
                            details.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t dark:border-gray-700 text-center">
                    <a
                      href="#"
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      See all
                    </a>
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2">
                <img src="icons/profile.png" alt="" />
                <div className="ms-3 font-medium hidden lg:block">
                  <h6>Robbi Darwis</h6>
                  <p className="text-gray-400">Admin</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-semibold">Product Management</h1>
            <button
              className="border rounded-md px-4 py-2 bg-blue-500 text-white"
              onClick={() => setShowForm(true)}
            >
              Create Product
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-4">Id</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Gemstone</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Categories</th>
                  <th className="p-4">Sub-Categories</th>
                  <th className="p-4">Images</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products?.map((product, index) =>
                    product?.ProductVariants?.map((variant, vIndex) => (
                      <tr
                        key={variant.id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4">
                          {index + 1}.{vIndex + 1}
                        </td>
                        <td className="p-4">{variant.title}</td>
                        <td className="p-4">{variant.gemstone}</td>
                        <td className="p-4">
                         {safeParseArray(variant.price || "[]").join(", ")}
                        </td>
                        <td className="p-4">
                          {(() => {
                            const subs = safeParseArray(variant.categories || "[]");
                            if (subs.length > 3) {
                             return subs.slice(0, 3).join(", ") + ", ...";


                            }
                            return subs.join(", ");
                          })()}
                        </td>

                        <td className="p-4">
                          {(() => {
                            const subs = safeParseArray(
                              variant.subCategories || "[]"
                            );
                            if (subs.length > 3) {
                            return subs.slice(0, 3).join(", ") + ", ...";


                            }
                            return subs.join(", ");
                          })()}
                        </td>

                        <td className="p-4 flex gap-2">
                          {variant?.images?.map((img, i) => (
                            <img
                              key={i}
                              src={`${iURL}/uploads/${img}`}
                              alt={`variant-${variant.id}-${i}`}
                              className="w-12 h-12 object-cover rounded transition-transform duration-300 hover:scale-[2.5] z-50"
                            />
                          ))}
                        </td>

                        <td>
                          <div className="p-4 flex gap-2">
                            <button
                              className="text-blue-500 border px-2 py-1 rounded hover:bg-blue-100"
                              onClick={() => handleEdit(product, variant)}


                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 border px-2 py-1 rounded hover:bg-red-100"
                              onClick={() => handleDelete(product.id)}

                            >
                              Delete
                            </button>
                          </div>

                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Create/Edit Form */}

          {showForm && (
            <div className="p-4 mt-6 bg-white shadow rounded-md max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? "Edit Product" : "Create Product"}
              </h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {variants?.map((variant, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded mb-4 bg-gray-50"
                  >
                    <h3 className="font-semibold mb-2">Variant {index + 1}</h3>
                    <input
                      type="text"
                      placeholder="Title"
                      value={variant.title}
                      onChange={(e) =>
                        handleVariantChange(index, "title", e.target.value)
                      }
                      className="w-full mb-2 border px-3 py-2 rounded"
                      required
                    />
                    <select
                      value={variant.gemstone}
                      onChange={(e) =>
                        handleVariantChange(index, "gemstone", e.target.value)
                      }
                      className="w-full mb-2 border px-3 py-2 rounded"
                      required
                    >
                      <option value="">Select Gemstone</option>
                      {gemstone.map((gem) => (
                        <option key={gem.id} value={gem.name}>
                          {gem.name}
                        </option>
                      ))}
                    </select>

                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={variant.description}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 border px-3 py-2 rounded"
                      required
                    />
                    <select
                      value={variant.quantity}
                      onChange={(e) =>
                        handleVariantChange(index, "quantity", e.target.value)
                      }
                      className="w-full mb-2 border px-3 py-2 rounded"
                      required
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "images",
                          Array.from(e.target.files)
                        )
                      }
                      className="w-full mb-2 border px-3 py-2 rounded"
                      required={!editingProduct}
                    />

                    {/* {['categories', 'subCategories', 'themes', 'purposes', 'festivals', 'metal', 'price', 'sizes'].map((field) => (
                                            <input
                                                key={field}
                                                type="text"
                                                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (comma separated)`}
                                                value={variant[field] ? variant[field].join(',') : ''}
                                                onChange={(e) =>
                                                    handleVariantChange(index, field, e.target.value.split(',').map((s) => s.trim()))
                                                }
                                                className="w-full mb-2 border px-3 py-2 rounded"
                                            />
                                        ))} */}
                    {/* Category Dropdown */}
                    <MultiSelectDropdown
                      options={categories.map((cat) => ({
                        id: cat.id,
                        name: cat.category, // 👈 category को name में बदला
                      }))}
                      selected={variant?.categories || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "categories", selected)
                      }
                      placeholder="Select Categories"
                    />

                    {/* Sub-Category Dropdown */}
                    <MultiSelectDropdown
                      options={subCategories
                        .filter((sub) =>
                          (variant.categories || []).includes(sub.category)
                        )
                        .map((sub) => ({
                          id: sub.id,
                          name: sub.subcategory, // 👈 subcategory को name में बदला
                        }))}
                      selected={variant?.subCategories || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "subCategories", selected)
                      }
                      placeholder="Select Sub-Categories"
                    />

                    {/* Theme Dropdown */}
                    <MultiSelectDropdown
                      options={themes.map((th) => ({
                        id: th.id,
                        name: th.theme, // 👈 theme को name में बदला
                      }))}
                      selected={variant?.themes || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "themes", selected)
                      }
                      placeholder="Select Themes"
                    />

                    <MultiSelectDropdown
                      options={purposes}
                      selected={variant?.purposes || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "purposes", selected)
                      }
                      placeholder="Select Purposes"
                    />

                    <MultiSelectDropdown
                      options={festivals}
                      selected={variant?.festivals || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "festivals", selected)
                      }
                      placeholder="Select Festivals"
                    />

                    <MultiSelectDropdown
                      options={metals}
                      selected={variant?.metal || []} // note: maybe store as array too for consistency
                      onChange={(selected) =>
                        handleVariantChange(index, "metal", selected)
                      }
                      placeholder="Select Metal"
                    />

                    <MultiSelectDropdown
                      options={sizes}
                      selected={variant?.sizes || []}
                      onChange={(selected) =>
                        handleVariantChange(index, "sizes", selected)
                      }
                      placeholder="Select Sizes"
                    />

                    {["price"].map((field) => (
                      <div key={field}>
                        <input
                          type="text"
                          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)
                            } (comma separated)`}
                          value={safeParseArray(variant[field]).join(",")}


                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              field,
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          className="w-full mb-2 border px-3 py-2 rounded"
                        />
                        {priceErrors[index] && (
                          <p className="text-red-600 text-sm mt-1">
                            {priceErrors[index]}
                          </p>
                        )}
                      </div>
                    ))}

                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-600 text-sm mt-1 underline"
                      >
                        Remove Variant
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVariant}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
                >
                  Add Another Variant
                </button>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 border rounded hover:bg-gray-200"
                    onClick={() => {
                      setVariants([]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProductList;
