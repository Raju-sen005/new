import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const CartSummary = ({ selectedOption, handleTotal }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { cartItems } = useCart();

    const [discountAmount] = useState(0);

    const shippingData = {
        methods: [
            {
                id: "express",
                name: "Express",
                delivery: "Expected delivery: 1 - 2 days",
                price: "$19.99",
            },
            {
                id: "regular",
                name: "Regular",
                delivery: "Expected delivery: 3 - 5 days",
                price: "$9.99",
            },
        ],
    };

    // Get selected shipping method object
    const shippingMethod = shippingData.methods.find(method => method.id === selectedOption);

    // Group items by ID and calculate quantity properly
    const groupedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            acc.push({ ...item, quantity: item.quantity || 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = shippingMethod ? parseFloat(shippingMethod.price.replace("$", "")) : 0;
    const total = subtotal - discountAmount + shipping;
    handleTotal(total)

    return (
        <div className="p-10 mx-auto shadow-md bg-[#F6F4F0] lg:h-auto w-full max-w-md">
            <div className="flex justify-between items-center pb-4 mb-6">
                <h2 className="font-semibold text-lg">{groupedItems.length} Items</h2>
                <button
                    className="text-sm bg-[#F6F4F0] border-[#E9E2D8] text-[#906951] font-medium border p-1 px-3 cursor-pointer"
                    onClick={() => navigate("/cart")}
                >
                    EDIT
                </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-8">
                {groupedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                        <img src={url +"/uploads/" +item?.images[0]} className="w-20 h-20 bg-white" alt={item.title} />
                        <div>
                            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">{item.title}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="mt-10 border-t border-[#E9E2D8] pt-8 space-y-2 text-sm mb-10">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-bold">${subtotal.toFixed(2)}</p>
                </div>
                {shippingMethod && (
                    <div className="flex justify-between">
                        <div>
                            <p>Shipping ({shippingMethod.name})</p>
                            <p className="text-xs text-gray-500">{shippingMethod.delivery}</p>
                        </div>
                        <p className="font-bold">{shippingMethod.price}</p>
                    </div>
                )}
            </div>

            {/* Total Amount */}
            <div className="flex justify-between font-bold text-lg border-t border-[#E9E2D8] mt-10">
                <p className="mt-10">Total to pay</p>
                <p className="mt-10">${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartSummary;
