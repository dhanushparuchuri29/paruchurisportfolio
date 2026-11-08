import { Project } from '../types/portfolio';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'project-hail-mary',
    title: 'Can You Remember Who You Were | Cinematic Story & Sound Design',
    category: 'Cinematic Edits',
    client: 'Narrative Short & Sound Design Spec',
    year: '2026',
    duration: '00:31',
    aspectRatio: '2.39:1',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    shortDescription: 'A high-impact motivational story combining fast flashback cuts, atmospheric voiceover pacing, and detailed audio sound design.',
    fullDescription: 'An emotional, fast-paced personal narrative cut around the central question: "Can you remember who you were before the world told you who you should be?" Features tight jump cuts, nostalgic film textures, street foley, and dramatic audio risers that keep the viewer locked in.',
    editingProcess: [
      'Built the narrative structure around the spoken voiceover cadence',
      'Designed complex sound effects layers (camera shutter, whooshes, street ambiance, bass drops)',
      'Created nostalgic blur and memory dissolves for the college flashbacks',
      'Color graded for natural twilight warm tones with soft highlight roll-offs'
    ],
    externalUrl: 'https://youtu.be/Ozp4GkxUCLQ?si=c8qxJPuEykA1IxCD',
    thumbnailUrl: '/assets/aistudio/remember_sound_design_thumb.jpg',
    isFeatured: true,
    colorGradeTags: ['Filmic Twilight', 'Warm Sunset Tone', 'Clean Skin Colors'],
    gridSpan: 'wide'
  },
  {
    id: 'wedding-stories',
    title: 'Wedding Stories | Emotional Wedding Film',
    category: 'Wedding Films',
    client: 'Kavya & Rohan Highlights',
    year: '2025',
    duration: '04:12',
    aspectRatio: '16:9',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    shortDescription: 'A warm, candid wedding film weaving intimate handwritten vows with sunset celebrations and unscripted laughter.',
    fullDescription: 'We had over 12 hours of raw footage shot across 3 cameras with challenging mixed indoor and sunset lighting. I built the entire story around their personal vows, letting the real voices lead the pacing instead of relying purely on a background song. I kept the colors warm, glowing, and natural so the footage feels timeless rather than trendy.',
    editingProcess: [
      'Synced 3 cameras with wireless lapel audio and room ambient mics',
      'Cleaned up wind noise and echo from the outdoor ceremony audio',
      'Choreographed speed ramps on the dance floor to match musical downbeats',
      'Dialed in flattering, natural skin tones under changing sunlight in DaVinci'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    isFeatured: true,
    colorGradeTags: ['Warm Golden Hour', 'Natural Skin Tones', 'Soft Film Curve'],
    gridSpan: 'normal'
  },
  {
    id: 'cinematic-moments',
    title: 'Cinematic Moments | Color Grading Showcase',
    category: 'Color Grading',
    client: 'Indie Short Film / Grading Study',
    year: '2025',
    duration: '01:50',
    aspectRatio: '2.39:1',
    software: ['DaVinci Resolve Studio'],
    shortDescription: 'Taking flat, washed-out Sony S-Log3 and ARRI LogC footage and transforming it into rich, 35mm film-inspired scenes.',
    fullDescription: 'A side-by-side study showing how raw camera sensor files get molded into cinema-quality images. The focus here was on preserving highlights in bright skies while lifting shadow details in the actors’ faces, finishing with a custom film contrast curve that adds weight and texture.',
    editingProcess: [
      'Standardized color spaces using DaVinci Color Management (ACEScc)',
      'Tracked qualifier masks to isolate and soften actor face highlights',
      'Added subtle halation around specular light sources for an analog touch',
      'Matched shots filmed hours apart so the entire scene looks continuous'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    isFeatured: false,
    colorGradeTags: ['35mm Film Print', 'Subtle Halation', 'Deep Shadow Detail'],
    gridSpan: 'normal'
  },
  {
    id: 'documentary-edit',
    title: 'Documentary Edit | Visual Storytelling & Pacing',
    category: 'Cinematic Edits',
    client: 'Visual Storytelling Cohort',
    year: '2026',
    duration: '00:27',
    aspectRatio: '16:9',
    software: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    shortDescription: 'A high-impact documentary style edit combining kinetic typography, paper-tear collage motion graphics, and punchy audio sound design.',
    fullDescription: 'Crafted in a signature documentary storytelling style designed for high audience retention. Built around the core theme that video editing is the invisible art shaping what we see and feel. Features layered paper-rip collage transitions, custom animated typography, archival overlays, and punchy sound foley timed precisely to the narrator\'s vocal cadence.',
    editingProcess: [
      'Structured narrative pacing to synchronize with the voiceover\'s emotional beats',
      'Created custom paper-tear textures, film burns, and archival split-screen collages',
      'Designed multi-layered sound effects: paper rumbles, glitch sweeps, and camera shutters',
      'Graded in DaVinci Resolve with film print contrast, warm highlights, and subtle grain'
    ],
    externalUrl: 'https://youtu.be/tcYeG3RStbw?si=rM5AT6JgPdpFKAHi',
    thumbnailUrl: '/assets/aistudio/file_00000000b934820ba1747c4f8fe24403_2d3a2c8c.png',
    isFeatured: true,
    colorGradeTags: ['Documentary Contrast', 'Punchy Paper Texture', 'Warm Highlights'],
    gridSpan: 'normal'
  },
  {
    id: 'motion-experiments',
    title: 'Kinetic UI & Motion Graphics | Holographic Cards & Titles',
    category: 'Motion Graphics',
    client: 'Kinetic UI & Motion Design Showcase',
    year: '2026',
    duration: '00:02',
    aspectRatio: '16:9',
    software: ['Adobe After Effects', 'Cinema 4D', 'Illustrator'],
    shortDescription: 'High-energy 3D kinetic UI card animation featuring glowing neon borders, ambient volumetric lighting, and holographic typography.',
    fullDescription: 'A sleek futuristic motion graphics experiment featuring floating kinetic UI cards, luminous cyan and electric violet borders, and volumetric particle atmosphere. Crafted in After Effects with 3D camera sweeps, ease curves, and light trails designed for high-impact brand openers and modern interfaces.',
    editingProcess: [
      'Modeled rounded glass UI card geometry with glossy refraction and neon edges',
      'Choreographed elastic bezier easing for the title card reveal and 3D flip',
      'Layered ambient depth-of-field blur and subtle chromatic aberration',
      'Rendered in ultra-high resolution with smooth optical motion blur'
    ],
    videoUrl: '/assets/aistudio/motion_graphics.mp4',
    thumbnailUrl: '/assets/aistudio/motion_graphics_thumb.jpg',
    isFeatured: true,
    colorGradeTags: ['Holographic Cyan', 'Electric Violet Glow', 'Deep Contrast Black'],
    gridSpan: 'normal'
  },
  {
    id: 'visual-stories',
    title: 'Visual Stories | Fast-Paced Creator Edit & VFX',
    category: 'Cinematic Edits',
    client: 'Tharun Speaks Cohort Spec',
    year: '2026',
    duration: '00:22',
    aspectRatio: '16:9',
    software: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    shortDescription: 'High-energy fast-paced YouTube editing combining dynamic jump cuts, green screen keying, kinetic title animations, and punchy sound design.',
    fullDescription: 'An intense, high-retention creator edit demonstrating modern YouTube storytelling techniques. Features tight jump cuts to eliminate pauses, green screen replacement into an industrial warehouse and neon tunnel, animated kinetic subtitles, chromatic split glitch transitions, and layered sound effects (whooshes, risers, and impact hits).',
    editingProcess: [
      'Aggressive pacing to eliminate dead air while preserving natural speech cadence',
      'Ultra-clean chroma keying to isolate subject and composite custom 3D background environments',
      'Custom kinetic typography animations with pop-in emphasis and tracking',
      'Layered micro-sound design synchronized with every cut, visual gag, and transition'
    ],
    externalUrl: 'https://youtu.be/-Cv3gQDWc9g?si=jHaz4hyKO7RW2yOi',
    thumbnailUrl: '/assets/aistudio/visual_stories_thumb.jpg',
    isFeatured: true,
    colorGradeTags: ['Punchy Contrast', 'Clean Chroma Key', 'Neon Ambience'],
    gridSpan: 'wide'
  }
];
