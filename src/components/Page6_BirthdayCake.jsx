import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navigation from './Navigation'

const Page6_BirthdayCake = () => {
  const navigate = useNavigate()
  const [candlesLit, setCandlesLit] = useState(Array(26).fill(true))
  const [showInstructions, setShowInstructions] = useState(true)
  const [celebrationStarted, setCelebrationStarted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [micPermission, setMicPermission] = useState('pending')

  const litCount = candlesLit.filter(lit => lit).length

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

      if (average > 35 && litCount > 0) {
        blowOutRandomCandles(3)
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

  useEffect(() => {
    if (litCount === 0 && !celebrationStarted) {
      setShowInstructions(false)
      startCelebration()
    }
  }, [litCount, celebrationStarted])

  const startCelebration = () => {
    setCelebrationStarted(true)
    setTimeout(() => {
      launchFireworks()
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
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return
      }

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center p-6 pt-16">
      <Navigation />
      
      {/* Background Stars */}
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

      {/* Instructions */}
      {showInstructions && litCount > 0 && (
        <motion.div
          className="absolute top-20 md:top-24 left-0 right-0 text-center z-20 px-4"
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
              animate={{ scale: [1, 1.05, 1] }}
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
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {micPermission === 'granted' ? (
                <>
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>🎤</motion.span>
                  Blow into your microphone
                </>
              ) : (
                <>
                  <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>👆</motion.span>
                  Tap candles to blow them out
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* SIMPLE 2-TIER CAKE WITH FIXED CANDLE POSITIONS */}
      <div className="relative z-10 flex items-center justify-center mt-8">
        {/* Bottom Tier */}
        <motion.div
          className="relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div
            className="rounded-2xl relative"
            style={{
              width: '300px',
              height: '120px',
              background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)',
              boxShadow: litCount === 0
                ? '0 20px 60px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.4), inset 0 -5px 20px rgba(0,0,0,0.2)'
                : '0 20px 40px rgba(0,0,0,0.4), inset 0 -5px 20px rgba(0,0,0,0.2)',
              border: '4px solid #FFE4E1'
            }}
          >
            {litCount === 0 && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
            
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
            
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${15 + i * 14}%`,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              >
                💕
              </motion.div>
            ))}
          </div>

          {/* Top Tier */}
          <motion.div
            className="absolute left-1/2 bottom-full mb-[-10px]"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <div
              className="rounded-xl relative"
              style={{
                width: '180px',
                height: '80px',
                background: 'linear-gradient(135deg, #FFB6D9 0%, #FF69B4 50%, #FF1493 100%)',
                boxShadow: litCount === 0
                  ? '0 15px 40px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.3), inset 0 -4px 15px rgba(0,0,0,0.2)'
                  : '0 15px 30px rgba(0,0,0,0.4), inset 0 -4px 15px rgba(0,0,0,0.2)',
                border: '3px solid #FFE4E1'
              }}
            >
              {litCount === 0 && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              )}
              
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl" />
              
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
              
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-lg"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
              ))}
            </div>

            {/* TOP TIER CANDLES - 6 candles in a circle */}
            <div className="absolute left-1/2 bottom-full" style={{ transform: 'translateX(-50%)' }}>
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * 360
                const radius = 60
                const x = radius * Math.cos((angle * Math.PI) / 180)
                const y = (radius * Math.sin((angle * Math.PI) / 180)) * 0.3
                
                return (
                  <motion.div
                    key={`top-${i}`}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.05, type: 'spring' }}
                    onClick={() => handleCandleClick(i)}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence>
                      {candlesLit[i] && <Candle />}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* BOTTOM TIER CANDLES - 20 candles in ellipse */}
          <div className="absolute left-1/2 bottom-full" style={{ transform: 'translateX(-50%)' }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * 360
              const radiusX = 140
              const radiusY = 35
              const x = radiusX * Math.cos((angle * Math.PI) / 180)
              const y = radiusY * Math.sin((angle * Math.PI) / 180)
              
              return (
                <motion.div
                  key={`bottom-${i}`}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.02, type: 'spring' }}
                  onClick={() => handleCandleClick(i + 6)}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {candlesLit[i + 6] && <Candle />}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Candles Left Counter */}
          {litCount > 0 && litCount < 26 && (
            <motion.div
              className="absolute left-1/2 top-full mt-8"
              style={{ transform: 'translateX(-50%)' }}
              key={litCount}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
                  animate={{ rotate: [0, 10, -10, 0] }}
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
      </div>

      {/* Celebration Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2C0735] to-[#3d1450] flex flex-col items-center justify-center z-30 p-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute text-3xl"
                  style={{ left: `${Math.random() * 100}%`, top: '-10%' }}
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

            <div className="relative z-10 max-w-4xl">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15 }}
              >
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
                      transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
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
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  May all your wishes come true ✨
                </motion.h1>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(7)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl md:text-3xl"
                      animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, delay: 0.8 + i * 0.15, repeat: Infinity }}
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

              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: 'spring' }}
              >
                <motion.button
                  onClick={() => navigate('/gift')}
                  className="relative px-12 py-6 bg-gradient-to-r from-gold via-amber-400 to-gold rounded-full text-xl md:text-2xl font-bold shadow-2xl overflow-hidden"
                  style={{ color: '#1a0033', backgroundSize: '200% auto' }}
                  whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(255,215,0,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
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

const Candle = () => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, y: -20, transition: { duration: 0.4 } }}
      className="relative"
    >
      <div
        className="relative mx-auto rounded-sm overflow-hidden"
        style={{
          width: '10px',
          height: '40px',
          background: 'linear-gradient(135deg, #FFE5B4 0%, #FFD700 50%, #FFA500 100%)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 6px)'
          }}
        />
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-800" />
      </div>

      <motion.div
        className="absolute left-1/2"
        style={{
          bottom: '100%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '24px'
        }}
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
      >
        <div
          className="absolute -inset-4 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #ff9800 0%, transparent 70%)',
            filter: 'blur(8px)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 70% at 50% 60%, #ffeb3b 0%, #ff9800 35%, #ff5722 70%, #d32f2f 100%)',
            filter: 'blur(1px)',
            borderRadius: '50% 50% 20% 20%'
          }}
        />
        <div
          className="absolute inset-1"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #fff59d 0%, #ffeb3b 60%, #ff9800 100%)',
            filter: 'blur(0.5px)',
            borderRadius: '50% 50% 30% 30%'
          }}
        />
        <div
          className="absolute inset-2"
          style={{
            background: 'radial-gradient(circle, #ffffff 0%, #fff59d 50%, transparent 100%)',
            borderRadius: '50%'
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Page6_BirthdayCake