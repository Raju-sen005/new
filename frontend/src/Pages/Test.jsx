import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Test = () => {
    
    const [selectedGem, setSelectedGem] = useState(null);


const gemstones = [
        { name: "Alexandrite", image: "images/Alexandrite.jpg" },
        { name: "Amethyst", image: "images/Amethyst.jpg" },
        { name: "Black Onyx", image: "images/Black-Onyx.jpg" },
        { name: "Blue Sandstone", image: "images/Blue-Sandstone.jpg" },
        { name: "Citrine", image: "images/Citrine.jpg" },
        { name: "Emerald", image: "images/emerald.jpg" },
        { name: "Garnet", image: "images/Garnet.jpg" },
        { name: "Iolite", image: "images/Iolite.jpg" },
        { name: "Labradorite", image: "images/Labradorite.jpg" },
        { name: "Blue Topaz", image: "images/London-Blue-Topaz.jpg" },
        { name: "Ruby", image: "images/ruby.jpg" },
        { name: "Turquoise", image: "images/Turquoise.jpg" },
        { name: "Moissanite", image: "images/Moissanite.jpg" },
        { name: "Moonstone", image: "images/Moonstone.jpg" },
        { name: "Morganite", image: "images/Morganite.jpg" },
        { name: "Moss Agate", image: "images/Moss-Agate.jpg" },
        { name: "Opal", image: "images/Opal.jpg" },
        { name: "Pearl", image: "images/Pearl.jpg" },
        { name: "Peridot", image: "images/Peridot.jpg" },
        { name: "Pink Tourmaline", image: "images/Pink-Tourmaline.jpg" },
        { name: "Rutile", image: "images/Rutile.jpg" },
        { name: "Sapphire", image: "images/Sapphire.jpg" },
        { name: "Tanzanite", image: "images/Tanzanite.jpg" },
    ];


  const images = [
    "images/product-1.png",
    "images/product-1.png",
    "images/product-1.png",
    "images/product-1.png",
    "images/product-1.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSlider = useRef(null); // 👈 Reference to main slider

  const mainSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const thumbSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 p-4">
          {/* Main Slider */}
          <Slider ref={mainSlider} {...mainSettings} className="main-carousel m-auto">
            {images.map((src, index) => (
              <div key={`main-${index}`}>
                <img src={src} alt={`Product ${index + 1}`} className="w-full rounded" />
              </div>
            ))}
          </Slider>

          {/* Thumbnail Slider */}
          <Slider {...thumbSettings} className="thumbnail-carousel mt-4 m-auto">
            {images.map((src, index) => (
              <div key={`thumb-${index}`} className="px-1">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => mainSlider.current.slickGoTo(index)} 
                  className={`w-20 h-20 object-cover cursor-pointer mx-auto border-2 rounded transition-all duration-200 ${currentSlide === index
                    ? "border-pink-500"
                    : "border-transparent"
                    }`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-1/2 p-4">
                  <h2 id="popup-title" className="text-3xl font-semibold mt-4 mb-5">Aquamarine and Diamond Ring</h2>
                   <div className="flex items-center mt-2">
                     <div className="flex">
                           {/* <!-- Star ratings --> */}
                           <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                               <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            {/* <!-- Repeat for 5 stars --> */}
                        </div>
                        <span className="text-red-500 ml-2">20 products sold in last 7 hours</span>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold">Estimated Delivery Time</h3>
                        <div className="flex items-center mt-2 relative">
                            <div className="relative flex items-center w-80">
                                <input type="text" id="pincode-input" placeholder="302005"
                                    className="border rounded-l p-2 w-full" />
                                <button className="bg-pink-600 text-white px-4 py-2 rounded-r border border-pink-600"
                                    onclick="checkPincode()">Check</button>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-3 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                            </svg>
                            Free Delivery by Monday, 31st March.
                        </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center">
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                6-Month Warranty
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                                </svg>
                                Easy 30 Day Return
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Lifetime Plating
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                925 Fine Silver
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">




                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-2">Gemstone</h3>
                            <div className="flex flex-wrap gap-2">
                                {gemstones.map((gem) => (
                                    <button
                                        key={gem.name}
                                        onClick={() => setSelectedGem(gem.name)}
                                        className={`material-btn border p-2 rounded text-[12px] ${selectedGem === gem.name ? "border-pink-500" : "border-gray-300"
                                            }`}
                                    >
                                        <img src={gem.image} className="w-10 h-10 m-auto" alt={gem.name} />
                                        {gem.name}
                                    </button>
                                ))}
                            </div>
                        </div>




                        {/* <!-- Material Selection --> */}

                        <div className="mb-4 mt-7">
                            <h3 className="text-sm font-semibold mb-2">MATERIAL</h3>
                            <div className="flex flex-wrap gap-2">
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">925
                                    Sterling Silver</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">10K Rose
                                    Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">10K
                                    Yellow Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">10K
                                    White Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">14K Rose
                                    Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">14K
                                    Yellow Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">14K
                                    White Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">18K Rose
                                    Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">18K
                                    Yellow Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">18K
                                    White Gold</button>
                                <button onclick="selectMaterial(this)"
                                    className="material-btn px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Black
                                    Gold</button>
                            </div>
                        </div>





                        {/* <!-- Size Selection --> */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-2">Size</h3>
                            <select
                                className="w-50 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                                onchange="selectSize(this)">
                                <option value="3US">3US</option>
                                <option value="4US">4US</option>
                                <option value="5US">5US</option>
                                <option value="6US">6US</option>
                                <option value="7US">7US</option>
                                <option value="8US">8US</option>
                                <option value="9US">9US</option>
                                <option value="10US">10US</option>
                                <option value="11US">11US</option>
                                <option value="12US">12US</option>
                                <option value="13US">13US</option>
                                <option value="14US">14US</option>
                                <option value="15US">15US</option>
                                <option value="16US">16US</option>
                            </select>
                        </div>


                        <div className="my-3">
                            <h3 className="text-black font-medium text-[15px]">Add your Personalization (optional)</h3>
                            <p className="text-gray-500 text-[13px] mb-2">Personalization:- Name, Date or Personalized Message</p>
                            <input className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />

                        </div>

                        {/* <!-- Gift Wrap Option --> */}
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="gift-wrap" className="mr-2" />
                            <label for="gift-wrap" className="text-sm">Add gift wrap to your order (₹50)</label>
                        </div>

                        {/* <!-- Action Buttons --> */}
                        <div className="flex space-x-4 mb-4">
                            <button
                                className="bg-white text-black border border-pink-300 px-4 py-3 rounded hover:bg-pink-100 hover:scale-105 transition duration-300">Buy
                                Now</button>
                            <button
                                className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600 hover:scale-105 transition duration-300">Add
                                to Cart</button>
                            <button id="wishlist-btn" onclick="toggleWishlist()"
                                className="text-black hover:scale-105 transition duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
      </div>
    </section>
  );
};

export default Test;
