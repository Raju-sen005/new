import React, { useEffect } from 'react';
import slide1 from '../assets/new-images/Beauty-1.gif';
import slide2 from '../assets/new-images/Beauty-2.gif';
import slide3 from '../assets/new-images/Beauty-3.gif';
import slide4 from '../assets/new-images/Beauty-4.gif'; 

const Carousel = () => {
  useEffect(() => {
    const owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
    });

    $('.play').on('click', function () {
      owl.trigger('play.owl.autoplay', [1000]);
    });
    $('.stop').on('click', function () {
      owl.trigger('stop.owl.autoplay');
    });

    return () => {
      owl.trigger('destroy.owl.carousel');
    };
  }, []);

  return (
    <div>
      <div className="owl-carousel owl-theme">
        <div className="item"><img src={slide1} alt="1" /></div>
        <div className="item"><img src={slide2} alt="2" /></div>
        <div className="item"><img src={slide3} alt="3" /></div>
        <div className="item"><img src={slide4} alt="4" /></div>
      </div>
      
    </div>
  );
};

export default Carousel;
