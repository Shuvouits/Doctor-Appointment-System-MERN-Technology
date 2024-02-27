// TestimonialCarousel.js (React Component)

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import aboutImg from "../images/about.png";
import { FaStar } from "react-icons/fa";

const testimonialData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Web Developer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, est ut aliquam iaculis, metus quam ullamcorper odio, a volutpat felis libero at justo.',
    image: aboutImg,
    rating: 1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'UX Designer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, est ut aliquam iaculis, metus quam ullamcorper odio, a volutpat felis libero at justo.',
    image: aboutImg,
    rating: 5,
  },
  {
    id: 3,
    name: 'Jane Shuvo',
    role: 'UX Designer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, est ut aliquam iaculis, metus quam ullamcorper odio, a volutpat felis libero at justo.',
    image: aboutImg,
    rating: 3,
  },

  {
    id: 4,
    name: 'Jane Shuvo uits',
    role: 'UX Designer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, est ut aliquam iaculis, metus quam ullamcorper odio, a volutpat felis libero at justo.',
    image: aboutImg,
    rating: 3,
  },

  // Add more testimonial data as needed
];

const TestimonialCarousel = () => {
  const [selectedItem, setSelectedItem] = useState(0);

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


  // Media query for screens with a maximum width of 1000px
  const mediaQuery = window.matchMedia('(max-width: 1000px)');

  // Update settings for screens with a maximum width of 1000px
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
            <div key={testimonial.id} className={`testimonial-item ${selectedItem + 1 === index ? 'selected' : ''}`}>
              <div className='first'>
                <div className='img'>
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className='ninfo'>
                  <span className="name">{testimonial.name}</span>
                  <span className="rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? 'icon-test filled' : 'icon-test empty'} />
                    ))}
                  </span>
                </div>
              </div>
              <div className='second'>
                <p>{testimonial.comment}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
