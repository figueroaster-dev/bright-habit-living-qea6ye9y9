/**
 * BRIGHT HABIT LIVING - CONTENT DATA MODULE
 * Single source of truth for all editorial content, guides, videos, reviews, and topics.
 *
 * OWNER INSTRUCTIONS:
 * - Search for "// EDIT ME:" markers to supply verified product data, video embeds, sources, or affiliate links.
 * - When fields are left empty or undefined, the application displays a polite "Pending verification" badge
 *   or disables the affiliate button.
 * - Health and wellness claims must stay general-education and cite reliable sources.
 */

export interface Topic {
  slug: string
  name: string
  description: string
  image: string
  shortLabel: string
}

export interface SourceItem {
  id: string
  title: string
  publisher: string
  url?: string // EDIT ME: URL to peer-reviewed source or reliable publication
  verified: boolean
}

export interface Guide {
  slug: string
  title: string
  summary: string
  topicSlug: string
  publishedDate: string
  lastReviewedDate: string
  readTime: string
  image: string
  type: 'article' | 'video'
  // Video specific fields (only when type === 'video')
  videoEmbedUrl?: string // EDIT ME: owner to insert embed URL (e.g. YouTube/Vimeo embed URL). Left empty by default.
  videoDuration?: string
  transcript?: string
  // Article structured content
  intro: string
  sections: {
    heading: string
    body: string[]
    callout?: {
      title: string
      text: string
    }
  }[]
  sources?: SourceItem[]
  hasProductMention?: boolean
  recommendedProductSlug?: string
}

export interface ReviewQuickFacts {
  whatItIs: string | null // EDIT ME: verified summary
  ingredients: string | null // EDIT ME: verified ingredient breakdown
  directionsWarnings: string | null // EDIT ME: manufacturer directions & cautions
  priceDetails: string | null // EDIT ME: verified price & subscription offer details
  evidenceSummary: string | null // EDIT ME: evidence summary
}

export interface ProductReview {
  slug: string
  productName: string // Generic neutral name if unverified
  brand: string
  category: string
  topicSlug: string
  image?: string // Product image placeholder or real asset URL
  publishedDate: string
  lastReviewedDate: string
  summary: string
  isGenericPlaceholder: boolean // True when awaiting owner verification
  quickFacts: ReviewQuickFacts
  pros: string[]
  considerations: string[]
  questionsToAskProducer: string[]
  affiliateUrl?: string // EDIT ME: Owner to supply sponsored/affiliate URL
  secondaryAffiliateUrl?: string // EDIT ME: Check price & details secondary link
  sources?: SourceItem[]
}

export interface ComparisonRow {
  aspect: string
  productA: string
  productB: string
  notes: string
}

export interface ComparisonData {
  title: string
  description: string
  enabled: boolean // EDIT ME: Set to true when owner provides comparison table data
  products: { name: string; slug?: string }[]
  rows: ComparisonRow[]
}

// --------------------------------------------------------------------------
// 1. TOPICS (The four core editorial pillars)
// --------------------------------------------------------------------------
export const TOPICS: Topic[] = [
  {
    slug: 'everyday-wellness',
    name: 'Everyday Wellness',
    shortLabel: 'Wellness',
    description:
      'Practical daily rhythms, sleep hygiene, and sustainable daily routines for long-term vitality.',
    image: 'https://img.usecurling.com/p/800/600?q=morning%20sunlight%20coffee%20calm&color=green',
  },
  {
    slug: 'nutrition-supplements',
    name: 'Nutrition & Supplements',
    shortLabel: 'Nutrition',
    description:
      'Evidence-informed looks at whole foods, vitamins, and how to evaluate everyday dietary choices.',
    image:
      'https://img.usecurling.com/p/800/600?q=fresh%20vegetables%20herbs%20kitchen&color=green',
  },
  {
    slug: 'hydration-sports-nutrition',
    name: 'Hydration & Sports Nutrition',
    shortLabel: 'Hydration & Movement',
    description:
      'Balanced hydration strategies, electrolyte basics, and thoughtful fueling for movement.',
    image: 'https://img.usecurling.com/p/800/600?q=glass%20water%20lemon%20workout&color=blue',
  },
  {
    slug: 'self-care-healthy-habits',
    name: 'Self-Care & Healthy Habits',
    shortLabel: 'Self-Care',
    description:
      'Mindful downtime, stress management practices, and gentle habit-stacking that actually sticks.',
    image: 'https://img.usecurling.com/p/800/600?q=nature%20walk%20trees%20mindfulness&color=green',
  },
]

// --------------------------------------------------------------------------
// 2. GUIDES & ARTICLES (General wellness education, no disease claims)
// --------------------------------------------------------------------------
export const GUIDES: Guide[] = [
  {
    slug: 'morning-light-routine',
    title: 'Morning Light & Daily Rhythms: Why 10 Minutes Outdoors Matters',
    summary:
      'A look at how natural morning light signals your internal clock, supports daytime energy, and sets the stage for evening rest.',
    topicSlug: 'everyday-wellness',
    publishedDate: 'October 14, 2024',
    lastReviewedDate: 'January 28, 2025',
    readTime: '6 min read',
    image: 'https://img.usecurling.com/p/800/500?q=morning%20sunlight%20porch%20tea&color=orange',
    type: 'article',
    intro:
      'Before reaching for an extra shot of espresso or reorganizing your vitamin caddy, consider the simplest circadian cue humans have: natural daylight.',
    sections: [
      {
        heading: 'How Early Daylight Communicates with Your Body',
        body: [
          'Specialized photoreceptors in our eyes — intrinsically photosensitive retinal ganglion cells — detect the blue-enriched wavelength of morning sunlight. Rather than forming images, these cells send signals directly to the suprachiasmatic nucleus, the brain’s central master clock.',
          'When this clock receives an early photon signal, it helps coordinate the release of cortisol for daytime alertness and starts a 14-to-16 hour biological countdown for the release of evening melatonin.',
        ],
        callout: {
          title: 'Practical Routine Tip',
          text: 'Aim for 10 to 15 minutes of outdoor light exposure within 60 minutes of waking. On overcast days, 20 to 30 minutes is ideal because indirect outdoor light is still significantly brighter than indoor bulbs.',
        },
      },
      {
        heading: 'Indoor Light vs. Open Sky',
        body: [
          'A typical modern office or kitchen emits roughly 300 to 500 lux of illuminance. In contrast, even a cloudy morning outdoors provides between 1,000 and 10,000 lux. Looking through glass windows reduces this intensity substantially, which is why stepping onto a balcony, porch, or sidewalk is notably more effective.',
          'You do not need to stare directly at the sun; simply being outdoors without sunglasses for a few minutes while sipping water or taking a brief stroll is sufficient for most adults.',
        ],
      },
      {
        heading: 'Building It into a Sustainable Habit',
        body: [
          'Pair the light exposure with an activity you already do — such as letting a pet outside, opening mail, or reviewing your day’s schedule. This technique, known as habit-stacking, minimizes friction and helps the routine persist through changing seasons.',
        ],
      },
    ],
    sources: [
      {
        id: 's1',
        title: 'Light as a central modulator of circadian rhythmicity and alertness',
        publisher: 'Journal of Biological Rhythms (Peer-reviewed review)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        verified: true,
      },
      {
        id: 's2',
        title: 'Photoreception and non-image forming ocular responses in mammals',
        publisher: 'Neuroscience & Biobehavioral Reviews',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        verified: true,
      },
      {
        id: 's3',
        title: 'Seasonal light variations and daily mood fluctuations',
        publisher: 'Editorial Research Registry',
        verified: false, // Will render as "Source pending verification"
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'evaluating-daily-supplements',
    title: 'How to Read a Supplement Label Without Getting Overwhelmed',
    summary:
      'A calm, step-by-step framework for deciphering serving sizes, proprietary blends, and ingredient forms before buying.',
    topicSlug: 'nutrition-supplements',
    publishedDate: 'November 2, 2024',
    lastReviewedDate: 'February 10, 2025',
    readTime: '7 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=glass%20jars%20spices%20clean%20table&color=green',
    type: 'article',
    intro:
      'Walk down any wellness aisle and the typography alone can be dizzying. Here is a practical way to separate clear formulation facts from marketing embellishments.',
    sections: [
      {
        heading: 'Check the Serving Size and Form First',
        body: [
          'Always glance at the top of the Supplement Facts panel. Some brands claim high concentrations of a nutrient per container, but each serving requires taking three or four large capsules daily.',
          'Notice whether the nutrient is provided in a bioavailable salt or chelate form (such as magnesium glycinate or citrate) versus an oxide form, which may absorb differently depending on individual digestion.',
        ],
      },
      {
        heading: 'Demystifying "Proprietary Blends"',
        body: [
          'When a label groups multiple herbs or compounds under a proprietary trade name, regulations require them to list total milligrams for the entire blend, but individual amounts can remain undisclosed. Transparent brands specify exact dosages for each key ingredient so you and your clinician know what you are taking.',
        ],
      },
      {
        heading: 'Third-Party Testing and Quality Verifications',
        body: [
          'Because dietary supplements in the United States do not undergo pre-market FDA approval, independent third-party seals (such as NSF Certified for Sport, USP, or ConsumerLab) provide valuable verification that the product contains what the label claims without unacceptable levels of heavy metals.',
        ],
      },
    ],
    sources: [
      {
        id: 's4',
        title: 'Dietary Supplement Health and Education Act (DSHEA) overview',
        publisher: 'U.S. Food and Drug Administration',
        url: 'https://www.fda.gov/food/dietary-supplements',
        verified: true,
      },
      {
        id: 's5',
        title: 'Quality control guidelines for dietary ingredients and finished products',
        publisher: 'United States Pharmacopeia (USP)',
        url: 'https://www.usp.org/',
        verified: true,
      },
    ],
    hasProductMention: true,
    recommendedProductSlug: 'sample-daily-greens',
  },
  {
    slug: 'hydration-beyond-plain-water',
    title: 'Hydration Beyond Just Chugging Water: Electrolytes & Cellular Balance',
    summary:
      'Understanding the balance between sodium, potassium, water volume, and daily physical activity levels.',
    topicSlug: 'hydration-sports-nutrition',
    publishedDate: 'November 18, 2024',
    lastReviewedDate: 'February 5, 2025',
    readTime: '5 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=water%20pitcher%20fresh%20mint%20citrus&color=blue',
    type: 'article',
    intro:
      'Drinking gallons of plain water without adequate mineral balance can occasionally leave you feeling sluggish rather than refreshed. Here is how cellular hydration actually works.',
    sections: [
      {
        heading: 'Water Follows Solutes',
        body: [
          'Our cells rely on mineral ions — primarily sodium outside cells and potassium inside cells — to maintain fluid osmotic pressure. When you sweat or consume high volumes of plain distilled water, sodium concentrations can become diluted.',
          'For ordinary sedentary desk work in climate-controlled spaces, whole food sources (like celery, bananas, bone broths, and salted meals) typically provide sufficient electrolytes without specialized packets.',
        ],
      },
      {
        heading: 'When Targeted Hydration Packs Make Sense',
        body: [
          'Athletes training in high heat, endurance runners, sauna users, or individuals with prolonged sweat loss often benefit from measured electrolyte formulas. Look for moderate sodium and potassium ratios without unnecessary artificial dyes or excessive added sugars.',
        ],
      },
    ],
    sources: [
      {
        id: 's6',
        title: 'Fluid and electrolyte balance in active populations',
        publisher: 'American College of Sports Medicine (ACSM)',
        url: 'https://www.acsm.org/',
        verified: true,
      },
    ],
    hasProductMention: true,
    recommendedProductSlug: 'sample-electrolyte-mix',
  },
  {
    slug: 'wind-down-ritual-video-guide',
    title: 'A 10-Minute Evening Wind-Down Ritual to Unpack Mental Clutter',
    summary:
      'A short video walk-through demonstrating gentle breathing, progressive tension release, and analog journaling before sleep.',
    topicSlug: 'self-care-healthy-habits',
    publishedDate: 'December 1, 2024',
    lastReviewedDate: 'February 12, 2025',
    readTime: '4 min watch + read',
    image:
      'https://img.usecurling.com/p/800/500?q=warm%20lamp%20journal%20bedside%20calm&color=yellow',
    type: 'video',
    // EDIT ME: Owner to supply embed URL when ready. Left empty to show the placeholder embed component.
    videoEmbedUrl: '',
    videoDuration: '10:45',
    transcript: `[00:00] Welcome to Bright Habit Living. In this short guide, we walk through a ten-minute non-digital evening transition.
[01:15] Step 1: Dim overhead lighting. Swap bright blue LED lighting for warm floor lamps or amber task lighting.
[03:20] Step 2: The Two-Minute Brain Dump. Take a simple analog notebook and write down tomorrow's top three priorities so your subconscious stops holding them on loop.
[06:00] Step 3: Gentle 4-7-8 Breathing. Inhale for 4 seconds through the nose, hold gently for 7, exhale smoothly through parted lips for 8. Repeat four cycles.
[09:10] Step 4: Cool the bedroom. Aim for roughly 65-68°F (18-20°C) to support natural core body temperature drops during sleep onset.
[10:30] Thank you for practicing with us. Small daily habits create calmer nights.`,
    intro:
      'Transitioning from high-intensity screen work to restful sleep requires an intentional psychological buffer. Watch or read our evening reset protocol.',
    sections: [
      {
        heading: 'The Power of the Analog Boundary',
        body: [
          'Putting screens in another room 30 minutes before sleep eliminates unpredictable notifications and high-lux blue-light exposure that delays natural melatonin onset.',
          'Replacing screen scrolling with handwriting triggers different neural pathways, helping to externalize unresolved thoughts so your mind can settle into resting states.',
        ],
      },
    ],
    sources: [
      {
        id: 's7',
        title: 'The impact of pre-bed electronic device use on sleep physiology',
        publisher: 'Sleep Medicine Reviews',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        verified: true,
      },
    ],
    hasProductMention: false,
  },
]

// --------------------------------------------------------------------------
// 3. VIDEOS (Library entries)
// --------------------------------------------------------------------------
export interface VideoItem {
  slug: string
  title: string
  summary: string
  topicSlug: string
  duration: string
  publishedDate: string
  thumbnail: string
  guideSlug: string // Links to the guide/video template
  isFeatured?: boolean
}

export const VIDEOS: VideoItem[] = [
  {
    slug: 'wind-down-ritual-video',
    title: 'A 10-Minute Evening Wind-Down Ritual to Unpack Mental Clutter',
    summary:
      'A calming walk-through of four simple steps to power down your nervous system before sleep.',
    topicSlug: 'self-care-healthy-habits',
    duration: '10:45',
    publishedDate: 'December 1, 2024',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=warm%20lamp%20journal%20bedside%20calm&color=yellow',
    guideSlug: 'wind-down-ritual-video-guide',
    isFeatured: true,
  },
  {
    slug: 'evaluating-greens-powders-video',
    title: 'How to Read a Greens Powder Label (What’s Real vs Filler)',
    summary:
      'A dietitian-approved breakdown of grasses, digestive enzymes, and proprietary scoops.',
    topicSlug: 'nutrition-supplements',
    duration: '08:30',
    publishedDate: 'January 10, 2025',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=green%20smoothie%20kitchen%20glass&color=green',
    guideSlug: 'evaluating-daily-supplements',
  },
  {
    slug: 'circadian-walk-video',
    title: 'The 15-Minute Morning Sunlight Walk Protocol',
    summary:
      'Why stepping outside within an hour of waking sets your body clock for high daytime focus.',
    topicSlug: 'everyday-wellness',
    duration: '06:15',
    publishedDate: 'January 18, 2025',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=person%20walking%20park%20morning%20sun&color=orange',
    guideSlug: 'morning-light-routine',
  },
  {
    slug: 'electrolyte-basics-video',
    title: 'Electrolytes Explained: Sodium, Potassium, and Daily Balance',
    summary:
      'When you actually need an electrolyte drink and when plain water with meals does the job.',
    topicSlug: 'hydration-sports-nutrition',
    duration: '09:20',
    publishedDate: 'February 2, 2025',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=glass%20water%20citrus%20running%20shoes&color=blue',
    guideSlug: 'hydration-beyond-plain-water',
  },
  {
    slug: 'desk-mobility-reset-video',
    title: 'Five Gentle Mobility Movements for Long Desk Hours',
    summary:
      'Simple neck, thoracic spine, and hip opener movements you can perform right in your office chair.',
    topicSlug: 'everyday-wellness',
    duration: '07:45',
    publishedDate: 'February 14, 2025',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=stretching%20office%20chair%20calm&color=green',
    guideSlug: 'morning-light-routine',
  },
]

// --------------------------------------------------------------------------
// 4. PRODUCT REVIEWS
// Strictly neutral/generic names with editable pending placeholders.
// NO fake clinical claims, star ratings, or fabricated prices.
// --------------------------------------------------------------------------
export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    slug: 'sample-daily-greens',
    // EDIT ME: Replace with verified product name & brand
    productName: 'Sample Daily Greens Blend (Replace with verified data)',
    brand: 'Sample Wellness Co. [Owner to verify]',
    category: 'Daily Greens & Superfood Powders',
    topicSlug: 'nutrition-supplements',
    // EDIT ME: Insert verified product photo URL
    image: undefined,
    publishedDate: 'January 15, 2025',
    lastReviewedDate: 'February 12, 2025',
    summary:
      'An editorial overview of this category of daily greens powders, highlighting formulation transparency, taste notes, and what to verify before purchase.',
    isGenericPlaceholder: true,
    quickFacts: {
      // EDIT ME: Verified product summary
      whatItIs: null,
      // EDIT ME: Verified ingredients list
      ingredients: null,
      // EDIT ME: Producer directions and warnings
      directionsWarnings: null,
      // EDIT ME: Verified pricing & subscription details
      priceDetails: null,
      // EDIT ME: Evidence & clinical trial notes
      evidenceSummary: null,
    },
    pros: [
      'Transparent disclosure of key ingredients (pending site owner verification)',
      'Vegetarian and gluten-free manufacturing processes reported by producer',
      'Neutral, grassy flavor profile that blends easily into smoothies or water',
    ],
    considerations: [
      'Cost per serving may be higher than single-ingredient vitamin alternatives',
      'Does not substitute for a diet rich in whole vegetables and fruits',
      'Should be reviewed with your primary care provider if taking medication',
    ],
    questionsToAskProducer: [
      'Do you conduct batch-specific third-party testing for heavy metals and pesticides?',
      'Are the probiotic strains listed with their full taxonomic identifiers and CFUs at expiration?',
      'What is your return policy if the taste or digestive tolerance does not suit my routine?',
    ],
    // EDIT ME: Owner to supply affiliate link. Left undefined to demonstrate disabled CTA button.
    affiliateUrl: undefined,
    secondaryAffiliateUrl: undefined,
    sources: [
      {
        id: 'rev-s1',
        title: 'Dietary supplement regulation and label claim guidance',
        publisher: 'U.S. Food and Drug Administration',
        url: 'https://www.fda.gov/',
        verified: true,
      },
      {
        id: 'rev-s2',
        title: 'Producer Certificate of Analysis (COA)',
        publisher: 'Awaiting verified documentation',
        verified: false,
      },
    ],
  },
  {
    slug: 'sample-electrolyte-mix',
    // EDIT ME: Replace with verified product name & brand
    productName: 'Sample Clean Electrolyte Powder (Replace with verified data)',
    brand: 'Sample Hydration Lab [Owner to verify]',
    category: 'Electrolyte & Mineral Hydration',
    topicSlug: 'hydration-sports-nutrition',
    image: undefined,
    publishedDate: 'January 22, 2025',
    lastReviewedDate: 'February 8, 2025',
    summary:
      'A structured evaluation of a powdered electrolyte formula designed for active workouts, warm weather, and sauna recovery without artificial food dyes.',
    isGenericPlaceholder: true,
    quickFacts: {
      whatItIs: null,
      ingredients: null,
      directionsWarnings: null,
      priceDetails: null,
      evidenceSummary: null,
    },
    pros: [
      'No synthetic colorings or high-fructose corn syrups used in the formula',
      'Convenient single-serve stick packets suitable for travel and gym bags',
      'Formulated with sodium, potassium, and magnesium in bioavailable forms',
    ],
    considerations: [
      'Sodium concentration may be too high for individuals on low-sodium dietary protocols',
      'Requires adequate water volume (16 to 24 oz) for optimal taste and osmotic tolerance',
      'Check with your doctor if managing blood pressure or kidney conditions',
    ],
    questionsToAskProducer: [
      'What form of magnesium is utilized in the mix (citrate, glycinate, or malate)?',
      'Is the product manufactured in an NSF or cGMP certified facility?',
      'Is there an unsweetened or stevia-free variant available for sensitive palates?',
    ],
    affiliateUrl: undefined,
    secondaryAffiliateUrl: undefined,
    sources: [
      {
        id: 'rev-s3',
        title: 'Electrolyte requirements in moderate to strenuous exercise',
        publisher: 'American Physiological Society',
        url: 'https://www.physiology.org/',
        verified: true,
      },
    ],
  },
  {
    slug: 'sample-herbal-sleep-tincture',
    // EDIT ME: Replace with verified product name & brand
    productName: 'Sample Herbal Nighttime Tincture (Replace with verified data)',
    brand: 'Sample Botanical Extracts [Owner to verify]',
    category: 'Herbal & Botanical Night Blends',
    topicSlug: 'self-care-healthy-habits',
    image: undefined,
    publishedDate: 'February 1, 2025',
    lastReviewedDate: 'February 14, 2025',
    summary:
      'An editorial inspection of a non-melatonin botanical tincture featuring traditional calming herbs like chamomile, lemon balm, and passionflower.',
    isGenericPlaceholder: true,
    quickFacts: {
      whatItIs: null,
      ingredients: null,
      directionsWarnings: null,
      priceDetails: null,
      evidenceSummary: null,
    },
    pros: [
      'Melatonin-free option for those who experience grogginess with hormone supplements',
      'Glass dropper bottle allows flexible, gradual micro-titration of serving size',
      'Organic alcohol or vegetable glycerin base depending on batch formulation',
    ],
    considerations: [
      'Natural herbal flavors have an earthy, bitter profile that may require juice to mask',
      'Botanicals can interact with sedative medications or selective serotonin reuptake inhibitors',
      'Not recommended for use during pregnancy or lactation without obstetrician approval',
    ],
    questionsToAskProducer: [
      'Is the extraction solvent organic cane alcohol or certified kosher glycerin?',
      'Are herbs wildcrafted or sourced from certified USDA Organic farms?',
      'What standard testing is performed for microbial contaminants and mold spores?',
    ],
    affiliateUrl: undefined,
    secondaryAffiliateUrl: undefined,
    sources: [
      {
        id: 'rev-s4',
        title: 'Botanical dietary supplements: background and clinical evaluations',
        publisher: 'National Center for Complementary and Integrative Health (NCCIH)',
        url: 'https://www.nccih.nih.gov/',
        verified: true,
      },
    ],
  },
]

// --------------------------------------------------------------------------
// 5. OPTIONAL COMPARISON TABLE
// Renders only when enabled: true AND owner provides verified comparison data.
// By default enabled: false so the comparison table remains hidden until ready.
// --------------------------------------------------------------------------
export const COMPARISON_DATA: ComparisonData = {
  title: 'Side-by-Side Product Comparison',
  description:
    'An objective look at key formulation and transparent labeling markers across reviewed products.',
  // EDIT ME: Set enabled: true once owner adds verified comparison data
  enabled: false,
  products: [
    { name: 'Product A [Owner to verify]', slug: 'sample-daily-greens' },
    { name: 'Product B [Owner to verify]', slug: 'sample-electrolyte-mix' },
  ],
  rows: [
    {
      aspect: 'Form & Delivery',
      productA: 'Powder scoop (30 servings)',
      productB: 'Single-serve stick pack (30 packets)',
      notes: 'Stick packs offer travel convenience; tubs offer less packaging waste.',
    },
    {
      aspect: 'Primary Focus',
      productA: 'Vegetable & phytonutrient intake',
      productB: 'Hydration & mineral repletion',
      notes: 'Different daily use-cases depending on personal nutrition needs.',
    },
  ],
}

// --------------------------------------------------------------------------
// 6. EDITORIAL STANDARDS SECTIONS (Full compliance text)
// --------------------------------------------------------------------------
export interface StandardSection {
  number: string
  title: string
  summary: string
  content: string[]
}

export const EDITORIAL_STANDARDS: StandardSection[] = [
  {
    number: '01',
    title: 'General Education, Not Medical Diagnosis or Treatment',
    summary:
      'Our content is created solely for general wellness education, lifestyle inspiration, and informational purposes.',
    content: [
      'Bright Habit Living is an editorial publication, not a medical clinic, telemedicine provider, or healthcare practice. Nothing published on this website constitutes medical advice, clinical diagnosis, individualized prescription, or clinical treatment plans.',
      'Always consult a qualified, licensed healthcare professional (such as your primary care physician, registered dietitian, or specialist) before starting any new dietary supplement, exercise regimen, or lifestyle change — especially if you have an underlying medical condition, take prescription medication, or are pregnant or nursing.',
    ],
  },
  {
    number: '02',
    title: 'Strict Prohibition of Disease and Cure Claims',
    summary:
      'We never publish claims that any supplement, food, or habit will diagnose, treat, cure, or prevent any disease.',
    content: [
      'In strict accordance with United States federal guidelines (including the Federal Trade Commission and Food and Drug Administration), we do not publish statements suggesting that dietary supplements or wellness products can treat or prevent chronic or acute conditions such as diabetes, cardiovascular disease, cancer, depression, or autoimmune disorders.',
      'Content centers on physiological foundations (such as normal hydration, circadian sleep cues, and general nutrient density) rather than medical interventions.',
    ],
  },
  {
    number: '03',
    title: 'No Miracle-Cure, Guaranteed-Outcome, or Extreme Claims',
    summary:
      'We explicitly reject exaggerated weight loss promises, miraculous overnight transformations, and fabricated testimonials.',
    content: [
      'Human bodies are complex, varied, and individual. What works well for one person’s lifestyle may not suit another. We refuse commercial copy promising rapid, effortless weight loss, guaranteed biological reversals, or sensational before-and-after imagery.',
      'Our tone remains measured, objective, and realistic about the time and steady consistency required for healthy habit adoption.',
    ],
  },
  {
    number: '04',
    title: 'No Implication of Pre-Market FDA Approval for Supplements',
    summary: 'Dietary supplements are regulated differently than pharmaceuticals under U.S. law.',
    content: [
      'Under the Dietary Supplement Health and Education Act (DSHEA) of 1994, dietary supplements do not receive pre-market safety or efficacy approval from the U.S. FDA before being sold. We never imply that a commercial supplement has been "FDA-approved."',
      'We look for transparent brands that voluntarily participate in independent third-party certification (e.g., NSF International, USP, Informed Choice) and publish batch Certificates of Analysis (COAs).',
    ],
  },
  {
    number: '05',
    title: 'Ingredient Research Does Not Equal Finished-Product Evidence',
    summary:
      'We distinguish between preliminary laboratory studies on isolated compounds and clinical tests on finished retail formulations.',
    content: [
      'Many commercial products cite animal trials or in vitro cell culture studies on single isolated molecules at high dosages to market a retail formula with very different dosages and companion ingredients. We clearly distinguish between high-level preliminary research and double-blind human clinical trials on the actual finished retail product.',
      'If evidence on a finished formulation is lacking, our editorial review explicitly identifies that gap.',
    ],
  },
  {
    number: '06',
    title: 'Reliable Sourcing or Claim Omission',
    summary:
      'Factual physiological or nutritional statements require reputable, peer-reviewed citations.',
    content: [
      'Whenever factual statements regarding health, nutrient metabolism, or ingredients are made, our editors reference primary literature from indexed, peer-reviewed medical journals, government agencies (such as the NIH, CDC, or USDA), or established academic institutions.',
      'Where reliable evidence does not exist for a manufacturer’s marketing claim, the claim is omitted or clearly labeled as unverified pending documentation.',
    ],
  },
  {
    number: '07',
    title: 'Consult Qualified Health Professionals',
    summary:
      'Personal wellness decisions belong between you and your trusted personal healthcare team.',
    content: [
      'Reading articles and watching videos online can inspire questions, but it can never replace the hands-on diagnostic context, comprehensive lab work, and individualized history provided by your personal medical team.',
      'If you have lingering questions about how an ingredient interacts with your medications or family medical history, print our review or bring the product label directly to your next clinician appointment.',
    ],
  },
]

// --------------------------------------------------------------------------
// 7. COMPLIANCE & LEGAL CONSTANTS
// --------------------------------------------------------------------------
export const EXACT_AFFILIATE_DISCLOSURE =
  'Bright Habit Living may earn a commission if you buy through links on this page. This does not affect our editorial review.'

export const SITE_METADATA = {
  name: 'Bright Habit Living',
  tagline: 'Small habits. Brighter days.',
  brandPromise: 'Clear, practical guidance for everyday wellness choices.',
  heroHeadline: 'Wellness choices, made clearer.',
  heroSupportingCopy:
    'Explore practical guides, short videos, and thoughtful reviews for everyday wellness.',
  primaryCtaText: 'Explore the Guides',
  secondaryCtaText: 'Watch the Latest Videos',
  medicalDisclaimer:
    'Content on this site is for general education only and is not a substitute for advice from a qualified health professional.',
  copyrightNotice:
    '© 2025 Bright Habit Living. All rights reserved. Content is for general education only and is not medical advice.',
}
