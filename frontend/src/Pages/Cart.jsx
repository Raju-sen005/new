import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../CartContext.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import Footer from '../Components/Footer.jsx';
import Cookies from 'js-cookie';
import Header from '../Components/Header';

const Cart = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { cartItems, removeFromCart, addToCart, getTotalPrice, updateFromCart } = useCart();
  const [similarProducts, setsimilarProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // Fetch Orders
  useEffect(() => {
    const fetchOrders1 = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
          throw new Error("User token not found");
        }

        const response = await fetch(`${url}/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await response.json();
        setOrderItems(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders1();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products`);
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        
        const flattenedVariants = result.flatMap(product =>
          product.ProductVariants.map(variant => ({
            ...variant,
            categories: JSON.parse(variant.categories || '[]'),
            subCategories: JSON.parse(variant.subCategories || '[]'),
            themes: JSON.parse(variant.themes || '[]'),
            purposes: JSON.parse(variant.purposes || '[]'),
            festivals: JSON.parse(variant.festivals || '[]'),
            sizes: JSON.parse(variant.sizes || '[]'),
            productId: product.id,
          }))
        );
        
        setsimilarProducts(flattenedVariants);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Function to update the quantity of a specific item in the cart
  const updateQuantity = (id, type) => {
    if (type === 'increase') {
      let indexO = id.metals.findIndex(i => i == id.metal);
      addToCart(id.productId, id.id, id.sizes, indexO);
    } else if (type === 'decrease') {
      if (cartItems.find((item) => item.id === id.id).quantity > 1) {
        updateFromCart(id.id, id.sizes, id.metal);
      } else {
        removeFromCart(id.id, id.sizes, id.metal);
      }
    }
  };

  // Function to handle the removal of an item from the cart
  const handleRemoveItem = (id, sizes, metal) => {
    removeFromCart(id, sizes, metal);
  };

  // Calculate the subtotal of all items in the cart
  const subtotal = useMemo(() => getTotalPrice()?.toFixed(2), [cartItems]);

  // Handle Checkout
  const handleCheckoutClick = () => {
    const userCookie = Cookies.get("user");
    let parsedUser = null;

    try {
      if (userCookie) {
        parsedUser = JSON.parse(userCookie);
      }
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }

    if (cartItems.length > 0) {
      if (parsedUser) {
        navigate('/checkout');
      } else {
        toast.warn('Login first', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      }
    } else {
      toast.warn('Your cart is empty. Please add items to your cart before checking out.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Helper functions to get image, price, and size
  const getImage = (imgData) => {
    try {
      const arr = typeof imgData === "string" ? JSON.parse(imgData) : imgData;
      return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
    } catch (err) {
      return null;
    }
  };

  const getPrice = (priceData, index = 0) => {
    try {
      const arr = typeof priceData === "string" ? JSON.parse(priceData) : priceData;
      return Array.isArray(arr) && arr.length > index ? arr[index] : null;
    } catch (err) {
      return null;
    }
  };

  const getSize = (sizeData, index = 0) => {
    try {
      const arr = typeof sizeData === "string" ? JSON.parse(sizeData) : sizeData;
      return Array.isArray(arr) && arr.length > index ? arr[index] : null;
    } catch (err) {
      return null;
    }
  };

  return (
    <div className='pt-[150px]'>
      <Header />
      <section className="md:mt-18 px-4">
        <div className="lg:w-[1300px] md:w-[768px] w-full mx-auto bg-white p-6 rounded-lg hidden md:block">
          <h1 className="text-2xl font-bold mb-6">MY CART ({cartItems.length})</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left font-semibold text-gray-700">
                <th className="p-4">PRODUCT</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">Size</th>
                <th className="p-4">QTY</th>
                <th className="p-4">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 flex items-center space-x-4">
                    <img
                      src={getImage(item.images) ? `${url}/uploads/${getImage(item.images)}` : "/placeholder.jpg"}
                      alt={item.title || "Product Image"}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-[#5B3E38]">{item.title}</p>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[20px]">${getPrice(item.price)}</td>
                  <td className="p-4 font-bold text-[20px]">{getSize(item.sizes)}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item, "decrease")} className="px-2 py-1 border">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item, "increase")} className="px-2 py-1 border">+</button>
                      <button onClick={() => handleRemoveItem(item.id, item.sizes, item.metal)} className="ml-2 p-2 bg-gray-200 rounded">
                        🗑️
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[20px]">${(item.price * item.quantity)?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md md:hidden">
          <h1 className="text-2xl font-bold mb-6">MY CART ({cartItems.length})</h1>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4 mb-4">
              <img
                src={getImage(item.images) ? `${url}/uploads/${getImage(item.images)}` : "/placeholder.jpg"}
                alt={item.title || "Product Image"}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(item, "decrease")} className="border px-3 py-1">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, "increase")} className="border px-3 py-1">+</button>
                  <button onClick={() => handleRemoveItem(item.id, item.sizes, item.metal)} className="ml-3 p-2 bg-gray-200 rounded">🗑️</button>
                  <p className="text-lg font-bold ms-4">${(item.price * item.quantity)?.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section className="md:mt-18 px-4">
        <div className="lg:w-[1300px] md:w-[768px] w-full mx-auto bg-white p-6 rounded-lg hidden md:block">
          <h1 className="text-2xl font-bold mb-6">MY ORDERS ({orderItems.length})</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left font-semibold text-gray-700">
                <th className="p-4">PRODUCT-Detail</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">QTY</th>
                <th className="p-4">TOTAL+SHIPPING</th>
                <th className="p-4">ORDER DATE</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order) =>
                order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 font-bold text-[20px]">
                      <Link to={`/product/${item.productId}/${item.productName}`}>#orderId_{item.productName}</Link>
                    </td>
                    <td className="p-4 font-bold text-[20px]">${item.price}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4 font-bold text-[20px]">${order.total}</td>
                    <td className="p-4 text-gray-600">{new Date(order.created).toLocaleDateString()}</td>
                    <td className="p-4 text-green-600 font-semibold">{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View for Orders */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md md:hidden">
          <h1 className="text-2xl font-bold mb-6">MY ORDERS ({orderItems.length})</h1>
          {orderItems.map((order) =>
            order.items.map((item) => (
              <div key={item.id} className="flex flex-col border-b pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                    {item.productName}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.productName}</h2>
                    <p className="text-gray-600 mt-1">${item.price} × {item.quantity}</p>
                    <p className="text-lg font-bold mt-1">${order.total}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <p><strong>Order Date:</strong> {new Date(order.created).toLocaleDateString()}</p>
                  <p className="text-green-600 font-semibold">{order.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Checkout Section */}
      <section className="bg-[#F6F4F0] py-3 mt-8">
        <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-2/3 lg:w-[1440px] xl:w-2/3">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">SPECIAL INSTRUCTIONS FOR SELLER</h2>
            <textarea
              className="w-full h-[130px] mt-6 p-4 border border-gray-300 bg-white outline-none resize-none"
              placeholder="Your message"
            />
          </div>
          <div className="p-1 rounded-lg">
            <div className="flex justify-between items-center pb-2 mb-2">
              <h3 className="text-sm font-semibold text-gray-700">SUBTOTAL</h3>
              <span className="text-lg font-bold">${subtotal}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">Shipping &amp; Taxes Calculated at Checkout</p>
            <button
              className="w-full bg-[#8b6f56] text-white font-semibold py-3 rounded-md hover:bg-[#755b44] transition"
              onClick={handleCheckoutClick}
            >
              CHECK OUT
            </button>
            <div className="border-b mt-4" />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {/* Payment Methods */}
              <img src="icons/Visa.png" className="h-10 object-contain" alt="Visa" />
              <img src="icons/Mastercard.png" className="h-10 object-contain" alt="Mastercard" />
              <img src="icons/Stripe.png" className="h-10 object-contain" alt="Stripe" />
              <img src="icons/AmazonPay.png" className="h-10 object-contain" alt="Amazon Pay" />
              <img src="icons/Alipay.png" className="h-10 object-contain" alt="Alipay" />
              <img src="icons/JCB.png" className="h-10 object-contain" alt="JCB" />
              <img src="icons/Skrill.png" className="h-10 object-contain" alt="Skrill" />
              <img src="icons/Payoneer.png" className="h-10 object-contain" alt="Payoneer" />
              <img src="icons/Affirm.png" className="h-10 object-contain" alt="Affirm" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Cart;
