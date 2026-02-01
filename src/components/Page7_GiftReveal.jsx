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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4EC] to-[#FFD6E8] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sparkles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`sparkle-bg-${i}`}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Floating confetti */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`confetti-bg-${i}`}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360],
              opacity: [0, 0.7, 0.7, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {['🎉', '🎊', '🎁', '💖', '⭐'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300 rounded-full blur-[130px] opacity-25 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Wrapped Gift */}
        {unwrapStage < 4 && (
          <motion.div
            key="gift-box"
            className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text mb-12"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              One more surprise...
            </motion.h2>

            {/* Enhanced Gift Box with sparkles */}
            <div className="relative">
              {/* Orbiting sparkles around gift */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 360
                const radius = 180
                return (
                  <motion.div
                    key={`gift-sparkle-${i}`}
                    className="absolute text-4xl"
                    style={{
                      left: '150px',
                      top: '150px'
                    }}
                    animate={{
                      rotate: [angle, angle + 360]
                    }}
                    transition={{
                      duration: 15,
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
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity
                        }}
                      >
                        ✨
                      </motion.span>
                    </div>
                  </motion.div>
                )
              })}

              <motion.div
                className="relative cursor-pointer"
                style={{ width: '300px', height: '300px' }}
                onClick={handleUnwrap}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  rotateY: unwrapStage >= 1 ? [0, 15, -15, 0] : 0,
                  rotateX: unwrapStage >= 1 ? [0, 10, -10, 0] : 0
                }}
                transition={{
                  scale: { type: 'spring', damping: 12, delay: 0.3 },
                  rotate: { type: 'spring', damping: 15, delay: 0.3 },
                  rotateY: { duration: 0.6 },
                  rotateX: { duration: 0.6 }
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect behind box */}
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(219,39,119,0.5) 0%, rgba(219,39,119,0.2) 50%, transparent 100%)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Box */}
                <motion.div
                  className="absolute inset-0 rounded-2xl shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777 0%, #F472B6 50%, #FBCFE8 100%)',
                    backgroundImage: unwrapStage < 3 ? 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 24px)' : 'none',
                    opacity: unwrapStage >= 3 ? 0.3 : 1,
                    boxShadow: '0 20px 60px rgba(219,39,119,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                  animate={unwrapStage === 0 ? {
                    boxShadow: [
                      '0 20px 60px rgba(219,39,119,0.4)',
                      '0 25px 70px rgba(219,39,119,0.6)',
                      '0 20px 60px rgba(219,39,119,0.4)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

              {/* Enhanced Ribbon */}
              {unwrapStage < 2 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={unwrapStage === 1 ? {
                    rotate: [0, 10, -10, 5],
                    opacity: 0.7,
                    scale: [1, 1.05, 1]
                  } : {}}
                  exit={{
                    opacity: 0,
                    y: 100,
                    rotate: 45,
                    transition: { duration: 0.5 }
                  }}
                >
                  {/* Horizontal ribbon with shine */}
                  <div
                    className="absolute left-0 right-0 h-14 rounded-sm overflow-hidden"
                    style={{
                      top: 'calc(50% - 28px)',
                      background: 'linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #B91C1C 100%)',
                      boxShadow: '0 4px 15px rgba(153,27,27,0.5), inset 0 2px 0 rgba(255,255,255,0.3)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </div>
                  {/* Vertical ribbon with shine */}
                  <div
                    className="absolute top-0 bottom-0 w-14 rounded-sm overflow-hidden"
                    style={{
                      left: 'calc(50% - 28px)',
                      background: 'linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #B91C1C 100%)',
                      boxShadow: '0 4px 15px rgba(153,27,27,0.5), inset 0 2px 0 rgba(255,255,255,0.3)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                      animate={{
                        y: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 0.5
                      }}
                    />
                  </div>
                  {/* Enhanced Bow */}
                  <motion.div
                    className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Center knot with glow */}
                    <div
                      className="relative w-24 h-24 rounded-full shadow-2xl"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #DC2626 0%, #991B1B 100%)',
                        boxShadow: '0 8px 25px rgba(153,27,27,0.6), inset 0 2px 5px rgba(255,255,255,0.3)'
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    {/* Left loop */}
                    <div
                      className="absolute top-1/2 left-0 w-14 h-10 rounded-full transform -translate-y-1/2 -translate-x-8 shadow-xl"
                      style={{
                        background: 'radial-gradient(ellipse at 60% 50%, #DC2626 0%, #991B1B 100%)',
                        boxShadow: '0 6px 20px rgba(153,27,27,0.5)'
                      }}
                    />
                    {/* Right loop */}
                    <div
                      className="absolute top-1/2 right-0 w-14 h-10 rounded-full transform -translate-y-1/2 translate-x-8 shadow-xl"
                      style={{
                        background: 'radial-gradient(ellipse at 40% 50%, #DC2626 0%, #991B1B 100%)',
                        boxShadow: '0 6px 20px rgba(153,27,27,0.5)'
                      }}
                    />
                    {/* Sparkles on bow */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.5,
                          repeat: Infinity
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Enhanced Tearing paper effect */}
              {unwrapStage === 3 && (
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-2xl"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        width: '100%',
                        height: '8.33%',
                        top: `${i * 8.33}%`,
                        background: `linear-gradient(135deg, #DB2777 0%, #F472B6 ${50 + Math.random() * 30}%, #FBCFE8 100%)`,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                      animate={{
                        x: i % 2 === 0 ? -500 : 500,
                        y: (Math.random() - 0.5) * 100,
                        rotate: i % 2 === 0 ? -60 : 60,
                        opacity: 0,
                        scale: [1, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.05,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Enhanced Golden glow when opening */}
              {unwrapStage === 3 && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'radial-gradient(circle, #FFD700 0%, #FFA500 30%, transparent 70%)',
                      filter: 'blur(30px)'
                    }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{
                      opacity: [0, 1, 0.8],
                      scale: [0.3, 2, 2.5]
                    }}
                    transition={{ duration: 1.2 }}
                  />
                  {/* Additional sparkle burst */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * 360
                    return (
                      <motion.div
                        key={`burst-${i}`}
                        className="absolute text-4xl"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: Math.cos((angle * Math.PI) / 180) * 200,
                          y: Math.sin((angle * Math.PI) / 180) * 200,
                          rotate: [0, 360],
                          scale: [0, 1.5, 0]
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.05
                        }}
                      >
                        ✨
                      </motion.div>
                    )
                  })}
                </>
              )}
              </motion.div>
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {unwrapStage === 0 && "✨ Tap to unwrap your gift ✨"}
                {unwrapStage === 1 && "🎁 Keep tapping! 🎁"}
                {unwrapStage === 2 && "💖 Almost there... 💖"}
                {unwrapStage === 3 && "🌟 Opening... 🌟"}
              </motion.p>
              {unwrapStage === 0 && (
                <motion.div
                  className="mt-6 flex justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Phase 2: Enhanced Video Message */}
        {unwrapStage === 4 && !videoPlayed && (
          <motion.div
            key="video"
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Animated background stars */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={`video-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 10 + 5}px #FFF`
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
            </div>

            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 relative z-10"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto'
              }}
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundPosition: ['0% center', '200% center']
              }}
              transition={{
                opacity: { duration: 1 },
                y: { duration: 1 },
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              A Message Just For You ❤️
            </motion.h2>

            <motion.div
              className="relative max-w-4xl w-full z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {/* Video container with decorative frame */}
              <div className="relative p-4 bg-gradient-to-br from-gold/20 to-rose-gold/20 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-gold/50">
                {/* Corner decorations */}
                {[
                  { top: '-15px', left: '-15px' },
                  { top: '-15px', right: '-15px' },
                  { bottom: '-15px', left: '-15px' },
                  { bottom: '-15px', right: '-15px' }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 bg-gradient-to-br from-gold to-amber-500 rounded-full"
                    style={pos}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}

                <video
                  className="w-full rounded-2xl shadow-2xl"
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                  poster="/videos/thumbnail.jpg"
                  style={{
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                  }}
                >
                  <source src="/videos/birthday-message.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Floating hearts around video */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * 360
                const radius = 280
                return (
                  <motion.div
                    key={`video-heart-${i}`}
                    className="absolute text-4xl"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      rotate: [angle, angle + 360]
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
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity
                        }}
                      >
                        💕
                      </motion.span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.p
              className="text-white/80 mt-8 text-center text-sm md:text-base bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              📹 Place your video at: <code className="bg-white/10 px-2 py-1 rounded text-gold font-mono">public/videos/birthday-message.mp4</code>
            </motion.p>
          </motion.div>
        )}

        {/* Phase 3: Enhanced Gift Reveal */}
        {showGiftCard && !showFinalMessage && (
          <motion.div
            key="gift-card"
            className="min-h-screen flex items-center justify-center p-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Confetti celebration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`gift-confetti-${i}`}
                  className="absolute text-3xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%'
                  }}
                  animate={{
                    y: ['0vh', '110vh'],
                    x: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {['🎉', '🎊', '🎁', '💖', '✨', '⭐'][i % 6]}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border-4"
              style={{
                borderImage: 'linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #FFD700 100%) 1',
                boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,215,0,0.3)'
              }}
              initial={{ y: 100, rotateX: -20 }}
              animate={{
                y: 0,
                rotateX: 0,
                boxShadow: [
                  '0 25px 60px rgba(0,0,0,0.2)',
                  '0 30px 70px rgba(255,215,0,0.3)',
                  '0 25px 60px rgba(0,0,0,0.2)'
                ]
              }}
              transition={{
                y: { type: 'spring', damping: 15 },
                rotateX: { type: 'spring', damping: 15 },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Corner sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute text-4xl ${
                    i === 0 ? '-top-4 -left-4' :
                    i === 1 ? '-top-4 -right-4' :
                    i === 2 ? '-bottom-4 -left-4' :
                    '-bottom-4 -right-4'
                  }`}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                >
                  ✨
                </motion.div>
              ))}

              {/* Gift header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text mb-4"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  Your Special Gift 🎁
                </motion.h2>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
                        repeat: Infinity
                      }}
                    >
                      💕
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {renderGiftDetails()}
              </motion.div>

              <motion.button
                onClick={handleContinueToFinal}
                className="relative mt-10 w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-2xl text-xl md:text-2xl font-bold shadow-2xl overflow-hidden group"
                style={{
                  backgroundSize: '200% auto'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  boxShadow: [
                    '0 10px 30px rgba(219,39,119,0.4)',
                    '0 15px 40px rgba(219,39,119,0.6)',
                    '0 10px 30px rgba(219,39,119,0.4)'
                  ]
                }}
                transition={{
                  opacity: { delay: 0.8 },
                  scale: { delay: 0.8, type: 'spring' },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundPosition: 'right center'
                }}
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
                <span className="relative flex items-center justify-center gap-3">
                  Continue to Final Message
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 4: Enhanced Final Message */}
        {showFinalMessage && (
          <motion.div
            key="final"
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Enhanced Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={`final-heart-${i}`}
                  className="absolute text-3xl md:text-5xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '-10%'
                  }}
                  animate={{
                    y: [0, -window.innerHeight - 100],
                    x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                    opacity: [0, 0.8, 0.8, 0],
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                >
                  {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
                </motion.div>
              ))}

              {/* Floating sparkles */}
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`final-sparkle-${i}`}
                  className="absolute text-3xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1.8, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Decorative gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-pink-300 rounded-full blur-[150px] opacity-40 animate-pulse" />
              <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-300 rounded-full blur-[140px] opacity-35 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300 rounded-full blur-[160px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 text-center max-w-4xl px-4">
              {/* Main birthday message */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {/* Decorative stars above title */}
                <div className="flex justify-center gap-4 mb-6">
                  {[...Array(7)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl md:text-5xl"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.4, 1]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777 0%, #9333EA 50%, #3B82F6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '200% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  Happy 26th Birthday,<br/>{personalInfo.herName}! 🎉
                </motion.h1>
              </motion.div>

              {/* Message content */}
              <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border-4 border-white/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
                style={{
                  boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)'
                }}
              >
                <div className="text-lg md:text-2xl lg:text-3xl text-gray-800 space-y-6 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Thank you for being exactly who you are.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    Thank you for every laugh, every adventure,
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    every quiet moment, and every dream we share.
                  </motion.p>

                  {/* Decorative hearts separator */}
                  <div className="flex justify-center gap-3 py-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-3xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          delay: 1.3 + i * 0.1,
                          repeat: Infinity
                        }}
                      >
                        💖
                      </motion.span>
                    ))}
                  </div>

                  <motion.p
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text pt-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: 'spring' }}
                  >
                    Here's to 26 and all the years to come.
                  </motion.p>

                  <motion.p
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-purple-700 pt-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, type: 'spring' }}
                  >
                    I love you ❤️
                  </motion.p>
                </div>
              </motion.div>

              {/* Replay button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <motion.button
                  onClick={() => window.location.reload()}
                  className="relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-full text-xl md:text-2xl font-bold shadow-2xl overflow-hidden"
                  style={{
                    backgroundSize: '200% auto'
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundPosition: 'right center',
                    boxShadow: '0 20px 50px rgba(147,51,234,0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 15px 40px rgba(147,51,234,0.3)',
                      '0 20px 50px rgba(147,51,234,0.5)',
                      '0 15px 40px rgba(147,51,234,0.3)'
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
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
                  <span className="relative flex items-center justify-center gap-3">
                    🔄 Replay This Experience
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

export default Page7_GiftReveal
