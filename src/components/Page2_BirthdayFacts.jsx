import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { facts, birthdayFacts } from '../data/birthdayFacts'

const Page2_BirthdayFacts = ({ onComplete }) => {
  const [showCalendar, setShowCalendar] = useState(true)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [calendarMonth, setCalendarMonth] = useState(1) // Start with January

  // Calendar flip animation
  useEffect(() => {
    if (showCalendar) {
      const interval = setInterval(() => {
        setCalendarMonth(prev => {
          if (prev < 2) return prev + 1 // Flip to February
          return prev
        })
      }, 500)

      // After calendar lands on Feb 17, show confetti and transition to facts
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        setTimeout(() => setShowCalendar(false), 1000)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [showCalendar])

  // Auto-advance facts
  useEffect(() => {
    if (!showCalendar && currentFactIndex < facts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentFactIndex(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentFactIndex, showCalendar])

  const handleNext = () => {
    if (currentFactIndex < facts.length - 1) {
      setCurrentFactIndex(prev => prev + 1)
    }
  }

  const handleHeartClick = () => {
    onComplete()
  }

  const currentFact = facts[currentFactIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#E8E8E8] flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {showCalendar ? (
          /* Calendar Flip Animation */
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl p-12 relative"
              animate={{
                rotateY: calendarMonth === 2 ? [0, 180, 360] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Calendar Header */}
              <div className="text-gray-600 text-xl mb-6 font-semibold">
                {calendarMonth === 1 ? 'January' : 'February'} 2000
              </div>

              {/* Date Display */}
              <motion.div
                className="text-9xl font-bold text-red-600"
                animate={calendarMonth === 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                17
              </motion.div>

              {/* Day of Week */}
              <div className="text-gray-500 text-2xl mt-4">
                {birthdayFacts.dayOfWeek}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Facts Display */
          <motion.div
            key="facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl"
          >
            {/* Fact Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border-4 border-gradient"
                style={{
                  background: currentFact.interactive
                    ? 'linear-gradient(135deg, #FFE5EC 0%, #FFC2D1 100%)'
                    : 'white'
                }}
              >
                {/* Icon */}
                <motion.div
                  className="text-6xl mb-6 text-center"
                  animate={
                    currentFact.animation === 'heartBeat'
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }
                      : {}
                  }
                  transition={
                    currentFact.animation === 'heartBeat'
                      ? { duration: 1.5, repeat: Infinity }
                      : {}
                  }
                >
                  {currentFact.icon}
                </motion.div>

                {/* Text */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] text-center mb-4">
                  {currentFact.text}
                </h2>

                {/* Subtext */}
                {currentFact.subtext && (
                  <p className="text-lg md:text-xl text-gray-600 text-center">
                    {currentFact.subtext}
                  </p>
                )}

                {/* Interactive Heart Button */}
                {currentFact.interactive && (
                  <motion.button
                    onClick={handleHeartClick}
                    className="mt-6 w-full py-4 bg-rose-gold text-white rounded-full text-xl font-semibold hover:bg-[#A05A68] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue ❤️
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {facts.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFactIndex
                      ? 'bg-rose-gold w-8'
                      : index < currentFactIndex
                      ? 'bg-gray-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Next Button (if not on last fact) */}
            {!currentFact.interactive && (
              <div className="text-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#2C3E50] text-white rounded-full text-lg font-semibold hover:bg-[#1a252f] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page2_BirthdayFacts
