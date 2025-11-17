import React from "react";
import { FaStar, FaUtensils, FaHeart } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
        About Us
      </h1>

      {/* Intro Paragraph */}
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Welcome to <span className="font-semibold">YumNet</span> — your trusted
        community for honest, real, and delicious food reviews!  
        We connect food lovers, explorers, and everyday people who want to share
        their tasty experiences from restaurants all around the world.
      </p>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-2xl transition">
          <FaUtensils className="text-orange-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Discover Great Food</h3>
          <p className="text-gray-600">
            Explore thousands of honest reviews shared by real people who
            love trying new restaurants, cafes, and street foods.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-2xl transition">
          <FaStar className="text-orange-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Honest Ratings</h3>
          <p className="text-gray-600">
            Every rating is given by genuine food lovers to help you make
            confident dining choices.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-2xl transition">
          <FaHeart className="text-orange-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Community First</h3>
          <p className="text-gray-600">
            YumNet is built by the community for the community — where everyone’s
            opinion matters.
          </p>
        </div>

      </div>

      {/* Our Mission */}
      <div className="mt-14 bg-orange-50 p-8 rounded-xl shadow-inner">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to help people discover amazing food places through
          honest reviews and ratings. We strive to create a friendly environment
          where food lovers can express their thoughts, share experiences, and
          support local restaurants.
        </p>
      </div>

      {/* Footer line */}
      <p className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} YumNet — All Rights Reserved.
      </p>
    </div>
  );
};

export default AboutUs;
