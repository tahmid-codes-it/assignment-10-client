import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  // Load reviews that belong to the logged-in user
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/reviews/my?email=${user.email}`)
    
      .then((res) => res.json())
      .then((data) => setMyReviews(data))
      .catch((err) => console.log("Error loading reviews:", err));
  }, [user]);

  // Delete review
  const handleDelete = () => {
    fetch(`http://localhost:3000/review/${selectedReview._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMyReviews((prev) =>
          prev.filter((review) => review._id !== selectedReview._id)
        );
        setSelectedReview(null);
      })
      .catch((err) => console.log("Delete error:", err));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">
        My Reviews
      </h1>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="table w-full">
          <thead className="bg-orange-600 text-white text-lg">
            <tr>
              <th>Image</th>
              <th>Food Name</th>
              <th>Restaurant</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myReviews.length > 0 ? (
              myReviews.map((review) => (
                <tr key={review._id} className="hover:bg-orange-50">
                  <td>
                    <img
                      src={review.photo_url}
                      alt={review.food_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="font-medium">{review.food_name}</td>

                  <td>{review.restaurant_name}</td>

                  <td>
                    {new Date(review.date).toLocaleDateString("en-GB")}
                  </td>

                  <td className="flex gap-3 justify-center">
                    {/* EDIT BUTTON */}
                    <Link
                      to={`/edit-review/${review._id}`}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                      <FaEdit />
                    </Link>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  No reviews found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-4">Delete this review?</h2>

            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedReview(null)}
                className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
