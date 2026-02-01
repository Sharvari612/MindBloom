import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const games = [
    { 
        id: 1, 
        title: "Sound Catcher", 
        emoji: "🔊", 
        description: "Catch words with the right sound",
        color: "from-violet-500 to-purple-500",
        lightColor: "from-violet-100 to-purple-100"
    },
    { 
        id: 2, 
        title: "Letter Detective", 
        emoji: "🔎", 
        description: "Find the correct letters",
        color: "from-blue-500 to-cyan-500",
        lightColor: "from-blue-100 to-cyan-100"
    },
    { 
        id: 3, 
        title: "Word Builder", 
        emoji: "🧩", 
        description: "Build words using letters",
        color: "from-purple-500 to-pink-500",
        lightColor: "from-purple-100 to-pink-100"
    },
];

const GameSelect = () => {
    const navigate = useNavigate();

    const handlePlay = (gameId) => {
        navigate("/play", { state: { gameId } });
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
            <Navbar />

            {/* Subtle Background */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <motion.div 
                    animate={{ 
                        x: [0, 20, 0], 
                        y: [0, -15, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/50 to-transparent rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 pt-24 pb-16 px-6">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                        Choose Your Adventure
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Pick a game to start learning
                    </p>
                </motion.div>

                {/* Game Cards Grid */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            variants={cardVars}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative"
                        >
                            {/* Card Background Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${game.lightColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                            
                            {/* Card */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                {/* Emoji Circle */}
                                <div className="mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${game.lightColor} flex items-center justify-center shadow-md`}
                                    >
                                        <span className="text-5xl">{game.emoji}</span>
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                                    {game.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 text-center mb-6 min-h-[3rem]">
                                    {game.description}
                                </p>

                                {/* Play Button */}
                                <motion.button
                                    onClick={() => handlePlay(game.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Play Now
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </motion.button>

                                {/* Decorative Corner */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full opacity-50" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 shadow-md">
                        <span className="text-2xl">🎯</span>
                        <p className="text-gray-600 font-medium">
                            New games added every week
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GameSelect;