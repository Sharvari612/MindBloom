import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import TargetCursor from "../components/TargetCursor";

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 🎯 Mouse Gradient Effect (Same as before)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🔐 Auto Redirect if Already Logged In
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/games");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📧 Email Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/games");
    } catch (signupError) {
      switch (signupError.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Google Signup
  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/games");
    } catch (error) {
      setError("Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="cursor-neutral relative min-h-screen font-sans bg-[#C8E6C9] overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, #A5D6A7, #C8E6C9 40%, #E8F5E9)`,
      }}
    >
      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row h-full md:h-[600px]">

            {/* LEFT IMAGE */}
            <div className="w-full md:w-2/5 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('./login-forest.png')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>

              <div className="relative h-full flex items-end p-6">
                <div className="text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🌱</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center">

              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-black text-[#22442E] mb-2">
                  Create Account
                </h1>
                <p className="text-gray-600 text-lg">
                  Start your MindBloom journey 🌿
                </p>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-6">

                <div>
                  <label className="block text-sm font-bold text-[#22442E] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D8CFC4] focus:border-[#22442E] focus:outline-none"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#22442E] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D8CFC4] focus:border-[#22442E] focus:outline-none"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#22442E] mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D8CFC4] focus:border-[#22442E] focus:outline-none"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-xl bg-[#22442E] text-white font-black text-lg shadow-lg hover:bg-[#1a3322] disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </motion.button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#D8CFC4]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social */}
                <div className="w-full flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="px-4 py-3 rounded-xl border-2 border-[#D8CFC4] font-bold hover:border-[#22442E]"
                    disabled={loading}
                  >
                    SignUp with Google
                  </button>

                </div>

                <p className="text-center text-gray-600 mt-6 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#22442E] font-bold cursor-pointer hover:underline"
                  >
                    Sign In
                  </span>
                </p>

              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
