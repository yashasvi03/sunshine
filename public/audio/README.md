# Audio Files

Add your background music files to this directory. Background music will auto-play and loop continuously.

## Required Files

### Pages 1-3 (Unlock, Birthday Facts, Countdown) - SHARED SONG
**Filename:** `pages-1-3-shared.mp3`
- **Special Feature:** This single song plays continuously across all three pages!
- When navigating from Page 1 → Page 2 → Page 3, the song continues from the same timestamp
- No restart or interruption when moving between these pages
- Mysterious, magical beginning transitioning to upbeat and celebratory
- Should build energy as the user progresses through the pages
- **Suggested:** 2-3 minute instrumental that flows through different moods
- **Important:** Must be long enough to cover the time spent on all three pages

### Page 4 - 26 Reasons
**Filename:** `page4-26reasons.mp3`
- Playful and sweet
- Light and joyful atmosphere
- Suggested: Gentle, happy melody

### Page 5 - Timeline
**Filename:** `page5-timeline.mp3`
- Romantic and sentimental
- Reflects journey and memories
- Suggested: Beautiful, emotional instrumental

### Page 6 - Birthday Cake
**Filename:** `happy-birthday.mp3`
- Classic "Happy Birthday to You" song
- Celebratory and festive
- **Already configured!** ✓

### Page 7 - Gift Reveal
**Note:** Uses video with built-in audio, no separate music file needed

## General Guidelines

- **Format:** MP3 (best compatibility)
- **Duration:**
  - Pages 1-3 shared: 2-3 minutes (longer is better for continuous experience)
  - Pages 4-5: 30-90 seconds (will loop automatically)
- **File Size:** Keep under 5 MB each for faster loading
- **Volume:** Pre-normalize to consistent levels
- **Bitrate:** 128-192 kbps recommended
- **License:** Ensure you have rights to use the music

## How It Works

The shared audio for pages 1-3 uses React Context to maintain playback state across page navigation. When you move from page 1 to 2 to 3, the same audio element continues playing without restarting, creating a seamless musical experience!
