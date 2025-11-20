import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaStar,
  FaMapMarkerAlt,
  FaUserCircle,
  FaHeart,
} from "react-icons/fa";

const Home = () => {
  const reviews = useLoaderData() || [];

  // Top 6 sorted reviews
  const topReviews = [...reviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Handle Favorites
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(Array(topReviews.length).fill(false));
  }, [reviews]);

  const toggleFavorite = (index) => {
    setFavorites((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      title: "Discover Local Foods Near You",
      subtitle: "Explore the best dishes reviewed by real people.",
    },
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      title: "Honest Reviews From Real Food Lovers",
      subtitle: "Your next favorite meal is just one review away.",
    },
    {
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      title: "Savor Every Bite",
      subtitle: "From street food to gourmet, taste what others love.",
    },
    {
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      title: "Explore Hidden Gems",
      subtitle: "Discover unique restaurants and home-cooked delights.",
    },
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      title: "Share Your Food Story",
      subtitle: "Join our community and write honest reviews.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ===========================
          HERO SLIDER
      ============================ */}
      <div className="w-full">
        <Swiper
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[350px] md:h-[500px]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-lg md:text-xl max-w-xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===========================
          TOP REVIEWS
      ============================ */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Top Reviews</h2>
          <Link to="/all-reviews">
            <button className="bg-orange-600 text-white hover:bg-orange-700 btn-sm px-4 py-2 rounded">
              Show All
            </button>
          </Link>
        </div>

        {topReviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {topReviews.map((item, index) => (
              <div
                key={item._id}
                className="shadow rounded-xl overflow-hidden border relative"
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(index)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-20"
                >
                  <FaHeart
                    size={20}
                    className={
                      favorites[index] ? "text-red-600" : "text-gray-300"
                    }
                  />
                </button>

                <img
                  src={
                    item.photo_url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.food_name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-xl">{item.food_name}</h3>

                  <p className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt /> {item.restaurant_location}
                  </p>

                  <p className="text-gray-700">
                    Restaurant:{" "}
                    <span className="font-medium">{item.restaurant_name}</span>
                  </p>

                  <div className="flex items-center gap-2 text-yellow-500">
                    <FaStar /> {item.rating} / 5
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUserCircle /> {item.reviewer_name}
                  </div>

                  <Link to={`/review/${item._id}`}>
                    <button className="bg-orange-600 text-white hover:bg-orange-700 btn-sm w-full mt-3 py-2 rounded">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===========================
          EXTRA SECTIONS (UNCHANGED)
      ============================ */}

      <div className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1529042410759-befb1204b468"
            alt="Hidden Gems"
            className="rounded-xl shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Find Hidden Food Gems</h2>
            <p className="text-gray-700 leading-relaxed">
              Our community discovers unique local dishes and shares honest
              reviews, helping you explore foods you never knew existed.
            </p>
            <button className="bg-orange-600 text-white hover:bg-orange-700 mt-4 px-4 py-2 rounded">
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Write Your Review</h2>
          <p className="text-gray-700 leading-relaxed">
            Share your food experiences with the world. Your review can help
            someone find their next favorite dish!
          </p>
          <Link to="/add-review">
            <button className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white mt-4 px-4 py-2 rounded">
              Write a Review
            </button>
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327"
          alt="Write Review"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Home;
