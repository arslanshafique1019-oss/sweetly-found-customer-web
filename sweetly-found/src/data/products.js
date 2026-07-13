export const featuredBakers = [
  { id: 1, name: "Clara's Crust", slug: "claras-crust", rating: 4.9, tag: "Sourdough Specialist", tone: "bread" },
  { id: 2, name: "The Sweet Spot", slug: "the-sweet-spot", rating: 5.0, tag: "Frosted Phenoms", tone: "cake" },
  { id: 3, name: "Mama Rose Bakes", slug: "mama-rose-bakes", rating: 4.8, tag: "Classic Cakes", tone: "pastry" },
  { id: 4, name: "Vegan Vibes", slug: "vegan-vibes", rating: 4.7, tag: "Plant-Based", tone: "vegan" },
];

export const trendingProducts = [
  {
    id: 1,
    name: "Signature Macarons (Box of 12)",
    baker: "Clara's Crust",
    price: 28.0,
    tone: "cookie",
  },
  {
    id: 2,
    name: "Artisan Butter Croissants",
    baker: "Mama Rose Bakes",
    price: 4.5,
    unit: "/ea",
    tone: "bread",
  },
  {
    id: 3,
    name: "Heritage Wheat Sourdough",
    baker: "The Sweet Spot",
    price: 9.0,
    tone: "bread",
  },
  {
    id: 4,
    name: "Wild Berry Pastry Tart",
    baker: "Vegan Vibes",
    price: 6.5,
    tone: "cake",
  },
];

export const categories = [
  { id: 1, name: "Cakes", tone: "cake" },
  { id: 2, name: "Cookies", tone: "cookie" },
  { id: 3, name: "Breads", tone: "bread" },
  { id: 4, name: "Pastries", tone: "pastry" },
  { id: 5, name: "Vegan", tone: "vegan" },
];

export const artisanalCakes = [
  { id: 1, name: "Midnight Berry Velvet", baker: "The Four Garden", price: 45.0, rating: 4.9, tone: "cake" },
  { id: 2, name: "Lemon Lavender Bliss", baker: "Zest & Crumble", price: 38.0, rating: 4.8, tone: "cake" },
  { id: 3, name: "Hazelnut Ganache", baker: "Noir Patisserie", price: 52.0, rating: 5.0, tone: "cookie" },
  { id: 4, name: "Pistachio Rosewater", baker: "Earthly Sweets", price: 42.0, rating: 4.7, tone: "cake" },
  { id: 5, name: "Earl Grey & Honey", baker: "The Tea Baker", price: 48.0, rating: 4.9, tone: "pastry" },
  { id: 6, name: "Celebration Confetti", baker: "Sugar High Studio", price: 35.0, rating: 4.6, tone: "cake" },
];

export const productDetail = {
  id: 101,
  name: "Lemon Blueberry Loaf",
  breadcrumb: ["Home", "Breads & Loaves", "Lemon Blueberry Loaf"],
  rating: 4.9,
  reviews: 128,
  price: 24.0,
  baker: {
    name: "Clara M.",
    shopName: "Maplewood Artisan Bakes",
    slug: "claras-crust",
  },
  allergens: ["Gluten-Free Option", "Local Blueberries", "Farm Eggs", "Contains Nuts"],
  story:
    "This loaf was born from her grandmother's kitchen in late July, when the blueberries were so heavy on the vine they'd practically fallen your hand. We only use cold-pressed lemon and organic garden sourced from Miller's Creek. It's a slow-risen recipe, ensuring the crumb stays moist for days—if it even lasts that long.",
  description:
    "Our Lemon Blueberry Loaf is a testament to the beauty of simple, high-quality ingredients. Each batch is hand-made to ensure the berries are distributed evenly without bleeding into the batter, creating that beautiful marbled aesthetic. The glaze is made with fresh-squeezed lemon juice and organic cane sugar, providing a sharp, bright contrast to the dense, earthy sweetness of the cookie berries. Perfect for a slow Sunday breakfast or a thoughtful gift for a neighbor.",
  storageTips: [
    "Keep wrapped at room temperature for up to 3 days.",
    "Freezes beautifully for up to 1 month.",
    "Toast a slice and add salted butter for the ultimate experience.",
  ],
  moreFromKitchen: [
    { id: 1, name: "Raspberry Almond Tart", price: 18.0, tone: "cake" },
    { id: 2, name: "Hand-Rolled Sourdough Bagels", price: 22.0, unit: "/6-pack", tone: "bread" },
    { id: 3, name: "Vanilla Bean Infused Honey", price: 14.0, tone: "cookie" },
    { id: 4, name: "Sea Salt Espresso Cookies", price: 16.0, unit: "/dozen", tone: "cookie" },
  ],
};

export const bakerProfiles = {
  "claras-crust": {
    slug: "claras-crust",
    name: "Clara's Crust",
    tagline: "Sourdough Specialist",
    tone: "bread",
    rating: 4.9,
    reviewCount: 214,
    followers: 1280,
    location: "Maplewood, IL",
    memberSince: "2021",
    responseTime: "Within 2 hours",
    badges: ["Hyperlocal Certified", "Top Rated"],
    bio: "Clara has been perfecting her sourdough starter for over a decade. Every loaf is naturally leavened, slow-fermented for 24 hours, and baked in small batches out of her home kitchen in Maplewood.",
    hours: "Tue \u2013 Sat, 8:00am \u2013 4:00pm",
    products: [
      { id: 1, name: "Heritage Wheat Sourdough", price: 9.0, tone: "bread", rating: 4.9 },
      { id: 2, name: "Rosemary Olive Boule", price: 10.5, tone: "bread", rating: 4.8 },
      { id: 3, name: "Hand-Rolled Sourdough Bagels", price: 22.0, unit: "/6-pack", tone: "bread", rating: 4.9 },
      { id: 4, name: "Signature Macarons (Box of 12)", price: 28.0, tone: "cookie", rating: 4.9 },
    ],
    reviews: [
      { id: 1, name: "Priya S.", rating: 5, date: "2 weeks ago", comment: "Best sourdough I've had outside of San Francisco. The crust is perfect." },
      { id: 2, name: "Marcus T.", rating: 5, date: "1 month ago", comment: "Clara packages everything so carefully and it's always fresh. Ordering weekly now." },
      { id: 3, name: "Dana W.", rating: 4, date: "1 month ago", comment: "Lovely flavor, would love an even bigger loaf option for larger families." },
    ],
  },
  "the-sweet-spot": {
    slug: "the-sweet-spot",
    name: "The Sweet Spot",
    tagline: "Frosted Phenoms",
    tone: "cake",
    rating: 5.0,
    reviewCount: 176,
    followers: 940,
    location: "Maplewood, IL",
    memberSince: "2022",
    responseTime: "Within 1 hour",
    badges: ["Hyperlocal Certified", "Wedding Favorite"],
    bio: "A dedicated cake studio specializing in celebration cakes, from birthdays to weddings. Every tier is baked to order using seasonal, locally-sourced ingredients.",
    hours: "Mon \u2013 Fri, 9:00am \u2013 5:00pm",
    products: [
      { id: 1, name: "Lemon Lavender Bliss", price: 38.0, tone: "cake", rating: 4.8 },
      { id: 2, name: "Celebration Confetti", price: 35.0, tone: "cake", rating: 4.6 },
      { id: 3, name: "Wild Berry Pastry Tart", price: 6.5, tone: "cake", rating: 4.9 },
    ],
    reviews: [
      { id: 1, name: "Aaliyah R.", rating: 5, date: "3 days ago", comment: "Made our wedding cake and it was more beautiful than the sketch. Tasted incredible too." },
      { id: 2, name: "Jonas K.", rating: 5, date: "2 weeks ago", comment: "Ordered a birthday cake last minute and they still made it perfect." },
    ],
  },
  "mama-rose-bakes": {
    slug: "mama-rose-bakes",
    name: "Mama Rose Bakes",
    tagline: "Classic Cakes",
    tone: "pastry",
    rating: 4.8,
    reviewCount: 132,
    followers: 610,
    location: "Maplewood, IL",
    memberSince: "2020",
    responseTime: "Within 3 hours",
    badges: ["Hyperlocal Certified"],
    bio: "Family recipes passed down three generations. Mama Rose focuses on timeless, classic bakes \u2014 butter croissants, pies, and old-fashioned layer cakes.",
    hours: "Wed \u2013 Sun, 7:00am \u2013 3:00pm",
    products: [
      { id: 1, name: "Artisan Butter Croissants", price: 4.5, unit: "/ea", tone: "bread", rating: 4.8 },
      { id: 2, name: "Raspberry Almond Tart", price: 18.0, tone: "cake", rating: 4.9 },
      { id: 3, name: "Earl Grey & Honey", price: 48.0, tone: "pastry", rating: 4.9 },
    ],
    reviews: [
      { id: 1, name: "Wen L.", rating: 5, date: "1 week ago", comment: "The croissants are as good as the ones I had in Paris, no exaggeration." },
      { id: 2, name: "Sofia G.", rating: 4, date: "3 weeks ago", comment: "Consistently good quality, wish delivery windows were a bit wider." },
    ],
  },
  "vegan-vibes": {
    slug: "vegan-vibes",
    name: "Vegan Vibes",
    tagline: "Plant-Based",
    tone: "vegan",
    rating: 4.7,
    reviewCount: 98,
    followers: 455,
    location: "Maplewood, IL",
    memberSince: "2023",
    responseTime: "Within 4 hours",
    badges: ["100% Plant-Based", "Hyperlocal Certified"],
    bio: "Proof that plant-based baking can be just as indulgent. All-vegan kitchen making dairy-free, egg-free treats that don't compromise on flavor or texture.",
    hours: "Tue \u2013 Sat, 10:00am \u2013 6:00pm",
    products: [
      { id: 1, name: "Pistachio Rosewater", price: 42.0, tone: "cake", rating: 4.7 },
      { id: 2, name: "Vanilla Bean Infused Honey", price: 14.0, tone: "cookie", rating: 4.8 },
      { id: 3, name: "Sea Salt Espresso Cookies", price: 16.0, unit: "/dozen", tone: "cookie", rating: 4.7 },
    ],
    reviews: [
      { id: 1, name: "Ben O.", rating: 5, date: "5 days ago", comment: "Genuinely couldn't tell it was vegan. My non-vegan friends were shocked too." },
      { id: 2, name: "Ines P.", rating: 4, date: "1 month ago", comment: "Great flavors, would love more gluten-free options as well." },
    ],
  },
};

export const savedAddresses = [
  { id: 1, label: "Home", name: "Arslan Ahmed", line1: "482 Maplewood Ave", line2: "Apt 3B", city: "Maplewood", state: "IL", zip: "60103", isDefault: true },
  { id: 2, label: "Work", name: "Arslan Ahmed", line1: "120 Birchwood Plaza", line2: "Suite 210", city: "Maplewood", state: "IL", zip: "60104", isDefault: false },
];

export const savedPaymentMethods = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "09/28", isDefault: true },
  { id: 2, brand: "Mastercard", last4: "8831", expiry: "02/27", isDefault: false },
];

export const orderHistory = [
  { id: "SF-10432", date: "Jul 2, 2026", baker: "Clara's Crust", items: 3, total: 41.5, status: "Delivered" },
  { id: "SF-10391", date: "Jun 21, 2026", baker: "The Sweet Spot", items: 1, total: 38.0, status: "Delivered" },
  { id: "SF-10355", date: "Jun 9, 2026", baker: "Mama Rose Bakes", items: 4, total: 27.0, status: "Cancelled" },
];

// ---- Order Tracking & History (Orders page) ----

export const activeOrder = {
  id: "SF-82910",
  bakerName: "The Flour Garden",
  bakerSlug: "claras-crust",
  eta: "Today at 2:30 PM \u2013 3:00 PM",
  courier: { name: "Marcus", distanceAway: "5 mins away from your location" },
  statusSteps: [
    { key: "placed", label: "Placed", time: "10:15 AM" },
    { key: "baking", label: "Baking", time: "11:00 AM" },
    { key: "enroute", label: "En Route", time: "IN TRANSIT" },
    { key: "delivered", label: "Delivered", time: "PENDING" },
  ],
  currentStep: "enroute",
  items: [
    { id: 1, name: "Butter Croissant", variant: "Classic French style", qty: 2, price: 4.5, tone: "pastry" },
    { id: 2, name: "Hibiscus Macarons", variant: "Signature botanical collection", qty: 6, price: 3.0, tone: "cookie" },
  ],
  deliveryFee: 4.5,
  subtotal: 27.0,
  tax: 2.16,
  total: 29.16,
  shippingAddress: {
    line1: "123 Willow Creek Way",
    line2: "Suite 402",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
  },
};

export const pastOrders = [
  {
    id: "SF-81002",
    date: "May 12, 2024",
    baker: "The Flour Garden",
    status: "Delivered",
    total: 42.5,
    thumbnails: ["bread", "pastry"],
  },
  {
    id: "SF-80541",
    date: "Apr 28, 2024",
    baker: "Petit Paris Patisserie",
    status: "Delivered",
    total: 15.75,
    thumbnails: ["cookie"],
  },
  {
    id: "SF-79220",
    date: "Mar 15, 2024",
    baker: "Wild Yeast Co.",
    status: "Delivered",
    total: 22.0,
    thumbnails: ["bread", "bread"],
  },
];
