import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const Page6_BirthdayCake = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(Array(26).fill(true))
  const [showInstructions, setShowInstructions] = useState(true)
  const [celebrationStarted, setCelebrationStarted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [micPermission, setMicPermission] = useState('pending')

  const litCount = candlesLit.filter(lit => lit).length

  // Try to request microphone permission
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setMicPermission('granted')
          setupMicrophoneDetection(stream)
        })
        .catch(() => {
          setMicPermission('denied')
        })
    } else {
      setMicPermission('denied')
    }
  }, [])

  const setupMicrophoneDetection = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const microphone = audioContext.createMediaStreamSource(stream)
    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    microphone.connect(analyser)
    analyser.fftSize = 256

    const checkAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length

      // Blow detection threshold
      if (average > 35 && litCount > 0) {
        blowOutRandomCandles(3) // Blow out 3 candles at a time
      }

      if (litCount > 0) {
        requestAnimationFrame(checkAudioLevel)
      }
    }

    checkAudioLevel()
  }

  const blowOutRandomCandles = (count) => {
    setCandlesLit(prev => {
      const litIndices = prev.map((lit, i) => lit ? i : -1).filter(i => i !== -1)
      const newCandles = [...prev]

      for (let i = 0; i < Math.min(count, litIndices.length); i++) {
        const randomIndex = litIndices[Math.floor(Math.random() * litIndices.length)]
        newCandles[randomIndex] = false
        litIndices.splice(litIndices.indexOf(randomIndex), 1)
      }

      return newCandles
    })
  }

  const handleCandleClick = (index) => {
    if (candlesLit[index]) {
      setCandlesLit(prev => {
        const newCandles = [...prev]
        newCandles[index] = false
        return newCandles
      })
    }
  }

  // Start celebration when all candles are out
  useEffect(() => {
    if (litCount === 0 && !celebrationStarted) {
      setShowInstructions(false)
      startCelebration()
    }
  }, [litCount, celebrationStarted])

  const startCelebration = () => {
    setCelebrationStarted(true)

    // Pause briefly
    setTimeout(() => {
      // Fireworks sequence
      launchFireworks()

      // Show message
      setTimeout(() => {
        setShowMessage(true)
      }, 2000)
    }, 500)
  }

  const launchFireworks = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        // Final confetti shower
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return
      }

      // Random firework
      confetti({
        particleCount: 50,
        angle: 90,
        spread: 45,
        origin: { x: Math.random(), y: 0.8 },
        colors: [colors[Math.floor(Math.random() * colors.length)]],
        gravity: 0.8,
        scalar: 1.2
      })
    }, 500)
  }

  // Candle positions - top tier (6 candles)
  const topTierPositions = [
    { x: 50, y: 35, angle: 0 },
    { x: 65, y: 40, angle: 60 },
    { x: 65, y: 55, angle: 120 },
    { x: 50, y: 60, angle: 180 },
    { x: 35, y: 55, angle: 240 },
    { x: 35, y: 40, angle: 300 }
  ]

  // Bottom tier (20 candles)
  const bottomTierPositions = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360
    const radius = 20
    return {
      x: 50 + radius * Math.cos((angle * Math.PI) / 180),
      y: 72 + radius * Math.sin((angle * Math.PI) / 180) * 0.5,
      angle
    }
  })

  const allCandlePositions = [...topTierPositions, ...bottomTierPositions]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center p-6">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#FFD700' : '#FFF',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? '#FFD700' : '#FFF'}`
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.1,
              repeat: Infinity
            }}
          />
        ))}

        {/* Floating sparkles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Decorative glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600 rounded-full blur-[130px] opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Enhanced Instructions */}
      {showInstructions && litCount > 0 && (
        <motion.div
          className="absolute top-8 md:top-12 left-0 right-0 text-center z-20 px-4"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-lg rounded-3xl px-8 py-6 shadow-2xl border-2 border-gold/30"
            animate={{
              boxShadow: [
                '0 10px 40px rgba(255,215,0,0.3)',
                '0 15px 50px rgba(255,215,0,0.5)',
                '0 10px 40px rgba(255,215,0,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-gold to-amber-300 bg-clip-text mb-4"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Close your eyes ✨
            </motion.h2>
            <motion.p
              className="text-xl md:text-3xl text-white mb-2 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Make a wish 💫
            </motion.p>
            <motion.p
              className="text-lg md:text-2xl text-pink-200 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              And blow! 🎂
            </motion.p>
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 rounded-full text-sm md:text-base text-gold font-semibold"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {micPermission === 'granted' ? (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎤
                  </motion.span>
                  Blow into your microphone
                </>
              ) : (
                <>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    👆
                  </motion.span>
                  Tap candles to blow them out
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Cake Container */}
      <motion.div
        className="relative z-10"
        style={{ width: '400px', height: '500px', perspective: '1000px' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        {/* Decorative sparkles around cake */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360
          const radius = 180
          return (
            <motion.div
              key={`cake-sparkle-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}px`,
                top: `${250 + radius * Math.sin((angle * Math.PI) / 180)}px`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              ✨
            </motion.div>
          )
        })}

        {/* Bottom Tier */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 overflow-visible"
          style={{
            width: '300px',
            height: '120px',
            borderRadius: '15px'
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          {/* Main cake layer */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)',
              boxShadow: litCount === 0
                ? '0 20px 60px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.4), inset 0 -5px 20px rgba(0,0,0,0.2)'
                : '0 20px 40px rgba(0,0,0,0.4), inset 0 -5px 20px rgba(0,0,0,0.2)',
              border: '4px solid #FFE4E1'
            }}
          >
            {/* Glow animation when all candles out */}
            {litCount === 0 && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Frosting wave on top */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />

          {/* Decorative frosting drops */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${(i / 12) * 100}%`,
                width: '24px',
                height: '18px',
                borderRadius: '12px 12px 0 0',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
              }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          ))}

          {/* Decorative hearts on cake */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${15 + i * 14}%`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity
              }}
            >
              💕
            </motion.div>
          ))}
        </motion.div>

        {/* Top Tier */}
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
          style={{
            width: '180px',
            height: '80px',
            borderRadius: '12px'
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          {/* Main cake layer */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #FFB6D9 0%, #FF69B4 50%, #FF1493 100%)',
              boxShadow: litCount === 0
                ? '0 15px 40px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.3), inset 0 -4px 15px rgba(0,0,0,0.2)'
                : '0 15px 30px rgba(0,0,0,0.4), inset 0 -4px 15px rgba(0,0,0,0.2)',
              border: '3px solid #FFE4E1'
            }}
          >
            {/* Glow animation */}
            {litCount === 0 && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            )}
          </div>

          {/* Frosting wave */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl" />

          {/* Decorative frosting drops */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${(i / 8) * 100}%`,
                width: '20px',
                height: '14px',
                borderRadius: '10px 10px 0 0',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.3)'
              }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.7 + i * 0.05 }}
            />
          ))}

          {/* Decorative stars */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-lg"
              style={{
                left: `${20 + i * 20}%`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity
              }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>

        {/* Candles */}
        {allCandlePositions.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute cursor-pointer z-20"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.02, type: 'spring' }}
            onClick={() => handleCandleClick(index)}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence>
              {candlesLit[index] && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    y: -20,
                    transition: { duration: 0.4 }
                  }}
                >
                  {/* Candle Stick with gradient and stripes */}
                  <div
                    className="relative mx-auto rounded-sm overflow-hidden"
                    style={{
                      width: '10px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #FFE5B4 0%, #FFD700 50%, #FFA500 100%)',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
                    }}
                  >
                    {/* Spiral stripe effect */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 6px)'
                      }}
                    />
                    {/* Candle wick */}
                    <div
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-800"
                    />
                  </div>

                  {/* Enhanced Flame */}
                  <motion.div
                    className="relative -mt-3 mx-auto"
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      y: [0, -2, 1, -1, 0],
                      rotate: [0, -3, 3, -2, 0]
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ width: '16px', height: '24px' }}
                  >
                    {/* Outer glow */}
                    <div
                      className="absolute -inset-4 rounded-full opacity-40"
                      style={{
                        background: 'radial-gradient(circle, #ff9800 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                    />
                    {/* Outer flame */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(ellipse 50% 70% at 50% 60%, #ffeb3b 0%, #ff9800 35%, #ff5722 70%, #d32f2f 100%)',
                        filter: 'blur(1px)',
                        borderRadius: '50% 50% 20% 20%'
                      }}
                    />
                    {/* Middle flame */}
                    <div
                      className="absolute inset-1"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 50%, #fff59d 0%, #ffeb3b 60%, #ff9800 100%)',
                        filter: 'blur(0.5px)',
                        borderRadius: '50% 50% 30% 30%'
                      }}
                    />
                    {/* Inner bright core */}
                    <div
                      className="absolute inset-2"
                      style={{
                        background: 'radial-gradient(circle, #ffffff 0%, #fff59d 50%, transparent 100%)',
                        borderRadius: '50%'
                      }}
                    />
                  </motion.div>

                  {/* Candle light glow on cake */}
                  <div
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 pointer-events-none"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'radial-gradient(circle, rgba(255,235,59,0.3) 0%, transparent 70%)',
                      filter: 'blur(8px)'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Enhanced Candles Left Counter */}
        {litCount > 0 && litCount < 26 && (
          <motion.div
            className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2"
            key={litCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/90 to-amber-400/90 backdrop-blur-md rounded-full shadow-2xl border-2 border-white/30"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 5px 20px rgba(255,215,0,0.5)',
                  '0 8px 30px rgba(255,215,0,0.8)',
                  '0 5px 20px rgba(255,215,0,0.5)'
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <motion.span
                className="text-2xl"
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🕯️
              </motion.span>
              <span className="text-xl md:text-2xl font-bold text-purple-900">
                {litCount} {litCount === 1 ? 'candle' : 'candles'} left
              </span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Celebration Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center z-30 p-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Celebration confetti particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute text-3xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                  }}
                  animate={{
                    y: ['0vh', '110vh'],
                    x: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    opacity: [1, 1, 0]
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

            {/* Decorative glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Floating hearts */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360
              const radius = 200
              return (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-4xl"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    rotate: [angle, angle + 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${-angle}deg) translateX(${radius}px)`
                    }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    >
                      💕
                    </motion.span>
                  </div>
                </motion.div>
              )
            })}

            <div className="relative z-10 max-w-4xl">
              {/* Main message */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15 }}
              >
                {/* Decorative stars */}
                <div className="flex justify-center gap-4 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl md:text-5xl"
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-3 leading-tight px-4"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto'
                  }}
                  animate={{
                    backgroundPosition: ['0% center', '200% center']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  May all your wishes come true ✨
                </motion.h1>
              </motion.div>

              {/* Subtitle message */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                {/* Decorative hearts */}
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(7)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl md:text-3xl"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.8 + i * 0.15,
                        repeat: Infinity
                      }}
                    >
                      💖
                    </motion.span>
                  ))}
                </div>

                <p className="text-xl md:text-3xl lg:text-4xl text-transparent bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-center mb-4 font-bold leading-relaxed px-4">
                  Starting with mine
                </p>
                <p className="text-2xl md:text-4xl lg:text-5xl text-white text-center font-bold px-4">
                  Another year with you ❤️
                </p>
              </motion.div>

              {/* Continue button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: 'spring' }}
              >
                <motion.button
                  onClick={onComplete}
                  className="relative px-12 py-6 bg-gradient-to-r from-gold via-amber-400 to-gold rounded-full text-xl md:text-2xl font-bold shadow-2xl overflow-hidden group"
                  style={{
                    color: '#1a0033',
                    backgroundSize: '200% auto'
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 20px 40px rgba(255,215,0,0.6)',
                    backgroundPosition: 'right center'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(255,215,0,0.4)',
                      '0 15px 40px rgba(255,215,0,0.6)',
                      '0 10px 30px rgba(255,215,0,0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-3">
                    Continue to Your Gift
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page6_BirthdayCake
