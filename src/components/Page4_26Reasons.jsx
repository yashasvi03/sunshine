import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { reasons } from '../data/reasons'

const Page4_26Reasons = ({ onComplete }) => {
  const [balloons, setBalloons] = useState([])
  const [poppedBalloons, setPoppedBalloons] = useState([])
  const [activeReason, setActiveReason] = useState(null)
  const [allComplete, setAllComplete] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)

  // Load popped balloons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('poppedBalloons')
    if (saved) {
      setPoppedBalloons(JSON.parse(saved))
    }

    // Hide instruction after 5 seconds
    setTimeout(() => setShowInstruction(false), 5000)
  }, [])

  // Initialize balloons with random positions
  useEffect(() => {
    const initialBalloons = reasons.map((reason, index) => ({
      ...reason,
      x: 8 + (Math.random() * 84), // Random x position (8-92%)
      y: 15 + (Math.random() * 70), // Random y position (15-85%)
      size: index < 10 ? 100 : 85, // Larger for early numbers
      bobSpeed: 3 + Math.random() * 2, // Random bob speed (3-5s)
      bobDelay: Math.random() * 2,
      sway: Math.random() * 15 - 7.5,
      rotation: Math.random() * 10 - 5
    }))
    setBalloons(initialBalloons)
  }, [])

  // Check if all balloons are popped
  useEffect(() => {
    if (poppedBalloons.length === 26) {
      setTimeout(() => {
        setAllComplete(true)
        createHeartConfetti()
      }, 500)
    }
  }, [poppedBalloons.length])

  // Save popped balloons to localStorage whenever it changes
  useEffect(() => {
    if (poppedBalloons.length > 0) {
      localStorage.setItem('poppedBalloons', JSON.stringify(poppedBalloons))
    }
  }, [poppedBalloons])

  const handleBalloonClick = (balloonId) => {
    const balloon = balloons.find(b => b.id === balloonId)
    if (balloon && !poppedBalloons.includes(balloonId)) {
      // Add to popped list
      setPoppedBalloons(prev => [...prev, balloonId])

      // Confetti burst at balloon location
      const balloonElement = document.getElementById(`balloon-${balloonId}`)
      if (balloonElement) {
        const rect = balloonElement.getBoundingClientRect()
        confetti({
          particleCount: 30,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: [balloon.color, '#FFD700', '#FF69B4']
        })
      }

      // Show reason card
      setTimeout(() => {
        setActiveReason(balloon)
      }, 300)
    }
  }

  const closeReasonCard = () => {
    setActiveReason(null)
  }

  const createHeartConfetti = () => {
    const duration = 4000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1bd']
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1bd']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all balloons? This cannot be undone.')) {
      setPoppedBalloons([])
      setAllComplete(false)
      localStorage.removeItem('poppedBalloons')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFE4F1] to-[#FFD6E8]">
      {/* Animated sky background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Clouds */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute w-32 h-16 bg-white/30 rounded-full blur-sm"
            style={{
              top: `${Math.random() * 60}%`,
              left: `-10%`
            }}
            animate={{
              x: ['0vw', '110vw']
            }}
            transition={{
              duration: 40 + Math.random() * 20,
              repeat: Infinity,
              delay: i * 5,
              ease: 'linear'
            }}
          />
        ))}

        {/* Birds */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`bird-${i}`}
            className="absolute text-2xl"
            style={{
              top: `${20 + Math.random() * 30}%`,
              left: '-5%'
            }}
            animate={{
              x: ['0vw', '110vw'],
              y: [0, -20, 0, 20, 0]
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 6,
              ease: 'linear'
            }}
          >
            🕊️
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Header with counter */}
      <motion.div
        className="relative z-20 pt-6 px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Progress Counter */}
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border-2 border-pink-300"
            animate={{
              boxShadow: [
                '0 10px 30px rgba(255,105,180,0.3)',
                '0 15px 40px rgba(255,105,180,0.5)',
                '0 10px 30px rgba(255,105,180,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">💝</span>
              <div>
                <div className="text-sm text-gray-600 font-medium">Reasons Discovered</div>
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                  key={poppedBalloons.length}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {poppedBalloons.length} / 26
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Reset Button - only show if some are popped */}
          {poppedBalloons.length > 0 && poppedBalloons.length < 26 && (
            <motion.button
              onClick={resetProgress}
              className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-300 hover:border-pink-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gray-700 font-medium">🔄 Reset</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Instruction */}
      <AnimatePresence>
        {showInstruction && poppedBalloons.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 left-0 right-0 text-center z-20"
          >
            <div className="inline-block bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border-2 border-pink-300">
              <p className="text-xl md:text-2xl font-bold text-purple-600">
                Tap the balloons to discover 26 reasons why you're incredible! 🎈
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balloons */}
      <div className="relative h-screen pt-32 pb-20">
        {balloons.map((balloon) => {
          const isPopped = poppedBalloons.includes(balloon.id)

          return !isPopped ? (
            <motion.div
              key={balloon.id}
              id={`balloon-${balloon.id}`}
              className="absolute cursor-pointer"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                width: `${balloon.size}px`,
                zIndex: 30 - balloon.id
              }}
              animate={{
                y: [0, balloon.sway, 0],
                rotate: [balloon.rotation, balloon.rotation + 3, balloon.rotation]
              }}
              transition={{
                duration: balloon.bobSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: balloon.bobDelay
              }}
              whileHover={{ scale: 1.15, rotate: 0, zIndex: 50 }}
              onClick={() => handleBalloonClick(balloon.id)}
            >
              {/* Balloon SVG */}
              <svg viewBox="0 0 100 140" className="drop-shadow-2xl filter">
                <defs>
                  <radialGradient id={`grad-${balloon.id}`} cx="30%" cy="30%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                    <stop offset="50%" style={{ stopColor: balloon.color, stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: balloon.color, stopOpacity: 1 }} />
                  </radialGradient>
                  <filter id={`shadow-${balloon.id}`}>
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>

                {/* Balloon body */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="38"
                  ry="48"
                  fill={`url(#grad-${balloon.id})`}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="1"
                  filter={`url(#shadow-${balloon.id})`}
                />

                {/* Highlight */}
                <ellipse
                  cx="38"
                  cy="35"
                  rx="12"
                  ry="18"
                  fill="rgba(255,255,255,0.6)"
                />

                {/* Small highlight */}
                <ellipse
                  cx="60"
                  cy="45"
                  rx="6"
                  ry="8"
                  fill="rgba(255,255,255,0.3)"
                />

                {/* Knot */}
                <path
                  d="M 50 98 Q 45 103 50 108"
                  fill={balloon.color}
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="1"
                  filter={`url(#shadow-${balloon.id})`}
                />

                {/* String */}
                <motion.line
                  x1="50"
                  y1="108"
                  x2="50"
                  y2="135"
                  stroke="rgba(100,100,100,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  animate={{
                    x2: [50, 48, 52, 50],
                    y2: [135, 137, 133, 135]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>

              {/* Number badge */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ top: '-8px' }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: balloon.bobDelay
                }}
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200">
                  <span className="text-2xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {balloon.id}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : null
        })}
      </div>

      {/* Reason Card Modal */}
      <AnimatePresence>
        {activeReason && !allComplete && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReasonCard}
          >
            <motion.div
              className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
              style={{
                border: `6px solid ${activeReason.color}`
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-5">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${Math.random() * 100 + 50}px`,
                      height: `${Math.random() * 100 + 50}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: activeReason.color
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              {/* Sparkle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  ✨
                </motion.div>
              ))}

              {/* Reason Number */}
              <motion.div
                className="text-center mb-6 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <div
                  className="inline-block text-8xl font-bold opacity-90"
                  style={{ color: activeReason.color }}
                >
                  {activeReason.id}
                </div>
                <div className="text-xl text-gray-600 font-semibold mt-2">
                  out of 26 reasons
                </div>
              </motion.div>

              {/* Reason Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <p className="text-2xl md:text-4xl font-bold text-gray-800 text-center leading-relaxed mb-8">
                  "{activeReason.text}"
                </p>
              </motion.div>

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <span
                  className="inline-block px-6 py-2 rounded-full text-white font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: activeReason.color }}
                >
                  {activeReason.category}
                </span>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={closeReasonCard}
                className="w-full py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white rounded-2xl text-xl font-bold shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative">Continue Discovering 💝</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Complete Screen */}
      <AnimatePresence>
        {allComplete && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-pink-300 via-rose-300 to-purple-300 flex flex-col items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Floating hearts everywhere */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, (Math.random() - 0.5) * 50, 0],
                  rotate: [0, 360],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              >
                💖
              </motion.div>
            ))}

            {/* Main message */}
            <motion.div
              className="relative z-10 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 1 }}
            >
              {/* Giant heart */}
              <motion.div
                className="text-9xl mb-8"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.div>

              {/* Message */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                All 26 Reasons Discovered!
              </motion.h1>

              <motion.p
                className="text-3xl md:text-4xl text-white/90 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                And infinity more reasons to come...
              </motion.p>

              {/* Continue Button */}
              <motion.button
                onClick={onComplete}
                className="px-12 py-6 bg-white text-purple-600 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Our Timeline ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page4_26Reasons
