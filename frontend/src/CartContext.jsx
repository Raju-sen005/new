import { createContext, useState, useEffect, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper function to sanitize prices/metals
  const parseJSONSafe = (str) => {
    if (!str) return [];
    try {
      // Handle double-stringified JSON
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

const addToCart = async (itemId, variantId, size, metalIndex) => {
  console.log("👉 Adding to cart:", { itemId, variantId, size, metalIndex });

  if (!variantId) return console.error("❌ Variant ID missing!");

  try {
    const response = await fetch(`${url}/products/${itemId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const itemData = await response.json();
    const variant = itemData?.ProductVariants?.[0];

    if (!variant) return console.error("❌ No variant found!");

    // Safe parsing with defaults
    const prices = Array.isArray(variant.price)
      ? variant.price
      : variant.price
      ? JSON.parse(variant.price)
      : [0];

    const metals = Array.isArray(variant.metal)
      ? variant.metal
      : variant.metal
      ? JSON.parse(variant.metal)
      : ["DefaultMetal"];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (c) => c.id === variantId && c.sizes === size && c.metal === metals[metalIndex]
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          ...itemData,
          id: variantId,
          productId: itemId,
          sizes: size,
          price: parseFloat(prices[metalIndex]) || 0,
          metal: metals[metalIndex] || "DefaultMetal",
          quantity: 1,
          metals,
        },
      ];
    });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
  }
};



  const updateFromCart = (itemId, sizes, metal) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId && item.sizes === sizes && item.metal === metal
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  
  const removeFromCart = (itemId, size, metal) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.sizes === size && item.metal === metal)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, updateFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
