# Customization Guide

This guide will help you personalize the birthday website with your own information, photos, and messages.

## Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Customize personal information
- [ ] Write 26 reasons
- [ ] Add 8 timeline photos
- [ ] Record birthday video
- [ ] Configure gift information
- [ ] Test the website: `npm run dev`
- [ ] Deploy to hosting

---

## 1. Personal Information

**File**: `src/data/personalInfo.js`

Update these fields:
- `herName`: Replace with her actual name
- `herBirthday`: Already set to Feb 17, 2000
- `meetingDate`: Your actual meeting date (format: YYYY-MM-DD)
- `firstDateDate`: Your actual first date (format: YYYY-MM-DD)

```javascript
export const personalInfo = {
  herName: "Sarah", // CHANGE THIS
  herBirthday: {
    day: 17,
    month: 2,
    year: 2000
  },
  yourRelationship: {
    meetingDate: "2022-06-15", // CHANGE THIS
    firstDateDate: "2022-06-22", // CHANGE THIS
    relationshipLabel: "girlfriend"
  }
};
```

---

## 2. Birthday Facts (Page 2)

**File**: `src/data/birthdayFacts.js`

Update these fields:
- `yourMeetingDate`: Should match personalInfo
- Verify the song/world events are accurate
- Days/hours/minutes will auto-calculate

---

## 3. The 26 Reasons (Page 4)

**File**: `src/data/reasons.js`

**IMPORTANT**: Customize all 26 reasons with personal, heartfelt messages!

Categories:
- **Personality (1-10)**: Character traits you love
- **Memories (11-18)**: Specific moments you shared
- **Little Things (19-23)**: Cute habits and quirks
- **Future (24-26)**: Dreams and your journey together

Tips:
- Be specific and personal
- Use inside jokes when appropriate
- Mix humor with heartfelt sentiment
- Make her feel truly seen and appreciated

Example customization:
```javascript
{
  id: 1,
  text: "The way you snort when you laugh really hard at something",
  color: "#FFB6C1"
}
```

---

## 4. Timeline Photos (Page 5)

**Folder**: `public/images/`

### What You Need

Add 8 photos with these exact names:
- `moment-1.jpg` - First Meeting
- `moment-2.jpg` - First Date
- `moment-3.jpg` - First Trip
- `moment-4.jpg` - Special Celebration
- `moment-5.jpg` - Unforgettable Memory
- `moment-6.jpg` - Inside Joke Origin
- `moment-7.jpg` - Recent Adventure
- `moment-8.jpg` - Latest Memory

### Photo Specifications

- **Format**: JPG or PNG
- **Resolution**: Minimum 1200x800px
- **Aspect Ratio**: 3:2 or 4:3 (landscape preferred)
- **File Size**: <500KB each
- **Quality**: High quality, good lighting, faces visible

### Optimization Tools

If photos are too large:
- [TinyPNG](https://tinypng.com/) - Free compression
- [Squoosh](https://squoosh.app/) - Google's optimizer

### Customize Timeline Data

**File**: `src/data/timelineData.js`

Update dates and captions for each moment:
```javascript
{
  id: 1,
  date: "June 15, 2022", // CHANGE THIS
  title: "First Meeting",
  image: "/images/moment-1.jpg",
  caption: "Your custom caption here", // CHANGE THIS
  polaroidRotation: -2
}
```

---

## 5. Birthday Video (Page 7)

**Folder**: `public/videos/`

### What You Need

Record a 1-3 minute birthday video message.

**File name**: `birthday-message.mp4`

### Video Specifications

- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30fps
- **File Size**: <50MB
- **Orientation**: Landscape

### Recording Tips

1. Use good lighting (natural light is best)
2. Clean, simple background
3. Hold phone horizontally (landscape)
4. Look at the camera lens
5. Speak clearly and from the heart
6. Record in a quiet place

### Content Suggestions

- Start: "Happy 26th Birthday, [Her Name]"
- What she means to you
- Favorite memories from the past year
- What you love about her at 26
- Your hopes for her year ahead
- Inside jokes or funny moments
- Lead into gift reveal
- End: "I love you"

### Compression

If video is too large, use:
- [HandBrake](https://handbrake.fr/) - Free compression tool

---

## 6. Gift Information (Page 7)

**File**: `src/data/giftInfo.js`

Choose your gift type and customize:

### Option A: Experience (Dinner/Event)

```javascript
export const giftInfo = {
  type: "experience",
  experience: {
    title: "Dinner at Le Fancy Restaurant",
    icon: "🍽️",
    date: "Saturday, February 22, 2025",
    time: "8:00 PM",
    location: "123 Main St, City",
    description: "Your favorite cuisine, my favorite person ❤️",
    reservationDetails: "Reservation under John Smith",
    additionalInfo: "Dress code: Elegant casual"
  }
}
```

### Option B: Trip/Getaway

```javascript
export const giftInfo = {
  type: "trip",
  trip: {
    title: "Weekend Getaway to Paris",
    icon: "✈️",
    dates: "March 15-17, 2025",
    description: "We're going on an adventure!",
    itinerary: [
      "Day 1: Arrive and explore the city",
      "Day 2: Eiffel Tower and museums",
      "Day 3: Relax and return"
    ],
    packingNote: "Pack your bags 😊"
  }
}
```

### Option C: Physical Gift

```javascript
export const giftInfo = {
  type: "physical",
  physical: {
    title: "Your Real Gift Awaits...",
    icon: "🎁",
    location: "Check under your pillow",
    hint: "It's something you mentioned last month",
    additionalMessage: "(or wherever I hid it 😉)"
  }
}
```

### Option D: Coupon Book

Customize the 12 monthly date ideas in the file.

---

## 7. Testing Your Website

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The website will open at `http://localhost:3000`

### Test All Pages

1. Test unlock code (try: 17, 1702, or 26)
2. Navigate through all 7 pages
3. Test on mobile device (use your phone to visit the local URL)
4. Check that all photos load
5. Verify video plays correctly
6. Test microphone blow on cake page
7. Click through all interactive elements

---

## 8. Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy
5. Get your live URL!

### Alternative: Netlify

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to deploy
4. Get your live URL!

### Custom Domain (Optional)

Buy a domain like `happy26th[name].com` ($10-15/year) and connect it to your hosting.

---

## 9. Launch Day!

### How to Share

**Option 1 - Midnight Text**:
```
Happy Birthday! 🎉
I made something special for you.
Open this when you wake up ❤️
[Your URL]
```

**Option 2 - Morning Surprise**:
Send at 8:00 AM on February 17th

**Option 3 - QR Code**:
- Generate QR code from your URL
- Print it beautifully
- Leave with physical gift

---

## Troubleshooting

### Photos not showing?
- Check file names match exactly (moment-1.jpg, not Moment-1.JPG)
- Ensure photos are in `public/images/` folder
- Clear browser cache

### Video not playing?
- Check file name: `birthday-message.mp4`
- Verify it's in `public/videos/` folder
- Ensure it's MP4 format
- Check file size (<50MB)

### Microphone not working on cake page?
- User needs to grant permission
- Fallback: tap candles works too
- Test in HTTPS environment (not localhost)

---

## Final Checklist Before Launch

- [ ] All personal info updated
- [ ] All 26 reasons customized
- [ ] All 8 photos added and optimized
- [ ] Video recorded and added
- [ ] Gift info configured
- [ ] Tested entire flow start to finish
- [ ] Tested on mobile device
- [ ] Deployed to hosting
- [ ] Tested live deployment
- [ ] URL is ready to share

---

## Tips for Maximum Impact

1. **Test Everything**: Go through the entire experience yourself first
2. **Mobile First**: She'll likely view on her phone first
3. **Timing**: Share at midnight or first thing in the morning
4. **Backup Plan**: Have screenshots ready in case of technical issues
5. **Be Present**: Be there to see her reaction (video call if needed)

---

Good luck! This is going to be an unforgettable birthday surprise! ❤️
