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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2C0735] to-[#1a0033] flex flex-col items-center justify-center p-6">
      {/* Instructions */}
      {showInstructions && litCount > 0 && (
        <motion.div
          className="absolute top-12 left-0 right-0 text-center z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-display text-gold mb-4">
            Close your eyes
          </h2>
          <p className="text-2xl md:text-3xl text-white mb-2">Make a wish</p>
          <p className="text-xl md:text-2xl text-white mb-6">And blow! 🎂</p>
          <p className="text-lg text-gray-400">
            {micPermission === 'granted'
              ? '🎤 Blow into your microphone'
              : 'Tap candles to blow them out'}
          </p>
        </motion.div>
      )}

      {/* Cake Container */}
      <div className="relative" style={{ width: '400px', height: '500px', perspective: '1000px' }}>
        {/* Bottom Tier */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          style={{
            width: '300px',
            height: '120px',
            background: 'linear-gradient(to bottom, #FFC0CB 0%, #FFB6C1 100%)',
            borderRadius: '15px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '3px solid #FFE4E1'
          }}
          animate={
            litCount === 0
              ? {
                  boxShadow: [
                    '0 20px 40px rgba(255,215,0,0.3)',
                    '0 20px 60px rgba(255,215,0,0.6)',
                    '0 20px 40px rgba(255,215,0,0.3)'
                  ]
                }
              : {}
          }
          transition={litCount === 0 ? { duration: 2, repeat: Infinity } : {}}
        >
          {/* Frosting Details */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-white opacity-30 rounded-t-lg" />
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-white opacity-20"
              style={{
                left: `${(i / 12) * 100}%`,
                width: '20px',
                height: '15px',
                borderRadius: '10px 10px 0 0'
              }}
            />
          ))}
        </motion.div>

        {/* Top Tier */}
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
          style={{
            width: '180px',
            height: '80px',
            background: 'linear-gradient(to bottom, #FFE4E1 0%, #FFC0CB 100%)',
            borderRadius: '12px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
            border: '3px solid #FFB6C1'
          }}
        >
          {/* Frosting Details */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-white opacity-30 rounded-t-lg" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-white opacity-20"
              style={{
                left: `${(i / 8) * 100}%`,
                width: '15px',
                height: '12px',
                borderRadius: '8px 8px 0 0'
              }}
            />
          ))}
        </motion.div>

        {/* Candles */}
        {allCandlePositions.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleCandleClick(index)}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence>
              {candlesLit[index] && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Candle Stick */}
                  <div
                    className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm mx-auto"
                    style={{
                      width: '8px',
                      height: '35px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  />

                  {/* Flame */}
                  <motion.div
                    className="relative -mt-2 mx-auto"
                    animate={{
                      scale: [1, 1.1, 0.9, 1.05, 1],
                      y: [0, -1, 1, -0.5, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ width: '12px', height: '20px' }}
                  >
                    {/* Outer flame */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #ffeb3b 0%, #ff9800 40%, #ff5722 100%)',
                        filter: 'blur(2px)'
                      }}
                    />
                    {/* Inner flame */}
                    <div
                      className="absolute inset-1 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #fff59d 0%, #ffeb3b 70%)',
                        filter: 'blur(1px)'
                      }}
                    />
                    {/* Glow */}
                    <div
                      className="absolute -inset-2 rounded-full opacity-50"
                      style={{
                        background: 'radial-gradient(circle, #ffeb3b 0%, transparent 70%)'
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Candles Left Counter */}
        {litCount > 0 && litCount < 26 && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-gold text-xl font-bold"
            key={litCount}
            animate={{ scale: [1, 1.3, 1] }}
          >
            {litCount} candles left
          </motion.div>
        )}
      </div>

      {/* Celebration Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#2C0735] to-[#1a0033] flex flex-col items-center justify-center z-30 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-display text-gold text-center mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              May all your wishes come true
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-rose-gold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Starting with mine - another year with you ❤️
            </motion.p>

            <motion.button
              onClick={onComplete}
              className="px-10 py-5 bg-gold text-[#1a0033] rounded-full text-xl font-bold shadow-2xl hover:bg-yellow-400 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 }}
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

export default Page6_BirthdayCake
