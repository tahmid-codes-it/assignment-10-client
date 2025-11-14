import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    const user = null; // Replace with auth user

    // Active link styling
    const activeStyle = ({ isActive }) =>
        isActive ? "text-red-700 font-semibold" : "";

    return (
        <div className="navbar bg-base-100 shadow">
            {/* LEFT PART */}
            <div className="navbar-start">

                {/* HAMBURGER MENU */}
                <div className="dropdown">
                    <button 
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* DROPDOWN CONTENT (MOBILE) */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[100]"
                    >
                        <li>
                            <NavLink to="/" className={activeStyle}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/all-reviews" className={activeStyle}>
                                All Reviews
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/about" className={activeStyle}>
                                About
                            </NavLink>
                        </li>

                        {/* Logged in (mobile only) */}
                        {user && (
                            <>
                                <li><NavLink to="/add-review">Add Review</NavLink></li>
                                <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
                                <li><button onClick={() => logout()}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* LOGO */}
                <Link to="/" className="btn btn-ghost text-2xl font-bold">YumNet</Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    <li>
                        <NavLink to="/" className={activeStyle}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/all-reviews" className={activeStyle}>
                            All Reviews
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" className={activeStyle}>
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* RIGHT PART */}
            <div className="navbar-end">
                {!user && (
                    <NavLink to="/auth" className="btn">
                        Login / Register
                    </NavLink>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="avatar cursor-pointer">
                            <div className="w-12 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content w-52 mt-3 shadow bg-base-100 rounded-box"
                        >
                            <li><NavLink to="/add-review">Add Review</NavLink></li>
                            <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
                            <li><button onClick={() => logout()}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
