import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/google-logo-2025-6ffb.png";
import burger from "../assets/burger_illus.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email + Password Login
  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, foodie! 🍽️");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google! 🍔");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    const email = prompt("Enter your registered email:");
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending reset email.");
    }
  };

  return (
    <div className="hero bg-white min-h-screen py-6 px-4 md:px-10">
      
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 w-full">

        {/* Left Section — Food description + Animated Burger */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 leading-tight">
            Welcome Back to <br />
            <span className="text-red-700">YumNet</span>
          </h1>

          <p className="py-4 sm:py-6 text-gray-700 text-base sm:text-lg">
            Login to explore food reviews, discover local gems, save your favorites,
            and share your culinary experiences with the world.
          </p>

          {/* Animated burger - hidden on small screens */}
          <img
            src={burger}
            alt="burger illustration"
            className="md:block w-56 md:w-72 lg:w-80 mx-auto floating-burger"
          />
        </div>

        {/* Right Section — Login Card */}
        <div className="card bg-base-100 w-full max-w-sm shadow-xl">
          <div className="card-body">

            <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-4">
              Sign In
            </h2>

            <form onSubmit={handleSignIn}>
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mb-3 text-sm sm:text-base py-3"
                required
              />

              <label className="label font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10 text-sm sm:text-base py-3"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="link link-hover text-sm text-orange-600"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className={`btn bg-orange-600 hover:bg-orange-700 text-white w-full mt-4 ${
                  loading && "loading"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="divider text-gray-500">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white text-sm sm:text-base"
              disabled={loading}
            >
              <img
                className="mr-1"
                style={{ width: "15px", height: "auto" }}
                src={logo}
                alt=""
              />
              Continue with Google
            </button>

            <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-orange-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floating-burger {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
