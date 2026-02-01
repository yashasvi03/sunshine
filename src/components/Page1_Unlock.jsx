import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/animations.css'

const Page1_Unlock = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [stars, setStars] = useState([])

  // Generate random stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    }))
    setStars(generatedStars)
  }, [])

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
        onComplete()
      }, 4000)
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-deep-purple to-navy-blue flex items-center justify-center">
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s infinite ${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!isTransitioning ? (
          <>
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-display text-gold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              A Special Day Deserves a Special Code
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-white mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Enter the magic number to begin...
            </motion.p>

            {/* Input Form */}
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
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter the code"
                className={`
                  w-64 px-6 py-4 text-center text-2xl rounded-lg
                  bg-white text-gray-800 font-bold
                  outline-none transition-all duration-300
                  ${showError
                    ? 'ring-4 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    : isCorrect
                      ? 'ring-4 ring-gold shadow-[0_0_30px_rgba(255,215,0,0.8)]'
                      : 'shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  }
                `}
                autoFocus
                maxLength="4"
              />

              {/* Error Message */}
              <AnimatePresence>
                {showError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 mt-4 text-lg"
                  >
                    Not quite, try the day she was born
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Hint */}
              {!showError && !isCorrect && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-gray-400 text-sm mt-6"
                >
                  Hint: The day magic happened
                </motion.p>
              )}
            </motion.form>
          </>
        ) : (
          /* Success Animation */
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-display text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Happy 26th Birthday
            </motion.h1>
            <motion.p
              className="text-3xl md:text-4xl text-rose-gold mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              [Her Name]
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* Golden Particles on Success */}
      {isCorrect && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full"
              initial={{
                x: '50vw',
                y: '50vh',
                opacity: 1,
                scale: 0
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                opacity: 0,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.02,
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
