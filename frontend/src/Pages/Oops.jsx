import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Oops = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className='pt-[150px]'>
        <Header />

        {/* section-1 */}
        <div className=" flex items-center justify-center my-10">
          <div className="text-center">
            <img
              className="w-[320px] sm:w-[639px] mx-auto"
              src="images/Frame 330.png"
              alt=""
            />
            <p className="sm:text-[86px] text-[48px] text-[#121212] mt-4">
              <i>
                Oh no? <span className="text-[#AA8265]">Error 404</span>
              </i>
            </p>
            <p className="text-[16px] text-[#5B3E38] mt-2">
              We can't seem to find the page you are looking for
            </p>
            <Link
              href="#"
              className="mt-6 inline-block bg-[#AA8265] text-white px-6 py-2 text-[12px] sm:text-[16px]  hover:bg-blue-600 transition duration-300"
            >
              BACK TO MAIN PAGE
            </Link>
          </div>
        </div>

        {/* footer section */}
        <Footer />
      </div>

    </>
  );
};

export default Oops;
