import { createContext, useContext, useRef, useEffect, useState, useCallback } from 'react'

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
  const pendingPlayRef = useRef(null)

  // Initialize audio element immediately
  useEffect(() => {
    console.log('Initializing AudioContext')
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playPageAudio = useCallback((pageNumber, audioSrc) => {
    if (!audioRef.current) {
      console.warn('Audio element not initialized yet')
      return
    }

    console.log(`Playing audio for page ${pageNumber}:`, audioSrc)

    // Pages 1-3 share the same song
    if (pageNumber >= 1 && pageNumber <= 3) {
      // If we're already playing the pages 1-3 song, just continue
      if (currentPage >= 1 && currentPage <= 3 && isPlaying) {
        console.log('Already playing pages 1-3 song, continuing...')
        setCurrentPage(pageNumber)
        return
      }

      // Start the pages 1-3 song
      const fullSrc = window.location.origin + audioSrc
      console.log('Setting audio src:', audioSrc, 'Full:', fullSrc, 'Current:', audioRef.current.src)

      if (audioRef.current.src !== fullSrc) {
        audioRef.current.src = audioSrc
      }

      audioRef.current.play().then(() => {
        console.log('Audio started successfully for page', pageNumber)
        setIsPlaying(true)
        setCurrentPage(pageNumber)
      }).catch(err => {
        console.log('Audio play failed, waiting for user interaction:', err)
        pendingPlayRef.current = { pageNumber, audioSrc }
      })
    } else {
      // For other pages, stop current audio and play new one
      const fullSrc = window.location.origin + audioSrc
      if (audioRef.current.src !== fullSrc) {
        audioRef.current.src = audioSrc
        audioRef.current.currentTime = 0
      }
      audioRef.current.play().then(() => {
        console.log('Audio started successfully for page', pageNumber)
        setIsPlaying(true)
        setCurrentPage(pageNumber)
      }).catch(err => {
        console.log('Audio play failed, waiting for user interaction:', err)
        pendingPlayRef.current = { pageNumber, audioSrc }
      })
    }
  }, [currentPage, isPlaying])

  // Set up user interaction listener for autoplay
  useEffect(() => {
    const handleInteraction = () => {
      if (pendingPlayRef.current) {
        const { pageNumber, audioSrc } = pendingPlayRef.current
        console.log('User interaction detected, playing pending audio')
        playPageAudio(pageNumber, audioSrc)
        pendingPlayRef.current = null
      }
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
    }
  }, [playPageAudio])

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
