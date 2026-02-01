Interactive Birthday Website - Detailed Specification
Project: 26th Birthday Celebration for Shivani
1. PROJECT OVERVIEW1.1 Purpose
Create an interactive, romantic, and memorable web experience celebrating her 26th birthday on February 17th, 2025.1.2 Key Details

DOB: February 17, 2000
Age: 26 years old
Launch Date: February 17, 2025
Target Device: Mobile-first, responsive for all devices
1.3 Technical Stack
Frontend: React 18+
Animations: Framer Motion
3D Elements: Three.js (for cake) or CSS 3D transforms
Audio: Howler.js
Effects: React Confetti / Custom Canvas
Build: Vite
Styling: Tailwind CSS + Custom CSS
Deployment: Vercel/Netlify2. PAGE-BY-PAGE SPECIFICATIONSPAGE 1: THE UNLOCK
2.1.1 Visual Design
Layout:
- Centered content on full viewport
- Dark gradient background (deep purple to navy blue)
- Twinkling stars animation in background
- Soft spotlight effect on input area

Colors:
- Background: Linear gradient #1a0033 to #000428
- Input field: White with soft glow
- Text: Gold (#FFD700) and white
- Accent: Rose gold (#B76E79)2.1.2 Content Elements
Title: "A Special Day Deserves a Special Code"
Subtitle: "Enter the magic number to begin..."
Input Field: Number input (expected: 17, 1702, or 26)
Hint (optional): Small text "Hint: The day magic happened"2.1.3 Interactions
1. User lands on page
   - Stars twinkle randomly
   - Title fades in (duration: 1s)
   - Input field slides up (duration: 0.8s, delay: 0.5s)

2. User types incorrect code
   - Gentle shake animation
   - Red glow around input
   - Text appears: "Not quite, try the day she was born"

3. User enters correct code (17)
   - Input field glows golden
   - Stars accelerate toward center
   - Screen fills with golden particles
   - Particles coalesce into text: "Happy 26th Birthday [Her Name]"
   - Background music starts (fade in over 2s)
   - Transition to Page 2 after 3s2.1.4 Audio
Background: Soft romantic instrumental (low volume: 0.3)
Success sound: Magical chime (duration: 1.5s)
Format: MP3, preloaded2.1.5 Technical Implementation
javascriptState Management:
- inputValue: string
- isCorrect: boolean
- showError: boolean
- isTransitioning: boolean

Validation:
- Accept: "17", "1702", "26"
- Max attempts: Unlimited (it's her birthday, no pressure)

Animation Timeline:
1. Initial mount → Stars + Title fade in
2. Input appears → Slide up animation
3. Correct code → Particle burst → Text formation → Page transitionPAGE 2: FEBRUARY 17TH - A SPECIAL DAY
2.2.1 Visual Design
Layout:
- Animated calendar page flipping sequence
- Each fact appears as a card below calendar
- Clean white background with soft shadows
- Vintage calendar aesthetic

Colors:
- Background: Soft cream (#FAF9F6)
- Calendar: Classic paper white with red date
- Cards: White with subtle gradient borders
- Text: Navy blue (#2C3E50) and gold accents2.2.2 Content Elements
Opening Animation:
- Calendar pages flip from January to February 17, 2000
- "February 17" in large red text
- "2000" below in smaller text
- Confetti burst when lands on correct date

Facts to Display (in sequence):
1. "On Wednesday, February 17, 2000, the world got brighter"
2. "Top Song: [Research: Billboard #1 for that week - likely 'I Knew I Loved You' by Savage Garden]"
3. "That year: [Major 2000 events - Y2K survived, Sydney Olympics, etc.]"
4. "You've been making the world better for 9,131 days"
   (Calculate: Feb 17, 2000 to Feb 17, 2025)
5. "But the REAL magic started on [Date you met]..."
6. Heart animation forms with your meeting date inside2.2.3 Interactions
1. Page loads
   - Calendar pages flip animation (2s)
   - Lands on Feb 17, 2000 with emphasis
   - Small confetti burst

2. Facts reveal sequence
   - User taps/clicks "Next" or auto-advance every 3s
   - Each fact slides in from right
   - Previous fact fades to top as background
   - Progress dots at bottom (6 total)

3. Final transition
   - Heart with meeting date pulses
   - Click heart to continue to Page 3
   - Smooth fade transition2.2.4 Data Structure
javascriptconst facts = [
  {
    id: 1,
    icon: "🌟",
    text: "On Wednesday, February 17, 2000, the world got brighter",
    animation: "fadeInUp"
  },
  {
    id: 2,
    icon: "🎵",
    text: "Top Song: 'I Knew I Loved You' by Savage Garden",
    subtext: "Billboard Hot 100 #1",
    animation: "slideInRight"
  },
  {
    id: 3,
    icon: "🌍",
    text: "That year: The world celebrated Y2K survival",
    subtext: "Sydney hosted the Olympics, Harry Potter fever grew",
    animation: "fadeInUp"
  },
  {
    id: 4,
    icon: "⏰",
    text: "You've been amazing for 9,131 days",
    subtext: "That's 219,144 hours of being incredible",
    animation: "slideInLeft"
  },
  {
    id: 5,
    icon: "✨",
    text: "But the REAL magic started on...",
    animation: "fadeIn"
  },
  {
    id: 6,
    icon: "❤️",
    text: "[Your Meeting Date]",
    subtext: "The day my world changed",
    animation: "heartBeat",
    interactive: true
  }
];2.2.5 Technical Implementation
javascriptComponents:
- CalendarFlip: Animated calendar component
- FactCard: Reusable card component with animations
- ProgressDots: Shows current fact index

State:
- currentFactIndex: number (0-5)
- autoAdvance: boolean
- transitionDirection: 'forward' | 'backward'

Timing:
- Calendar flip: 2s
- Auto-advance interval: 3s per fact
- Manual advance: Immediate on click
- Final heart pulse: Infinite loop (1.5s cycle)PAGE 3: OUR COUNTDOWN
2.3.1 Visual Design
Layout:
- Large counter in center (60% of viewport height)
- Floating words around counter in circular pattern
- Gradient background with subtle particle effects
- Counter has depth/shadow for prominence

Colors:
- Background: Radial gradient from light pink (#FFE5EC) to soft purple (#E0BBE4)
- Counter numbers: Deep navy (#1a1a2e)
- Counter labels: Gold (#FFD700)
- Floating words: Mix of pink, purple, gold2.3.2 Content Elements
Counter Display:
Calculate from [Your Meeting Date] to February 17, 2025

Example: If you met on June 15, 2022
- Days: 977 days
- Hours: 23,448 hours  
- Minutes: 1,406,880 minutes

Format:
  [XXXX] DAYS
  [XXXXX] HOURS
  [XXXXXXX] MINUTES
  TOGETHER

Floating Words (orbiting the counter):
- "laughs shared"
- "adventures taken"
- "inside jokes"
- "memories made"
- "dreams dreamed"
- "hands held"
- "late night talks"
- "morning coffees"
- "quiet moments"
- "loud celebrations"2.3.3 Interactions
1. Page loads
   - Counter numbers flip in from 0 to actual count (2s animation)
   - Airport/flip board style animation
   - Each unit (days/hours/minutes) animates sequentially
   - Floating words fade in one by one (0.5s intervals)

2. Continuous animations
   - Words orbit slowly (60s full rotation)
   - Particles (tiny hearts/stars) float upward
   - Counter increments in real-time (minutes update)
   - Subtle pulse effect on counter every 5s

3. After 8 seconds
   - Message fades in at bottom: "But who's counting? (We are ❤️)"
   - "Continue" button appears with soft glow
   - Click to transition to Page 42.3.4 Technical Implementation
javascriptCalculations:
const meetingDate = new Date('2022-06-15'); // YOUR DATE
const currentDate = new Date();
const diffTime = Math.abs(currentDate - meetingDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
const diffMinutes = Math.floor(diffTime / (1000 * 60));

Components:
- FlipCounter: Individual flip animation for each digit
- OrbitingWord: Word that follows circular path
- ParticleSystem: Canvas-based floating particles

Animation Library:
- Use Framer Motion for flip counter
- CSS animations for orbit (transform: rotate)
- RequestAnimationFrame for particles

State:
- days: number
- hours: number
- minutes: number
- updateInterval: setInterval (update every 60s)PAGE 4: 26 REASONS YOU'RE INCREDIBLE
2.4.1 Visual Design
Layout:
- Full screen canvas
- 26 balloons floating at different heights
- Each balloon has number (1-26) visible
- Balloons gently bob and sway
- Counter at top: "X/26 reasons discovered"

Colors:
- Background: Sky gradient (light blue to soft pink)
- Balloons: Mixed pastels (pink, lavender, mint, peach, yellow, sky blue)
- Numbers on balloons: White bold text
- Reason cards: White with colored border matching balloon
- Confetti: Rainbow colors

Balloon Distribution:
- Random but balanced across screen
- Larger balloons for early numbers (1-10)
- Smaller for later numbers (creates depth)2.4.2 Content Elements
26 Reasons Structure (You'll customize these):

PERSONAL QUALITIES (10 reasons):
1. "Your laugh is contagious and lights up every room"
2. "The way you care about everyone around you"
3. "Your determination when you set your mind to something"
4. "How you make even mundane tasks fun"
5. "Your kindness to strangers"
6. "The wisdom you share without realizing it"
7. "Your incredible creativity"
8. "How you see the best in people"
9. "Your strength through challenges"
10. "The way you make me want to be better"

SPECIFIC MEMORIES (8 reasons):
11. "That time you [specific funny moment]"
12. "When you [sweet gesture you remember]"
13. "The day we [memorable experience]"
14. "How you [unique thing she does]"
15. "That adventure to [place]"
16. "When you surprised me with [something]"
17. "The way you [habit you love]"
18. "That moment when [inside joke origin]"

LITTLE THINGS (5 reasons):
19. "How you scrunch your nose when thinking"
20. "Your [morning/evening] routine that I adore"
21. "The way you [specific cute habit]"
22. "Your collection of [something she collects]"
23. "That [item of clothing] that suits you perfectly"

FUTURE & DREAMS (3 reasons):
24. "Your passion for [her goals/career]"
25. "The future we're building together"
26. "Every day I get to wake up knowing you're in my life"

Final Message (after all balloons):
"And infinity more reasons to come..."2.4.3 Interactions
1. Page loads
   - Balloons float in from bottom (staggered timing)
   - Each settles at random height
   - Continuous gentle bobbing animation
   - Slight horizontal drift with sine wave

2. Balloon click
   - Balloon rises quickly upward
   - Pop animation at top (balloon pieces fly out)
   - Confetti burst at pop location
   - Reason card fades in at center
   - Card format:
     ┌─────────────────────────┐
     │    Reason #X            │
     │                         │
     │  "Your reason text"     │
     │                         │
     │    [Tap to continue]    │
     └─────────────────────────┘
   - Click card → Card fades out
   - Counter updates: "X/26 discovered"

3. All balloons popped
   - All confetti pieces on screen move together
   - Form heart shape in center
   - Heart pulses with glow
   - Message appears: "And infinity more reasons to come..."
   - Heart click → Transition to Page 5

4. Physics
   - Balloons respond to cursor proximity (subtle push away)
   - String dangles below balloon with subtle swing2.4.4 Technical Implementation
javascriptData Structure:
const reasons = [
  { id: 1, text: "Your laugh is contagious...", color: "#FFB6C1" },
  { id: 2, text: "The way you care...", color: "#E6E6FA" },
  // ... 24 more
];

Balloon Object:
{
  id: number,
  x: number (position),
  y: number (position),
  size: number (80-120px),
  color: string,
  isPopped: boolean,
  bobSpeed: number (random 2-4s),
  driftAmount: number (random 10-30px)
}

Components:
- BalloonCanvas: Main canvas component
- Balloon: Individual balloon with SVG
- ReasonCard: Modal-style card component
- ConfettiPiece: Individual confetti particle
- HeartFormation: Final confetti→heart animation

State:
- balloons: Balloon[]
- poppedCount: number
- activeReason: number | null
- confettiPieces: ConfettiPiece[]
- allComplete: boolean

Animations:
- Balloon bob: CSS animation with random duration
- Pop: Scale up + opacity 0 + rotate
- Confetti: Physics-based falling (gravity, air resistance)
- Heart formation: Tween each confetti piece to heart path

Performance:
- Use CSS transforms for balloons (GPU accelerated)
- Canvas for confetti (more efficient for many particles)
- Limit confetti pieces per pop to 15PAGE 5: OUR STORY - TIMELINE
2.5.1 Visual Design
Layout:
- Horizontal scrolling timeline (desktop)
- Vertical scrolling timeline (mobile)
- Timeline line with nodes for each memory
- Photos appear above timeline
- Captions below

Colors:
- Background: Soft beige (#F5F5DC)
- Timeline line: Rose gold (#B76E79)
- Nodes: Gold circles (#FFD700) with white border
- Polaroid frames: White with shadow
- Tape effect: Semi-transparent gray (#CCCCCC80)

Timeline Structure:
━━━●━━━●━━━●━━━●━━━●━━━●━━━●━━━●━━━?
  1   2   3   4   5   6   7   8   Future2.5.2 Content Elements
Timeline Moments (You'll customize with your photos):

Moment 1: First Meeting
- Date: [Your meeting date]
- Photo: [First photo together or from that time]
- Caption: "The day everything changed. I didn't know then that I'd found my person."

Moment 2: First Date
- Date: [First date]
- Photo: [From first date or around that time]
- Caption: "Nervous excitement, endless conversation, and the beginning of forever."

Moment 3: [Significant Early Moment]
- Date: [Date]
- Photo: [Relevant photo]
- Caption: "[Your memory/caption]"

Moment 4: First Trip Together
- Date: [Trip date]
- Photo: [Travel photo]
- Caption: "Adventure #1 of many. [Specific memory from trip]"

Moment 5: [Special Celebration]
- Date: [Date]
- Photo: [Photo]
- Caption: "[Your caption]"

Moment 6: [Inside Joke Origin / Funny Moment]
- Date: [Date]
- Photo: [Photo]
- Caption: "The day [inside joke] was born. Still makes us laugh."

Moment 7: [Recent Special Moment]
- Date: [Recent date]
- Photo: [Recent photo]
- Caption: "[Recent memory]"

Moment 8: [Very Recent / Last Month]
- Date: [Very recent]
- Photo: [Latest photo]
- Caption: "Every day with you is my favorite."

Final Node: "To Be Continued..."
- No photo, just a question mark
- Caption: "The best is yet to come ❤️"

Note: Prepare 8-10 photos total, high quality, landscape orientation preferred2.5.3 Interactions
1. Page loads
   - Timeline draws from left to right (2s animation)
   - Nodes appear sequentially with pulse
   - First polaroid is visible, others are dimmed

2. Scrolling (Desktop)
   - Horizontal scroll with mouse wheel or trackpad
   - Snap to each node
   - Active node highlighted (gold glow)
   - Smooth momentum scrolling

3. Navigation (Mobile)
   - Vertical scroll (more natural on mobile)
   - Nodes on left, polaroids on right (alternating)
   - Active polaroid scales up slightly

4. Click on any node
   - Polaroid "flips" into view (3D rotation)
   - Caption fades in below
   - Photo becomes fully colored (others stay dimmed)
   - Tape at top of polaroid has slight peel effect

5. Click polaroid
   - Enlarges to fullscreen overlay
   - Shows full caption
   - Black backdrop (80% opacity)
   - Click outside or X button to close

6. Final node (?)
   - Pulses with rainbow glow
   - Click shows message: "Our story continues... Happy Birthday ❤️"
   - Continue button appears → Page 62.5.4 Technical Implementation
javascriptData Structure:
const timelineData = [
  {
    id: 1,
    date: "June 15, 2022",
    title: "First Meeting",
    image: "/images/moment-1.jpg", // You'll add these
    caption: "The day everything changed...",
    polaroidRotation: -2 // Slight rotation in degrees
  },
  {
    id: 2,
    date: "June 22, 2022",
    title: "First Date",
    image: "/images/moment-2.jpg",
    caption: "Nervous excitement...",
    polaroidRotation: 3
  },
  // ... more moments
  {
    id: 9,
    date: "???",
    title: "To Be Continued",
    image: null,
    caption: "The best is yet to come ❤️",
    isFuture: true
  }
];

Components:
- TimelineContainer: Scroll container with snap points
- TimelineLine: SVG line with nodes
- TimelineNode: Clickable node with animation
- PolaroidFrame: Photo with frame styling
- TapeDecoration: Decorative tape at top
- FullscreenOverlay: Enlarged photo view

State:
- activeNodeIndex: number
- fullscreenImage: number | null
- scrollPosition: number

Scroll Behavior:
scroll-snap-type: x mandatory (desktop)
scroll-snap-align: center
smooth scrolling with CSS: scroll-behavior: smooth

Photo Requirements:
- Format: JPG/PNG
- Min resolution: 1200x800px
- Aspect ratio: 3:2 or 4:3 preferred
- Optimized file size: <500KB each
- Total 8 photos neededPAGE 6: MAKE A WISH - VIRTUAL BIRTHDAY CAKE
2.6.1 Visual Design
Layout:
- Centered 3D birthday cake
- Dark/dim background to emphasize candles
- Cake sits on decorative plate
- Candles on top with realistic flames
- Instruction text above cake
- Celebration elements ready to trigger

Colors:
- Background: Deep purple gradient (#2C0735 to #1a0033)
- Cake: Pink/white frosting with details
- Candles: White/cream with golden flames
- Plate: Silver/white decorative
- Fireworks: Rainbow colors
- Confetti: Gold, pink, purple, white

Cake Design:
- 2 tier cake (visually impressive)
- Top tier: 6 candles in circle
- Bottom tier: 20 candles around edge
- Total: 26 candles
- Decorative frosting swirls
- Optional: Small fondant flowers/hearts2.6.2 Content Elements
Text Sequence:

Before Interaction:
"Close your eyes"
"Make a wish"
"And blow! 🎂"
(Microphone icon or "Tap candles to blow")

During Blow:
- Candles extinguish one by one
- Slight smoke effect from each wick
- Flame particles dissipate upward

After All Candles Out:
1. Brief darkness (0.5s)
2. Cake glows from within (golden light)
3. Fireworks explode from behind cake
4. Screen fills with confetti
5. Message appears:
   "May all your wishes come true"
   "Starting with mine - another year with you ❤️"
6. Happy Birthday melody plays (8 bars)2.6.3 Interactions
1. Page loads
   - Cake fades in from black
   - Candles light up sequentially (left to right)
   - Flames flicker realistically
   - Ambient glow around each flame
   - Instruction text pulses gently

2. Blow Interaction (Two Methods):

   METHOD A - Microphone (preferred):
   - Request microphone permission on page load
   - Detect audio input level
   - Threshold for "blow" sound (sudden volume increase)
   - Visual feedback: Wind particles from bottom to candles
   - Candles extinguish based on blow strength/duration
   - All candles must be out to proceed

   METHOD B - Touch/Click (fallback):
   - User swipes across candles
   - Or taps individual candles
   - Each candle touched goes out
   - Less magical but guaranteed to work

3. Candle Extinguish Animation:
   - Flame shrinks and disappears (0.3s)
   - Smoke rises from wick (2s)
   - Wick glows briefly (like real candle)
   - Sound: Soft "pfft" for each candle

4. All Candles Out:
   - Brief pause (0.5s)
   - Cake pulses with inner golden glow
   - Fireworks launch from behind:
     * 5 firework bursts
     * Staggered timing (0.5s apart)
     * Each explodes into different color
   - Confetti falls from top
   - Sound: Firework whistles and pops
   - Happy Birthday melody (instrumental)

5. Celebration Screen:
   - Confetti continues falling
   - Message fades in
   - Continue button appears after 8s
   - Or auto-advance to Page 7 after 15s2.6.4 Technical Implementation
javascript3D Cake Options:

OPTION 1 - Three.js (Most realistic):
- Load 3D model or build with geometries
- Realistic lighting and shadows
- Particle system for flames
- More complex but impressive

OPTION 2 - CSS 3D (Simpler):
- Layered divs with 3D transforms
- CSS animations for flames
- Canvas for particles
- Easier to implement, still effective

Recommended: OPTION 2 for faster development

Components:
- CakeContainer: Main 3D wrapper
- CakeTier: Individual tier (top/bottom)
- Candle: Single candle with flame
- FlameParticle: Fire particle effect
- SmokeParticle: Smoke after extinguish
- FireworkBurst: Firework explosion
- ConfettiFall: Falling confetti system

Microphone Detection:
const detectBlow = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const checkAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        
        if (average > BLOW_THRESHOLD) {
          extinguishCandles();
        }
        requestAnimationFrame(checkAudioLevel);
      };
      checkAudioLevel();
    })
    .catch(err => {
      // Fallback to touch/click method
      enableTouchBlowMode();
    });
};

State Management:
- candlesLit: boolean[] (array of 26)
- isBlowing: boolean
- micPermission: 'granted' | 'denied' | 'pending'
- celebrationStarted: boolean
- audioLevel: number

Candle Positions:
Top tier (6 candles): Circle with 60° spacing
const topTierPositions = [
  { x: 0, z: 40, angle: 0 },
  { x: 35, z: 20, angle: 60 },
  { x: 35, z: -20, angle: 120 },
  { x: 0, z: -40, angle: 180 },
  { x: -35, z: -20, angle: 240 },
  { x: -35, z: 20, angle: 300 }
];

Bottom tier (20 candles): Circle with 18° spacing
// Generate programmatically

Audio Files Needed:
- background-music.mp3 (continues from previous pages)
- candle-blow.mp3 (single blow sound)
- firework-launch.mp3
- firework-burst.mp3
- happy-birthday.mp3 (instrumental, 8 bars)
- celebration-ambience.mp3

Animation Timing:
- Candle light: 0.3s per candle × 26 = 7.8s total
- Blow detection: Real-time, variable
- Extinguish: 0.3s per candle
- Pause: 0.5s
- Cake glow: 1s
- Fireworks: 2.5s (5 bursts × 0.5s)
- Confetti: Continuous for 10s
- Message fade: 1s
- Total celebration: ~15sPAGE 7: YOUR GIFT & MESSAGE
2.7.1 Visual Design
Layout:
SECTION 1 - Gift Box:
- Large wrapped gift box in center (40% viewport)
- 3D perspective view
- Elegant wrapping paper with pattern
- Satin ribbon with bow on top
- Soft shadow beneath box
- Clean white background with subtle gradient

SECTION 2 - Video Message:
- Video player with custom controls
- Elegant frame around video
- Background dims (dark overlay)
- Video fills 70% of screen width

SECTION 3 - Gift Reveal:
- Gift details in elegant card
- Centered presentation
- Imagery/icons for the gift
- Call-to-action button

SECTION 4 - Final Message:
- Heartfelt closing screen
- Floating hearts background
- Navigation options

Colors:
- Background: Pearl white (#FAFAFA) to soft pink gradient
- Wrapping paper: Rose gold with white pattern
- Ribbon: Deep red (#8B0000) with gold edges
- Video frame: Gold (#FFD700) ornate border
- Final screen: Soft gradient (pink to lavender)2.7.2 Content Elements
PHASE 1 - Wrapped Gift:
Text above box: "One more surprise..."
Instruction: "Tap to unwrap"

PHASE 2 - Video Message:
Title: "A Message Just For You"
Video: Your personal recording
Length: 1-3 minutes recommended
Content suggestions:
- Start: "Happy 26th Birthday, [Her Name]"
- Express what this birthday means
- Share favorite moments from past year
- What you love about her at 26
- Your hopes/dreams for her year ahead
- Maybe funny moments/inside jokes
- End: "I love you" + lead into gift reveal

PHASE 3 - Gift Reveal Options:

OPTION A - Experience Gift:
┌─────────────────────────────────┐
│         🍽️                       │
│  Dinner at [Restaurant Name]    │
│  This Saturday, 8:00 PM         │
│  [Address]                      │
│                                 │
│  Your favorite cuisine, my      │
│  favorite person ❤️              │
│                                 │
│  [View Reservation] [Details]   │
└─────────────────────────────────┘

OPTION B - Trip/Getaway:
┌─────────────────────────────────┐
│         ✈️                       │
│  Weekend Getaway to [Place]     │
│  [Dates]                        │
│                                 │
│  We're going on an adventure!   │
│  Pack your bags 😊               │
│                                 │
│  [See Itinerary]                │
└─────────────────────────────────┘

OPTION C - Physical Gift:
┌─────────────────────────────────┐
│         🎁                       │
│  Your Real Gift Awaits...       │
│                                 │
│  Check under your pillow        │
│  (or wherever I hid it 😉)      │
│                                 │
│  [Hint if needed]               │
└─────────────────────────────────┘

OPTION D - Coupon Book:
┌─────────────────────────────────┐
│         🎟️                       │
│  A Year of Adventures           │
│  12 Date Coupons                │
│                                 │
│  One special experience each    │
│  month, planned by me ❤️         │
│                                 │
│  [Download Coupon Book PDF]     │
└─────────────────────────────────┘

PHASE 4 - Final Screen:
"Happy 26th Birthday, [Her Name]"

"Thank you for being exactly who you are.
Thank you for every laugh, every adventure,
every quiet moment, and every dream we share.

Here's to 26 and all the years to come.

I love you ❤️"

[Floating hearts animation]
[Soft music continues]

Buttons:
- "Replay This Experience" (back to Page 1)
- "Save Our Memories" (download timeline photos as PDF)
- "Leave Me a Message" (opens text area)2.7.3 Interactions
INTERACTION 1 - Unwrapping the Gift:

Step 1: First tap
- Box rotates slightly (3D effect)
- Instruction changes: "Keep tapping!"
- Ribbon starts to loosen

Step 2: Second tap
- Ribbon unties itself (animated path)
- Falls to the side
- Bow bounces off
- Instruction: "Almost there..."

Step 3: Third tap
- Wrapping paper tears from top
- Tears propagate down sides
- Paper falls away in pieces
- Golden light emanates from inside

Step 4: Box opens
- Lid lifts up slowly
- Intense golden glow
- Light rays emanate out
- Transition to video

INTERACTION 2 - Video Playback:

Auto-play behavior:
- Video starts automatically when revealed
- Custom controls appear on hover
- Volume set to comfortable level (0.7)
- Background music fades to 0.2 during video
- Subtitles available (if you add them)

Controls:
- Play/Pause
- Volume slider
- Fullscreen option
- Progress bar
- No skip ahead (she should watch it all!)

After video ends:
- Screen fades to white
- Text appears: "But wait, there's more..."
- Pulse animation
- Click anywhere to continue

INTERACTION 3 - Gift Reveal:

Entrance:
- Gift card slides up from bottom
- Gentle scale animation (0.9 → 1.0)
- Confetti burst around card
- Relevant icon pulses

Buttons (depending on gift type):
- "View Reservation" → Opens details modal
- "See Itinerary" → Displays trip details
- "Download Coupon Book" → Triggers PDF download
- "Get Hint" → Shows playful hint about location

INTERACTION 4 - Final Screen:

Entrance:
- Smooth fade from gift reveal
- Hearts float up from bottom (continuous)
- Message fades in word by word
- Soft glow effect around text

Hearts animation:
- Different sizes (small to medium)
- Random X positions
- Floating up at different speeds
- Fade out as they reach top
- 20-30 hearts on screen at once

Action Buttons:

"Replay This Experience"
- Confirmation modal: "Start from the beginning?"
- Resets all progress
- Returns to Page 1

"Save Our Memories"
- Generates PDF with timeline photos
- Includes dates and captions
- Downloads as: "Our-Memories-[Her-Name]-26th-Birthday.pdf"

"Leave Me a Message"
- Text area appears
- She can write her thoughts
- Saves to localStorage or sends to you via email
- Placeholder: "What did you think? ❤️"2.7.4 Technical Implementation
javascriptComponents:
- GiftBox3D: Wrapped gift with 3D transforms
- RibbonAnimation: SVG path animation
- WrappingPaper: Tear effect with particles
- VideoPlayer: Custom controls
- GiftRevealCard: Final gift presentation
- FloatingHearts: Particle system
- FinalMessage: Closing screen

Gift Box Unwrapping:
const unwrapStages = [
  {
    stage: 1,
    action: "rotateBox",
    animation: {
      transform: "rotateY(15deg) rotateX(5deg)",
      duration: 0.5
    }
  },
  {
    stage: 2,
    action: "untieRibbon",
    animation: {
      // SVG path morphing
      // Ribbon falls with physics
      duration: 1.5
    }
  },
  {
    stage: 3,
    action: "tearPaper",
    animation: {
      // Paper tears from top
      // Pieces fall with physics
      // Canvas-based for performance
      duration: 2.0
    }
  },
  {
    stage: 4,
    action: "openBox",
    animation: {
      // Lid rotates on hinge
      // Light effect intensifies
      duration: 1.5
    }
  }
];

State Management:
- unwrapStage: number (0-4)
- videoPlayed: boolean
- giftRevealed: boolean
- messageText: string
- audioVolume: number

Video Component:
<VideoPlayer
  src="/videos/birthday-message.mp4"
  autoPlay={true}
  controls={true}
  onEnded={() => setVideoPlayed(true)}
  volume={0.7}
  poster="/images/video-thumbnail.jpg"
/>

Video Requirements:
- Format: MP4 (H.264)
- Resolution: 1920x1080 (Full HD)
- Length: 1-3 minutes
- File size: <50MB (compressed)
- Audio: Clear, good quality
- Lighting: Well-lit, clear face
- Orientation: Landscape
- You'll need to record this!

PDF Generation (Save Memories):
Using jsPDF library:
- Include all timeline photos
- Add dates and captions
- Professional layout
- Page breaks between memories
- Cover page: "Our Story - Happy 26th Birthday"

const generatePDF = () => {
  const pdf = new jsPDF();
  
  // Cover page
  pdf.setFontSize(24);
  pdf.text("Our Story", 105, 40, { align: "center" });
  pdf.setFontSize(16);
  pdf.text("Happy 26th Birthday, [Her Name]", 105, 60, { align: "center" });
  
  // Add each memory
  timelineData.forEach((memory, index) => {
    pdf.addPage();
    pdf.addImage(memory.image, 'JPEG', 20, 20, 170, 113);
    pdf.text(memory.date, 105, 145, { align: "center" });
    pdf.text(memory.caption, 105, 160, { align: "center", maxWidth: 170 });
  });
  
  pdf.save(`Our-Memories-${herName}-26th-Birthday.pdf`);
};

Message Sending:
Option 1 - Email (using EmailJS):
- She types message
- Sends to your email
- She gets confirmation

Option 2 - Local Storage:
- Saves locally
- You can read it later on device

Option 3 - Firebase:
- Saves to cloud database
- You can view from anywhere3. TECHNICAL ARCHITECTURE3.1 Project Structure
birthday-website/
├── public/
│   ├── images/
│   │   ├── moment-1.jpg
│   │   ├── moment-2.jpg
│   │   ├── ... (8 timeline photos)
│   │   └── video-thumbnail.jpg
│   ├── videos/
│   │   └── birthday-message.mp4
│   ├── audio/
│   │   ├── background-music.mp3
│   │   ├── candle-blow.mp3
│   │   ├── firework-launch.mp3
│   │   ├── firework-burst.mp3
│   │   ├── happy-birthday.mp3
│   │   └── success-chime.mp3
│   └── fonts/
│       └── [Custom fonts if needed]
├── src/
│   ├── components/
│   │   ├── Page1_Unlock.jsx
│   │   ├── Page2_BirthdayFacts.jsx
│   │   ├── Page3_Countdown.jsx
│   │   ├── Page4_26Reasons.jsx
│   │   ├── Page5_Timeline.jsx
│   │   ├── Page6_BirthdayCake.jsx
│   │   ├── Page7_GiftReveal.jsx
│   │   ├── shared/
│   │   │   ├── ProgressDots.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   ├── AudioController.jsx
│   │   │   └── Button.jsx
│   │   └── effects/
│   │       ├── Confetti.jsx
│   │       ├── FloatingHearts.jsx
│   │       ├── Particles.jsx
│   │       └── Fireworks.jsx
│   ├── hooks/
│   │   ├── useAudio.js
│   │   ├── usePageTransition.js
│   │   └── useMicrophone.js
│   ├── utils/
│   │   ├── dateCalculations.js
│   │   ├── animations.js
│   │   └── pdfGenerator.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── data/
│   │   ├── birthdayFacts.js
│   │   ├── reasons.js
│   │   └── timelineData.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md3.2 Key Dependencies
json{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "howler": "^2.2.3",
    "react-confetti": "^6.1.0",
    "jspdf": "^2.5.1",
    "three": "^0.157.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "canvas-confetti": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}3.3 State Management
javascript// Global App State
const [currentPage, setCurrentPage] = useState(1);
const [pageProgress, setPageProgress] = useState({
  1: { visited: true, completed: false },
  2: { visited: false, completed: false },
  3: { visited: false, completed: false },
  4: { visited: false, completed: false },
  5: { visited: false, completed: false },
  6: { visited: false, completed: false },
  7: { visited: false, completed: false }
});
const [audioEnabled, setAudioEnabled] = useState(true);
const [musicVolume, setMusicVolume] = useState(0.3);

// Page-specific state managed within each component3.4 Audio System
javascript// Audio Controller Hook
const useAudioController = () => {
  const backgroundMusic = useRef(null);
  
  useEffect(() => {
    backgroundMusic.current = new Howl({
      src: ['/audio/background-music.mp3'],
      loop: true,
      volume: 0.3,
      autoplay: false
    });
    
    return () => {
      backgroundMusic.current?.unload();
    };
  }, []);
  
  const playBackground = () => backgroundMusic.current?.play();
  const pauseBackground = () => backgroundMusic.current?.pause();
  const fadeVolume = (to, duration) => backgroundMusic.current?.fade(backgroundMusic.current.volume(), to, duration);
  
  return { playBackground, pauseBackground, fadeVolume };
};

// Sound Effects
const playSound = (soundName) => {
  const sound = new Howl({
    src: [`/audio/${soundName}.mp3`],
    volume: 0.5
  });
  sound.play();
};3.5 Animation System
javascript// Page Transitions (Framer Motion)
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

// Reusable Animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 }
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8 }
};

export const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { type: "spring", stiffness: 200 }
};4. DATA TO CUSTOMIZE4.1 Personal Information
javascript// src/data/personalInfo.js
export const personalInfo = {
  herName: "[Her Name]",
  herBirthday: {
    day: 17,
    month: 2, // February
    year: 2000
  },
  yourRelationship: {
    meetingDate: "2022-06-15", // CUSTOMIZE THIS
    firstDateDate: "2022-06-22", // CUSTOMIZE THIS
    relationshipLabel: "girlfriend" // or "partner", "love", etc.
  }
};4.2 Birthday Facts
javascript// src/data/birthdayFacts.js
export const birthdayFacts = {
  dayOfWeek: "Thursday", // Feb 17, 2000 was a Thursday
  topSong: "I Knew I Loved You by Savage Garden",
  topSongInfo: "Billboard Hot 100 #1",
  worldEvents: [
    "Y2K survived - the world celebrated making it to the new millennium",
    "Sydney hosted the Summer Olympics",
    "Harry Potter fever was growing worldwide"
  ],
  daysAlive: 9131, // Feb 17, 2000 to Feb 17, 2025
  hoursAlive: 219144,
  minutesAlive: 13148640,
  yourMeetingDate: "June 15, 2022" // CUSTOMIZE
};4.3 26 Reasons
javascript// src/data/reasons.js
export const reasons = [
  {
    id: 1,
    category: "personality",
    text: "Your laugh is contagious and lights up every room",
    color: "#FFB6C1"
  },
  {
    id: 2,
    category: "personality",
    text: "The way you care about everyone around you",
    color: "#E6E6FA"
  },
  // ... CUSTOMIZE ALL 26 REASONS
  {
    id: 26,
    category: "future",
    text: "Every day I get to wake up knowing you're in my life",
    color: "#FFE4E1"
  }
];

// Note: Use these categories as guidelines:
// - personality (10): Her character traits
// - memories (8): Specific shared moments
// - little things (5): Cute habits, quirks
// - future (3): Dreams, aspirations, your journey together4.4 Timeline Data
javascript// src/data/timelineData.js
export const timelineData = [
  {
    id: 1,
    date: "June 15, 2022", // CUSTOMIZE
    title: "First Meeting",
    image: "/images/moment-1.jpg", // ADD YOUR PHOTO
    caption: "The day everything changed. I didn't know then that I'd found my person.",
    polaroidRotation: -2
  },
  {
    id: 2,
    date: "June 22, 2022", // CUSTOMIZE
    title: "First Date",
    image: "/images/moment-2.jpg", // ADD YOUR PHOTO
    caption: "Nervous excitement, endless conversation, and the beginning of forever.",
    polaroidRotation: 3
  },
  // ... ADD 6-8 MORE TIMELINE MOMENTS
  {
    id: 9,
    date: "???",
    title: "To Be Continued",
    image: null,
    caption: "The best is yet to come ❤️",
    isFuture: true,
    polaroidRotation: 0
  }
];4.5 Gift Information
javascript// src/data/giftInfo.js
export const giftInfo = {
  type: "experience", // or "trip", "physical", "coupon_book"
  
  // For experience type:
  experience: {
    title: "Dinner at [Restaurant Name]",
    icon: "🍽️",
    date: "Saturday, February 22, 2025",
    time: "8:00 PM",
    location: "[Restaurant Address]",
    description: "Your favorite cuisine, my favorite person ❤️",
    reservationDetails: "Reservation under [Your Name]",
    additionalInfo: "Dress code: Elegant casual"
  },
  
  // OR for trip type:
  trip: {
    title: "Weekend Getaway to [Destination]",
    icon: "✈️",
    dates: "[Date Range]",
    description: "We're going on an adventure!",
    itinerary: [
      "Day 1: [Activities]",
      "Day 2: [Activities]",
      "Day 3: [Activities]"
    ],
    packingNote: "Pack your bags 😊"
  },
  
  // OR for physical gift:
  physical: {
    title: "Your Real Gift Awaits...",
    icon: "🎁",
    location: "Check under your pillow",
    hint: "It's something you mentioned wanting last month",
    additionalMessage: "(or wherever I hid it 😉)"
  },
  
  // OR for coupon book:
  couponBook: {
    title: "A Year of Adventures",
    icon: "🎟️",
    description: "12 Date Coupons - One special experience each month, planned by me ❤️",
    pdfFileName: "Year-of-Adventures-Coupon-Book.pdf",
    coupons: [
      { month: "March", title: "Sunrise Hike & Picnic Breakfast" },
      { month: "April", title: "Cooking Class Together" },
      // ... 10 more
    ]
  }
};5. ASSETS REQUIRED5.1 Images (8-10 total)
Timeline Photos:
- moment-1.jpg (First meeting/early relationship)
- moment-2.jpg (First date or early memory)
- moment-3.jpg (Special moment/trip)
- moment-4.jpg (First trip together)
- moment-5.jpg (Celebration/special event)
- moment-6.jpg (Funny moment/inside joke origin)
- moment-7.jpg (Recent special moment)
- moment-8.jpg (Very recent - last few months)

Optional:
- video-thumbnail.jpg (Frame from your video for poster)

Specifications:
- Format: JPG or PNG
- Resolution: Minimum 1200x800px (landscape)
- Aspect Ratio: 3:2 or 4:3 preferred
- File Size: <500KB each (optimize before use)
- Quality: High (clear faces, good lighting)
- Orientation: Landscape preferred for timeline5.2 Video
birthday-message.mp4
- Your personal birthday message
- Length: 1-3 minutes (2 minutes ideal)
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 (Full HD)
- Frame Rate: 30fps
- Audio: Clear, good quality
- File Size: <50MB (use compression if needed)
- Orientation: Landscape
- Lighting: Well-lit, can see your face clearly
- Background: Clean, not distracting
- Content: Heartfelt, personal, authentic

Recording Tips:
- Use phone in landscape mode
- Good natural light (face the window)
- Stable (use tripod or prop phone)
- Look at camera lens
- Speak clearly and from the heart
- Can include funny moments too
- Edit if needed (trim, add music?)5.3 Audio Files
Required:
1. background-music.mp3
   - Soft romantic instrumental
   - 3-5 minutes (will loop)
   - Royalty-free or licensed
   - Format: MP3, 128-192 kbps
   - Suggestions: 
     * Piano/acoustic love songs (instrumental)
     * Her favorite song (instrumental version)
     * Cinematic romantic score

2. success-chime.mp3
   - Magical unlock sound
   - 1-2 seconds
   - MP3

3. candle-blow.mp3
   - Soft blow sound
   - 0.5 seconds
   - MP3

4. firework-launch.mp3
   - Whistle/launch sound
   - 1 second
   - MP3

5. firework-burst.mp3
   - Pop/explosion sound
   - 0.5 seconds
   - MP3

6. happy-birthday.mp3
   - Instrumental Happy Birthday melody
   - 8-10 seconds (2 verses)
   - MP3

Sources for Royalty-Free Audio:
- Epidemic Sound (subscription)
- Artlist (subscription)
- YouTube Audio Library (free)
- Incompetech (free, attribution)
- Pixabay (free)6. DEPLOYMENT & HOSTING6.1 Recommended Hosting
Option 1 - Vercel (Recommended):
- Free tier available
- Easy deployment from GitHub
- Automatic HTTPS
- Fast global CDN
- Perfect for React/Vite

Option 2 - Netlify:
- Free tier available
- Drag & drop deployment
- Custom domain support
- Form handling (for "Leave a Message")

Option 3 - GitHub Pages:
- Free
- Deploy from repository
- Simple setup6.2 Domain Options
Custom Domain (Recommended):
- Purchase: [her-name]birthday2025.com
- Or: happy26th[her-name].com
- Cost: ~$10-15/year
- Registrars: Namecheap, Google Domains, GoDaddy

Subdomain (Free):
- yourname.vercel.app
- [project-name].netlify.app

HTTPS is essential (included with all hosting options)6.3 Pre-Launch Checklist
Code:
□ All personal data customized
□ All 26 reasons written
□ Timeline data complete with dates
□ Gift information configured
□ Test unlock code works
□ All animations smooth
□ Audio permissions handled gracefully
□ Mobile responsive (test on actual phone)
□ Cross-browser compatible (Chrome, Safari, Firefox)

Assets:
□ All 8 timeline photos added and optimized
□ Video recorded, edited, and uploaded
□ All audio files present
□ File sizes optimized (total <100MB)
□ Images display correctly
□ Video plays without buffering

Testing:
□ Test entire flow start to finish
□ Test on mobile device
□ Test with slow internet
□ Test audio on/off
□ Test all interactions
□ Test on her phone type (iOS/Android)
□ Show to trusted friend for feedback

Launch:
□ Deploy to hosting
□ Test deployed version
□ Custom domain connected (if using)
□ Share link via text/email
□ Backup plan if technical issues7. DEVELOPMENT TIMELINE7.1 Suggested Schedule (Total: 10-14 days)
Days 1-2: Setup & Data Collection
- Initialize project
- Install dependencies
- Gather all photos
- Write 26 reasons
- Compile timeline data
- Record video message

Days 3-4: Pages 1-2
- Build unlock page
- Build birthday facts page
- Add transitions
- Test animations

Days 5-6: Pages 3-4
- Build countdown page
- Build 26 reasons/balloons page
- Implement balloon pop mechanics
- Test interactions

Days 7-8: Page 5
- Build timeline
- Implement scroll behavior
- Add photos with polaroid effect
- Test on mobile

Days 9-10: Pages 6-7
- Build birthday cake with candles
- Implement blow detection
- Build gift unwrapping
- Add video player
- Final message screen

Days 11-12: Polish & Effects
- Add all sound effects
- Refine animations
- Optimize images/video
- Add loading states
- Mobile optimization

Days 13: Testing
- Full flow testing
- Cross-browser testing
- Mobile device testing
- Performance optimization
- Fix any bugs

Day 14: Deployment
- Deploy to hosting
- Final testing on live site
- Prepare to share link

Launch: February 17, 2025 🎉8. MOBILE OPTIMIZATION8.1 Responsive Breakpoints
css/* Mobile First Approach */
/* Base styles: Mobile (< 640px) */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }8.2 Mobile-Specific Adjustments
Page 1 (Unlock):
- Larger touch target for input
- Keyboard doesn't cover content

Page 2 (Birthday Facts):
- Vertical scrolling (not horizontal)
- Larger text, readable without zoom

Page 3 (Countdown):
- Stack counter vertically
- Fewer floating words (prevent clutter)

Page 4 (Balloons):
- Larger balloons (easier to tap)
- Haptic feedback on pop
- Reason cards fit screen width

Page 5 (Timeline):
- Vertical scroll (native behavior)
- Swipe gestures for polaroids
- Larger tap targets

Page 6 (Cake):
- Cake scales to screen size
- Touch-friendly candle interaction
- Landscape orientation encouraged

Page 7 (Gift):
- Video responsive sizing
- Controls easy to tap
- Text readable without zoom

General:
- No hover states (use tap)
- Larger buttons (min 44x44px)
- Readable fonts (min 16px)
- Fast loading on mobile data
- Touch-friendly spacing9. ACCESSIBILITY CONSIDERATIONS9.1 Basic Accessibility
- All interactive elements keyboard accessible
- Focus indicators visible
- Alt text for images (timeline photos)
- Color contrast meets WCAG AA (4.5:1)
- Text scalable without breaking layout
- Audio can be muted/controlled
- Video has controls
- No flashing animations (seizure risk)9.2 Graceful Degradation
If audio permission denied:
- Continue with visual feedback only
- Mute icon appears, can be toggled

If microphone permission denied (cake page):
- Fall back to touch/click to blow candles
- Clear instructions provided

If video won't load:
- Show fallback text message
- Option to download video

If JavaScript disabled:
- Show message: "This experience requires JavaScript"
- Offer simple HTML version (optional)10. LAUNCH STRATEGY10.1 How to Share
Option 1 - Surprise Text:
"I made something special for you.
Open this when you wake up on your birthday ❤️
[Link]"

Option 2 - Midnight Launch:
Send link at 12:00 AM on Feb 17
"Happy Birthday! Your gift is waiting... [Link]"

Option 3 - QR Code:
Generate QR code
Print it beautifully
Leave it with physical gift/card
She scans to access

Option 4 - Password Protected:
Add password page before unlock
Give her password in person
Extra layer of surprise10.2 Backup Plan
Technical Issues:
- Have PDF version of timeline ready
- Video downloaded on your phone to show
- Printed version of 26 reasons
- Real gift ready regardless

Internet Issues:
- Works offline after first load (with service worker)
- Or have laptop ready with local version

Device Issues:
- Test on multiple devices beforehand
- Have backup device ready