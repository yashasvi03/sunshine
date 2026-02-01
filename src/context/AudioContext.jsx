import { createContext, useContext, useRef, useEffect, useState } from 'react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState(null)

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
  }, [])

  const playPageAudio = (pageNumber, audioSrc) => {
    if (!audioRef.current) return

    // Pages 1-3 share the same song
    if (pageNumber >= 1 && pageNumber <= 3) {
      // If we're already playing the pages 1-3 song, just continue
      if (currentPage >= 1 && currentPage <= 3 && isPlaying) {
        setCurrentPage(pageNumber)
        return
      }

      // Start the pages 1-3 song
      audioRef.current.src = audioSrc
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
      setIsPlaying(true)
      setCurrentPage(pageNumber)
    } else {
      // For other pages, stop current audio and play new one
      if (audioRef.current.src !== audioSrc) {
        audioRef.current.src = audioSrc
        audioRef.current.currentTime = 0
      }
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
      setIsPlaying(true)
      setCurrentPage(pageNumber)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
      setIsPlaying(true)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        playPageAudio,
        stopAudio,
        pauseAudio,
        resumeAudio,
        isPlaying,
        currentPage,
        audioRef
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
