import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);

  // Load existing review data
  useEffect(() => {
    fetch(`https://assignment-10-backend-6rm6.onrender.com/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch(() => toast.error("Failed to load review"));
  }, [id]);

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedReview = {
      food_name: form.food_name.value,
      photo_url: form.photo_url.value,
      restaurant_name: form.restaurant_name.value,
      restaurant_location: form.restaurant_location.value,
      rating: parseFloat(form.rating.value),
      review: form.review.value,
    };

    fetch(`https://assignment-10-backend-6rm6.onrender.com/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review updated successfully!");
        navigate("/my-reviews");
      })
      .catch(() => toast.error("Update failed"));
  };

  if (!review) {
    return (
      <div className="text-center py-20 font-bold text-gray-600">
        Loading Review...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Edit Review
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white p-8 shadow-lg rounded-xl"
      >
        {/* FOOD NAME */}
        <div>
          <label className="block font-semibold mb-2">Food Name</label>
          <input
            type="text"
            name="food_name"
            defaultValue={review.food_name}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* FOOD IMAGE */}
        <div>
          <label className="block font-semibold mb-2">Image URL</label>
          <input
            type="url"
            name="photo_url"
            defaultValue={review.photo_url}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* RESTAURANT NAME */}
        <div>
          <label className="block font-semibold mb-2">Restaurant Name</label>
          <input
            type="text"
            name="restaurant_name"
            defaultValue={review.restaurant_name}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-semibold mb-2">Restaurant Location</label>
          <input
            type="text"
            name="restaurant_location"
            defaultValue={review.restaurant_location}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* RATING */}
        <div>
          <label className="block font-semibold mb-2">Rating (0–5)</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            defaultValue={review.rating}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* REVIEW TEXT */}
        <div>
          <label className="block font-semibold mb-2">Review Text</label>
          <textarea
            name="review"
            defaultValue={review.review}
            required
            className="w-full border rounded-lg px-4 py-3 h-32"
          ></textarea>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg w-full hover:bg-orange-700 transition"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
