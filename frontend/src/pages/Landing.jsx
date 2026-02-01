import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Landing = () => {
    const navigate = useNavigate();

    // Simple Animation Variants
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.2, 
                delayChildren: 0.3
            }
        }
    };

    const itemVars = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-blue-50">
            <Navbar />

            {/* Subtle Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <motion.div 
                    animate={{ 
                        x: [0, 30, 0], 
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-transparent rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        x: [0, -30, 0], 
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/40 to-transparent rounded-full blur-3xl"
                />
            </div>

            <motion.div
                variants={containerVars}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center"
            >
                {/* Simple Decorative Elements */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-[10%] text-6xl opacity-30 hidden lg:block"
                >
                    🌱
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-32 right-[10%] text-6xl opacity-30 hidden lg:block"
                >
                    ✨
                </motion.div>

                {/* Main Title */}
                <motion.div className="mb-8">
                    <motion.h1
                        variants={itemVars}
                        className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4"
                    >
                        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            MindBloom
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={itemVars}
                        className="text-xl md:text-2xl text-gray-600 font-medium"
                    >
                        Where curiosity grows into knowledge
                    </motion.p>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    variants={itemVars}
                    className="mb-12 max-w-2xl"
                >
                    <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
                        Learning made simple and fun
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    variants={itemVars}
                    className="mb-16"
                >
                    <motion.button
                        onClick={() => navigate("/games")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-violet-600 to-blue-600
                                 text-white text-xl md:text-2xl font-bold 
                                 px-12 py-5 rounded-full
                                 shadow-lg shadow-violet-300/50 hover:shadow-xl hover:shadow-violet-400/50
                                 transition-all duration-300"
                    >
                        Start Learning
                    </motion.button>
                </motion.div>

                {/* Activity Icons */}
                <motion.div
                    variants={itemVars}
                    className="flex gap-8 py-6 px-10 bg-white/60 backdrop-blur-md rounded-2xl 
                             border border-gray-200/50 shadow-lg"
                >
                    {[
                        { emoji: '📚', label: 'Read' },
                        { emoji: '🎨', label: 'Create' },
                        { emoji: '🧩', label: 'Solve' },
                        { emoji: '🎮', label: 'Play' },
                        { emoji: '🏆', label: 'Achieve' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8, scale: 1.1 }}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-4xl transition-transform duration-300">
                                {item.emoji}
                            </span>
                            <span className="text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Message */}
                <motion.div
                    variants={itemVars}
                    className="mt-12"
                >
                    <p className="text-lg text-gray-500 font-medium">
                        Join thousands of young learners today
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Landing;