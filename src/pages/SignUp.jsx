import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/google-logo-2025-6ffb.png";
import burger from "../assets/burger_illus.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photo = event.target.photo.value;
    const password = event.target.password.value;

    // Password Validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Account created successfully! 🍔");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signed up with Google! 🍟");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="hero bg-white min-h-screen py-6 px-4 md:px-10">
      <div className="hero-content flex-col lg:flex-row gap-10 w-full">

        {/* Left Section — Title + Food Illus */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600">
            Join <span className=" text-orange-600 ">
          Yum<span className="text-red-600">Net</span>

            </span>
          </h1>
          <p className="py-4 text-gray-700 sm:text-lg">
            Create an account to discover local food spots, share delicious reviews, 
            explore hidden gems, and connect with fellow food lovers.
          </p>

          {/* Burger illustration — visible on all screens now */}
          <img
            src={burger}
            alt="burger illustration"
            className="w-40 sm:w-52 md:w-72 lg:w-80 mx-auto floating-burger"
          />
        </div>

        {/* Right Section — Sign Up Card */}
        <div className="card bg-base-100 w-full max-w-sm shadow-xl">
          <div className="card-body">

            <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
              Create Account
            </h2>

            <form onSubmit={handleSignUp}>
              <label className="label font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />

              <label className="label font-semibold text-gray-700 mt-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />

              <label className="label font-semibold text-gray-700 mt-2">Photo URL</label>
              <input
                type="text"
                name="photo"
                placeholder="Profile photo URL (optional)"
                className="input input-bordered w-full"
              />

              <label className="label font-semibold text-gray-700 mt-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                </span>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}

              <button className="btn bg-orange-600 hover:bg-orange-700 text-white w-full mt-4">
                Sign Up
              </button>
            </form>

            <div className="divider text-gray-500">OR</div>

            <button
              onClick={handleGoogleSignUp}
              className="btn btn-outline w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              <img
                className="mr-1"
                style={{ width: "15px", height: "auto" }}
                src={logo}
                alt=""
              />
              Continue with Google
            </button>

            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-orange-600 font-semibold hover:underline"
              >
                Sign in
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

export default SignUp;
