import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navigation from './Navigation'
import { facts, birthdayFacts } from '../data/birthdayFacts'
import { personalInfo } from '../data/personalInfo'

const Page2_BirthdayFacts = () => {
  const navigate = useNavigate()
  const audioRef = useRef(null)
  const [showCalendar, setShowCalendar] = useState(true)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [calendarMonth, setCalendarMonth] = useState(1)
  const [calendarFlipping, setCalendarFlipping] = useState(false)

  // Calendar flip animation
  useEffect(() => {
    if (showCalendar) {
      // Start flipping after 1 second
      setTimeout(() => {
        setCalendarFlipping(true)
      }, 1000)

      setTimeout(() => {
        setCalendarMonth(2) // Flip to February
      }, 1500)

      // After calendar lands on Feb 17, show confetti and transition to facts
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98']
        })
        setTimeout(() => setShowCalendar(false), 1500)
      }, 2500)
    }
  }, [showCalendar])

  // Auto-advance facts
  useEffect(() => {
    if (!showCalendar && currentFactIndex < facts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentFactIndex(prev => prev + 1)
      }, 4000) // Increased to 4 seconds for better reading
      return () => clearTimeout(timer)
    }
  }, [currentFactIndex, showCalendar])

  // Background music
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err)
        })
      }
    }

    playAudio()

    const handleInteraction = () => {
      playAudio()
      document.removeEventListener('click', handleInteraction)
    }
    document.addEventListener('click', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const handleNext = () => {
    if (currentFactIndex < facts.length - 1) {
      setCurrentFactIndex(prev => prev + 1)
    }
  }

  const handleHeartClick = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB']
    })
    setTimeout(() => navigate('/countdown'), 500)
  }

  const currentFact = facts[currentFactIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE5EC] to-[#FFD6E8] flex flex-col items-center justify-center p-6 relative overflow-hidden pt-16">
      <Navigation />

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/audio/pages-1-3-shared.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            animate={{
              y: ['110vh', '-10vh'],
              rotate: [0, 360],
              x: [0, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-pink-300 rounded-full blur-[100px] opacity-30" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-300 rounded-full blur-[120px] opacity-20" />
      </div>

      <AnimatePresence mode="wait">
        {showCalendar ? (
          /* Enhanced Calendar Flip Animation */
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            {/* Sparkles around calendar */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 150}px`,
                  top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 150}px`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 2.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                ✨
              </motion.div>
            ))}

            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,105,180,0.1)'
              }}
              animate={calendarFlipping ? {
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-pink-300 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-300 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-pink-300 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-300 rounded-br-3xl" />

              {/* Calendar Header */}
              <motion.div
                className="text-gray-600 text-2xl md:text-3xl mb-8 font-bold tracking-wider"
                animate={calendarFlipping ? { opacity: [1, 0, 1] } : {}}
              >
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {calendarMonth === 1 ? 'January' : 'February'} 2000
                </span>
              </motion.div>

              {/* Date Display */}
              <motion.div
                className="relative"
                animate={calendarMonth === 2 ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Glow effect */}
                {calendarMonth === 2 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-red-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
                  17
                </div>
              </motion.div>

              {/* Day of Week */}
              <motion.div
                className="text-gray-500 text-2xl md:text-3xl mt-6 font-semibold"
                animate={calendarMonth === 2 ? {
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {birthdayFacts.dayOfWeek}
              </motion.div>

              {/* Special day badge */}
              {calendarMonth === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring' }}
                  className="mt-6 inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg font-bold shadow-lg"
                >
                  A Star Was Born ⭐
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Enhanced Facts Display */
          <motion.div
            key="facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-3xl relative z-10"
          >
            {/* Fact Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="relative"
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 relative overflow-hidden"
                  style={{
                    borderColor: currentFact.interactive ? '#FF69B4' : '#E9D5FF',
                    background: currentFact.interactive
                      ? 'linear-gradient(135deg, #FFE5EC 0%, #FFB6D9 50%, #FFC2E0 100%)'
                      : 'rgba(255, 255, 255, 0.95)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  animate={currentFact.interactive ? {
                    boxShadow: [
                      '0 20px 40px rgba(255,105,180,0.3)',
                      '0 25px 50px rgba(255,105,180,0.5)',
                      '0 20px 40px rgba(255,105,180,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-pink-300"
                        style={{
                          width: `${Math.random() * 100 + 50}px`,
                          height: `${Math.random() * 100 + 50}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="text-7xl md:text-8xl mb-8 text-center relative"
                    animate={
                      currentFact.animation === 'heartBeat'
                        ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 10, -10, 0]
                          }
                        : {
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }
                    }
                    transition={
                      currentFact.animation === 'heartBeat'
                        ? { duration: 1.5, repeat: Infinity }
                        : { duration: 2, repeat: Infinity }
                    }
                  >
                    {currentFact.icon}

                    {/* Glow effect for icon */}
                    <motion.div
                      className="absolute inset-0 blur-2xl"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        background: currentFact.interactive
                          ? 'radial-gradient(circle, rgba(255,105,180,0.6) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)'
                      }}
                    />
                  </motion.div>

                  {/* Text */}
                  <h2 className="relative text-2xl md:text-4xl font-bold text-[#2C3E50] text-center mb-6 leading-relaxed">
                    {currentFact.text}
                  </h2>

                  {/* Subtext */}
                  {currentFact.subtext && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative text-lg md:text-2xl text-gray-600 text-center leading-relaxed"
                    >
                      {currentFact.subtext}
                    </motion.p>
                  )}

                  {/* Interactive Heart Button */}
                  {currentFact.interactive && (
                    <motion.button
                      onClick={handleHeartClick}
                      className="relative mt-8 w-full py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-2xl text-2xl font-bold shadow-xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          '0 10px 30px rgba(255,105,180,0.4)',
                          '0 15px 40px rgba(255,105,180,0.6)',
                          '0 10px 30px rgba(255,105,180,0.4)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Button glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        Continue to Our Journey ❤️
                      </span>
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Progress Dots */}
            <div className="flex justify-center gap-3 mb-8">
              {facts.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentFactIndex
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-12 shadow-lg'
                      : index < currentFactIndex
                      ? 'bg-pink-300 w-3'
                      : 'bg-gray-300 w-3'
                  }`}
                  onClick={() => index < currentFactIndex && setCurrentFactIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  animate={index === currentFactIndex ? {
                    boxShadow: [
                      '0 0 10px rgba(255,105,180,0.5)',
                      '0 0 20px rgba(255,105,180,0.8)',
                      '0 0 10px rgba(255,105,180,0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Next Button (if not on last fact) */}
            {!currentFact.interactive && (
              <div className="text-center">
                <motion.button
                  onClick={handleNext}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Next
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page2_BirthdayFacts
