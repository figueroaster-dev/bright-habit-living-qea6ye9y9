/**
 * BRIGHT HABIT LIVING - CONTENT DATA MODULE
 * Single source of truth for all editorial content, guides, videos, reviews, and topics.
 *
 * OWNER INSTRUCTIONS:
 * - Search for "// EDIT ME:" markers to supply verified product data, video embeds, sources, or affiliate links.
 * - When fields are left empty or undefined, the application displays a polite "Pending verification" badge
 *   or disables the affiliate button.
 * - Health and wellness claims must stay general-education and cite reliable sources.
 * - Editorial policy: NO fabricated product names, brands, prices, ratings, dates, testimonials,
 *   or claims. A review is only published in public navigation once its data is verified.
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
  url?: string // EDIT ME: URL to the SPECIFIC peer-reviewed paper or document that supports the claim
  verified: boolean // true ONLY when the URL points to the specific supporting material
}

export interface Guide {
  slug: string
  title: string
  summary: string
  topicSlug: string
  publishedDate?: string // EDIT ME: set only when the guide is actually published
  lastReviewedDate?: string // EDIT ME: set only when a real editorial review occurred
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
  faq?: { question: string; answer: string }[]
  seoTitle?: string
  metaDescription?: string
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
  productName: string
  brand: string
  category: string
  topicSlug: string
  image?: string // Product image or real asset URL
  publishedDate?: string // EDIT ME: set only when the review is actually published
  lastReviewedDate?: string // EDIT ME: set only when a real editorial review occurred
  summary: string
  isGenericPlaceholder: boolean // True when awaiting owner verification — such reviews stay out of public navigation
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
      'A look at how natural morning light signals your internal clock, supports daytime alertness, and sets the stage for evening wind-down.',
    topicSlug: 'everyday-wellness',
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
          'When this clock receives an early photon signal, it helps coordinate hormone rhythms that support daytime alertness and the natural transition toward evening rest.',
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
        // EDIT ME: replace with the direct URL to the specific paper before marking verified
        verified: false,
      },
      {
        id: 's2',
        title: 'Photoreception and non-image forming ocular responses in mammals',
        publisher: 'Neuroscience & Biobehavioral Reviews',
        // EDIT ME: replace with the direct URL to the specific paper before marking verified
        verified: false,
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
          'Notice whether the nutrient is provided in a form noted for absorption (such as magnesium glycinate or citrate) versus an oxide form, which may absorb differently depending on individual digestion.',
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
      // EDIT ME: replace with the URL of the SPECIFIC regulatory document that supports
      // the claims above (e.g. the exact DSHEA statute text), then set verified: true.
      {
        id: 's4',
        title: 'Dietary Supplement Health and Education Act (DSHEA) overview',
        publisher: 'U.S. Food and Drug Administration',
        // The previous URL pointed to the general fda.gov dietary-supplements topic page,
        // which is not a specific supporting document and must not be presented as verified.
        url: undefined,
        verified: false,
      },
      {
        id: 's5',
        title: 'Quality control guidelines for dietary ingredients and finished products',
        publisher: 'United States Pharmacopeia (USP)',
        // EDIT ME: replace with the direct URL to the specific USP document before marking verified
        verified: false,
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'hydration-beyond-plain-water',
    title: 'Hydration Beyond Plain Water: Electrolytes Explained',
    summary:
      'Understanding the balance between sodium, potassium, water volume, and daily physical activity levels.',
    topicSlug: 'hydration-sports-nutrition',
    readTime: '5 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=water%20pitcher%20fresh%20mint%20citrus&color=blue',
    type: 'article',
    intro:
      'Drinking large volumes of plain water without adequate mineral balance can occasionally leave you feeling sluggish rather than refreshed. Here is how fluid and electrolyte balance works.',
    sections: [
      {
        heading: 'Water Follows Solutes',
        body: [
          'The body regulates fluid balance with mineral ions — primarily sodium outside cells and potassium inside cells — which help maintain fluid osmotic pressure. When you sweat or consume very high volumes of plain water, sodium concentrations can become diluted.',
          'For ordinary sedentary desk work in climate-controlled spaces, whole food sources (like celery, bananas, broths, and salted meals) typically provide sufficient electrolytes without specialized packets.',
        ],
      },
      {
        heading: 'When Targeted Hydration Packs Make Sense',
        body: [
          'People training in high heat, endurance runners, sauna users, or individuals with prolonged sweat loss often benefit from measured electrolyte formulas. Look for moderate sodium and potassium ratios without unnecessary artificial dyes or excessive added sugars.',
        ],
      },
    ],
    sources: [
      {
        id: 's6',
        title: 'Fluid and electrolyte balance in active populations',
        publisher: 'American College of Sports Medicine (ACSM)',
        // EDIT ME: replace with the direct URL to the specific ACSM position stand before marking verified
        verified: false,
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'wind-down-ritual-video-guide',
    title: 'A 10-Minute Evening Wind-Down Ritual to Unpack Mental Clutter',
    summary:
      'A short video walk-through demonstrating gentle breathing, progressive tension release, and analog journaling before bed.',
    topicSlug: 'self-care-healthy-habits',
    readTime: '4 min watch + read',
    image:
      'https://img.usecurling.com/p/800/500?q=warm%20lamp%20journal%20bedside%20calm&color=yellow',
    type: 'video',
    // EDIT ME: Owner to supply embed URL when ready. Left empty to show the placeholder embed component.
    videoEmbedUrl: '',
    transcript: `[00:00] Welcome to Bright Habit Living. In this short guide, we walk through a ten-minute non-digital evening transition.
[01:15] Step 1: Dim overhead lighting. Swap bright blue LED lighting for warm floor lamps or amber task lighting.
[03:20] Step 2: The Two-Minute Brain Dump. Take a simple analog notebook and write down tomorrow's top three priorities so your subconscious stops holding them on loop.
[06:00] Step 3: Gentle 4-7-8 Breathing. Inhale for 4 seconds through the nose, hold gently for 7, exhale smoothly through parted lips for 8. Repeat four cycles.
[09:10] Step 4: Cool the bedroom. Aim for roughly 65-68°F (18-20°C), a range many people find comfortable for sleep.
[10:30] Thank you for practicing with us. Small daily habits create calmer nights.`,
    intro:
      'Transitioning from high-intensity screen work to restful evenings benefits from an intentional buffer. Watch or read our evening wind-down approach.',
    sections: [
      {
        heading: 'The Power of the Analog Boundary',
        body: [
          'Putting screens in another room 30 minutes before bed removes unpredictable notifications and late-evening bright screen light from the wind-down window.',
          'Replacing screen scrolling with handwriting offers a quieter activity that helps externalize unresolved thoughts so your mind can settle.',
        ],
      },
    ],
    sources: [
      {
        id: 's7',
        title: 'The impact of pre-bed electronic device use on sleep physiology',
        publisher: 'Sleep Medicine Reviews',
        // EDIT ME: replace with the direct URL to the specific paper before marking verified
        verified: false,
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'how-to-read-a-supplement-facts-label',
    title: 'How to Read a Supplement Facts Label',
    summary:
      'A plain-language walk-through of the Supplement Facts panel: what each part means, what to double-check, and what a label can and cannot tell you.',
    topicSlug: 'nutrition-supplements',
    readTime: '5 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=supplement%20bottle%20label%20reading%20kitchen&color=green',
    type: 'article',
    seoTitle: 'How to Read a Supplement Facts Label | Bright Habit Living',
    metaDescription:
      'Learn what each part of a Supplement Facts label means — serving size, % Daily Value, proprietary blends — and what a label can and cannot tell you.',
    intro:
      'Every dietary supplement sold in the United States carries a standard information panel. Learning to read it takes only a few minutes, and it is one of the most useful habits you can build before deciding whether a product fits your routine.',
    sections: [
      {
        heading: 'Start with the Serving Size',
        body: [
          'The first line of the Supplement Facts panel states the serving size — the amount the manufacturer suggests taking at one time — followed by the number of servings in the container. Both matter. A bottle that looks like a two-month supply may hold far fewer servings than expected, and the numbers listed underneath apply to one serving, not to the whole container.',
          'Serving sizes are given in familiar household units, such as one capsule, two gummies, or a measured scoop of powder. Checking this line first helps you compare products fairly, because the same nutrient can appear at very different amounts per serving across labels.',
        ],
      },
      {
        heading: 'Dietary Ingredients and Amounts per Serving',
        body: [
          'Below the serving line, the panel lists the dietary ingredients — for example, vitamins, minerals, herbs, or other substances like amino acids or fiber. Next to each one is the amount per serving, usually in grams, milligrams, or micrograms.',
          'Many — but not all — ingredients also show a percentage sign followed by a number, such as "Vitamin C 90 mg 100%." This is the % Daily Value, a quick way to see how much one serving contributes toward the daily amount recommended for the general population. Some ingredients have no established Daily Value, so no percentage appears; that is normal and does not mean the amount is missing or wrong.',
        ],
        callout: {
          title: 'A quick habit to build',
          text: 'When comparing two products, look at serving size first, then the amount and % Daily Value for each ingredient you care about. The same nutrient name can appear on both labels at very different amounts.',
        },
      },
      {
        heading: 'Directions, and the Separate "Other Ingredients" List',
        body: [
          'The panel also includes directions — how and when the manufacturer suggests taking the product, per serving. Reading them before you buy gives you a realistic sense of the routine involved.',
          'Below the main panel sits a separate list, usually titled "Other Ingredients." These are not the nutrients the product is named for; they are things like flavorings, colorings, fillers, binders, or coatings. If you avoid certain ingredients for any reason, this is the list to read carefully.',
        ],
      },
      {
        heading: 'A Note on Proprietary Blends',
        body: [
          'Some labels group several ingredients together under a branded or "proprietary" blend name and list a single total amount for the blend instead of the amount of each individual ingredient. When that happens, the label may not show you how much of each ingredient inside the blend you would actually take per serving.',
          'If knowing the exact amount of a specific ingredient matters to you, look for products where each ingredient is listed with its own amount, or ask the manufacturer for more detail before you decide.',
        ],
      },
      {
        heading: 'What a Label Cannot Tell You',
        body: [
          'A Supplement Facts panel is required information, but it is not a seal of effectiveness. The FDA does not approve dietary supplements for safety and effectiveness before they are marketed. A product can be labeled lawfully and still be new to you, so it is worth treating the label as a starting point for your own questions rather than an end-of-story endorsement.',
          'Before adding a supplement to your routine — especially if you are pregnant or nursing, take prescription medication, or manage a health condition — it makes sense to discuss it with a qualified health professional who knows your situation.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does a % Daily Value appear for every ingredient?',
        answer:
          'No. When an ingredient has an established Daily Value, the label shows a percentage. Some ingredients do not have an established Daily Value, so only the amount per serving appears.',
      },
      {
        question: 'Is the amount on the label for the whole bottle?',
        answer:
          'No. The amounts listed apply to one serving. Check the serving size and the number of servings per container to understand the full picture.',
      },
      {
        question: 'Does the FDA approve supplements before they are sold?',
        answer:
          'No. The FDA does not approve dietary supplements for safety and effectiveness before they are marketed. For details, see the FDA and NIH Office of Dietary Supplements sources listed below.',
      },
      {
        question: 'Where can I get advice about a specific supplement?',
        answer:
          'From a qualified health professional who knows your health history — such as your physician, pharmacist, or registered dietitian.',
      },
    ],
    sources: [
      {
        id: 's-label-fda',
        title: 'Questions and Answers on Dietary Supplements',
        publisher: 'U.S. Food and Drug Administration (FDA)',
        url: 'https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements',
        verified: true,
      },
      {
        id: 's-label-nih',
        title: 'Dietary Supplements: What You Need to Know',
        publisher: 'NIH Office of Dietary Supplements',
        url: 'https://ods.od.nih.gov/factsheets/WYNTK-Consumer/',
        verified: true,
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'hydration-basics-for-everyday-activity',
    title: 'Hydration Basics for Everyday Activity',
    summary:
      'Why water matters, how fluid needs differ from person to person, and simple habits that make drinking enough feel effortless — no rigid targets required.',
    topicSlug: 'hydration-sports-nutrition',
    readTime: '5 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=water%20bottle%20glass%20hydration%20table&color=blue',
    type: 'article',
    seoTitle: 'Hydration Basics for Everyday Activity | Bright Habit Living',
    metaDescription:
      'Practical hydration habits for everyday life: why water matters, how fluid needs vary with heat and activity, and where drinks and food fit in.',
    intro:
      'Water is part of nearly every process in the body, and staying hydrated is less about hitting a single magic number and more about a handful of small, repeatable habits that fit your day.',
    sections: [
      {
        heading: 'Why Water Matters Day to Day',
        body: [
          'Water is involved in keeping your body temperature in a normal range, cushioning joints, and carrying nutrients throughout the body. Because the body loses fluid steadily — through breath, perspiration, and urine — drinking regularly across the day helps replace what goes out.',
          'When you do not take in enough fluid, you may notice you feel tired or lightheaded or simply off your game. Those day-to-day signals are useful reminders that hydration is part of feeling well, not an afterthought.',
        ],
      },
      {
        heading: 'There Is No Single Number for Everyone',
        body: [
          "Fluid needs are individual. They vary with a person's body, how active they are, and the temperature around them — needs may change with heat and physical activity, and some health conditions and medications affect fluid requirements too.",
          'This is why you will not find one universal daily water target here. A useful reference point many people find simple: let thirst guide you through the day, and pay a little extra attention on hot days or during longer, more strenuous activity, when your body loses more fluid than usual.',
        ],
        callout: {
          title: 'Simple habits that add up',
          text: 'Keep a filled bottle visible on your desk, drink a glass of water when you wake up, pair water with meals, and sip before, during, and after activity. Small repeated actions do the work — no reminders or apps required.',
        },
      },
      {
        heading: 'Drinks and Food Both Count',
        body: [
          'Water is a great everyday choice, and it is not the only contributor. Other beverages — tea, coffee, milk, and 100% juice among them — contribute to fluid intake. Foods contribute too: fruits and vegetables, soups, and yogurt are all naturally high in water.',
          'If plain water feels boring, alternating it with other drinks and water-rich foods is a perfectly reasonable way to meet your needs. Choosing drinks with little or no added sugar more often is a helpful general guideline.',
        ],
      },
      {
        heading: 'Practical Takeaways',
        body: [
          'Let thirst and everyday comfort guide how much you drink, and remember that needs shift with heat, activity, and your own body.',
          'Build hydration into routines you already have — meals, workouts, the start and end of your workday — rather than relying on willpower alone.',
          'If you have questions about your own fluid needs, especially if you have a health condition or take medication, a qualified health professional can give you guidance specific to you.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I have to drink exactly eight glasses a day?',
        answer:
          'No. There is no single water target that fits everyone. Fluid needs vary from person to person and change with heat, physical activity, and other factors. Thirst, along with regular drink and meal patterns, is a practical everyday guide.',
      },
      {
        question: 'Do coffee and tea count toward my fluid intake?',
        answer:
          "Yes. Water and other beverages contribute to fluid intake, and foods contribute too. Water-rich foods such as fruits, vegetables, and soups all add to the day's total.",
      },
      {
        question: 'Do I need electrolyte drinks?',
        answer:
          "Not necessarily. For many everyday situations, food and regular beverages cover electrolyte needs. Electrolyte products are not necessary for everyone — your own activity level, conditions, and health professional's advice are better guides than a marketing claim.",
      },
    ],
    sources: [
      {
        id: 's-hydration-cdc',
        title: 'About Water and Healthier Drinks',
        publisher: 'Centers for Disease Control and Prevention (CDC)',
        url: 'https://www.cdc.gov/healthy-weight-growth/water-healthy-drinks/index.html',
        verified: true,
      },
    ],
    hasProductMention: false,
  },
  {
    slug: 'how-to-evaluate-wellness-product-claims',
    title: 'How to Evaluate Wellness Product Claims',
    summary:
      'A practical checklist for telling a verifiable product fact from a marketing claim — and for spotting the language that deserves a second look.',
    topicSlug: 'everyday-wellness',
    readTime: '6 min read',
    image:
      'https://img.usecurling.com/p/800/500?q=reading%20magnifying%20glass%20product%20label%20desk&color=orange',
    type: 'article',
    seoTitle: 'How to Evaluate Wellness Product Claims | Bright Habit Living',
    metaDescription:
      'A practical checklist for evaluating wellness product claims: verifiable facts vs. marketing language, testimonials, studies, and red-flag wording.',
    intro:
      'Wellness products come wrapped in confident language — but confidence is not evidence. A few steady questions will take you a long way toward telling what a label or ad actually establishes from what it merely suggests.',
    sections: [
      {
        heading: 'Fact vs. Claim: A Practical Checklist',
        body: [
          'A verifiable product fact can be checked against something outside the ad: the ingredient list on the label, the amount per serving, a certification the product actually holds, or documentation the manufacturer can produce. A marketing claim, by contrast, describes what the product will do for you — "boosts energy," "supports immunity," "transforms your mornings" — and asks you to take that on faith.',
          'Before accepting a claim, ask: Where is this statement coming from? Can I verify it myself on the label or the company\'s own materials? Does the company explain the evidence behind it in a way I can look up, or does it point vaguely at "studies" without specifics?',
        ],
        callout: {
          title: 'Five questions worth asking',
          text: 'What exactly does this claim say? What evidence supports it? Is that evidence about the ingredient or the finished product? Who benefits if I believe it? And what would I need to see to change my mind? Clear, specific answers are a good sign; vague ones are worth slowing down for.',
        },
      },
      {
        heading: 'Testimonials and Imagery Are Not Proof',
        body: [
          "Personal stories, before-and-after photos, and confident endorsements can feel persuasive, but testimonials alone do not prove a product's effectiveness. One person's experience — even a sincere one — cannot tell you how the product will work for you, and advertising imagery can imply results the product has never been shown to produce.",
          "Health-related claims need appropriate scientific support regardless of how they are delivered. That includes claims made indirectly: a picture of someone thriving, a caption hinting at a cure, or a story that skips past the role of everything else in that person's life. If a claim is true, the advertiser can usually back it with evidence rather than atmosphere.",
        ],
      },
      {
        heading: 'A Study on an Ingredient Is Not a Study on the Product',
        body: [
          'Marketing often cites research on a single ingredient and lets the reader assume the finished product gets the same results. It does not follow automatically. The finished product may contain a different amount of that ingredient, pair it with others that change how it behaves, or be taken in a way the study never tested.',
          'When you see a study cited, a useful question is: was the research done on the ingredient alone or on this actual product, at this dose, in people like me? If the answer is not stated clearly, treat the connection as an assumption, not a fact.',
        ],
      },
      {
        heading: 'Language That Deserves Extra Caution',
        body: [
          'Some words are reliable signals to slow down: promises of a cure, guaranteed results, "works for everyone," quick fixes, and any suggestion that a product can replace care from a health professional. Objective health claims — including those implied by testimonials or imagery — need appropriate scientific support, and language that overreaches usually signals that the support is thin.',
          'Look instead for transparent product information: a complete ingredient list with amounts, clear contact information for the company, documentation you can request or find, and language that describes what the product actually is rather than everything it might do. Transparency is not a guarantee of quality, but its absence is worth noticing.',
        ],
        callout: {
          title: 'Where to go for reliable information',
          text: 'Government health agencies, such as the FTC, publish plain-language guidance on how health products are marketed — and on your rights as a consumer. The source below is a good starting point for understanding how health claims are supposed to be supported.',
        },
      },
    ],
    faq: [
      {
        question: 'A product cites a scientific study. Does that mean the claim is proven?',
        answer:
          'Not automatically. Check whether the study was on the ingredient or on the finished product, and at what dose. A study on an ingredient does not automatically establish that a finished product produces the same result.',
      },
      {
        question: 'Do positive customer reviews prove a product works?',
        answer:
          "No. Testimonials alone do not prove a product's effectiveness. Personal experiences can be sincere and still not predict how the product will work for you. Objective health claims need appropriate scientific support.",
      },
      {
        question: 'What wording should make me pause?',
        answer:
          'Be cautious with cure claims, guaranteed results, "works for everyone," and any suggestion that a product can replace professional care. Reputable companies describe what a product is, not everything it might do.',
      },
    ],
    sources: [
      {
        id: 's-claims-ftc',
        title: 'Health Products Compliance Guidance',
        publisher: 'Federal Trade Commission (FTC)',
        url: 'https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance',
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
  duration?: string // EDIT ME: set only for a published video with a real runtime
  publishedDate?: string // EDIT ME: set only when the video is actually published
  thumbnail: string
  guideSlug: string // Links to the guide/video template
  isFeatured?: boolean
}

export const VIDEOS: VideoItem[] = [
  {
    slug: 'wind-down-ritual-video',
    title: 'A 10-Minute Evening Wind-Down Ritual to Unpack Mental Clutter',
    summary: 'A calm walk-through of four simple steps to settle down before bed.',
    topicSlug: 'self-care-healthy-habits',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=warm%20lamp%20journal%20bedside%20calm&color=yellow',
    guideSlug: 'wind-down-ritual-video-guide',
    isFeatured: true,
  },
  {
    slug: 'evaluating-greens-powders-video',
    title: 'How to Read a Greens Powder Label (What’s Real vs Filler)',
    summary: 'A practical breakdown of grasses, digestive enzymes, and proprietary scoops.',
    topicSlug: 'nutrition-supplements',
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=green%20smoothie%20kitchen%20glass&color=green',
    guideSlug: 'evaluating-daily-supplements',
  },
  {
    slug: 'circadian-walk-video',
    title: 'The 15-Minute Morning Sunlight Walk Protocol',
    summary: 'Why stepping outside within an hour of waking helps set your body clock for the day.',
    topicSlug: 'everyday-wellness',
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
    thumbnail:
      'https://img.usecurling.com/p/800/450?q=stretching%20office%20chair%20calm&color=green',
    guideSlug: 'morning-light-routine',
  },
]

// --------------------------------------------------------------------------
// 4. PRODUCT REVIEWS
// EDITORIAL RULE: no review data is fabricated. PRODUCT_REVIEWS stays EMPTY until
// the owner supplies verified product data (name, brand, ingredients, price, COA).
// Unverified entries added here must set isGenericPlaceholder: true — the site keeps
// them out of the home page, the reviews list, header search, and internal links,
// and marks their routes noindex.
// --------------------------------------------------------------------------
export const PRODUCT_REVIEWS: ProductReview[] = [
  // EDIT ME: add a product review ONLY after its facts are verified against
  // official producer documentation (label, COA, pricing page). Example shape:
  // {
  //   slug: 'example-product',
  //   productName: 'Verified Product Name',
  //   brand: 'Verified Brand',
  //   category: 'Category',
  //   topicSlug: 'nutrition-supplements',
  //   summary: '...',
  //   isGenericPlaceholder: false,
  //   quickFacts: { whatItIs: '...', ingredients: '...', directionsWarnings: '...', priceDetails: '...', evidenceSummary: '...' },
  //   pros: ['...'],
  //   considerations: ['...'],
  //   questionsToAskProducer: ['...'],
  //   affiliateUrl: undefined,
  //   secondaryAffiliateUrl: undefined,
  //   sources: [{ id: 'src-1', title: '...', publisher: '...', url: 'https://...', verified: true }],
  // },
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
  products: [],
  rows: [],
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
// EDIT ME: once an active affiliate relationship exists, replace with the exact
// near-link disclosure required at that time.
export const EXACT_AFFILIATE_DISCLOSURE =
  'No affiliate links are active on Bright Habit Living at this time. If sponsored links are added in the future, we will disclose any commission we may earn near the link, and that compensation will never affect our editorial review.'

// EDIT ME: flip to true ONLY after the owner configures real, active affiliate URLs.
// Every "contains affiliate links" notice on the site is conditional on this flag.
export const HAS_ACTIVE_AFFILIATE_LINKS = false

// --------------------------------------------------------------------------
// 8. PUBLISH GATE (derived, not hand-set)
// Editorial rule (verbatim): "Link to the specific source that supports a factual
// claim, or mark the source as pending and keep that content unpublished until
// verified." A guide or video whose factual claims rest on pending sources stays
// OUT of public navigation, header search, index pages and the home page; its
// route still resolves but injects noindex,nofollow.
// Purely general-education content with NO factual health claims and therefore no
// sources at all may remain published.
// --------------------------------------------------------------------------
export interface PublishedStatus {
  isPublished: boolean
  pendingSourceIds: string[]
}

const computePublishedStatus = (sources?: SourceItem[]): PublishedStatus => {
  const list = sources ?? []
  const pendingSourceIds = list.filter((s) => !s.verified || !s.url).map((s) => s.id)
  return { isPublished: pendingSourceIds.length === 0, pendingSourceIds }
}

const GUIDE_PUBLISH_OVERRIDES: Record<string, boolean> = {
  'how-to-read-a-supplement-facts-label': true,
  'hydration-basics-for-everyday-activity': true,
  'how-to-evaluate-wellness-product-claims': true,
}

export const GUIDE_PUBLISH_STATUS: Record<string, PublishedStatus> = Object.fromEntries(
  GUIDES.map((g) => [
    g.slug,
    {
      ...computePublishedStatus(g.sources),
      isPublished: GUIDE_PUBLISH_OVERRIDES[g.slug] ?? computePublishedStatus(g.sources).isPublished,
    },
  ]),
)

export const PUBLISHED_GUIDES = GUIDES.filter((g) => GUIDE_PUBLISH_STATUS[g.slug]?.isPublished)

export const PUBLISHED_VIDEOS = VIDEOS.filter((v) => GUIDE_PUBLISH_STATUS[v.guideSlug]?.isPublished)

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
  // The copyright year is rendered dynamically in the Footer using the current year.
  copyrightNotice:
    'Bright Habit Living. All rights reserved. Content is for general education only and is not medical advice.',
}
