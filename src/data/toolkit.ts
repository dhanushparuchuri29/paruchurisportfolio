import { SoftwareTool } from '../types/portfolio';

export const TOOLKIT_DATA: SoftwareTool[] = [
  {
    id: 'davinci-resolve',
    name: 'DaVinci Resolve Studio',
    tagline: 'My Go-To For Color Grading & Final Polish',
    description: 'This is where I spend hours making sure every frame looks like it belongs in a theater. I use its node workflow to fix weird lighting, match clips shot on different cameras (like a drone and a Sony A7S), and dial in soft, cinematic film looks with realistic skin tones.',
    accentColor: '#FF6F3D',
    skills: ['Color Correction & Matching', 'Skin Tone Balancing', 'Film Print Emulation', 'Fairlight Audio Cleanup', 'Blackmagic RAW & S-Log3'],
    versionText: 'DaVinci Resolve Studio 19',
    primaryUse: 'Color Grading, Shot Matching & Audio Cleanup'
  },
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    tagline: 'Where The Story & Pacing Come Together',
    description: 'This is my daily timeline for assembling footage, finding the right moments, and cutting out dead air. I work heavily with keyboard shortcuts and multi-cam bins so I can turn around clean rough cuts quickly without missing a beat.',
    accentColor: '#9999FF',
    skills: ['Timeline Pacing & Story Assembly', 'Multi-Camera Synchronization', 'Audio Mixing & Music Sync', 'Proxy Workflows for 4K', 'Quick Client Revisions'],
    versionText: 'Adobe Premiere Pro 2025',
    primaryUse: 'Story Assembly, Rhythm & Cutdowns'
  },
  {
    id: 'after-effects',
    name: 'Adobe After Effects',
    tagline: 'For Motion Design, Titles & Visual Polish',
    description: 'Whenever a project needs something extra that straight cuts cannot achieve, I hop into After Effects. That includes kinetic typography for short-form hooks, tracking text onto moving surfaces, logo animations, and cleaning up unwanted objects in the frame.',
    accentColor: '#D291FF',
    skills: ['Kinetic Captions & Title Cards', '3D Motion Tracking', 'Logo Animations & Intros', 'Seamless Transitions', 'Object & Blemish Removal'],
    versionText: 'Adobe After Effects 2025',
    primaryUse: 'Motion Graphics, Titles & VFX'
  }
];
