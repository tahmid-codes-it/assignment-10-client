import React, { useState, useEffect, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaUserCircle, FaMapMarkerAlt, FaStar, FaHeart } from "react-icons/fa";

// AllReviews.jsx
// - Server-side search (tries ?search= then /search/:text fallback)
// - Favorites persisted in localStorage (stores full review objects)
// - Uses loader data as initial data but keeps a local `reviews` state

const AllReviews = () => {
  const loaderReviews = useLoaderData() || [];

  const [reviews, setReviews] = useState(loaderReviews);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

  // Load favorites from localStorage once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(saved);
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  // Persist favorites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  // Helper: toggle favorite (add/remove)
  const toggleFavorite = (review) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r._id === review._id);
      if (exists) return prev.filter((r) => r._id !== review._id);
      // store only necessary fields to keep payload small (but keep full object if you prefer)
      return [
        ...prev,
        {
          _id: review._id,
          photo_url: review.photo_url,
          food_name: review.food_name,
          reviewer_name: review.reviewer_name,
          restaurant_name: review.restaurant_name,
          date: review.date || new Date().toISOString(),
        },
      ];
    });
  };

  const isFavorite = (id) => favorites.some((r) => r._id === id);

  // Fetch reviews from server. Tries two endpoints for compatibility:
  // 1) /reviews?search=term   (preferred)
  // 2) /reviews/search/term   (fallback)
  const fetchReviews = async (searchText = "") => {
    setLoading(true);
    setError(null);

    const base = "http://localhost:3000/reviews";

    try {
      // Try query param first
      const url1 = searchText ? `${base}?search=${encodeURIComponent(searchText)}` : base;
      let res = await fetch(url1);

      if (!res.ok) {
        // try fallback path-style endpoint
        const url2 = searchText ? `${base}/search/${encodeURIComponent(searchText)}` : base;
        res = await fetch(url2);
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load reviews");
      // keep current reviews (loader) as fallback
    } finally {
      setLoading(false);
    }
  };

  // Debounced search: wait 400ms after user stops typing
  useEffect(() => {
    // if search is empty, reset to loader data (or refetch to get latest from server)
    const term = search?.trim();

    const id = setTimeout(() => {
      if (!term) {
        // show loader data (fresh) — optionally fetch from server instead
        setReviews(loaderReviews);
        return;
      }

      fetchReviews(term);
    }, 400);

    return () => clearTimeout(id);
  }, [search]);

  // Provide a manual Clear button and manual Search button (optional)
  const handleClear = () => {
    setSearch("");
    setReviews(loaderReviews);
    if (searchRef.current) searchRef.current.focus();
  };

  // If the route provided no loader data or you want to refresh from server on mount,
  // you can call fetchReviews() here. For now we rely on loader data as initial state.
  // useEffect(() => { fetchReviews(); }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        All Foodie Reviews
      </h1>

      {/* SEARCH BAR */}
      <div className="max-w-2xl mx-auto mb-8 flex gap-3">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by food name (server-side)..."
          className="flex-1 border rounded-lg px-4 py-3 shadow-sm"
        />

        <button
          onClick={() => fetchReviews(search.trim())}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mb-4">Loading reviews…</p>
      )}

      {error && (
        <p className="text-center text-red-500 mb-4">Error: {error}</p>
      )}

      {/* GRID */}
      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(review)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-20"
                aria-label={isFavorite(review._id) ? "Remove favorite" : "Add favorite"}
              >
                <FaHeart
                  size={20}
                  className={isFavorite(review._id) ? "text-red-600" : "text-gray-300"}
                />
              </button>

              {/* IMAGE */}
              <img
                src={review.photo_url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={review.food_name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <FaUserCircle className="text-4xl text-orange-400" />
                  <p className="font-semibold">{review.reviewer_name}</p>
                </div>

                <h2 className="text-xl font-bold mb-1">{review.food_name}</h2>

                <p className="text-orange-600 font-semibold mb-1">{review.restaurant_name}</p>

                <p className="flex items-center text-gray-600 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2 text-orange-500" />
                  {review.restaurant_location}
                </p>

                <p className="flex items-center gap-2 text-yellow-500 font-semibold mb-3">
                  <FaStar /> {review.rating} / 5
                </p>

                <p className="text-gray-700 text-sm mb-4">{review.review?.slice(0, 130)}...</p>

                <Link to={`/review/${review._id}`}>
                  <button className="bg-orange-600 text-white px-4 py-2  rounded hover:bg-orange-700 w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">No reviews found</p>
      )}
    </div>
  );
};

export default AllReviews;
