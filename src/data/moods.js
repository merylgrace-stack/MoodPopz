/* Flowchart: Tired, Bored, Stressed, Overthinking, Frustrated, Other */

export const MOODS = [
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#A7C7E7' },
  { id: 'bored', label: 'Bored', emoji: '😐', color: '#B2D8B2' },
  { id: 'stressed', label: 'Stressed', emoji: '😰', color: '#F5D0C5' },
  { id: 'overthinking', label: 'Overthinking', emoji: '🌀', color: '#D4E4D3' },
  { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: '#F5C6AA' },
  { id: 'other', label: 'Other / Unsure', emoji: '✨', color: '#FFF8E7' },
]

export const TASKS = {
  tired: [
    '3 Slow Breaths',
    'Close Eyes',
    'Gentle Stretch',
    'Water Sip',
  ],
  bored: [
    'One-Line Journal',
    '5 Things You See',
    'Mini Doodle',
    'Fun Fact',
  ],
  stressed: [
    'Dump Box',
    'Hand Squeeze',
    '4-4 Breathing',
    'Name 1 Good Thing',
  ],
  overthinking: [
    'Brain Dump',
    'One Question',
    'Name 3 Sounds',
    'Grounding Tap',
  ],
  frustrated: [
    'Tear Paper',
    'Tense & Release',
    'Write What You Feel',
    'Step Outside',
  ],
  other: [
    'Spin Again',
    'Surprise Task',
    'Mini Doodle',
    '1 Deep Breath',
  ],
}

/* All tasks flattened for Surprise Task (excludes Spin Again, Surprise Task) */
export const ALL_TASKS = [
  ...TASKS.tired,
  ...TASKS.bored,
  ...TASKS.stressed,
  ...TASKS.overthinking,
  ...TASKS.frustrated,
  'Mini Doodle',
  '1 Deep Breath',
].filter((t) => t !== 'Spin Again' && t !== 'Surprise Task')

export const FUN_FACTS = [
  'Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs.',
  'Octopuses have three hearts and blue blood.',
  'A group of flamingos is called a flamboyance.',
  'Bananas are berries, but strawberries are not.',
  'Cows have best friends and get stressed when they are separated.',
  'The shortest war in history lasted 38 minutes.',
  'Wombat poop is cube-shaped.',
]

/* Quotes shown each time you enter the app (mood selection screen) */
export const ENTRY_QUOTES = [
  "You don't have to decide forever today.",
  "This feeling is real. This feeling is not permanent.",
  "Stay. Let this moment pass.",
  "Your life is allowed to be messy and still matter.",
  "You are not weak for wanting the pain to stop.",
  "If you can't live for tomorrow, live for the next 10 minutes.",
  "You don't need to be strong. You just need to stay.",
  "Even a broken heart is still beating. That means you're still here.",
  "You're allowed to rest. You're not allowed to disappear.",
  "The chapter you're in is heavy, but it's not the whole book.",
  "There are versions of you in the future who are grateful you stayed.",
  "This pain will change. It always does—even when it feels endless.",
  "You haven't met all the people who will love you yet.",
  "You want the pain to end, not your life.",
  "Surviving today is a victory. Nothing more is required.",
  "You don't need a reason to stay. Being here is enough.",
]

export const QUOTES = [
  ...ENTRY_QUOTES,
  "It's okay to move slowly.",
  "Small steps are still progress.",
  "Take a moment; you've done enough for now.",
  "Be gentle with yourself.",
  "One breath at a time.",
  "Every moment is a fresh beginning.",
  "You are allowed to go slowly.",
  "Trust the process.",
  "Softness is strength.",
]
