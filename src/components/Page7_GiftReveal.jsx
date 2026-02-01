import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { giftInfo } from '../data/giftInfo'
import { personalInfo } from '../data/personalInfo'

const Page7_GiftReveal = ({ onComplete }) => {
  const [unwrapStage, setUnwrapStage] = useState(0)
  const [videoPlayed, setVideoPlayed] = useState(false)
  const [showGiftCard, setShowGiftCard] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  const handleUnwrap = () => {
    if (unwrapStage < 4) {
      setUnwrapStage(prev => prev + 1)

      if (unwrapStage === 3) {
        // Box opening - show golden light and transition to video
        setTimeout(() => {
          setUnwrapStage(4)
        }, 1500)
      }
    }
  }

  const handleVideoEnd = () => {
    setVideoPlayed(true)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setShowGiftCard(true)
    }, 1000)
  }

  const handleContinueToFinal = () => {
    setShowGiftCard(false)
    setShowFinalMessage(true)
  }

  const renderGiftDetails = () => {
    const { type } = giftInfo

    switch (type) {
      case 'experience':
        return (
          <div className="text-center">
            <div className="text-7xl mb-6">{giftInfo.experience.icon}</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              {giftInfo.experience.title}
            </h2>
            <div className="space-y-2 text-lg text-gray-700">
              <p className="font-semibold">{giftInfo.experience.date}</p>
              <p>{giftInfo.experience.time}</p>
              <p className="text-gray-600">{giftInfo.experience.location}</p>
              <p className="text-rose-gold font-semibold mt-4">
                {giftInfo.experience.description}
              </p>
            </div>
          </div>
        )

      case 'trip':
        return (
          <div className="text-center">
            <div className="text-7xl mb-6">{giftInfo.trip.icon}</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              {giftInfo.trip.title}
            </h2>
            <p className="text-xl text-gray-700 mb-4">{giftInfo.trip.dates}</p>
            <p className="text-rose-gold font-semibold mb-4">{giftInfo.trip.description}</p>
            <div className="text-left mt-6 space-y-2 max-w-md mx-auto">
              {giftInfo.trip.itinerary.map((day, i) => (
                <p key={i} className="text-gray-700">• {day}</p>
              ))}
            </div>
            <p className="text-purple-600 mt-6">{giftInfo.trip.packingNote}</p>
          </div>
        )

      case 'physical':
        return (
          <div className="text-center">
            <div className="text-7xl mb-6">{giftInfo.physical.icon}</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              {giftInfo.physical.title}
            </h2>
            <p className="text-xl text-gray-700 mb-4">{giftInfo.physical.location}</p>
            <p className="text-rose-gold font-semibold">{giftInfo.physical.hint}</p>
            <p className="text-purple-600 mt-4">{giftInfo.physical.additionalMessage}</p>
          </div>
        )

      case 'coupon_book':
        return (
          <div className="text-center">
            <div className="text-7xl mb-6">{giftInfo.couponBook.icon}</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              {giftInfo.couponBook.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6">{giftInfo.couponBook.description}</p>
            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto text-sm">
              {giftInfo.couponBook.coupons.slice(0, 6).map((coupon, i) => (
                <div key={i} className="bg-purple-100 p-2 rounded">
                  <span className="font-bold">{coupon.month}:</span> {coupon.title}
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4">...and 6 more surprises!</p>
          </div>
        )

      default:
        return <p>Configure your gift in giftInfo.js</p>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#FFE5EC] to-[#FFC2D1]">
      <AnimatePresence mode="wait">
        {/* Phase 1: Wrapped Gift */}
        {unwrapStage < 4 && (
          <motion.div
            key="gift-box"
            className="min-h-screen flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display text-gray-700 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              One more surprise...
            </motion.h2>

            {/* Gift Box */}
            <motion.div
              className="relative cursor-pointer"
              style={{ width: '300px', height: '300px' }}
              onClick={handleUnwrap}
              animate={{
                rotateY: unwrapStage >= 1 ? [0, 15, -15, 0] : 0,
                rotateX: unwrapStage >= 1 ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Box */}
              <div
                className="absolute inset-0 rounded-lg shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #B76E79 0%, #D4A5A5 100%)',
                  backgroundImage: unwrapStage < 3 ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' : 'none',
                  opacity: unwrapStage >= 3 ? 0.3 : 1
                }}
              />

              {/* Ribbon */}
              {unwrapStage < 2 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={unwrapStage === 1 ? { rotate: [0, 10, -10, 5], opacity: 0.7 } : {}}
                  exit={{ opacity: 0, y: 100, rotate: 45 }}
                >
                  {/* Horizontal ribbon */}
                  <div
                    className="absolute left-0 right-0 h-12 bg-gradient-to-r from-[#8B0000] to-[#B22222]"
                    style={{ top: 'calc(50% - 24px)' }}
                  />
                  {/* Vertical ribbon */}
                  <div
                    className="absolute top-0 bottom-0 w-12 bg-gradient-to-b from-[#8B0000] to-[#B22222]"
                    style={{ left: 'calc(50% - 24px)' }}
                  />
                  {/* Bow */}
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-[#8B0000] rounded-full shadow-lg" />
                    <div className="absolute top-1/2 left-0 w-12 h-8 bg-[#8B0000] rounded-full transform -translate-y-1/2 -translate-x-6" />
                    <div className="absolute top-1/2 right-0 w-12 h-8 bg-[#8B0000] rounded-full transform -translate-y-1/2 translate-x-6" />
                  </div>
                </motion.div>
              )}

              {/* Tearing paper effect */}
              {unwrapStage === 3 && (
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-rose-gold"
                      style={{
                        width: '100%',
                        height: '12.5%',
                        top: `${i * 12.5}%`
                      }}
                      animate={{
                        x: i % 2 === 0 ? -400 : 400,
                        rotate: i % 2 === 0 ? -45 : 45,
                        opacity: 0
                      }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Golden glow when opening */}
              {unwrapStage === 3 && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>

            <motion.p
              className="text-xl text-gray-600 mt-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {unwrapStage === 0 && "Tap to unwrap"}
              {unwrapStage === 1 && "Keep tapping!"}
              {unwrapStage === 2 && "Almost there..."}
              {unwrapStage === 3 && "Opening..."}
            </motion.p>
          </motion.div>
        )}

        {/* Phase 2: Video Message */}
        {unwrapStage === 4 && !videoPlayed && (
          <motion.div
            key="video"
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display text-gold mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              A Message Just For You
            </motion.h2>

            <div className="relative max-w-4xl w-full">
              <video
                className="w-full rounded-lg shadow-2xl"
                controls
                autoPlay
                onEnded={handleVideoEnd}
                poster="/videos/thumbnail.jpg"
              >
                <source src="/videos/birthday-message.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="text-white mt-6 text-center">
              📹 Place your video at: <code className="bg-gray-800 px-2 py-1 rounded">public/videos/birthday-message.mp4</code>
            </p>
          </motion.div>
        )}

        {/* Phase 3: Gift Reveal */}
        {showGiftCard && !showFinalMessage && (
          <motion.div
            key="gift-card"
            className="min-h-screen flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-gold"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
            >
              {renderGiftDetails()}

              <motion.button
                onClick={handleContinueToFinal}
                className="mt-8 w-full py-4 bg-gradient-to-r from-rose-gold to-gold text-white rounded-full text-xl font-bold hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 4: Final Message */}
        {showFinalMessage && (
          <motion.div
            key="final"
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '-10%'
                  }}
                  animate={{
                    y: [0, -window.innerHeight - 100],
                    x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear"
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 text-center max-w-3xl">
              <motion.h1
                className="text-5xl md:text-7xl font-display text-purple-800 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Happy 26th Birthday, {personalInfo.herName}
              </motion.h1>

              <motion.div
                className="text-xl md:text-2xl text-gray-700 space-y-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>Thank you for being exactly who you are.</p>
                <p>Thank you for every laugh, every adventure,</p>
                <p>every quiet moment, and every dream we share.</p>
                <p className="text-2xl md:text-3xl font-bold text-rose-gold mt-6">
                  Here's to 26 and all the years to come.
                </p>
                <p className="text-3xl md:text-4xl text-purple-700 mt-6">I love you ❤️</p>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={() => window.location.reload()}
                  className="w-full md:w-auto px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-bold hover:bg-purple-700 transition-colors mx-2"
                >
                  🔄 Replay This Experience
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page7_GiftReveal
