import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/sign-in");
  };

  // Active link style
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-orange-600 font-semibold border-b-2 border-orange-600 pb-1"
      : "hover:text-orange-600 transition";

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4">

      {/* LEFT SECTION */}
      <div className="navbar-start">

        {/* Mobile Menu Icon */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          {/* Mobile Dropdown */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 p-2 shadow bg-base-100 rounded-box"
          >
            <li><NavLink to="/" className={activeStyle}>Home</NavLink></li>
            <li><NavLink to="/all-reviews" className={activeStyle}>All Reviews</NavLink></li>
            <li><NavLink to="/my-favorites" className={activeStyle}>My Favorites</NavLink></li>
            <li><NavLink to="/about-us" className={activeStyle}>About Us</NavLink></li>

            {user && (
              <>
                <li><NavLink to="/add-review">Add Review</NavLink></li>
                <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
                <li><button onClick={handleLogout} className="text-red-600">Logout</button></li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-600 tracking-wide">
          Yum<span className="text-red-600">Net</span>
        </Link>
      </div>

      {/* CENTER — DESKTOP MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg gap-2">
          <li><NavLink to="/" className={activeStyle}>Home</NavLink></li>
          <li><NavLink to="/all-reviews" className={activeStyle}>All Reviews</NavLink></li>
          <li><NavLink to="/my-favorites" className={activeStyle}>My Favorites</NavLink></li>
          <li><NavLink to="/about-us" className={activeStyle}>About Us</NavLink></li>
        </ul>
      </div>

      {/* RIGHT — LOGIN OR USER MENU */}
      <div className="navbar-end">
        {!user && (
          <NavLink
            to="/sign-in"
            className="btn px-5 bg-orange-600 border-none text-white font-semibold 
              transition-all duration-300 ease-in-out 
              hover:bg-orange-700 hover:scale-105 hover:shadow-lg
              active:scale-95"
          >
            Login / Register
          </NavLink>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar cursor-pointer">
              <div className="w-12 rounded-full border border-orange-500">
                <img
                  src={user.photoURL || "https://i.ibb.co/ZYwS5QF/default.jpg"}
                  alt="profile"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content w-56 mt-3 p-2 shadow bg-base-100 rounded-box"
            >
              <li><NavLink to="/add-review">Add Review</NavLink></li>
              <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
              <li>
                <button onClick={handleLogout} className="text-red-600">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
