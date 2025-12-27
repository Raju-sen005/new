import React from "react";
import { useSwipeable } from "react-swipeable";

const ThemeSlider = ({ themes = [], activeIndex = 0, setActiveIndex, goToPrev, goToNext }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext?.(),
    onSwipedRight: () => goToPrev?.(),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  if (!Array.isArray(themes) || themes.length === 0) return null;

  return (
    <div className="absolute bottom-[10px] left-0 right-0 z-50">
      <div
        className="group flex justify-center items-center gap-2 backdrop-blur-sm py-2 px-3 sm:py-3 sm:px-4 rounded-full w-[95%] sm:w-[85%] md:w-fit mx-auto transition-all duration-300"
        {...handlers}
      >
        {/* Prev button */}
        <button
          className="hidden sm:flex group-hover:flex bg-[#AA8265] cursor-pointer text-white w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full items-center justify-center hover:bg-[#8A6A53] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none shrink-0"
          onClick={goToPrev}
          aria-label="Previous theme"
        >
          <i className="bi bi-chevron-left text-xs sm:text-sm md:text-base"></i>
        </button>

        {/* Dots */}
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center flex-wrap justify-center">
          {themes.map((_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 focus:outline-none shrink-0
                ${activeIndex === index
                ? "bg-[#AA8265] w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4"
                : "bg-[#D6C9BD] hover:bg-[#C0B0A3] w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5"
              }`}
              onClick={() => setActiveIndex?.(index)}
              aria-label={`Go to theme ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          className="hidden sm:flex group-hover:flex bg-[#AA8265] cursor-pointer text-white w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full items-center justify-center hover:bg-[#8A6A53] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none shrink-0"
          onClick={goToNext}
          aria-label="Next theme"
        >
          <i className="bi bi-chevron-right text-xs sm:text-sm md:text-base"></i>
        </button>
      </div>
    </div>
  );
};

export default ThemeSlider;
