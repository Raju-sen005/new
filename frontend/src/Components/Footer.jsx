import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <section className="footer-section  bg-cover 2xl:countainer md:px-10 px-4 ">
                <div className="w-full ">
                    <div className="max-w-7xl mx-auto px-6 py-7 lg:flex lg:items-center ">
                        <div className="lg:w-1/2 space-y-3">
                            <h2 className=" sm:text-[36px]  text-[27px] font-bold text-white">
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
                                <button className="text-[12px] sm:text-[16px] bg-[#aa8265] text-white px-8 py-3  font-semibold hover:bg-[#876348] transition cursor-pointer">
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
                        {/* Accepted Payments for sm */}
                        <div className=" text-center lg:hidden ">
                            <h2 className="text-15px sm:text-[20px] font-semibold">
                                Accepted Payments
                            </h2>
                            <div className="flex flex-wrap gap-3 place-content-center mt-3">
                                <img
                                    src="/icons/Visa.png"
                                    alt="Visa"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Mastercard.png"
                                    alt="Mastercard"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Stripe.png"
                                    alt="Stripe"
                                    className="h-9 w-14  sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/AmazonPay.png"
                                    alt="Amazon Pay"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Alipay.png"
                                    alt="Alipay"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/JCB.png"
                                    alt="JCB"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Skrill.png"
                                    alt="Skrill"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Payoneer.png"
                                    alt="Payoneer"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                                <img
                                    src="/icons/Affirm.png"
                                    alt="Affirm"
                                    className="h-9 w-14 sm:h-10 sm:w-16"
                                />
                            </div>
                        </div>
                        <div className=" md:flex justify-between md:mt-10 xl:gap-16  ">
                            <div className=" ">
                                <h2 className="text-[24px] sm:text-[32px] font-semibold text-[#F6F4F0]">
                                    Vinston Designs
                                </h2>
                                <p className="mt-2 text-[#B0B0B0] text-[12px] sm:text-[14px] lg:text-[16px] md:w-76 mb-4">
                                    Explore a wardrobe designed to elevate your everyday style and
                                    empower you to leave a lasting impression—because you deserve
                                    nothing less than the finest.
                                </p>
                                <span className="space-x-2">
                                    <i className="bi text-[20px] bi-instagram" />
                                    <i className="bi text-[20px] bi-pinterest" />
                                    <i className="bi text-[20px] bi-facebook" />
                                </span>
                            </div>
                            {/* Accepted Payments for lg  */}
                            <div className=" text-center option  ">
                                <h2 className="text-15px sm:text-[21px] font-semibold">
                                    Accepted Payments
                                </h2>
                                <div className="flex flex-wrap gap-3 place-content-center mt-3 lg:w-112">
                                    <img
                                        src="/icons/Visa.png"
                                        alt="Visa"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Mastercard.png"
                                        alt="Mastercard"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Stripe.png"
                                        alt="Stripe"
                                        className="h-9 w-14  xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/AmazonPay.png"
                                        alt="Amazon Pay"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Alipay.png"
                                        alt="Alipay"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/JCB.png"
                                        alt="JCB"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Skrill.png"
                                        alt="Skrill"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Payoneer.png"
                                        alt="Payoneer"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                    <img
                                        src="/icons/Affirm.png"
                                        alt="Affirm"
                                        className="h-9 w-14 xl:h-10 xl:w-16"
                                    />
                                </div>
                            </div>
                            {/* Categories & Information */}
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
                                            <Link to={"/about-us"}

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
                                            <Link to={"/terms-conditions"}

                                                className=" text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/privacy-policy"}

                                                className=" text-[#B0B0B0] hover:text-[#fff] border-b text-[12px] sm:text-[16px]"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */}
                    <div className="mt-4 text-center border-t-2 border-[#B0B0B0] pt-4">
                        <p className="text-[#B0B0B0]">
                            © 2025 <span className="font-semibold">Vinston Designs</span> All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer



