import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useAudio } from '../context/AudioContext'
import Navigation from './Navigation'
import { timelineData } from '../data/timelineData'

const Page5_Timeline = () => {
  const navigate = useNavigate()
  const { playPageAudio } = useAudio()
  const [activeNodeIndex, setActiveNodeIndex] = useState(0)
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [showValentineQuestion, setShowValentineQuestion] = useState(true)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)

  const handleNodeClick = (index) => {
    setActiveNodeIndex(index)
  }

  const handlePolaroidClick = (moment) => {
    if (!moment.isFuture) {
      setFullscreenImage(moment)
      // Confetti on photo open
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFC0CB']
      })
    } else {
      // Special confetti for future moment
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#FF1493', '#FF69B4', '#FFC0CB', '#FFB6C1']
      })
      setTimeout(() => navigate('/cake'), 800)
    }
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  const handleYesClick = () => {
    // Celebration confetti
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF1493', '#FF69B4', '#FFC0CB', '#FFB6C1']
    })
    setTimeout(() => {
      setShowValentineQuestion(false)
    }, 500)
  }

  const handleMouseMove = (e) => {
    if (!showValentineQuestion) return

    // Check distance to No button
    if (noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
      )

      // If cursor is within 150px of No button, move it
      if (distance < 150) {
        const modalElement = noButtonRef.current.closest('.valentine-modal')
        if (modalElement) {
          const modalRect = modalElement.getBoundingClientRect()
          const maxX = modalRect.width - rect.width - 40
          const maxY = modalRect.height - rect.height - 40

          setNoButtonPosition({
            x: Math.random() * maxX - maxX / 2,
            y: Math.random() * maxY - maxY / 2
          })
        }
      }
    }

    // Check distance to Yes button for scaling
    if (yesButtonRef.current) {
      const rect = yesButtonRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
      )

      // Scale Yes button based on proximity (closer = bigger)
      if (distance < 200) {
        const scale = 1 + (200 - distance) / 100
        setYesButtonScale(Math.min(scale, 2.5))
      } else {
        setYesButtonScale(1)
      }
    }
  }

  // ESC key handler for closing fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && fullscreenImage) {
        closeFullscreen()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [fullscreenImage])

  // Mouse move handler for Valentine buttons
  useEffect(() => {
    if (showValentineQuestion) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showValentineQuestion])

  // Background music for page 5 - only run once on mount
  useEffect(() => {
    playPageAudio(5, '/audio/page5-timeline.mp3')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE4D6] to-[#FFD6C8] overflow-x-auto md:overflow-y-hidden relative pt-16">
      <Navigation />

      {/* Valentine Question Modal */}
      <AnimatePresence>
        {showValentineQuestion && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="valentine-modal relative bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 border-4 border-pink-300"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Floating hearts in modal */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    💕
                  </motion.div>
                ))}
              </div>

              <motion.h2
                className="text-5xl md:text-6xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                Will you be my Valentine? 💝
              </motion.h2>

              <div className="flex gap-8 justify-center items-center mt-12 relative min-h-[100px]">
                {/* Yes Button */}
                <motion.button
                  ref={yesButtonRef}
                  onClick={handleYesClick}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-shadow"
                  style={{
                    scale: yesButtonScale,
                  }}
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Yes! 💚
                </motion.button>

                {/* No Button - moves away */}
                <motion.button
                  ref={noButtonRef}
                  className="px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-2xl font-bold rounded-full shadow-lg"
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  No
                </motion.button>
              </div>

              <motion.p
                className="text-center mt-8 text-pink-600 font-semibold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                (Try to click No... I dare you! 😏)
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating hearts */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-5%',
            }}
            animate={{
              y: [0, -window.innerHeight - 50],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'linear'
            }}
          >
            ❤️
          </motion.div>
        ))}

        {/* Sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-200 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-200 rounded-full blur-[100px] opacity-25" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-orange-200 rounded-full blur-[110px] opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Timeline Content - Only show after Valentine question */}
      {!showValentineQuestion && (
        <>
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:flex items-center min-h-screen px-12 py-12 relative z-10 overflow-x-auto">
        <div className="flex items-center space-x-24 min-w-max relative pr-12">
          {/* Timeline Line - spans full content width */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2" style={{ zIndex: -1 }}>
            {/* Base line */}
            <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 rounded-full opacity-50" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />

            {/* Glowing orb moving along timeline */}
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gold rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.5)'
              }}
              animate={{
                left: ['0%', '100%']
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {timelineData.map((moment, index) => (
            <div key={moment.id} className="flex flex-col items-center">
              {/* Polaroid Photo */}
              <motion.div
                className={`mb-8 cursor-pointer relative group ${
                  activeNodeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
                }`}
                style={{
                  rotate: `${moment.polaroidRotation}deg`,
                  transition: 'all 0.5s ease'
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: activeNodeIndex === index ? 1 : 0.7, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 50,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handlePolaroidClick(moment)}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-md blur-xl opacity-0 group-hover:opacity-60"
                  style={{ zIndex: -1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="bg-white p-4 shadow-2xl rounded-sm relative" style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
                }}>
                  {moment.isFuture ? (
                    /* Future placeholder with animation */
                    <motion.div
                      className="w-56 h-40 bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex flex-col items-center justify-center rounded-sm relative overflow-hidden"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      {/* Sparkles inside future card */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-3xl"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${20 + i * 10}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            rotate: [0, 180, 360],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                      <motion.span
                        className="text-7xl text-white drop-shadow-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        ?
                      </motion.span>
                      <p className="text-white text-base font-bold mt-3">Our Future ✨</p>
                    </motion.div>
                  ) : (
                    /* Photo with placeholder */
                    <div className="w-56 h-40 bg-gray-200 flex items-center justify-center rounded-sm relative overflow-hidden">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  {/* Enhanced tape effect */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-7 bg-amber-100 opacity-70 rotate-2 shadow-md"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%), #FFF8DC'
                    }}
                  />
                </div>

                {/* Photo indicator dots */}
                {!moment.isFuture && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Timeline Node */}
              <motion.div
                className={`w-8 h-8 rounded-full border-4 border-white cursor-pointer z-10 relative ${
                  activeNodeIndex === index
                    ? 'bg-gradient-to-br from-gold to-amber-400'
                    : 'bg-gradient-to-br from-rose-400 to-pink-400'
                }`}
                onClick={() => handleNodeClick(index)}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  boxShadow: moment.isFuture
                    ? [
                        '0 0 15px rgba(255,10,84,0.6)',
                        '0 0 30px rgba(255,71,126,0.8)',
                        '0 0 45px rgba(255,112,150,1)',
                        '0 0 30px rgba(255,71,126,0.8)',
                        '0 0 15px rgba(255,10,84,0.6)'
                      ]
                    : activeNodeIndex === index
                    ? '0 0 20px rgba(255,215,0,0.8)'
                    : '0 0 5px rgba(0,0,0,0.2)'
                }}
                transition={
                  moment.isFuture
                    ? { duration: 2, repeat: Infinity }
                    : { duration: 0.3, delay: index * 0.1 }
                }
                whileHover={{
                  scale: 1.5,
                  boxShadow: '0 0 30px rgba(255,215,0,1)'
                }}
                style={{
                  boxShadow: activeNodeIndex === index
                    ? '0 0 20px rgba(255,215,0,0.8)'
                    : '0 4px 10px rgba(0,0,0,0.15)'
                }}
              >
                {/* Inner pulse for active node */}
                {activeNodeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                )}

                {/* Heart inside future node */}
                {moment.isFuture && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-xs"
                    animate={{
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    ❤️
                  </motion.div>
                )}
              </motion.div>

              {/* Caption */}
              <motion.div
                className="mt-8 text-center max-w-[14rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                <motion.h3
                  className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-xl mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {moment.title}
                </motion.h3>
                <p className="text-rose-600 font-semibold text-xs mb-2">
                  {moment.date}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {moment.caption}
                </p>
                {/* Decorative underline */}
                <motion.div
                  className="mt-2 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden py-12 px-6 relative z-10">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Story Together
        </motion.h1>

        <div className="space-y-16">
          {timelineData.map((moment, index) => (
            <motion.div
              key={moment.id}
              className="flex gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Timeline Node */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full border-4 border-white cursor-pointer relative ${
                    activeNodeIndex === index
                      ? 'bg-gradient-to-br from-gold to-amber-400'
                      : 'bg-gradient-to-br from-rose-400 to-pink-400'
                  }`}
                  onClick={() => handleNodeClick(index)}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    boxShadow: moment.isFuture
                      ? [
                          '0 0 10px rgba(255,10,84,0.6)',
                          '0 0 20px rgba(255,71,126,0.8)',
                          '0 0 30px rgba(255,112,150,1)',
                          '0 0 20px rgba(255,71,126,0.8)',
                          '0 0 10px rgba(255,10,84,0.6)'
                        ]
                      : activeNodeIndex === index
                      ? '0 0 15px rgba(255,215,0,0.8)'
                      : '0 0 5px rgba(0,0,0,0.2)'
                  }}
                  transition={
                    moment.isFuture
                      ? { duration: 2, repeat: Infinity }
                      : { delay: index * 0.2 }
                  }
                  whileTap={{ scale: 1.3 }}
                  style={{
                    boxShadow: activeNodeIndex === index
                      ? '0 0 15px rgba(255,215,0,0.8)'
                      : '0 4px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Inner pulse */}
                  {activeNodeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gold"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}

                  {/* Heart for future */}
                  {moment.isFuture && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-xs"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ❤️
                    </motion.div>
                  )}
                </motion.div>

                {/* Vertical line with gradient */}
                {index < timelineData.length - 1 && (
                  <motion.div
                    className="w-1 flex-1 bg-gradient-to-b from-rose-400 via-pink-300 to-rose-400 mt-2 rounded-full"
                    style={{ minHeight: '200px' }}
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                {/* Polaroid */}
                <motion.div
                  className="mb-4 cursor-pointer inline-block relative group"
                  style={{ rotate: `${moment.polaroidRotation}deg` }}
                  whileTap={{ scale: 0.95, rotate: 0 }}
                  onClick={() => handlePolaroidClick(moment)}
                >
                  {/* Glow on tap */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-md blur-lg opacity-0 group-active:opacity-50"
                    style={{ zIndex: -1 }}
                  />

                  <div className="bg-white p-3 shadow-xl rounded-sm relative" style={{
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                  }}>
                    {moment.isFuture ? (
                      <motion.div
                        className="w-full h-48 bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex flex-col items-center justify-center rounded-sm relative overflow-hidden"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          backgroundSize: '200% 200%'
                        }}
                      >
                        {/* Sparkles */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-2xl"
                            style={{
                              left: `${25 + i * 25}%`,
                              top: `${30 + i * 15}%`,
                            }}
                            animate={{
                              scale: [0, 1.2, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.5,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            ✨
                          </motion.div>
                        ))}
                        <motion.span
                          className="text-7xl text-white drop-shadow-lg"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        >
                          ?
                        </motion.span>
                        <p className="text-white text-base font-bold mt-3">Our Future ✨</p>
                      </motion.div>
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-sm relative overflow-hidden">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {/* Enhanced tape */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-amber-100 opacity-70 shadow-sm"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%), #FFF8DC'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <h3 className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-xl mb-1">
                    {moment.title}
                  </h3>
                  <p className="text-rose-600 font-semibold text-sm mb-2">
                    {moment.date}
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {moment.caption}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
        </>
      )}

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            {/* Floating hearts in background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl opacity-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeFullscreen}
                className="absolute -top-12 md:-top-14 right-0 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full border-2 border-white/50 text-white text-3xl font-light transition-colors z-10"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ×
              </motion.button>
              {/* ESC hint */}
              <motion.div
                className="absolute -top-12 md:-top-14 left-0 text-white/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Press ESC to close
              </motion.div>

              {/* Enlarged Polaroid-style Photo */}
              <motion.div
                className="bg-white p-6 md:p-10 shadow-2xl rounded-sm relative"
                style={{
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                }}
                animate={{
                  boxShadow: [
                    '0 25px 50px rgba(0,0,0,0.5)',
                    '0 30px 60px rgba(255,105,180,0.3)',
                    '0 25px 50px rgba(0,0,0,0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Decorative corner stars */}
                {[
                  { top: '-10px', left: '-10px', rotate: 0 },
                  { top: '-10px', right: '-10px', rotate: 90 },
                  { bottom: '-10px', left: '-10px', rotate: -90 },
                  { bottom: '-10px', right: '-10px', rotate: 180 }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={pos}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [pos.rotate, pos.rotate + 180, pos.rotate + 360]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  >
                    ✨
                  </motion.div>
                ))}

                {/* Enhanced tape effect */}
                <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-amber-100 opacity-70 rotate-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%), #FFF8DC',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}
                />

                <motion.img
                  src={fullscreenImage.image}
                  alt={fullscreenImage.title}
                  className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />

                <motion.div
                  className="mt-6 md:mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Decorative hearts */}
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-xl md:text-2xl"
                        animate={{
                          y: [0, -8, 0],
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

                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4">
                    {fullscreenImage.date}
                  </h2>
                  <p className="text-gray-700 text-lg md:text-2xl leading-relaxed font-medium px-4">
                    {fullscreenImage.caption}
                  </p>

                  {/* Decorative underline */}
                  <motion.div
                    className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page5_Timeline
