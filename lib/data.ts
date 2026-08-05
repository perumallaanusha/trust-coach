export type Coach = {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  languages: string[]
  price: number
  rating: number
  reviewCount: number
  trustScore: number
  sessions: number
  responseTime: string
  verified: boolean
  topRated?: boolean
  skills: string[]
  bio: string
  availability: string[]
}

export const coaches: Coach[] = [
  {
    id: 'aarav-mehta',
    name: 'Aarav Mehta',
    title: 'Senior Product Design Coach',
    avatar: '/coaches/aarav.png',
    location: 'Bengaluru, IN',
    languages: ['English', 'Hindi'],
    price: 48,
    rating: 4.9,
    reviewCount: 214,
    trustScore: 96,
    sessions: 1240,
    responseTime: 'under 2h',
    verified: true,
    topRated: true,
    skills: ['UX Research', 'Portfolio Review', 'Design Systems'],
    bio: 'Ten years designing consumer products. I help students turn scattered class projects into a portfolio that gets interviews.',
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
  },
  {
    id: 'lena-fischer',
    name: 'Lena Fischer',
    title: 'Data Science & Interview Coach',
    avatar: '/coaches/lena.png',
    location: 'Berlin, DE',
    languages: ['English', 'German'],
    price: 62,
    rating: 4.8,
    reviewCount: 168,
    trustScore: 93,
    sessions: 890,
    responseTime: 'under 4h',
    verified: true,
    skills: ['Python', 'SQL', 'Case Interviews'],
    bio: 'Ex-analytics lead. We work through real datasets and mock interviews until the answers feel routine.',
    availability: ['Tue', 'Wed', 'Sat'],
  },
  {
    id: 'daniel-okafor',
    name: 'Daniel Okafor',
    title: 'Career & Communication Coach',
    avatar: '/coaches/daniel.png',
    location: 'Lagos, NG',
    languages: ['English'],
    price: 35,
    rating: 4.7,
    reviewCount: 96,
    trustScore: 88,
    sessions: 430,
    responseTime: 'under 1h',
    verified: true,
    skills: ['Public Speaking', 'Resume', 'Negotiation'],
    bio: 'I coach students who know their subject but freeze in the room. Structure first, confidence follows.',
    availability: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: 'sofia-rossi',
    name: 'Sofia Rossi',
    title: 'Full-Stack Engineering Mentor',
    avatar: '/coaches/sofia.png',
    location: 'Milan, IT',
    languages: ['English', 'Italian'],
    price: 55,
    rating: 4.9,
    reviewCount: 143,
    trustScore: 95,
    sessions: 720,
    responseTime: 'under 3h',
    verified: true,
    topRated: true,
    skills: ['React', 'System Design', 'Code Review'],
    bio: 'Pair programming, honest code review, and a roadmap you can actually finish alongside coursework.',
    availability: ['Thu', 'Fri', 'Sun'],
  },
]

export type Session = {
  id: string
  coachId: string
  coach: string
  avatar: string
  topic: string
  date: string
  time: string
  duration: string
  status: 'upcoming' | 'completed' | 'pending'
  mode: 'Video call' | 'In person'
}

export const sessions: Session[] = [
  {
    id: 's1',
    coachId: 'aarav-mehta',
    coach: 'Aarav Mehta',
    avatar: '/coaches/aarav.png',
    topic: 'Portfolio case study teardown',
    date: 'Thu, 13 Aug',
    time: '4:30 PM',
    duration: '50 min',
    status: 'upcoming',
    mode: 'Video call',
  },
  {
    id: 's2',
    coachId: 'lena-fischer',
    coach: 'Lena Fischer',
    avatar: '/coaches/lena.png',
    topic: 'SQL window functions drill',
    date: 'Sat, 15 Aug',
    time: '11:00 AM',
    duration: '60 min',
    status: 'upcoming',
    mode: 'Video call',
  },
  {
    id: 's3',
    coachId: 'daniel-okafor',
    coach: 'Daniel Okafor',
    avatar: '/coaches/daniel.png',
    topic: 'Mock panel interview',
    date: 'Mon, 4 Aug',
    time: '6:00 PM',
    duration: '45 min',
    status: 'completed',
    mode: 'Video call',
  },
  {
    id: 's4',
    coachId: 'sofia-rossi',
    coach: 'Sofia Rossi',
    avatar: '/coaches/sofia.png',
    topic: 'React state architecture review',
    date: 'Fri, 1 Aug',
    time: '9:15 PM',
    duration: '60 min',
    status: 'completed',
    mode: 'Video call',
  },
]

export type Review = {
  id: string
  author: string
  role: string
  coach: string
  rating: number
  date: string
  verified: boolean
  title: string
  body: string
  helpful: number
  tags: string[]
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Priya N.',
    role: 'CS student, 3rd year',
    coach: 'Aarav Mehta',
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'Rebuilt my portfolio in four sessions',
    body: 'Aarav did not sugarcoat anything. He cut two projects, restructured the third, and the callbacks started within a month.',
    helpful: 34,
    tags: ['Portfolio', 'Direct feedback'],
  },
  {
    id: 'r2',
    author: 'Marcus T.',
    role: 'Bootcamp graduate',
    coach: 'Lena Fischer',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Case interviews finally clicked',
    body: 'We ran the same framework across six datasets until it was muscle memory. Her notes after each session were worth the fee alone.',
    helpful: 21,
    tags: ['Interviews', 'Structured'],
  },
  {
    id: 'r3',
    author: 'Aisha K.',
    role: 'MBA candidate',
    coach: 'Daniel Okafor',
    rating: 4,
    date: '2 weeks ago',
    verified: true,
    title: 'Great on delivery, homework was heavy',
    body: 'Recording myself every week was uncomfortable and it worked. Only note: expect real work between sessions.',
    helpful: 17,
    tags: ['Public speaking'],
  },
  {
    id: 'r4',
    author: 'Tomás R.',
    role: 'Junior developer',
    coach: 'Sofia Rossi',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    title: 'Code reviews I actually learned from',
    body: 'She explains the why behind every change. My pull requests get approved on the first pass now.',
    helpful: 29,
    tags: ['Code review', 'Patient'],
  },
]

export const notifications = [
  {
    id: 'n1',
    type: 'session' as const,
    title: 'Session confirmed with Aarav Mehta',
    body: 'Thursday, 13 August at 4:30 PM. A calendar invite was sent to your email.',
    time: '12 min ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'trust' as const,
    title: 'Your Trust Score went up to 82',
    body: 'Verified student ID and four completed sessions added 6 points this week.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'review' as const,
    title: 'Lena Fischer replied to your review',
    body: '"Thanks Marcus — see you for the follow-up on window functions."',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 'n4',
    type: 'goal' as const,
    title: 'Goal milestone reached',
    body: 'Portfolio case studies: 3 of 4 complete. One more to hit your 31 August target.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 'n5',
    type: 'payment' as const,
    title: 'Payment receipt available',
    body: 'Invoice #TC-20418 for $62.00 has been issued.',
    time: '4 days ago',
    unread: false,
  },
]

export const goals = [
  {
    id: 'g1',
    title: 'Ship 4 portfolio case studies',
    category: 'Design',
    due: '31 Aug 2026',
    progress: 75,
    status: 'On track' as const,
    steps: [
      { label: 'Fintech onboarding study', done: true },
      { label: 'Campus app redesign', done: true },
      { label: 'Design system audit', done: true },
      { label: 'Accessibility retrofit', done: false },
    ],
  },
  {
    id: 'g2',
    title: 'Pass 10 SQL mock interviews',
    category: 'Data',
    due: '20 Sep 2026',
    progress: 40,
    status: 'On track' as const,
    steps: [
      { label: 'Joins and aggregation', done: true },
      { label: 'Window functions', done: true },
      { label: 'Query optimisation', done: false },
      { label: 'Full mock round', done: false },
    ],
  },
  {
    id: 'g3',
    title: 'Speak at one student conference',
    category: 'Communication',
    due: '15 Oct 2026',
    progress: 20,
    status: 'At risk' as const,
    steps: [
      { label: 'Draft talk outline', done: true },
      { label: 'Record 5-min pitch', done: false },
      { label: 'Submit to 3 CFPs', done: false },
    ],
  },
]

export const weeklyProgress = [
  { week: 'W27', hours: 2, score: 58 },
  { week: 'W28', hours: 3, score: 63 },
  { week: 'W29', hours: 5, score: 68 },
  { week: 'W30', hours: 4, score: 71 },
  { week: 'W31', hours: 6, score: 76 },
  { week: 'W32', hours: 7, score: 79 },
  { week: 'W33', hours: 6, score: 82 },
]

export const skillProgress = [
  { skill: 'Portfolio craft', value: 84 },
  { skill: 'Interview delivery', value: 71 },
  { skill: 'SQL and data', value: 66 },
  { skill: 'System design', value: 52 },
  { skill: 'Public speaking', value: 45 },
]

export const trustFactors = [
  {
    label: 'Identity verified',
    detail: 'Government ID and student email confirmed',
    points: 25,
    max: 25,
  },
  {
    label: 'Session completion',
    detail: '12 of 13 booked sessions attended',
    points: 22,
    max: 25,
  },
  {
    label: 'Review authenticity',
    detail: 'All reviews tied to paid, completed sessions',
    points: 18,
    max: 20,
  },
  {
    label: 'Response reliability',
    detail: 'Average reply time 3h 40m',
    points: 12,
    max: 20,
  },
  {
    label: 'Community standing',
    detail: 'No disputes or cancellations in 90 days',
    points: 5,
    max: 10,
  },
]
