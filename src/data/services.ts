import { Service } from '../types/portfolio';

export const SERVICES_DATA: Service[] = [
  {
    id: 'cinematic-editing',
    number: '01',
    title: 'Cinematic Video Editing',
    shortDesc: 'Turning hours of raw clips into a story that keeps people watching from the first second to the final frame. Pacing, music selection, and sound design all dialed in.',
    details: [
      'Finding the best takes and trimming dead air',
      'Music curation that matches the emotional tone',
      'Realistic sound effects (whooshes, risers, ambient foley)',
      'Clean dialogue audio with background noise removed'
    ],
    deliverables: ['Full-resolution 4K master files', 'Vertical social cutdowns (9:16)', 'Clean uncompressed audio'],
    turnaround: '3 to 5 business days',
    iconName: 'Film'
  },
  {
    id: 'short-form-content',
    number: '02',
    title: 'Short-Form Content (Reels & Shorts)',
    shortDesc: 'Fast-paced, hook-driven edits for Instagram, TikTok, and YouTube Shorts. Clean animated captions, sound effects, and tight cuts designed to keep retention high.',
    details: [
      'Strong visual hooks in the first 1.5 seconds',
      'Accurate, stylish animated subtitles',
      'Punchy sound effects and zoom punches',
      'Optimized for mobile screens and quick playback'
    ],
    deliverables: ['High-bitrate 1080x1920 MP4s', 'Ready-to-post captions', 'Weekly batch deliveries available'],
    turnaround: '24 to 48 hours',
    iconName: 'Smartphone'
  },
  {
    id: 'wedding-films',
    number: '03',
    title: 'Wedding & Event Films',
    shortDesc: 'Your special day shouldn’t look like a generic template. I cut candid, heartfelt highlight films built around your vows, speeches, and unscripted laughs.',
    details: [
      'Seamless multi-camera ceremony & speech sync',
      'Natural, warm colors that look timeless',
      'Emotional soundtrack and gentle slow motion',
      'Full ceremony and speeches archived cleanly'
    ],
    deliverables: ['3-5 minute cinematic teaser', '10-15 minute highlight film', 'Full speeches cut'],
    turnaround: '7 to 10 days',
    iconName: 'Heart'
  },
  {
    id: 'motion-graphics-vfx',
    number: '04',
    title: 'Motion Graphics & Titles',
    shortDesc: 'Custom title cards, animated lower thirds, clean screen replacements, and logo animations to give your videos that extra layer of visual polish.',
    details: [
      'Kinetic typography and animated title sequences',
      'Screen cleanups and seamless object removals',
      'Smooth custom transitions and camera wipes',
      'Branded intro and outro animation packs'
    ],
    deliverables: ['Transparent alpha channel exports', 'Editable Premiere/After Effects files', 'High-res video assets'],
    turnaround: '2 to 4 days',
    iconName: 'Sparkles'
  },
  {
    id: 'color-grading',
    number: '05',
    title: 'Color Grading & Correction',
    shortDesc: 'Fixing mismatched cameras, balancing skin tones, correcting bad lighting, and applying a cohesive film look in DaVinci Resolve so your final export looks cinematic.',
    details: [
      'Fixing harsh exposure and mixed color temperatures',
      'Natural, healthy skin tones that don’t look orange',
      'Matching drone, Sony, iPhone, and RED footage',
      'Subtle Kodak and film print look development'
    ],
    deliverables: ['Color-graded high-bitrate exports', 'Custom project LUTs (.cube files)', 'DaVinci Resolve project archive'],
    turnaround: '2 to 3 days',
    iconName: 'Sliders'
  }
];
