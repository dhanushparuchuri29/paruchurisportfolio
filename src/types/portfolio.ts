export type ProjectCategory = 
  | 'All Projects'
  | 'Cinematic Edits'
  | 'Wedding Films'
  | 'Reels & Shorts'
  | 'Motion Graphics'
  | 'Color Grading';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1' | '4:5';
  software: string[];
  shortDescription: string;
  fullDescription: string;
  editingProcess: string[];
  thumbnailUrl: string;
  videoUrl?: string; // Direct MP4 or high quality embeddable demo video
  externalUrl?: string; // Direct external link (e.g. YouTube) that opens when clicked
  isFeatured?: boolean;
  colorGradeTags?: string[];
  gridSpan?: 'normal' | 'wide' | 'tall';
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  details: string[];
  deliverables: string[];
  turnaround: string;
  iconName: string;
}

export interface SoftwareTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  skills: string[];
  versionText: string;
  primaryUse: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  projectType: string;
  companyOrChannel?: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
}
