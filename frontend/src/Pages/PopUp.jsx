import React from 'react';
import { Link } from 'react-router-dom';

const PopUp = () => {
  const discountCode = "WELCOME10";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discountCode);
    alert("Discount code copied!");
  };
  return (
    <>
      <section className="back">
        <div className="flex max-w-4xl mx-auto  justify-center lg:py-25 md:py-75 sm:py-10">
          <div className="rounded bg-[#F6F4F0] pt-4 flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="md:w-1/2 p-6 flex flex-col h-125 bg-[#F6F4F0]">
              <h1 className="text-[50px] font-semibold">
                Welcome to <span className="italic text-[#AA8265]">ManStyle Co.</span>
              </h1>
              <p className="mt-5 text-[14px] text-[#AA8265] w-70">
                “Step into a world of sophistication with tailored designs that
                redefine comfort and enhance confidence. Discover timeless pieces
                crafted for every occasion.”
              </p>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 p-6 rounded pt-9 flex flex-col lg:bg-[#F6F4F0] bg-white overflow-hidden">
              <h2 className="text-[24px] font-bold">
                Get 10% Off <br /> Your First Purchase
              </h2>
              <p className="mt-2 text-[#AA8265]">Use code below at checkout.</p>

              {/* Discount Code Input with Copy Button */}
              <div className="flex mt-14">
                <input
                  type="text"
                  value={discountCode}
                  readOnly
                  className="rounded w-full border border-gray-400 py-2 px-3 font-bold text-[16px]"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-[#F6F4F0] border border-gray-400 py-3 rounded ms-2 px-3 cursor-pointer"
                >
                  <img src="icon/ico1.png" alt="Copy Icon" />
                </button>
              </div>

              {/* Shop Now Button */}
              <div>
                <Link to={"/"}
                  href="#"
                  className="mt-4 flex bg-[#AA8265] justify-center text-white py-2 font-semibold rounded"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default PopUp;
