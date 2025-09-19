import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { useCart } from '../CartContext';
import CartSummary from '../Components/Summary';
import { useUser } from '../UserContext';

const Checkout = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/cart");
  };
  //user into and delivery info
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
  //cart
  const { cartItems } = useCart();
  //
  return (
    <>
      <div className='pt-[150px]'>


        <>
          <Header />




          <section className="p-6">
            <h2 className="text-3xl font-bold mb-10 md:ms-40 mt-10">CHECKOUT DETAILS</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
              {/* left side start */}
              <div className=" bg-white p-8   border border-[#E9E2D8] shadow-md h-auto">
                {/* Contact Information */}
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
                <button className="w-full bg-[#AA8265] text-white p-3  font-semibold text-sm uppercase cursor-pointer"
                  onClick={() => navigate("/checkout-2")}>
                  Continue to Shipping
                </button>
              </div>
              {/* left side end */}
              <CartSummary shippingShow={false} selectedOption={false} handleTotal={handleTotal} />

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
                <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-end option">
                  <img src="images/big-shoes.png" alt="Shoes" className="w-250" />
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
    </>
  );
};

export default Checkout;
