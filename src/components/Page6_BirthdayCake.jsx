import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navigation from './Navigation'

const Page6_BirthdayCake = () => {
  const navigate = useNavigate()
  const [candlesLit, setCandlesLit] = useState(Array(26).fill(true))
  const [showInstructions, setShowInstructions] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const litCount = candlesLit.filter(lit => lit).length

  const toggleCandle = (index) => {
    if (candlesLit[index]) {
      setCandlesLit(prev => {
        const newState = [...prev]
        newState[index] = false
        return newState
      })
    }
  }

  useEffect(() => {
    if (litCount === 0 && !showMessage) {
      setShowInstructions(false)
      // Launch celebration
      setTimeout(() => {
        const duration = 3000
        const animationEnd = Date.now() + duration

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now()
          if (timeLeft <= 0) {
            clearInterval(interval)
            setShowMessage(true)
            return
          }

          confetti({
            particleCount: 50,
            angle: 90,
            spread: 45,
            origin: { x: Math.random(), y: 0.8 },
            colors: ['#FFD700', '#FF69B4', '#FF1493', '#9370DB']
          })
        }, 250)
      }, 500)
    }
  }, [litCount, showMessage])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center p-6 pt-20">
      <Navigation />

      {/* Simplified Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Instructions */}
      {showInstructions && litCount > 0 && (
        <motion.div
          className="mb-8 text-center z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg rounded-3xl px-8 py-6 shadow-2xl border-2 border-gold/50">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-gold to-amber-300 bg-clip-text mb-3">
              Make a wish ✨
            </h2>
            <p className="text-xl md:text-2xl text-white mb-2 font-semibold">
              Tap candles to blow them out! 🎂
            </p>
          </div>
        </motion.div>
      )}

      {/* Cake Container */}
      <div className="relative z-10">
        {/* Top Tier Candles (6 candles) */}
        <div className="flex justify-center gap-4 mb-2">
          {candlesLit.slice(0, 6).map((isLit, index) => (
            <div
              key={`top-${index}`}
              onClick={() => toggleCandle(index)}
              className="cursor-pointer transform transition-transform hover:scale-110"
            >
              <div className="flex justify-center mb-1 h-8">
                {isLit && (
                  <div
                    className="w-4 h-6 rounded-full animate-pulse"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 50%, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 152, 0, 0.8))',
                      animationDuration: '0.5s'
                    }}
                  />
                )}
              </div>
              <div className="w-3 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-sm relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-gray-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Tier */}
        <div className="w-80 h-20 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-3xl relative shadow-2xl mb-[-4px] mx-auto">
          <div className="absolute top-0 left-0 right-0 flex justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-6 h-6 bg-white rounded-full transform -translate-y-1/2" />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-3 text-2xl">
            {['⭐', '💕', '⭐', '💕'].map((emoji, i) => (
              <span key={i}>{emoji}</span>
            ))}
          </div>
        </div>

        {/* Bottom Tier Candles (20 candles) */}
        <div className="flex justify-center gap-2 mb-2">
          {candlesLit.slice(6, 26).map((isLit, index) => (
            <div
              key={`bottom-${index}`}
              onClick={() => toggleCandle(index + 6)}
              className="cursor-pointer transform transition-transform hover:scale-110"
            >
              <div className="flex justify-center mb-1 h-8">
                {isLit && (
                  <div
                    className="w-4 h-6 rounded-full animate-pulse"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 50%, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 152, 0, 0.8))',
                      animationDuration: '0.5s'
                    }}
                  />
                )}
              </div>
              <div className="w-3 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-sm relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-gray-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tier */}
        <div className="w-full max-w-2xl h-32 bg-gradient-to-b from-pink-500 to-pink-600 rounded-b-3xl shadow-2xl relative mx-auto">
          <div className="absolute top-0 left-0 right-0 flex justify-around">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-white rounded-full transform -translate-y-1/2" />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-4 text-3xl">
            {['🌸', '💕', '🌸', '💕', '🌸', '💕'].map((emoji, i) => (
              <span key={i}>{emoji}</span>
            ))}
          </div>
        </div>

        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[680px] h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-xl" />

        {/* Large "26" Display */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div
            className="text-7xl font-bold animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255,215,0,0.5)',
              filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))'
            }}
          >
            26
          </div>
        </div>
      </div>

      {/* Candles Counter */}
      {litCount > 0 && (
        <motion.div
          className="mt-12 z-20"
          key={litCount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold/95 to-amber-400/95 backdrop-blur-md rounded-full shadow-2xl border-2 border-white/40">
            <span className="text-3xl">🕯️</span>
            <span className="text-2xl md:text-3xl font-bold text-purple-900">
              {litCount} {litCount === 1 ? 'candle' : 'candles'} left
            </span>
          </div>
        </motion.div>
      )}

      {/* Celebration Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Falling Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{ left: `${Math.random() * 100}%`, top: '-10%' }}
                  animate={{
                    y: ['0vh', '110vh'],
                    x: [0, (Math.random() - 0.5) * 100],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {['🎉', '🎊', '✨', '💖', '⭐', '🌟'][i % 6]}
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 max-w-4xl text-center">
              <motion.div
                className="text-8xl mb-8 animate-bounce"
                style={{ animationDuration: '2s' }}
              >
                🎂
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 px-4"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                May all your wishes come true ✨
              </motion.h1>

              <motion.p
                className="text-3xl md:text-4xl text-transparent bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Starting with mine
              </motion.p>

              <motion.p
                className="text-4xl md:text-5xl text-white font-bold mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Another year with you ❤️
              </motion.p>

              <motion.button
                onClick={() => navigate('/gift')}
                className="px-12 py-6 bg-gradient-to-r from-gold via-amber-400 to-gold rounded-full text-2xl font-bold shadow-2xl hover:scale-110 transition-transform"
                style={{ color: '#1a0033' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                Continue to Your Gift →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page6_BirthdayCake
