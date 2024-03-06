// TestimonialCarousel.js (React Component)

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import aboutImg from "../images/about.png";
import { FaStar } from "react-icons/fa";
import { format } from 'date-fns';



const TestimonialCarousel = ({ review }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const testimonialData = review.map((item, index) => ({
    id: index + 1,
    name: item.fullName,
    email: item.email,
    time: item.time,
    comment: item.message,
    image: item.avatar,
    rating: item.ratingNumber,

  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setSelectedItem(next),
    afterChange: (current) => setSelectedItem(current),
  };



  const mediaQuery = window.matchMedia('(max-width: 1000px)');

  if (mediaQuery.matches) {
    settings.slidesToShow = 1;
  }



  return (
    <div className='testmonial'>
      <div className='tmdes'>
        <h3>What <span className='text-primary'>our patient</span> say</h3>
        <p>World-class care for everyone. Our health System offers <br></br>unmatched, expert care</p>
      </div>

      <div className="testimonial-carousel-container">
        <Slider {...settings}>
          {testimonialData.map((testimonial, index) => (
            <div className='row'>

              <div key={testimonial.id} className={`testimonial-item ${selectedItem + 1 === index ? 'selected' : ''}`}>
                <div className='first'>
                  <div className='img'>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className='ninfo'>
                    <span className="name">{testimonial.name}</span>
                    <span>{format(testimonial.time, 'dd-MMMM-yyyy')}</span>
                    <span className="rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? 'icon-test filled' : 'icon-test empty'} />
                      ))}
                    </span>
                  </div>
                </div>
                <div className='second'>
                  <p style={{flexWrap: 'wrap'}}>{testimonial.comment}</p>
                </div>
              </div>

            </div>

          ))}


        </Slider>
      </div>

    </div>
  );
};

export default TestimonialCarousel;
