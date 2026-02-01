import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import '../styles/animations.css'

const Page1_Unlock = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [stars, setStars] = useState([])
  const [showHint, setShowHint] = useState(false)

  // Generate random stars with different sizes and colors
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 1.5,
      color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFF' : '#FFE4B5'
    }))
    setStars(generatedStars)
  }, [])

  // Show hint after 10 seconds if not unlocked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isCorrect) setShowHint(true)
    }, 10000)
    return () => clearTimeout(timer)
  }, [isCorrect])

  const handleSubmit = (e) => {
    e.preventDefault()
    const validCodes = ['17', '1702', '26']

    if (validCodes.includes(inputValue.trim())) {
      setIsCorrect(true)
      setShowError(false)

      // Start success animation sequence
      setTimeout(() => {
        setIsTransitioning(true)
      }, 1000)

      // Transition to next page after animation
      setTimeout(() => {
        navigate('/birthday-facts')
      }, 4500)
    } else {
      setShowError(true)
      setInputValue('')

      // Clear error after animation
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-deep-purple via-[#1a1a3e] to-navy-blue flex items-center justify-center">
      <Navigation />
      {/* Enhanced Twinkling Stars Background */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              animation: `twinkle ${star.duration}s infinite ${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {!isTransitioning && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 50}%`,
                left: '-5%',
                boxShadow: '0 0 4px 2px rgba(255,255,255,0.8)'
              }}
              animate={{
                x: ['0vw', '110vw'],
                y: ['0vh', '40vh'],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 4,
                repeat: Infinity,
                repeatDelay: 10,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {!isTransitioning ? (
          <>
            {/* Decorative hearts */}
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-6xl opacity-30">💝</span>
            </motion.div>

            {/* Title with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-gold mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                A Special Day
              </h1>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-rose-gold drop-shadow-[0_0_15px_rgba(183,110,121,0.5)]">
                  Deserves a Special Code
                </h2>
              </motion.div>
            </motion.div>

            {/* Subtitle with typewriter effect simulation */}
            <motion.p
              className="text-2xl md:text-3xl text-white mb-12 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Enter the magic number to begin your journey...
            </motion.p>

            {/* Enhanced Input Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                ...(showError && {
                  x: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
                })
              }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                {/* Glow effect behind input */}
                <motion.div
                  className="absolute inset-0 blur-xl"
                  animate={{
                    opacity: isCorrect ? [0.3, 0.8, 0.3] : [0.1, 0.2, 0.1],
                    scale: isCorrect ? [1, 1.2, 1] : [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: showError
                      ? 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)'
                      : isCorrect
                        ? 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                  }}
                />

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="••••"
                  className={`
                    relative w-80 px-8 py-6 text-center text-3xl md:text-4xl rounded-2xl
                    bg-white/10 backdrop-blur-md text-white font-bold
                    border-2 transition-all duration-300
                    placeholder-white/30
                    focus:outline-none focus:ring-4
                    ${showError
                      ? 'border-red-500 ring-4 ring-red-500/50 bg-red-500/20'
                      : isCorrect
                        ? 'border-gold ring-4 ring-gold/50 bg-gold/20'
                        : 'border-white/30 ring-white/20 focus:border-gold focus:ring-gold/30'
                    }
                  `}
                  autoFocus
                  maxLength="4"
                />
              </div>

              {/* Error Message with animation */}
              <AnimatePresence>
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 px-6 py-3 bg-red-500/20 border border-red-500 rounded-full backdrop-blur-sm"
                  >
                    <p className="text-red-300 text-lg font-semibold">
                      ✨ Not quite... try the day she was born
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint with subtle animation */}
              <AnimatePresence>
                {showHint && !showError && !isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 px-6 py-3 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm"
                  >
                    <p className="text-gray-300 text-base">
                      💡 Hint: The day magic happened... February 17th
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

            {/* Decorative elements */}
            <motion.div
              className="mt-16 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {['✨', '💫', '⭐'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </>
        ) : (
          /* Enhanced Success Animation */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="text-center"
          >
            {/* Celebration rings */}
            <motion.div className="relative">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-4 border-gold rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2, 3],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity
                  }}
                />
              ))}

              <motion.h1
                className="relative text-6xl md:text-8xl font-display text-gold mb-6"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,215,0,0.5)',
                    '0 0 40px rgba(255,215,0,0.8)',
                    '0 0 20px rgba(255,215,0,0.5)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Happy 26th
              </motion.h1>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-4xl md:text-6xl text-rose-gold font-display mb-4">
                Birthday
              </p>
            </motion.div>

            <motion.p
              className="text-5xl md:text-7xl text-white font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Shivani ✨
            </motion.p>

            {/* Floating hearts around name */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    left: `${50 + Math.cos((i / 12) * Math.PI * 2) * 40}%`,
                    top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: 0.5 + i * 0.1,
                    repeat: Infinity
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Golden Particles on Success */}
      {isCorrect && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                background: i % 2 === 0
                  ? 'linear-gradient(45deg, #FFD700, #FFA500)'
                  : 'linear-gradient(45deg, #FFE4B5, #FFD700)'
              }}
              initial={{
                x: '50vw',
                y: '50vh',
                opacity: 1,
                scale: 0
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                opacity: [1, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.015,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Page1_Unlock
