"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/games-carousel.css";

const games = [
  {
    id: 1,
    title: "FC 26",
    description: "Experience the ultimate football simulation with realistic gameplay and stunning graphics.",
    image: "/images/fc.jpeg",
    link: "/tournaments"
  },
  {
    id: 2,
    title: "Call of Duty",
    description: "Intense first-person shooter action with multiplayer and battle royale modes.",
    image: "/images/callofduty.webp",
    link: "/tournaments"
  },
  {
    id: 3,
    title: "eFootball",
    description: "The next generation of football gaming with realistic gameplay and stunning visuals.",
    image: "/images/efootball.jpeg",
    link: "/tournaments"
  },
  {
    id: 4,
    title: "Free Fire",
    description: "Battle royale action with fast-paced gameplay and intense combat.",
    image: "/images/freefire.webp",
    link: "/tournaments"
  },
  {
    id: 5,
    title: "DLS 26",
    description: "Dream League Soccer with realistic graphics and immersive gameplay.",
    image: "/images/dls.jpeg",
    link: "/tournaments"
  }
];

const GamesCarousel = () => {
  return (
    <section className="games-carousel-section">
      <div className="carousel-container">
        <h2 className="carousel-title">Featured Games</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          loop={true}
          className="games-swiper"
        >
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="game-slide">
                <div className="game-image-container">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="game-image"
                  />
                  <div className="game-overlay"></div>
                </div>
                <div className="game-content">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  <a href={game.link} className="game-button">
                    Explore
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default GamesCarousel;
