import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineData } from '../data/timelineData'

const Page5_Timeline = ({ onComplete }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0)
  const [fullscreenImage, setFullscreenImage] = useState(null)

  const handleNodeClick = (index) => {
    setActiveNodeIndex(index)
  }

  const handlePolaroidClick = (moment) => {
    if (!moment.isFuture) {
      setFullscreenImage(moment)
    } else {
      onComplete()
    }
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] overflow-x-auto md:overflow-y-hidden">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:flex items-center min-h-screen px-12 py-12">
        <div className="flex items-center space-x-32 min-w-max">
          {timelineData.map((moment, index) => (
            <div key={moment.id} className="flex flex-col items-center">
              {/* Polaroid Photo */}
              <motion.div
                className={`mb-8 cursor-pointer ${
                  activeNodeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                }`}
                style={{
                  rotate: `${moment.polaroidRotation}deg`,
                  transition: 'all 0.5s ease'
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                onClick={() => handlePolaroidClick(moment)}
              >
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  {moment.isFuture ? (
                    /* Future placeholder */
                    <div className="w-64 h-48 bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center rounded-sm">
                      <span className="text-9xl">?</span>
                    </div>
                  ) : (
                    /* Photo with placeholder */
                    <div className="w-64 h-48 bg-gray-300 flex items-center justify-center rounded-sm relative overflow-hidden">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = '<div class="text-gray-500 text-center p-4">Add photo:<br/>' + moment.image + '</div>'
                        }}
                      />
                    </div>
                  )}
                  {/* Tape effect */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-400 opacity-50 rotate-2" />
                </div>
              </motion.div>

              {/* Timeline Node */}
              <motion.div
                className={`w-6 h-6 rounded-full border-4 border-white cursor-pointer z-10 ${
                  activeNodeIndex === index
                    ? 'bg-gold shadow-[0_0_20px_rgba(255,215,0,0.8)]'
                    : 'bg-rose-gold'
                }`}
                onClick={() => handleNodeClick(index)}
                whileHover={{ scale: 1.3 }}
                animate={
                  moment.isFuture
                    ? {
                        boxShadow: [
                          '0 0 10px #ff0a54',
                          '0 0 20px #ff477e',
                          '0 0 30px #ff7096',
                          '0 0 20px #ff477e',
                          '0 0 10px #ff0a54'
                        ]
                      }
                    : {}
                }
                transition={moment.isFuture ? { duration: 2, repeat: Infinity } : {}}
              />

              {/* Caption */}
              <div className="mt-8 text-center max-w-xs">
                <h3 className="text-rose-gold font-bold text-lg mb-2">{moment.date}</h3>
                <p className="text-gray-600 text-sm">{moment.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Line */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-rose-gold -z-10 mx-12" />
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden py-12 px-6">
        <div className="space-y-16">
          {timelineData.map((moment, index) => (
            <div key={moment.id} className="flex gap-6">
              {/* Timeline Node */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-6 h-6 rounded-full border-4 border-white cursor-pointer ${
                    activeNodeIndex === index
                      ? 'bg-gold shadow-[0_0_20px_rgba(255,215,0,0.8)]'
                      : 'bg-rose-gold'
                  }`}
                  onClick={() => handleNodeClick(index)}
                  animate={
                    moment.isFuture
                      ? {
                          boxShadow: [
                            '0 0 10px #ff0a54',
                            '0 0 20px #ff477e',
                            '0 0 30px #ff7096',
                            '0 0 20px #ff477e',
                            '0 0 10px #ff0a54'
                          ]
                        }
                      : {}
                  }
                  transition={moment.isFuture ? { duration: 2, repeat: Infinity } : {}}
                />
                {index < timelineData.length - 1 && (
                  <div className="w-1 flex-1 bg-rose-gold mt-2" style={{ minHeight: '200px' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                {/* Polaroid */}
                <motion.div
                  className="mb-4 cursor-pointer inline-block"
                  style={{ rotate: `${moment.polaroidRotation}deg` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePolaroidClick(moment)}
                >
                  <div className="bg-white p-3 shadow-xl rounded-sm relative">
                    {moment.isFuture ? (
                      <div className="w-full h-48 bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center rounded-sm">
                        <span className="text-7xl">?</span>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-sm relative overflow-hidden">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = '<div class="text-gray-500 text-center p-4 text-xs">Add photo:<br/>' + moment.image + '</div>'
                          }}
                        />
                      </div>
                    )}
                    {/* Tape */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-400 opacity-50" />
                  </div>
                </motion.div>

                {/* Caption */}
                <h3 className="text-rose-gold font-bold text-lg mb-1">{moment.date}</h3>
                <p className="text-gray-600 text-sm">{moment.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute -top-12 right-0 text-white text-4xl hover:text-gold transition-colors"
              >
                ×
              </button>

              {/* Enlarged Photo */}
              <div className="bg-white p-6 md:p-8 shadow-2xl">
                <img
                  src={fullscreenImage.image}
                  alt={fullscreenImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-rose-gold mb-2">
                    {fullscreenImage.date}
                  </h2>
                  <p className="text-gray-700 text-lg">{fullscreenImage.caption}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions for adding photos */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs text-xs text-gray-600 z-20">
        <p className="font-bold mb-1">📸 To add photos:</p>
        <p>Place images in <code className="bg-gray-200 px-1">public/images/</code></p>
        <p>Named: moment-1.jpg through moment-8.jpg</p>
      </div>
    </div>
  )
}

export default Page5_Timeline
