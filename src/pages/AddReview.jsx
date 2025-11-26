import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/Firebase.config";

const AddReview = () => {
  const user = auth.currentUser;

  // If user not logged in — block page
  if (!user) {
    return (
      <div className="py-20 text-center text-red-500 text-xl font-semibold">
        Please <span className="text-orange-600">Login</span> to Add a Review.
      </div>
    );
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newReview = {
      food_name: form.food_name.value,
      photo_url: form.photo_url.value,
      restaurant_name: form.restaurant_name.value,
      restaurant_location: form.location.value,
      rating: parseFloat(form.rating.value),
      review: form.review.value,
      user_email: user.email,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        toast.success("Review Added Successfully!");
        form.reset();
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
        Add a New Review
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-xl">

        {/* FOOD NAME */}
        <div>
          <label className="block font-semibold mb-2">Food Name</label>
          <input
            type="text"
            name="food_name"
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="e.g. Chicken Tikka Masala"
          />
        </div>

        {/* FOOD IMAGE */}
        <div>
          <label className="block font-semibold mb-2">Food Image URL</label>
          <input
            type="url"
            name="photo_url"
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Paste image URL here"
          />
        </div>

        {/* RESTAURANT NAME */}
        <div>
          <label className="block font-semibold mb-2">Restaurant Name</label>
          <input
            type="text"
            name="restaurant_name"
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="e.g. Spice Route Cuisine"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="e.g. 10 High Street, Old Town"
          />
        </div>

        {/* STAR RATING */}
        <div>
          <label className="block font-semibold mb-2">Star Rating (0–5)</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="e.g. 4.7"
          />
        </div>

        {/* REVIEW TEXT */}
        <div>
          <label className="block font-semibold mb-2">Review</label>
          <textarea
            name="review"
            required
            className="w-full border rounded-lg px-4 py-3 h-32"
            placeholder="Write your detailed review..."
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg w-full hover:bg-orange-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;