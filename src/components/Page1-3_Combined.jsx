import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navigation from './Navigation'
import { facts, birthdayFacts } from '../data/birthdayFacts'
import { personalInfo } from '../data/personalInfo'
import '../styles/animations.css'

const Page1to3_Combined = () => {
  const navigate = useNavigate()
  const audioRef = useRef(null)

  // Page 1 - Unlock state
  const [inputValue, setInputValue] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showError, setShowError] = useState(false)
  const [stars, setStars] = useState([])
  const [showHint, setShowHint] = useState(false)

  // Page 2 - Birthday Facts state
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [calendarMonth, setCalendarMonth] = useState(1)
  const [calendarFlipping, setCalendarFlipping] = useState(false)

  // Page 3 - Countdown state
  const [showCountdown, setShowCountdown] = useState(false)
  const [timeData, setTimeData] = useState({ days: 0, hours: 0, minutes: 0 })
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // Words that orbit around the counter
  const floatingWords = [
    "laughs shared",
    "adventures taken",
    "inside jokes",
    "memories made",
    "dreams dreamed",
    "hands held",
    "late night talks",
    "morning coffees",
    "quiet moments",
    "loud celebrations"
  ]

  // Background music - plays throughout all 3 sections
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

  // Generate random stars for page 1
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
    if (!isCorrect) {
      const timer = setTimeout(() => setShowHint(true), 10000)
      return () => clearTimeout(timer)
    }
  }, [isCorrect])

  // Handle unlock submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validCodes = ['17', '1702', '26']

    if (validCodes.includes(inputValue.trim())) {
      setIsCorrect(true)
      setShowError(false)

      // Transition to Page 2 (Birthday Facts)
      setTimeout(() => {
        setShowCalendar(true)
      }, 2000)
    } else {
      setShowError(true)
      setInputValue('')
      setTimeout(() => setShowError(false), 1000)
    }
  }

  // Page 2 - Calendar flip animation
  useEffect(() => {
    if (showCalendar) {
      setTimeout(() => setCalendarFlipping(true), 1000)
      setTimeout(() => setCalendarMonth(2), 1500)

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98']
        })
        setTimeout(() => {
          setShowCalendar(false)
          setShowCountdown(true)
        }, 1500)
      }, 2500)
    }
  }, [showCalendar])

  // Page 2 - Auto-advance facts
  useEffect(() => {
    if (!showCalendar && isCorrect && !showCountdown && currentFactIndex < facts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentFactIndex(prev => prev + 1)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentFactIndex, showCalendar, isCorrect, showCountdown])

  // Page 3 - Calculate time difference
  useEffect(() => {
    if (showCountdown) {
      const calculateTime = () => {
        const meetingDate = new Date(personalInfo.yourRelationship.meetingDate)
        const currentDate = new Date()
        const diffTime = Math.abs(currentDate - meetingDate)

        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const hours = Math.floor(diffTime / (1000 * 60 * 60))
        const minutes = Math.floor(diffTime / (1000 * 60))

        setTimeData({ days, hours, minutes })
      }

      calculateTime()
      const interval = setInterval(calculateTime, 60000)

      // Show message after 5 seconds
      const messageTimer = setTimeout(() => {
        setShowMessage(true)
        setTimeout(() => setShowButton(true), 1000)
      }, 5000)

      return () => {
        clearInterval(interval)
        clearTimeout(messageTimer)
      }
    }
  }, [showCountdown])

  const handleHeartClick = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB']
    })
    setTimeout(() => navigate('/reasons'), 500)
  }

  // Component for individual digit with flip animation
  const FlipDigit = ({ digit, delay }) => {
    return (
      <motion.div
        className="inline-block bg-gradient-to-br from-purple-900 to-pink-900 text-gold text-4xl md:text-6xl lg:text-7xl font-bold px-3 md:px-5 py-4 md:py-6 rounded-2xl shadow-2xl mx-0.5 md:mx-1"
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: delay,
          type: "spring",
          stiffness: 100
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {digit}
      </motion.div>
    )
  }

  const FlipNumber = ({ number, delay }) => {
    const digits = number.toString().padStart(2, '0').split('')
    return (
      <div className="inline-flex flex-wrap justify-center">
        {digits.map((digit, index) => (
          <FlipDigit key={index} digit={digit} delay={delay + index * 0.1} />
        ))}
      </div>
    )
  }

  const currentFact = facts[currentFactIndex]

  return (
    <>
      {/* Background Music - Continuous across all 3 sections */}
      <audio ref={audioRef} loop>
        <source src="/audio/pages-1-3-shared.mp3" type="audio/mpeg" />
      </audio>

      {/* PAGE 1 - UNLOCK */}
      {!isCorrect && (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-deep-purple via-[#1a1a3e] to-navy-blue flex items-center justify-center pt-16">
          <Navigation />

          {/* Twinkling Stars Background */}
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

          {/* Main Content */}
          <motion.div
            className="relative z-10 text-center px-4 max-w-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Unlock Your Surprise
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`w-full max-w-md px-8 py-6 text-3xl md:text-4xl text-center bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-gold transition-all ${
                  showError ? 'shake border-red-500' : 'border-white/30'
                }`}
                placeholder="Enter the code"
                autoFocus
              />

              <motion.button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-gold via-amber-400 to-gold text-deep-purple text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Unlock ✨
              </motion.button>
            </form>

            <AnimatePresence>
              {showHint && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 text-amber-300 text-lg"
                >
                  Hint: Think of a special date in February... 💝
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* PAGE 2 - BIRTHDAY FACTS */}
      {isCorrect && !showCountdown && (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE5EC] to-[#FFD6E8] flex flex-col items-center justify-center p-6 relative overflow-hidden pt-16">
          <Navigation />

          {/* Floating hearts background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-5%',
                }}
                animate={{
                  y: [0, -window.innerHeight - 50],
                  x: [0, (Math.random() - 0.5) * 100],
                  opacity: [0, 0.6, 0.6, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'linear'
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>

          {/* Calendar Animation */}
          <AnimatePresence mode="wait">
            {showCalendar && (
              <motion.div
                key="calendar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="relative z-10"
              >
                <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 ${calendarFlipping ? 'calendar-flip' : ''}`}>
                  <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4">
                      {calendarMonth === 1 ? 'JANUARY' : 'FEBRUARY'}
                    </h2>
                    <div className="text-8xl md:text-9xl font-bold text-pink-600">
                      {calendarMonth === 1 ? '1' : '17'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Facts Display */}
          {!showCalendar && (
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative z-10 max-w-2xl"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200">
                <h2 className="text-3xl md:text-4xl font-bold text-rose-600 mb-6">
                  {currentFact.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  {currentFact.description}
                </p>
              </div>

              {currentFactIndex === facts.length - 1 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 }}
                  onClick={handleHeartClick}
                  className="mt-8 text-6xl hover:scale-110 transition-transform mx-auto block"
                >
                  💝
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* PAGE 3 - COUNTDOWN */}
      {showCountdown && (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EC] to-[#FFD6E8] flex flex-col pt-16">
          <Navigation />

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-5%',
                  filter: 'drop-shadow(0 0 8px rgba(255,105,180,0.3))'
                }}
                animate={{
                  y: [0, -window.innerHeight - 50],
                  x: [0, (Math.random() - 0.5) * 100],
                  opacity: [0, 0.8, 0.8, 0],
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
              >
                {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '⭐' : '💕'}
              </motion.div>
            ))}
          </div>

          {/* Decorative background blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full blur-[100px] opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-25" style={{ animationDelay: '1s' }} />
          </div>

          {/* Orbiting Words */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {floatingWords.map((word, index) => {
              const angle = (index / floatingWords.length) * 360
              const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35

              return (
                <motion.div
                  key={index}
                  className="absolute text-sm lg:text-base font-medium text-purple-400 whitespace-nowrap"
                  style={{ left: '50%', top: '50%' }}
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    style={{ transform: `rotate(${-angle}deg) translateX(${radius}px)` }}
                    className="opacity-40"
                  >
                    {word}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8 md:mb-12 text-center"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
                Our Journey Together
              </h1>
              <p className="text-lg md:text-xl text-purple-600 opacity-70">
                Every moment counts ✨
              </p>
            </motion.div>

            {/* Counter Section */}
            <motion.div
              className="relative text-center mb-8 md:mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Days Counter */}
              <div className="mb-8 md:mb-12">
                <FlipNumber number={timeData.days} delay={0.5} />
                <p className="text-xl md:text-2xl text-purple-600 font-semibold mt-4">Days</p>
              </div>

              {/* Hours Counter */}
              <div className="mb-8 md:mb-12">
                <FlipNumber number={timeData.hours} delay={0.7} />
                <p className="text-xl md:text-2xl text-purple-600 font-semibold mt-4">Hours</p>
              </div>

              {/* Minutes Counter */}
              <div>
                <FlipNumber number={timeData.minutes} delay={0.9} />
                <p className="text-xl md:text-2xl text-purple-600 font-semibold mt-4">Minutes</p>
              </div>
            </motion.div>

            {/* Message */}
            <AnimatePresence>
              {showMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl lg:text-4xl text-center mb-8 font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent px-4"
                >
                  (We are ❤️)
                </motion.p>
              )}
            </AnimatePresence>

            {showButton && (
              <motion.button
                onClick={() => navigate('/reasons')}
                className="relative px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10">Continue to Celebrate 🎉</span>
              </motion.button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Page1to3_Combined
