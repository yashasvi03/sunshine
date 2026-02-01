import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navigation = () => {
  const location = useLocation()

  const pages = [
    { path: '/unlock', name: 'Unlock', number: 1 },
    { path: '/birthday-facts', name: 'Facts', number: 2 },
    { path: '/countdown', name: 'Countdown', number: 3 },
    { path: '/reasons', name: 'Reasons', number: 4 },
    { path: '/timeline', name: 'Timeline', number: 5 },
    { path: '/cake', name: 'Cake', number: 6 },
    { path: '/gift', name: 'Gift', number: 7 }
  ]

  const currentPageNumber = pages.find(p => p.path === location.pathname)?.number || 1

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
            Birthday Adventure ✨
          </div>

          {/* Page indicators */}
          <div className="flex gap-2">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="relative group"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    page.number === currentPageNumber
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page.number}
                </motion.div>
                {/* Tooltip */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {page.name}
                </div>
              </Link>
            ))}
          </div>

          {/* Progress */}
          <div className="text-sm text-gray-600">
            Page {currentPageNumber} of 7
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
