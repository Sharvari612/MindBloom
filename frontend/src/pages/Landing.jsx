import { useNavigate } from "react-router-dom";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TargetCursor from "../components/TargetCursor";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /* =============================
     SECTION VISIBILITY
  ============================== */
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-150px"
  });

  const pathControls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      pathControls.start({
        pathLength: 1,
        transition: {
          duration: 4.5,
          ease: "easeInOut"
        }
      });
    }
  }, [isInView, pathControls]);

  /* =============================
     MOUSE PARALLAX EFFECT
  ============================== */
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* =============================
     LOOP-DE-LOOP PATH DATA
  ============================== */
  const pathData = "M 0 200 C 150 200 200 50 400 150 C 600 250 850 350 900 200 C 950 50 700 50 750 200 C 800 350 1100 250 1300 150 C 1500 50 1750 200 2000 200";

  /* =============================
     LEVEL DATA (positioned along path)
  ============================== */
  const levels = [
    {
      title: "Whispering Willows",
      info: "A calm beginning that nurtures focus and awareness.",
      icon: "./icons/1.png",
      left: "20%",
      top: "48%",
      progress: 0.22,
      delay: 0.8
    },
    {
      title: "Rune Blending",
      info: "Pattern play to strengthen memory and cognition.",
      icon: "./icons/2.png",
      left: "48%",
      top: "75%",
      progress: 0.52,
      delay: 2.2
    },
    {
      title: "Rapid Bloom",
      info: "Fast-paced challenges to build agility and confidence.",
      icon: "./icons/3.png",
      left: "78%",
      top: "48%",
      progress: 0.78,
      delay: 3.6
    }
  ];

  return (
    <div className="cursor-neutral relative min-h-screen font-sans selection:bg-emerald-200 bg-[#0A0E0D] overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Questrial&display=swap');
          
          body {
            font-family: 'Questrial', sans-serif;
          }
          
          .heading-font {
            font-family: 'Playfair Display', serif;
          }
          
          .grain-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.03;
            z-index: 100;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
          
          .glow-text {
            text-shadow: 0 0 40px rgba(187, 247, 208, 0.3),
                         0 0 80px rgba(187, 247, 208, 0.2);
          }
          
          .shimmer {
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            );
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .aurora {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
                        radial-gradient(ellipse at bottom, rgba(6, 78, 59, 0.1) 0%, transparent 60%);
            filter: blur(60px);
            opacity: 0.5;
          }
        `}
      </style>

      {/* GRAIN OVERLAY */}
      <div className="grain-overlay" />

      {/* CURSOR */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <Navbar />

      {/* =============================
          HERO SECTION
      ============================== */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* AURORA EFFECT */}
        <div className="aurora" />
        
        {/* BACKGROUND IMAGE WITH PARALLAX */}
        <motion.div
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20
          }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ backgroundImage: "url('./forest.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E0D]/60 via-[#0A0E0D]/40 to-[#0A0E0D]" />
        </motion.div>

        {/* FLOATING PARTICLES */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          {/* DECORATIVE TOP ELEMENT */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="mb-8"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </motion.div>

          {/* MAIN HEADING */}
          <h1 className="heading-font text-8xl md:text-[12rem] font-black tracking-tight mb-6 text-white glow-text leading-none">
            MindBloom
          </h1>

          {/* SUBTITLE WITH ANIMATED UNDERLINE */}
          <div className="relative">
            <p className="text-2xl md:text-4xl text-emerald-200/90 font-light tracking-wide mb-12 italic">
              A mystical journey awaits
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
            />
          </div>

          {/* CTA BUTTON */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="
              cursor-target relative group
              px-14 py-5 rounded-full
              bg-gradient-to-r from-emerald-600 to-emerald-500
              text-white font-bold text-lg tracking-wide
              shadow-2xl shadow-emerald-900/50
              hover:shadow-emerald-500/30
              transition-all duration-300
              border border-emerald-400/20
              overflow-hidden
            "
          >
            <span className="relative z-10">Begin Your Journey</span>
            <div className="absolute inset-0 shimmer" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>

          {/* SCROLL INDICATOR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-emerald-300/60"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* =============================
          LOOP-DE-LOOP PATH SECTION
      ============================== */}
      <section ref={sectionRef} className="relative py-60 bg-gradient-to-b from-[#0A0E0D] via-[#0F1613] to-[#1A2420] overflow-hidden">
        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full blur-[120px]" />
        </div>

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative z-20 text-center mb-32"
        >
          <h2 className="heading-font text-6xl md:text-7xl font-black text-white mb-6">
            Your Path to Mastery
          </h2>
          <p className="text-xl text-emerald-200/70 max-w-2xl mx-auto px-6">
            Progress through carefully crafted stages, each designed to unlock new dimensions of understanding
          </p>
        </motion.div>

        {/* SVG PATH + DECORATIONS */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
          <svg width="100%" height="600" viewBox="0 0 2000 400" fill="none" className="overflow-visible">
            {/* GLOWING BASE PATH */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* BASE PATH */}
            <path
              d={pathData}
              stroke="#1F2D26"
              strokeWidth="60"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ANIMATED GLOWING PATH */}
            <motion.path
              d={pathData}
              stroke="url(#pathGradient)"
              strokeWidth="54"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={pathControls}
            />

            {/* DECORATIVE TREES - ENHANCED */}
            <g opacity="0.4">
              <circle cx="300" cy="80" r="28" fill="#10B981" />
              <circle cx="330" cy="100" r="22" fill="#059669" />
              <circle cx="320" cy="70" r="18" fill="#10B981" />
              <rect x="315" y="110" width="8" height="24" rx="4" fill="#064E3B" />
            </g>

            <g opacity="0.4">
              <circle cx="650" cy="320" r="32" fill="#10B981" />
              <circle cx="680" cy="340" r="26" fill="#059669" />
              <circle cx="665" cy="310" r="20" fill="#10B981" />
              <rect x="665" y="350" width="8" height="28" rx="4" fill="#064E3B" />
            </g>

            <g opacity="0.4">
              <circle cx="1200" cy="80" r="28" fill="#10B981" />
              <circle cx="1230" cy="100" r="22" fill="#059669" />
              <circle cx="1220" cy="70" r="18" fill="#10B981" />
              <rect x="1215" y="110" width="8" height="24" rx="4" fill="#064E3B" />
            </g>

            <g opacity="0.4">
              <circle cx="1700" cy="120" r="30" fill="#10B981" />
              <circle cx="1730" cy="140" r="24" fill="#059669" />
              <circle cx="1715" cy="110" r="18" fill="#10B981" />
              <rect x="1715" y="150" width="8" height="26" rx="4" fill="#064E3B" />
            </g>

            {/* GLOWING STONES */}
            <ellipse cx="500" cy="160" rx="16" ry="12" fill="#34D399" opacity="0.3" />
            <ellipse cx="530" cy="175" rx="12" ry="9" fill="#34D399" opacity="0.3" />

            <ellipse cx="1050" cy="270" rx="16" ry="12" fill="#34D399" opacity="0.3" />
            <ellipse cx="1080" cy="285" rx="12" ry="9" fill="#34D399" opacity="0.3" />

            <ellipse cx="1500" cy="160" rx="16" ry="12" fill="#34D399" opacity="0.3" />
            <ellipse cx="1530" cy="175" rx="12" ry="9" fill="#34D399" opacity="0.3" />
          </svg>
        </div>

        {/* =============================
            ANIMATED LEVEL CARDS
        ============================== */}
        <div className="relative z-10 max-w-7xl mx-auto h-[500px]">
          {levels.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: point.delay,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute cursor-pointer group"
              style={{ left: point.left, top: point.top }}
            >
              <div className="relative">
                {/* GLOW EFFECT */}
                <div className="absolute -inset-4 bg-emerald-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* MAIN CARD */}
                <div className="
                  relative
                  bg-gradient-to-br from-[#1A2420]/95 to-[#0F1613]/95
                  backdrop-blur-xl
                  border border-emerald-500/20
                  rounded-3xl px-8 py-6
                  shadow-2xl shadow-black/50
                  flex flex-col items-center gap-4
                  group-hover:border-emerald-400/40
                  transition-all duration-300
                ">
                  {/* LEVEL NUMBER BADGE */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {i + 1}
                  </div>

                  {/* ICON IMAGE */}
                  <div className="relative floating">
                    <div className="absolute -inset-2 bg-emerald-500/20 rounded-2xl blur-lg" />
                    <img
                      src={point.icon}
                      alt={point.title}
                      className="relative w-28 h-28 object-contain rounded-2xl"
                      draggable={false}
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="heading-font text-white font-bold text-2xl text-center leading-tight">
                    {point.title}
                  </h3>
                </div>

                {/* INFO CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: point.delay + 0.3 }}
                  className="
                    mt-4 max-w-[240px]
                    bg-[#0F1613]/90 backdrop-blur-md
                    border border-emerald-500/10
                    rounded-2xl px-5 py-4
                    shadow-xl text-center
                  "
                >
                  <p className="text-sm text-emerald-100/70 leading-relaxed">
                    {point.info}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =============================
          ABOUT US - REDESIGNED
      ============================== */}
      <section className="relative bg-gradient-to-b from-[#1A2420] to-[#0A0E0D] py-40 overflow-hidden">
        {/* DECORATIVE BACKGROUND */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* DECORATIVE TOP LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-transparent mb-12 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-font text-6xl md:text-7xl font-black text-white mb-8">
              About MindBloom
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-emerald-100/70 leading-relaxed">
              <p>
                MindBloom is designed to nurture cognitive growth through calm, progressive learning journeys. 
                We combine science-backed methods with engaging, game-like experiences to help minds flourish 
                naturally—without pressure.
              </p>
              <p className="text-emerald-200/80 font-medium">
                Every journey is unique. Every mind blooms at its own pace.
              </p>
            </div>
          </motion.div>

          {/* FEATURE GRID */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { icon: "🧠", title: "Science-Backed", desc: "Rooted in cognitive research" },
              { icon: "🌱", title: "Progressive Growth", desc: "Learn at your natural pace" },
              { icon: "✨", title: "Engaging Play", desc: "Make learning feel effortless" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="
                  bg-gradient-to-br from-[#1A2420]/60 to-[#0F1613]/60
                  backdrop-blur-sm
                  border border-emerald-500/10
                  rounded-2xl p-8
                  text-center
                  hover:border-emerald-400/30
                  transition-all duration-300
                "
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-emerald-100/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =============================
          FOOTER - REFINED
      ============================== */}
      <footer className="relative bg-[#0A0E0D] border-t border-emerald-500/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* BRAND */}
            <div className="text-center md:text-left">
              <h3 className="heading-font text-3xl font-bold text-white mb-2">MindBloom</h3>
              <p className="text-emerald-100/50 text-sm">Nurture your mind's potential</p>
            </div>

            {/* LINKS */}
            <div className="flex gap-8 text-sm text-emerald-100/60">
              <button className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
                Privacy
              </button>
              <button className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
                Terms
              </button>
              <button className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
                Contact
              </button>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-center mt-12 pt-8 border-t border-emerald-500/5">
            <p className="text-emerald-100/40 text-sm">© 2026 MindBloom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;