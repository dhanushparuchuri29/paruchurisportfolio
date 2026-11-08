export interface VideoSourceInfo {
  type: 'youtube' | 'vimeo' | 'direct';
  embedUrl?: string;
  directUrl?: string;
  thumbnailUrl?: string;
  videoId?: string;
}

export function parseVideoUrl(url: string): VideoSourceInfo {
  if (!url) {
    return { type: 'direct', directUrl: '' };
  }

  // Handle iframe embed code if user pastes raw <iframe>
  if (url.includes('<iframe') && url.includes('src="')) {
    const srcMatch = url.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return parseVideoUrl(srcMatch[1]);
    }
  }

  // 1. YouTube Detection (handles youtu.be, youtube.com/watch?v=, youtube.com/embed/, etc.)
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(youtubeRegex);
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      type: 'youtube',
      videoId: id,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  // 2. Vimeo Detection
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[3]) {
    const id = vimeoMatch[3];
    return {
      type: 'vimeo',
      videoId: id,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`,
    };
  }

  // 3. Direct video file (.mp4, .webm, local file /videos/...)
  return {
    type: 'direct',
    directUrl: url,
  };
}
