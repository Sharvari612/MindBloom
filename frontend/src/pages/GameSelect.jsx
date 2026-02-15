import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const games = [
    {
        id: 1,
        title: "Sound Catcher",
        emoji: "🔊",
        description: "Catch words with the right sound",
        color: "from-violet-500 to-purple-500",
        lightColor: "from-violet-100 to-purple-100",
        accentColor: "bg-violet-500",
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Letter Detective",
        emoji: "🔎",
        description: "Find the correct letters",
        color: "from-blue-500 to-cyan-500",
        lightColor: "from-blue-100 to-cyan-100",
        accentColor: "bg-blue-500",
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "Word Builder",
        emoji: "🧩",
        description: "Build words using letters",
        color: "from-purple-500 to-pink-500",
        lightColor: "from-purple-100 to-pink-100",
        accentColor: "bg-purple-500",
        difficulty: "Hard"
    },
];

const GameSelect = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    // 🔐 Protect Route
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    // 🚪 Logout
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handlePlay = (gameId) => {
        navigate("/play", { state: { gameId } });
    };

    // ⏳ Loading Screen
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVars = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const headerVars = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* User Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-end"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3 flex items-center gap-4 border border-purple-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-700 font-medium hidden sm:inline">
                                {user?.email}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-xl transition-colors duration-200 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Header Section */}
                <motion.div
                    variants={headerVars}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-block mb-4"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-5xl shadow-lg transform rotate-12">
                            🎮
                        </div>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        Choose Your Adventure
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Pick a game to start your learning journey
                    </p>
                </motion.div>

                {/* Game Cards Grid */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                    {games.map((game) => (
                        <motion.div
                            key={game.id}
                            variants={cardVars}
                            onHoverStart={() => setHoveredCard(game.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="relative group"
                        >
                            {/* Card Glow Effect */}
                            <motion.div
                                className={`absolute -inset-1 bg-gradient-to-r ${game.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                            />

                            {/* Main Card */}
                            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                {/* Decorative Background Pattern */}
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${game.lightColor} rounded-full blur-3xl opacity-40 -mr-20 -mt-20`} />

                                {/* Content */}
                                <div className="relative p-8">
                                    {/* Difficulty Badge */}
                                    <div className="absolute top-6 right-6">
                                        <span className={`${game.accentColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                            {game.difficulty}
                                        </span>
                                    </div>

                                    {/* Emoji Icon */}
                                    <motion.div
                                        animate={{
                                            rotate: hoveredCard === game.id ? [0, -10, 10, -10, 0] : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="text-7xl mb-6"
                                    >
                                        {game.emoji}
                                    </motion.div>

                                    {/* Title & Description */}
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                        {game.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        {game.description}
                                    </p>

                                    {/* Play Button */}
                                    <motion.button
                                        onClick={() => handlePlay(game.id)}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                                    >
                                        <span>Play Now</span>
                                        <motion.span
                                            animate={{ x: hoveredCard === game.id ? 5 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.button>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-purple-100">
                        <div className="flex items-center justify-center gap-4">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="text-5xl"
                            >
                                🎯
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    New games added every week
                                </h3>
                                <p className="text-gray-600">
                                    Keep checking back for more fun learning adventures!
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Decorative Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="fixed top-20 left-10 text-6xl opacity-20 pointer-events-none hidden lg:block"
                >
                    ⭐
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="fixed bottom-20 right-10 text-6xl opacity-20 pointer-events-none hidden lg:block"
                >
                    🌟
                </motion.div>
            </div>
        </div>
    );
};

export default GameSelect;