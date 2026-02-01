import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Page3_Countdown = ({ onComplete }) => {
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
      // CUSTOMIZE THIS DATE - your meeting date
      const meetingDate = new Date('2022-06-15')
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

  // Show message after 8 seconds
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
      setTimeout(() => setShowButton(true), 1000)
    }, 8000)

    return () => clearTimeout(messageTimer)
  }, [])

  // Component for individual digit with flip animation
  const FlipDigit = ({ digit, delay }) => {
    return (
      <motion.div
        className="inline-block bg-[#1a1a2e] text-gold text-6xl md:text-8xl font-bold px-4 py-6 rounded-lg shadow-2xl mx-1"
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: delay,
          type: "spring",
          stiffness: 100
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {digit}
      </motion.div>
    )
  }

  // Render number with flip animation for each digit
  const FlipNumber = ({ number, delay }) => {
    const digits = number.toString().split('')
    return (
      <div className="inline-flex">
        {digits.map((digit, index) => (
          <FlipDigit key={index} digit={digit} delay={delay + index * 0.1} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-radial from-[#FFE5EC] via-[#FFC2D1] to-[#E0BBE4] flex items-center justify-center p-6">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'text-pink-400' : 'text-purple-400'} text-2xl`}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-5%'
            }}
            animate={{
              y: [0, -window.innerHeight - 50],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '⭐' : '💫'}
          </motion.div>
        ))}
      </div>

      {/* Orbiting Words */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingWords.map((word, index) => {
          const angle = (index / floatingWords.length) * 360
          const radius = 280 // Distance from center

          return (
            <motion.div
              key={index}
              className="absolute text-lg md:text-xl font-semibold text-purple-600 whitespace-nowrap"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                style={{
                  transform: `rotate(${-angle}deg) translateX(${radius}px)`,
                }}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {word}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Counter */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Days */}
        <div className="mb-8">
          <FlipNumber number={timeData.days} delay={0} />
          <div className="text-gold text-2xl md:text-3xl font-bold mt-2 tracking-widest">
            DAYS
          </div>
        </div>

        {/* Hours */}
        <div className="mb-8">
          <FlipNumber number={timeData.hours} delay={0.5} />
          <div className="text-gold text-2xl md:text-3xl font-bold mt-2 tracking-widest">
            HOURS
          </div>
        </div>

        {/* Minutes */}
        <div className="mb-8">
          <FlipNumber number={timeData.minutes} delay={1.0} />
          <div className="text-gold text-2xl md:text-3xl font-bold mt-2 tracking-widest">
            MINUTES
          </div>
        </div>

        {/* Together Label */}
        <motion.div
          className="text-[#1a1a2e] text-3xl md:text-4xl font-bold mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          TOGETHER
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gold rounded-3xl opacity-10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Bottom Message */}
      {showMessage && (
        <motion.div
          className="absolute bottom-20 left-0 right-0 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-2xl md:text-3xl text-[#1a1a2e] font-semibold mb-6">
            But who's counting? (We are ❤️)
          </p>

          {showButton && (
            <motion.button
              onClick={onComplete}
              className="px-8 py-4 bg-[#1a1a2e] text-gold rounded-full text-xl font-bold hover:bg-[#2d2d4a] transition-colors shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Page3_Countdown
