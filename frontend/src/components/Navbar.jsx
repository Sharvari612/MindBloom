import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/play", label: "Play" },
    { to: "/parent", label: "Parent" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative"
          >
            <div className="relative">
              {/* Animated circles behind logo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
              
              {/* Logo circle */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-300/50">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                MindBloom
              </span>
              <span className="text-[10px] font-semibold text-purple-400 tracking-widest uppercase -mt-1">
                Learn & Grow
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group px-6 py-2.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient" />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  
                  {/* Link background */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-lg shadow-purple-200/50"
                        : "bg-purple-50 group-hover:bg-white group-hover:shadow-md"
                    }`}
                  />
                  
                  {/* Link text */}
                  <span
                    className={`relative font-bold text-sm tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text"
                        : "text-gray-700 group-hover:text-purple-600"
                    }`}
                  >
                    {link.label}
                  </span>
                  
                  {/* Decorative dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                  )}
                  <div
                    className={`absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30" />
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;