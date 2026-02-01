// CUSTOMIZE THIS FILE WITH YOUR GIFT INFORMATION

export const giftInfo = {
  // Choose gift type: "experience", "trip", "physical", "coupon_book"
  type: "physical",

  // For EXPERIENCE type (dinner, show, event):
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

  // For TRIP type:
  trip: {
    title: "Weekend Getaway to [Destination]",
    icon: "✈️",
    dates: "[Date Range]",
    description: "We're going on an adventure!",
    itinerary: [
      "Day 1: Arrival and exploring the city",
      "Day 2: [Special activities]",
      "Day 3: Relaxation and return"
    ],
    packingNote: "Pack your bags for sunshine and adventure! 😊"
  },

  // For PHYSICAL gift:
  physical: {
    title: "Your Real Gift Awaits...",
    icon: "🎁",
    location: "Check under your pillow",
    hint: "(or wherever I hid it 😉)",
    additionalMessage: "It's something you love way too much (besides me, of course)"
  },

  // For COUPON BOOK:
  couponBook: {
    title: "A Year of Adventures",
    icon: "🎟️",
    description: "12 Date Coupons - One special experience each month, planned by me ❤️",
    pdfFileName: "Year-of-Adventures-Coupon-Book.pdf",
    coupons: [
      { month: "March", title: "Sunrise Hike & Picnic Breakfast" },
      { month: "April", title: "Cooking Class Together" },
      { month: "May", title: "Beach Day & Sunset Dinner" },
      { month: "June", title: "Movie Marathon Night (Your Choice)" },
      { month: "July", title: "Spontaneous Road Trip" },
      { month: "August", title: "Stargazing & Camping" },
      { month: "September", title: "Wine Tasting & Art Gallery" },
      { month: "October", title: "Pumpkin Patch & Fall Festival" },
      { month: "November", title: "Spa Day for Two" },
      { month: "December", title: "Holiday Lights Tour & Hot Chocolate" },
      { month: "January", title: "Indoor Rock Climbing & Dinner" },
      { month: "February", title: "Valentine's Surprise" }
    ]
  }
};

// INSTRUCTIONS FOR VIDEO:
// 1. Record a 1-3 minute birthday video message
// 2. Save as: public/videos/birthday-message.mp4
// 3. Format: MP4, 1920x1080, <50MB
// 4. Content: Heartfelt birthday wishes, what she means to you, lead into gift reveal
