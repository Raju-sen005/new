import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ScrollReveal from "scrollreveal";
import { useCart } from "../CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductGrid from "../Components/Products";
import JewelryShop from "../Components/Header";
import ThemeSlider from "./ThemeSlider";
import Carousel from "../Components/Carousel";

const Index = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  let [allProducts, setallProducts] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for larger screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 items on tablets
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 items on smaller tablets
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show only 1 item on mobile
        },
      },
    ],
  };
  useEffect(() => {
    ScrollReveal().reveal(".my-element", {
      delay: 300,
      distance: "50px",
      origin: "left",
      duration: 800,
      easing: "ease-in-out",
    });
    ScrollReveal().reveal(".my-element1", {
      delay: 300,
      distance: "50px",
      origin: "right",
      duration: 800,
      easing: "ease-in-out",
    });
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-back",
    });

    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const { addToCart } = useCart(); // Use the cart context


  const safeParseArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return value
        .split(",")
        .map(v => v.trim())
        .filter(Boolean);
    }
  }
  return [];
};

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products/`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        const flattenedVariants = result.flatMap((product) =>
          product.ProductVariants.map((variant) => ({
            ...variant,
            categories: safeParseArray(variant.categories || "[]"),
            subCategories: safeParseArray(variant.subCategories || "[]"),
            themes: safeParseArray(variant.themes || "[]"),
            purposes: safeParseArray(variant.purposes || "[]"),
            festivals: safeParseArray(variant.festivals || "[]"),
            sizes: safeParseArray(variant.sizes || "[]"),
            metal: safeParseArray(variant.metal || "[]"),
            price: safeParseArray(variant.price || "[]"),
            productId: product.id,
          }))
        );
        setallProducts(flattenedVariants);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  //
  //all products featurs
  //
  return (
    <>
      <>
        <>
          <JewelryShop />

          {/* Add this div right after the header section to prevent content from going under the fixed header */}
          <div className="h-[120px] lg:block hidden" />
          <div className="h-[80px] lg:hidden block" />

          <section className="body-font md:mt-20 hidden lg:block">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentVideo * 100}%)` }}
              >
                {[
                  "/n-image/1st-Banner.mp4",
                  "/n-image/2nd-Banner.mp4",
                  "/n-image/3rd-Banner.mp4",
                  "/n-image/4th-Banner.mp4",
                ].map((src, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="mx-auto flex pt-6 md:flex-row flex-col items-center ps-8">
                      <div className="w-full">
                        <video
                          className="w-full h-[90%] object-cover "
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Prev Button */}
              <button
                onClick={() =>
                  setCurrentVideo((prev) => (prev === 0 ? 3 : prev - 1))
                }
                className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-[#AA8265] text-white rounded-full flex items-center justify-center hover:bg-opacity-80 z-10"
              >
                <i className="bi bi-chevron-left text-xs sm:text-sm md:text-base"></i>
              </button>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentVideo((prev) => (prev === 3 ? 0 : prev + 1))
                }
                className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-[#AA8265] text-white rounded-full flex items-center justify-center hover:bg-opacity-80 z-10"
              >
                <i className="bi bi-chevron-right text-xs sm:text-sm md:text-base"></i>
              </button>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideo(index)}
                    className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
                      currentVideo === index
                        ? "bg-[#AA8265] opacity-100"
                        : "bg-[#AA8265] opacity-50 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="block lg:hidden">
            <Carousel />
          </div>

          <section className="section-bg body-font text-white lg:h-45 lg:pt-4 md:pb-8 sm:pb-6 py-7">
            <div className="container px-5 mx-auto">
              <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-4 gap-10 pt-8">
                <div className="text-center">
                  <img
                    src="img/section-3 img1.png"
                    className="w-7 h-7 lg:w-10 lg:h-10 m-auto"
                    alt=""
                  />

                  <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-3">
                    <i>Satisfaction Guarantee</i>
                  </p>
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] hidden lg:block">
                    Non-conforming items can be <br /> returned within 7 days
                  </p>
                </div>

                <div className="text-center">
                  <img
                    src="img/diamond-ring.png"
                    className="w-7 h-7 lg:w-10 lg:h-10 m-auto"
                    alt=""
                  />

                  <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-3">
                    <i>Size Consultation</i>
                  </p>
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] hidden lg:block">
                    We can help you finding <br /> the right size
                  </p>
                </div>

                <div className="text-center">
                  <img
                    src="img/section-3 img3.png"
                    className="w-7 h-7 lg:w-10 lg:h-10 m-auto"
                    alt=""
                  />

                  <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-3">
                    <i>Easy Payment Options</i>
                  </p>
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] hidden lg:block">
                    Check out payment with your favourit method{" "}
                  </p>
                </div>

                <div className="text-center">
                  <img
                    src="img/section-3 img4.png"
                    className="w-7 h-7 lg:w-10 lg:h-10 m-auto"
                    alt=""
                  />

                  <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-3">
                    <i>On Time Shipping</i>
                  </p>
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] hidden lg:block">
                    Order will shipped on the same <br /> day
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container px-5 mx-auto">
              <div>
                <h2 className="lg:text-[40px] text-[#333333] font-semibold text-center pt-8">
                  Shop By Category
                </h2>
              </div>

              <div className="container mx-auto mt-10 lg:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4">
                  {/* Category 1 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/Ring.jpeg"
                      alt="Rings"
                      className="w-full sm:w-[80%] h-64 object-cover transition-transform duration-500 group-hover:scale-105 m-auto"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Rings
                      </h3>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/Charms.jpeg"
                      alt="Charms"
                      className="w-[72.5%] sm:w-[50.5%] h-64 object-cover transition-transform duration-500 group-hover:scale-105 m-auto"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Charms
                      </h3>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/Earrings.jpg"
                      alt="Earrings"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Earrings
                      </h3>
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/Bracelet.jpg"
                      alt="Bracelet"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Bracelet
                      </h3>
                    </div>
                  </div>

                  {/* Category 5 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/Necklace.jpeg"
                      alt="Necklace"
                      className="w-[70%] sm:w-[62.5%] h-64 object-cover transition-transform duration-500 group-hover:scale-105 m-auto"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Necklaces
                      </h3>
                    </div>
                  </div>

                  {/* Category 6 */}
                  <div
                    className="category-box overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/category")}
                  >
                    <img
                      src="/n-image/New-Arrivals.jpg"
                      alt="New Arrival"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        New Arrival
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-6 sm:py-8 md:py-10 relative z-10 overflow-hidden">
            <div className="container px-4 sm:px-5 mx-auto">
              <div>
                <h2 className="text-[24px] sm:text-[28px] md:text-[35px] lg:text-[40px] [#333333] font-semibold text-center pt-4 sm:pt-6 md:pt-8">
                  Shop By Theme
                </h2>
              </div>

              <div className="container mx-auto">
                <div
                  className="relative h-[450px] sm:h-[550px] md:h-[700px] lg:h-[900px]"
                  style={{ zIndex: 10 }}
                >
                  {(() => {
                    const [activeIndex, setActiveIndex] = useState(0);
                    const [radius, setRadius] = useState(1200);

                    const themes = [
                      { id: 1, image: "/n-image/01.jpg" },
                      { id: 2, image: "/n-image/02.jpg" },
                      { id: 3, image: "/n-image/03.jpg" },
                      { id: 4, image: "/n-image/04.jpg" },
                      { id: 5, image: "/n-image/05.jpg" },
                      { id: 6, image: "/n-image/06.jpg" },
                      { id: 7, image: "/n-image/07.jpg" },
                      { id: 8, image: "/n-image/08.jpg" },
                      { id: 9, image: "/n-image/09.jpg" },
                    ];

                    const theta = (2 * Math.PI) / themes.length;

                    useEffect(() => {
                      const handleResize = () => {
                        const width = window.innerWidth;
                        if (width < 640) setRadius(300);
                        else if (width < 768) setRadius(450);
                        else if (width < 1024) setRadius(800);
                        else setRadius(1200);
                      };

                      handleResize();
                      window.addEventListener("resize", handleResize);
                      return () =>
                        window.removeEventListener("resize", handleResize);
                    }, []);

                    const calculateStyles = (index) => {
                      const angle = theta * (index - activeIndex);
                      const x = radius * Math.sin(angle);
                      const z = radius * Math.cos(angle) - radius;
                      const scale = Math.max(0.6, (1500 + z) / 1500);
                      const opacity = Math.max(0.3, (1000 + z) / 1000);
                      const blur = Math.abs(angle) > 0.1 ? "blur(5px)" : "none";

                      const getDimensions = () => {
                        if (window.innerWidth < 640) {
                          return {
                            width: "240px",
                            marginLeft: "-120px",
                            marginTop: "-80px",
                          };
                        } else if (window.innerWidth < 768) {
                          return {
                            width: "300px",
                            marginLeft: "-150px",
                            marginTop: "-100px",
                          };
                        } else if (window.innerWidth < 1024) {
                          return {
                            width: "440px",
                            marginLeft: "-220px",
                            marginTop: "-140px",
                          };
                        }
                        return {
                          width: "580px",
                          marginLeft: "-290px",
                          marginTop: "-180px",
                        };
                      };

                      return {
                        transform: `perspective(1500px) translate3d(${x}px, 0, ${z}px) rotateY(${angle}rad) scale(${scale})`,
                        zIndex: Math.round(z + 1000),
                        opacity,
                        filter: blur,
                        position: "absolute",
                        left: "50%",
                        top: "26%",
                        ...getDimensions(),
                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform, opacity, filter",
                        border: "4px solid #AA8265",
                        borderRadius: "12px",
                      };
                    };

                    const goToNext = () =>
                      setActiveIndex((prev) => (prev + 1) % themes.length);
                    const goToPrev = () =>
                      setActiveIndex(
                        (prev) => (prev - 1 + themes.length) % themes.length
                      );

                    return (
                      <div className="container mx-auto">
                        <div
                          className="relative h-[450px] sm:h-[550px] md:h-[700px] lg:h-[900px]"
                          style={{ zIndex: 10 }}
                        >
                          <div className="relative h-full">
                            {themes.map((theme, index) => (
                              <div
                                key={index}
                                style={calculateStyles(index)}
                                className="shadow-lg rounded-lg overflow-hidden"
                              >
                                <img
                                  src={theme.image}
                                  alt={`Theme ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>

                          {/* ThemeSlider component call (pass correct props) */}
                          <ThemeSlider
                            themes={themes}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            goToPrev={goToPrev}
                            goToNext={goToNext}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container max-w-7xl px-5 mx-auto">
              <div>
                <h2 className="text-[40px] [#333333]  font-semibold text-center">
                  Wear it Your Way : From Desk To Dinner!
                </h2>
              </div>

              <div className="container mx-auto mt-10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6  mx-auto ">
                  {/* Office Wear */}

                  {/* Desktop image */}
                  <img
                    src="../images/wear-1.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/wear.m.1.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Daily Wear */}
                  {/* Desktop image */}
                  <img
                    src="../images/wear-2.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/wear.m.2.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Party Wear */}
                  <img
                    src="../images/wear-3.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/wear.m.3.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Traditional Wear */}
                  <img
                    src="../images/wear-4.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/wear.m.4.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container px-5 mx-auto ">
              <div>
                <h2 className="text-[40px] [#333333]  font-semibold text-center pt-8">
                  Celebrate in Style and Gift that Lasts
                </h2>
              </div>

              <div className="container max-w-7xl mx-auto mt-10 mb-16">
                <h3 className="text-xl lg:text-3xl font-semibold text-[#5B3E38] mb-8">
                  Festive Occasions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6  mx-auto">
                  {/* Christmas */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate(`/catalog-products`)} 
                  >
                    <div className="bg-[#F0F0FF] rounded-[40px_0px_40px_0px] flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Christmas.jpeg"
                          alt="Christmas"
                          className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 relative top-12"
                          style={{
                            height: "185px",
                            position: "relative",
                            top: "80px",
                          }}
                        />
                      </div>
                    </div>
                    <h4 className="text-xl text-center font-semibold text-[#5B3E38]">
                      Christmas
                    </h4>
                  </div>

                  {/* Halloween */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-[#FFE8E8] rounded-[40px_0px_40px_0px]  flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Halloween.jpeg"
                          alt="Halloween"
                          className="Halloween w-full h-[75%] object-contain transition-transform duration-300 hover:scale-110 relative top-10"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl text-center  font-semibold text-[#5B3E38]">
                      Halloween
                    </h4>
                  </div>

                  {/* Valentine's Day */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-[#E8FFE8] rounded-[40px_0px_40px_0px]  flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Valentine.jpeg"
                          alt="Valentine's Day"
                          className="Valentine w-full h-[60%] object-contain transition-transform duration-300 hover:scale-110 relative top-15"
                        />
                      </div>
                    </div>
                    <h4 className="text-center text-xl font-semibold text-[#5B3E38]">
                      Valentine's Day
                    </h4>
                  </div>

                  {/* Mother's Day */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-[#FFF8E8] rounded-[40px_0px_40px_0px]  flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Mother's Day.jpeg"
                          alt="Mother's Day"
                          className="Mother w-full h-[70%] object-contain transition-transform duration-300 hover:scale-110 relative top-10"
                        />
                      </div>
                    </div>
                    <h4 className="text-center text-xl font-semibold text-[#5B3E38]">
                      Mother's Day
                    </h4>
                  </div>

                  {/* Easter Day */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-[#E8F8FF] rounded-[40px_0px_40px_0px]  flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Easter Day.jpeg"
                          alt="Easter Day"
                          className="Easter w-full h-[60%] object-contain transition-transform duration-300 hover:scale-110 relative top-15"
                        />
                      </div>
                    </div>
                    <h4 className="text-center text-xl font-semibold text-[#5B3E38]">
                      Easter Day
                    </h4>
                  </div>

                  {/* Thanks Giving Day */}
                  <div
                    className="festive-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-[#fff6f1] rounded-[40px_0px_40px_0px]  flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-70 h-70 overflow-hidden">
                        <img
                          src="/n-image/Thanks Giving.jpeg"
                          alt="Thanks Giving Day"
                          className="Thanks w-full h-[55%] object-contain transition-transform duration-300 hover:scale-110 relative top-15"
                        />
                      </div>
                    </div>
                    <h4 className="text-center text-xl font-semibold text-[#5B3E38]">
                      Thanks Giving Day
                    </h4>
                  </div>
                </div>
              </div>

              <div className="container max-w-7xl  mx-auto mt-10 mb-16">
                <h3 className="text-xl lg:text-3xl font-semibold text-[#5B3E38] mb-8">
                  Personal Occasions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6  mx-auto">
                  {/* Engagement */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg  flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300 h-[208px]">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Engagement.jpg"
                          alt="Engagement Ring"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Engagement
                    </h4>
                  </div>

                  {/* Wedding */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Wedding.jpg"
                          alt="Wedding Ring"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-center text-[#5B3E38]">
                      Wedding
                    </h4>
                  </div>

                  {/* Birthday */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Birthday.jpg"
                          alt="Birthday Jewelry"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Birthday
                    </h4>
                  </div>

                  {/* Anniversary */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Anniversary.jpg"
                          alt="Anniversary Jewelry"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Anniversary
                    </h4>
                  </div>

                  {/* Baby Shower */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Baby Shower.jpg"
                          alt="Baby Shower Gift"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Baby Shower
                    </h4>
                  </div>

                  {/* House Warming */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/House Warming.jpg"
                          alt="House Warming Gift"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      House Warming
                    </h4>
                  </div>

                  {/* Retirement */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Retirement.jpg"
                          alt="Retirement Gift"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Retirement
                    </h4>
                  </div>

                  {/* Divorce */}
                  <div
                    className="personal-occasion cursor-pointer"
                    onClick={() => navigate("/catalog-products")}
                  >
                    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-40 mb-4 overflow-hidden">
                        <img
                          src="/n-image/Divorce.jpg"
                          alt="New Beginning Jewelry"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg text-center font-semibold text-[#5B3E38]">
                      Divorce
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container max-w-7xl px-5 mx-auto">
              <div>
                <h2 className="text-[40px] text-[#333333] font-semibold text-center pt-8">
                  Looking for which Style ?
                </h2>
              </div>

              <div className="container mx-auto mt-10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6  mx-auto">
                  {/* Office Wear */}
                  {/* Desktop image */}
                  <img
                    src="../images/lok.1.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/look.1.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Daily Wear */}
                  {/* Desktop image */}
                  <img
                    src="../images/lok.2.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/look.2.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Party Wear */}
                  {/* Desktop image */}
                  <img
                    src="../images/lok.3.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/look.3.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />

                  {/* Traditional Wear */}
                  {/* Desktop image */}
                  <img
                    src="../images/lok.4.jpg"
                    alt="Desktop Image"
                    className="hidden md:block w-full shadow-lg rounded-lg mb-4"
                  />

                  {/* Mobile image */}
                  <img
                    src="../images/look.4.jpg"
                    alt="Mobile Image"
                    className="block md:hidden w-full shadow-lg rounded-lg mb-4 mx-auto relative"
                    style={{ left: "179px" }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container px-5 mx-auto">
              <div>
                <h2 className="text-[40px] text-[#333333] font-semibold text-center pt-8">
                  Most Loved : Best Seller
                </h2>
              </div>
              <ProductGrid products={allProducts} />
            </div>
          </section>

          <section className="custom-design-section py-16 ">
            <div className="container px-5 mx-auto">
              <div className="text-center mb-12">
                <h2 className="lg:text-[40px] md:text-[30px] sm:text-[30px] font-semibold text-center">
                  How to Start Your Design
                </h2>
                <p className="text-[#5B3E38] mt-4 max-w-2xl mx-auto">
                  Turn your dream jewelry into reality with our custom design
                  service
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">
                <div className="design-process space-y-8 text-center">
                  <div className=" text-center ">
                    <h3 className="text-xl font-semibold text-[#5B3E38] mb-2">
                      Submit Your Jewelry Design
                    </h3>
                    <p className="text-gray-600">
                      Connect with a Specialist, We bring your dream to reality
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-[#5B3E38] mb-2">
                      Schedule a Consultation
                    </h3>
                    <p className="text-gray-600">
                      Book Virtual Appointment with our design experts
                    </p>
                  </div>

                  <button
                    className="relative cursor-pointer overflow-hidden group mt-6 px-14 py-3 bg-transparent border-2 border-[#537eb6] text-[#124068] rounded hover:text-white transition-colors duration-300 w-full md:w-auto"
                    onClick={() => navigate("/custom-design")}
                  >
                    <span className="relative z-10">SUBMIT YOUR DESIGN</span>
                    <span className="absolute top-0 left-0 w-0 h-full bg-[#4161b4] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>

                <div className="design-illustration">
                  <img
                    src="/img/jewelry-design-process.jpg"
                    alt="Jewelry Design Process"
                    className="pr w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="blog-section py-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#f8e5d8] opacity-50"></div>
            <div className="absolute top-40 -right-20 w-60 h-60 rounded-full bg-[#e8f0f9] opacity-40"></div>
            <div className="absolute -bottom-20 left-1/4 w-40 h-40 rounded-full bg-[#f0e8f9] opacity-30"></div>

            <div className="container px-5 mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-[40px] text-[#333333] font-semibold inline-block relative">
                  <span className="relative z-10">Our Blogs</span>
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    height="10"
                    viewBox="0 0 200 10"
                  >
                    <path
                      d="M0,5 Q40,0 80,5 T160,5 T240,5"
                      fill="none"
                      stroke="#AA8265"
                      strokeWidth="3"
                    />
                  </svg>
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
                {/* Blog Post 1 - Angled card design */}
                <div
                  className="blog-card flex-1 cursor-pointer"
                  onClick={() => navigate("/blog-details")}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="relative">
                      <img
                        src="/n-image/owl-8.png"
                        alt="March Birthstone Jewelry"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-30"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-[#5B3E38] mb-3">
                        10 Trendy Birthstone Jewelry Gifts For March-Borns
                      </h3>

                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-[#AA8265] font-medium">
                          Read article
                        </span>
                        <i className="bi bi-arrow-right text-[#AA8265]"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Post 2 - Angled in opposite direction */}
                <div
                  className="blog-card   flex-1 cursor-pointer"
                  onClick={() => navigate("/blog-details")}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="relative">
                      <img
                        src="/n-image/owl-9.png"
                        alt="Zodiac Jewelry"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-30"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-[#5B3E38] mb-3">
                        Zodiac Signs, Dates & Soulmates: Navigating Celestial
                        Connections
                      </h3>

                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-[#AA8265] font-medium">
                          Read article
                        </span>
                        <i className="bi bi-arrow-right text-[#AA8265]"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <button
                  className="relative cursor-pointer overflow-hidden group px-8 py-3 bg-transparent border-2 border-[#AA8265] text-[#AA8265] rounded-md font-medium hover:text-white transition-colors duration-300"
                  onClick={() => navigate("/blogs")}
                >
                  <span className="relative z-10">Read More</span>
                  <span className="absolute top-0 left-0 w-0 h-full bg-[#AA8265] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </section>

          <section className=" body-font">
            <div className="container py-15 px-5 mx-auto">
              <div className=" lg:w-1/1  mx-auto text-center">
                <h2 className=" lg:text-[40px] text-[#333333] font-bold">
                  LET COSTUMER SPEAKS FOR US
                </h2>
                <p className="pt-8">
                  {" "}
                  <i className="bi bi-star-fill text-[#FBD128]" />
                  <i className="bi bi-star-fill text-[#FBD128] mx-2" />
                  <i className="bi bi-star-fill text-[#FBD128] " />
                  <i className="bi bi-star-fill text-[#FBD128] mx-2" />
                  <i className="bi bi-star-fill text-[#FBD128]" />
                </p>
                <p className="font-normal text-black py-2 lg:text-[24px] md:text-[24px] sm:text-[14px]">
                  Perfect Fit and Incredible Quality!
                </p>
                <p className="lg:text-[36px] md:text-[48px] sm:text-[24px]">
                  <i>
                    I had made a rather complicated personalization request
                    where the order had one size and metal but I wanted the
                    included band to be a different size and different metal.
                    Jennie fulfilled it perfectly and as a result the ring was a
                    perfect fit on me as was the matching band on my spouse.
                    Order arrived quickly and was safely and securely packaged.
                    Would absolutely order from here again.
                  </i>
                </p>
                <p className="font-bold pt-6 text-[#855A49]">
                  ——— Ethan J., Verified Customer
                </p>
                <p className="text-gray-500 ">Verified Customer</p>
              </div>
            </div>
          </section>
        </>

        {/* footer section */}
        <Footer />
      </>
    </>
  );
};

export default Index;
