import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import Navigation from './Navigation'
import { personalInfo } from '../data/personalInfo'

const Page3_Countdown = () => {
  const navigate = useNavigate()
  const { playPageAudio, stopAudio } = useAudio()
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

  // Calculate time difference from meeting date
  useEffect(() => {
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

    // Update every minute
    const interval = setInterval(calculateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show message after 5 seconds (reduced from 8)
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
      setTimeout(() => setShowButton(true), 1000)
    }, 5000)

    return () => clearTimeout(messageTimer)
  }, [])

  // Background music - shared across pages 1-3
  useEffect(() => {
    playPageAudio(3, '/audio/pages-1-3-shared.mp3')
  }, [playPageAudio])

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

  // Render number with flip animation for each digit
  const FlipNumber = ({ number, delay }) => {
    const digits = number.toString().split('')
    return (
      <div className="inline-flex flex-wrap justify-center">
        {digits.map((digit, index) => (
          <FlipDigit key={index} digit={digit} delay={delay + index * 0.1} />
        ))}
      </div>
    )
  }

  return (
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

      {/* Orbiting Words - More subtle */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingWords.map((word, index) => {
          const angle = (index / floatingWords.length) * 360
          const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35

          return (
            <motion.div
              key={index}
              className="absolute text-sm lg:text-base font-medium text-purple-400 whitespace-nowrap"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                style={{
                  transform: `rotate(${-angle}deg) translateX(${radius}px)`,
                }}
                className="opacity-40"
              >
                {word}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Container - Using Flexbox for proper spacing */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
        {/* Title */}
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
          {/* Glow effect behind counter */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Days */}
          <div className="mb-6 md:mb-8 relative">
            <FlipNumber number={timeData.days} delay={0} />
            <div className="text-purple-600 text-xl md:text-3xl font-bold mt-3 tracking-widest">
              DAYS
            </div>
          </div>

          {/* Hours */}
          <div className="mb-6 md:mb-8">
            <FlipNumber number={timeData.hours} delay={0.5} />
            <div className="text-purple-600 text-xl md:text-3xl font-bold mt-3 tracking-widest">
              HOURS
            </div>
          </div>

          {/* Minutes */}
          <div className="mb-6 md:mb-8">
            <FlipNumber number={timeData.minutes} delay={1.0} />
            <div className="text-purple-600 text-xl md:text-3xl font-bold mt-3 tracking-widest">
              MINUTES
            </div>
          </div>

          {/* Together Label */}
          <motion.div
            className="text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-3xl md:text-5xl font-bold mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            TOGETHER
          </motion.div>
        </motion.div>

        {/* Message and Button - Properly spaced */}
        {showMessage && (
          <motion.div
            className="text-center px-6 max-w-2xl relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Decorative hearts */}
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-2xl md:text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  💖
                </motion.span>
              ))}
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl text-purple-800 font-bold mb-8 leading-relaxed">
              But who's counting?
            </p>
            <p className="text-xl md:text-2xl text-pink-600 font-semibold mb-8">
              (We are ❤️)
            </p>

            {showButton && (
              <motion.button
                onClick={() => {
                  stopAudio()
                  navigate('/reasons')
                }}
                className="relative px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
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
                  Continue Our Story
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Page3_Countdown
