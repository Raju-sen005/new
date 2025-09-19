import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CartSummary from '../Components/Summary';
import { useUser } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useCart } from '../CartContext';
const Checkout3 = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL

  const handleRedirect = () => {
    navigate("/cart");
  };
  //user into and delivery info
  let { cartItems, clearCart } = useCart()
  const { userInfo, setUserInfo, shippingAddress, setShippingAddress } = useUser();

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  let [total, setTotal] = useState()

  let handleTotal = (tot) => {
    setTotal(tot)
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const toggleContactEdit = () => {
    setIsEditingContact(!isEditingContact);
  };

  const toggleAddressEdit = () => {
    setIsEditingAddress(!isEditingAddress);
  };
  //
  //shipping
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(shippingData.methods[0]?.id);
  const selectedMethod = shippingData.methods.find((method) => method.id === selectedOption);
  //
  //

  const handleOrder = async () => {
    const orderItems = cartItems.map((item) => ({
      productName: (item.id).toString(),      // use product ID
      quantity: item.quantity, // from cart
      price: item.price,
      metal:item.metal,
      productId: item.productId.toString(),
      size: item.sizes      // from cart
    }));
    //
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    
    const orderData = {
      customerId: user.id,
      customerName: user.firstName + user.lastName,
      orderCustomer: userInfo,
      shippingAddress: shippingAddress,
      date: new Date(),
      status: 'Pending',
      total: total,
      items: orderItems,
    };
    console.log(orderData);

    try {
      const token = Cookies.get("accessToken"); // Get token from cookies
      const response = await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Pass token here
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('🎉 Order placed successfully!');

        clearCart()
        //localStorage.removeItem("cartItems"); // clear from localStorage if used

      } else {
        toast.error('❌ Failed to place order.');
        console.error('Error creating order:', data);
      }
    } catch (error) {
      toast.error('🚫 Network error while placing order.');
      console.error('Network error:', error);
    }
  };

  //
  return (
    <>
      <div className='pt-[150px]'>


        <>
          <Header />

          {/* <div className="bg-[#F6F4F0] py-6 flex ">
            <div className=" lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex lg:space-x-14 md:space-x-9 space-x-6   flex-wrap">
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  SHIRTS <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Shirts
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Shirts
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  T-SHIRTS <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Graphic Tees
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Plain Tees
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  BLAZERS <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Blazers
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Blazers
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  SUITS <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Shirts
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Shirts
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  POLO <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Graphic Tees
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Plain Tees
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  KNITWEAR <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Blazers
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Blazers
                  </Link>
                </div>
              </div>
              <div className="relative group xl:hidden">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  MORE
                  <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Blazers
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Blazers
                  </Link>
                </div>
              </div>
              <div className="relative group hidden xl:block ">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  PANTS <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Shirts
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Shirts
                  </Link>
                </div>
              </div>
              <div className="relative group hidden xl:block">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  UNDERWEAR <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Graphic Tees
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Plain Tees
                  </Link>
                </div>
              </div>
              <div className="relative group hidden xl:block">
                <button className="text-[#5B3E38] text-[14px] md:text-[16]">
                  ACCESSORI
                  <i className="bi bi-chevron-down" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-2 w-40">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Formal Blazers
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                    Casual Blazers
                  </Link>
                </div>
              </div>
            </div>
          </div> */}


          <section className="p-6">
            <h2 className="font-bold mb-10 md:ms-40 mt-10 text-3xl">
              CHECKOUT DETAILS
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-md shadow-md md:col-span-2 border border-[#E9E2D8] h-full">
                {/* left side one */}
                <div className="p-4 mb-4 rounded-md border border-[#E9E2D8]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex gap-4 items-center text-2xl">
                      <img src="icon/one.png" alt="icon" /> Contact Information
                    </h3>
                    <button
                      className="text-sm text-gray-500 hover:underline cursor-pointer"
                      onClick={toggleContactEdit}
                    >
                      {isEditingContact ? "SAVE" : "EDIT"}
                    </button>
                  </div>

                  {isEditingContact ? (
                    <div className="mt-2 ms-[10%] space-y-2">
                      <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleContactChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleContactChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Email Address"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleContactChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Phone Number"
                      />
                    </div>
                  ) : (
                    <p className="text-[#AA8265] text-sm mt-1 ms-[10%]">
                      {userInfo.name}, {userInfo.email}, {userInfo.phone}
                    </p>
                  )}
                </div>

                {/* Shipping Address */}
                <div className="p-4 mb-4 rounded-md border border-[#E9E2D8]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex items-center gap-4 text-2xl">
                      <img src="icon/one.png" alt="icon" />
                      Shipping Address
                    </h3>
                    <button
                      className="text-sm text-gray-500 hover:underline cursor-pointer"
                      onClick={toggleAddressEdit}
                    >
                      {isEditingAddress ? "SAVE" : "EDIT"}
                    </button>
                  </div>

                  {isEditingAddress ? (
                    <form className="space-y-4 mt-2 ms-[10%]">
                      <input
                        type="text"
                        name="name"
                        value={shippingAddress.name}
                        onChange={handleAddressChange}
                        placeholder="Enter Name"
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                      <input
                        type="text"
                        name="company"
                        value={shippingAddress.company}
                        onChange={handleAddressChange}
                        placeholder="Company (optional)"
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                      <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        placeholder="Address"
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleAddressChange}
                          placeholder="Country"
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                        <input
                          type="text"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleAddressChange}
                          placeholder="State"
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                        <input
                          type="text"
                          name="zip"
                          value={shippingAddress.zip}
                          onChange={handleAddressChange}
                          placeholder="ZIP code"
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </div>
                      <input
                        type="text"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleAddressChange}
                        placeholder="Phone number"
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </form>
                  ) : (
                    <div className="text-[#AA8265] text-sm mt-1 ms-[10%]">
                      <p>{shippingAddress.name}</p>
                      {shippingAddress.company && <p>{shippingAddress.company}</p>}
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}</p>
                      <p>{shippingAddress.country}</p>
                      <p>Phone: {shippingAddress.phone}</p>
                    </div>
                  )}
                </div>
                {/* shipping system */}
                <div className="p-4 mb-4 rounded-md border border-[#E9E2D8]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex items-center gap-4 text-xl">
                      <img src="icon/three.png" alt="" /> Shipping Method
                    </h3>
                    <button
                      className="text-sm bg-[#F6F4F0] border-[#E9E2D8] text-[#906951] font-medium border p-1 px-3 cursor-pointer"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "SAVE" : "EDIT"}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="mt-4 space-y-3">
                      {shippingData.methods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex justify-between items-center border p-3 cursor-pointer border-[#E9E2D8] ${selectedOption === method.id ? "bg-[#F6F4F0]" : ""
                            }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="shipping"
                              className="mr-2 text-brown-600"
                              checked={selectedOption === method.id}
                              onChange={() => setSelectedOption(method.id)}
                            />
                            <div>
                              <p className="font-semibold">{method.name}</p>
                              <p className="text-sm text-[#AA8265]">{method.delivery}</p>
                            </div>
                          </div>
                          <span className="font-bold">{method.price}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="ms-[10.5%] text-sm text-[#AA8265]">
                      {selectedMethod?.name} ({selectedMethod?.delivery})
                    </p>
                  )}
                </div>

                {/* left side one */}
                {/* <div className="p-4 ">
                  <h3 className="font-semibold flex items-center  text-xl gap-4">
                    <img src="icon/four.png" alt="" />
                    Payment
                  </h3>
                  <div className="mt-4 space-y-3 bg-[#F6F4F0] ">
                    <label className="block border border-[#E9E2D8] p-4  cursor-pointer ">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="payment"
                          className="text-brown-600"
                          defaultChecked=""
                        />
                        <p className="font-semibold ">Credit or Debit Card</p>
                      </div>
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          placeholder="Card number"
                          className="w-full p-2 border  border-[#E9E2D8] text-[#AA8265]  bg-white text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Name on card"
                          className="w-full p-2 border  border-[#E9E2D8] text-[#AA8265]  bg-white text-sm"
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Expiration date"
                            className="w-1/2 p-2 border  border-[#E9E2D8] text-[#AA8265] bg-white text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Security code"
                            className="w-1/2 p-2 border  border-[#E9E2D8] text-[#AA8265] bg-white text-sm"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                  <label className="block border p-4  border-[#E9E2D8] cursor-pointer flex items-center space-x-2 mt-4">
                    <input type="radio" name="payment" className="text-brown-600" />
                    <p className="font-semibold">Paypal</p>
                  </label>
                </div> */}
                <button className="w-full bg-[#AA8265] text-white p-3   font-semibold text-sm uppercase cursor-pointer"
                  onClick={() => handleOrder()}>
                  ORDER NOW
                </button>
              </div>
              {/* right side section */}
              <CartSummary shippingShow={true} selectedOption={selectedOption} handleTotal={handleTotal} />
              {/* <div className=" p-6  shadow-md bg-[#F6F4F0] h-[950px]">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">3 Items</h3>
                  <button className="text-sm bg-[#F6F4F0] border-[#E9E2D8] text-[#906951] font-medium  border p-1 px-3 cursor-pointer"
                    onClick={() => navigate("/cart")}>
                    EDIT
                  </button>
                </div>
                <div className="mt-4 space-y-4 ">
                  <div className="flex items-center space-x-4 space-y-4">
                    <img src="images/cont-pic-1.png" className=" bg-white" />
                    <div className="flex-1">
                      <p className="font-semibold">$149.99</p>
                      <p className="text-gray-600 text-sm">
                        Premium Brown Double-Breasted Tailored Blazer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-y-4">
                    <img src="images/con-fpic-2.png" className="" />
                    <div className="flex-1">
                      <p className="font-semibold">$69.99</p>
                      <p className="text-gray-600 text-sm">
                        Signature Crisp White Tailored Oxford Shirt
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-y-4">
                    <img src="images/con-pic-3.png" className="" />
                    <div className="flex-1">
                      <p className="font-semibold">
                        $74.99{" "}
                        <span className="line-through text-gray-400">$64.99</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        Slim Fit Black Stretch Chino Pants
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-[#E9E2D8] pt-10">
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                      type="text"
                      placeholder="DISCOUNT CODE"
                      className="p-3 border border-[#E9E2D8] bg-white text-sm w-full md:w-auto text-center"
                    />
                    <button className="bg-[#8B5E3C] text-white px-9 py-3 text-sm font-semibold cursor-pointer w-full md:w-auto">
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-[#E9E2D8] pt-6 ">
                  <div className="flex justify-between text-gray-700 mt-6 space-y-2">
                    <p>Subtotal</p>
                    <p className="font-bold">$294.97</p>
                  </div>
                  <div className="flex justify-between text-gray-700 space-y-2">
                    <p>Shipping</p>
                    <p className="font-bold">$19.99</p>
                  </div>
                  <div className="flex justify-between text-gray-700 mb-10 space-y-2">
                    <p>Taxes</p>
                    <p className="font-bold">$2.9</p>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-[#E9E2D8] pt-16">
                    <p>Total to pay</p>
                    <p>$317.86</p>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
          <section className="footer-section  bg-cover 2xl:countainer md:px-10 px-4 ">
            <div className="w-full ">
              <div className="max-w-7xl mx-auto px-6 py-7 lg:flex lg:items-center">
                <div className="lg:w-1/2 space-y-3">
                  <h2 className=" sm:text-[36px] text-[27px] font-bold text-white">
                    STAY IN THE KNOW
                  </h2>
                  <p className="text-gray-300 text-[15px] sm:text-[20px] sm:w-lg">
                    Subscribe for the latest updates, exclusive offers, and latest
                    arrivals.
                  </p>
                  <div className="flex flex-col flex-row gap-5 sm:mt-8 ">
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="px-2 py-1 sm:px-4 sm:py-3 w-full sm:w-86 text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400 text text-center text-[12px] sm:text-[16px]"
                    />
                    <button className="text-[12px] sm:text-[16px] bg-[#aa8265] text-white px-8 py-3  font-semibold hover:bg-[#876348] transition">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="bg-[#121212] text-white py-10 items-center ">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:inline-block lg:flex ">
                <div className=" text-center lg:hidden ">
                  <h2 className="text-15px sm:text-[20px] font-semibold">
                    Accepted Payments
                  </h2>
                  <div className="flex flex-wrap gap-3 place-content-center mt-3">
                    <img
                      src="icon/Visa.png"
                      alt="Visa"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Mastercard.png"
                      alt="Mastercard"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Stripe.png"
                      alt="Stripe"
                      className="h-9 w-14  sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/AmazonPay.png"
                      alt="Amazon Pay"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Alipay.png"
                      alt="Alipay"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/JCB.png"
                      alt="JCB"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Skrill.png"
                      alt="Skrill"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Payoneer.png"
                      alt="Payoneer"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                    <img
                      src="icon/Affirm.png"
                      alt="Affirm"
                      className="h-9 w-14 sm:h-10 sm:w-16"
                    />
                  </div>
                </div>
                <div className=" md:flex justify-between md:mt-10 xl:gap-16  ">
                  <div className=" ">
                    <h2 className="text-[24px] sm:text-[32px] font-semibold">
                      ManStyle Co.
                    </h2>
                    <p className="mt-2 text-[#B0B0B0] text-[12px] sm:text-[14px] lg:text-[16px] md:w-76">
                      Explore a wardrobe designed to elevate your everyday style and
                      empower you to leave a lasting impression—because you deserve
                      nothing less than the finest.
                    </p>
                  </div>
                  <div className=" text-center option  ">
                    <h2 className="text-15px sm:text-[21px] font-semibold">
                      Accepted Payments
                    </h2>
                    <div className="flex flex-wrap gap-3 place-content-center mt-3 lg:w-112">
                      <img
                        src="icon/Visa.png"
                        alt="Visa"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Mastercard.png"
                        alt="Mastercard"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Stripe.png"
                        alt="Stripe"
                        className="h-9 w-14  xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/AmazonPay.png"
                        alt="Amazon Pay"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Alipay.png"
                        alt="Alipay"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/JCB.png"
                        alt="JCB"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Skrill.png"
                        alt="Skrill"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Payoneer.png"
                        alt="Payoneer"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                      <img
                        src="icon/Affirm.png"
                        alt="Affirm"
                        className="h-9 w-14 xl:h-10 xl:w-16"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0 xl:gap-16  xl:ms-[46px] ">
                    <div className="lg:gap-16">
                      <h2 className="sm:text-[20px] font-semibold text-[#F6F4F0]">
                        Categories
                      </h2>
                      <ul className="mt-2 space-y-1">
                        <li>
                          <Link to={"/"}
                            className="text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            Shop
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}
                            className="text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            Sale
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}
                            className="text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            New Arrivals
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:gap-10">
                      <h2 className="sm:text-[20px] font-semibold text-[#F6F4F0]">
                        Information
                      </h2>
                      <ul className="mt-2 space-y-1">
                        <li>
                          <Link to={"/"}
                            className=" text-[#B0B0B0] hover:text-[#fff] border-b  text-[12px] sm:text-[16px]"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"}
                            className=" text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}
                            className=" text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}
                            className=" text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                          >
                            Returns Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 text-center border-t-2 border-[#B0B0B0] pt-4">
                <p className="text-[#B0B0B0]">
                  © 2024 <span className="font-semibold">ManStyle Co.</span> All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </footer>
        </>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Checkout3;
