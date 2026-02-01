import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { reasons } from '../data/reasons'

const Page4_26Reasons = ({ onComplete }) => {
  const [balloons, setBalloons] = useState([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [activeReason, setActiveReason] = useState(null)
  const [allComplete, setAllComplete] = useState(false)

  // Initialize balloons with random positions
  useEffect(() => {
    const initialBalloons = reasons.map((reason, index) => ({
      ...reason,
      x: 10 + (Math.random() * 80), // Random x position (10-90%)
      y: 10 + (Math.random() * 70), // Random y position (10-80%)
      size: 80 + (index < 10 ? 20 : 0), // Larger for early numbers
      bobSpeed: 2 + Math.random() * 2, // Random bob speed (2-4s)
      bobDelay: Math.random() * 2, // Random delay
      sway: Math.random() * 20 - 10, // Random sway (-10 to 10px)
      isPopped: false
    }))
    setBalloons(initialBalloons)
  }, [])

  // Check if all balloons are popped
  useEffect(() => {
    if (poppedCount === 26) {
      setTimeout(() => {
        setAllComplete(true)
        // Create heart shape with confetti
        createHeartConfetti()
      }, 500)
    }
  }, [poppedCount])

  const handleBalloonClick = (balloonId) => {
    const balloon = balloons.find(b => b.id === balloonId)
    if (balloon && !balloon.isPopped) {
      // Pop balloon
      setBalloons(prev =>
        prev.map(b =>
          b.id === balloonId ? { ...b, isPopped: true } : b
        )
      )

      // Confetti burst
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { x: balloon.x / 100, y: balloon.y / 100 },
        colors: [balloon.color]
      })

      // Show reason card
      setTimeout(() => {
        setActiveReason(balloon)
        setPoppedCount(prev => prev + 1)
      }, 300)
    }
  }

  const closeReasonCard = () => {
    setActiveReason(null)
  }

  const createHeartConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      })
    }, 250)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 p-6">
      {/* Counter */}
      <div className="absolute top-6 left-0 right-0 text-center z-20">
        <motion.div
          className="inline-block bg-white rounded-full px-6 py-3 shadow-lg"
          key={poppedCount}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-2xl font-bold text-purple-600">
            {poppedCount}/26 reasons discovered
          </span>
        </motion.div>
      </div>

      {/* Balloons */}
      <div className="relative h-screen">
        {balloons.map((balloon) =>
          !balloon.isPopped ? (
            <motion.div
              key={balloon.id}
              className="absolute cursor-pointer"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.2}px`,
              }}
              animate={{
                y: [0, balloon.sway, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: balloon.bobSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: balloon.bobDelay
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleBalloonClick(balloon.id)}
            >
              {/* Balloon */}
              <motion.div
                className="relative"
                whileHover={{ y: -10 }}
              >
                {/* Balloon Shape */}
                <svg
                  viewBox="0 0 100 120"
                  className="drop-shadow-lg"
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Balloon body */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="40"
                    ry="50"
                    fill={balloon.color}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                  />
                  {/* Highlight */}
                  <ellipse
                    cx="40"
                    cy="35"
                    rx="15"
                    ry="20"
                    fill="rgba(255,255,255,0.4)"
                  />
                  {/* Knot */}
                  <path
                    d="M 50 100 Q 45 105 50 110"
                    fill={balloon.color}
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="1"
                  />
                </svg>

                {/* Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold drop-shadow-md">
                    {balloon.id}
                  </span>
                </div>

                {/* String */}
                <div
                  className="absolute left-1/2 top-full w-0.5 bg-gray-400 origin-top"
                  style={{
                    height: '40px',
                    transform: 'translateX(-50%)'
                  }}
                />
              </motion.div>
            </motion.div>
          ) : null
        )}
      </div>

      {/* Reason Card Modal */}
      <AnimatePresence>
        {activeReason && !allComplete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReasonCard}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl"
              style={{
                borderColor: activeReason.color,
                borderWidth: '6px',
                borderStyle: 'solid'
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reason Number */}
              <div
                className="text-center text-6xl font-bold mb-6"
                style={{ color: activeReason.color }}
              >
                Reason #{activeReason.id}
              </div>

              {/* Reason Text */}
              <p className="text-2xl md:text-3xl text-gray-800 text-center font-semibold mb-8">
                "{activeReason.text}"
              </p>

              {/* Tap to Continue */}
              <div className="text-center">
                <button
                  onClick={closeReasonCard}
                  className="px-8 py-4 rounded-full text-white text-lg font-bold transition-transform hover:scale-105"
                  style={{ backgroundColor: activeReason.color }}
                >
                  Tap to continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Complete - Heart Message */}
      <AnimatePresence>
        {allComplete && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-pink-300 to-purple-300 flex flex-col items-center justify-center z-40 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Heart */}
            <motion.div
              className="text-9xl mb-8"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
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
              className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              And infinity more reasons to come...
            </motion.h1>

            {/* Continue Button */}
            <motion.button
              onClick={onComplete}
              className="mt-8 px-10 py-5 bg-white text-purple-600 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page4_26Reasons
