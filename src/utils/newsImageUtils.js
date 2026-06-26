import aguaQuenteNewsImage from '@/assets/images/news/agua-quente-2026.jpg';
import cruzeiroNewsImage from '@/assets/images/news/cruzeiro-2025.jpg';
import feiraLogoFallback from '@/assets/images/feira.webp';

export const NEWS_FALLBACK_IMAGE = feiraLogoFallback;

export const EDITION_NEWS_IMAGES = {
  'agua-quente-2026': aguaQuenteNewsImage,
  'cruzeiro-2025': cruzeiroNewsImage,
};

export const getEditionNewsFallbackImage = (editionSlug) => {
  return EDITION_NEWS_IMAGES[editionSlug] || NEWS_FALLBACK_IMAGE;
};

export const getNewsImageSrc = (image, editionSlug) => {
  const editionFallback = getEditionNewsFallbackImage(editionSlug);

  if (typeof image !== 'string') return editionFallback;

  const normalizedImage = image.trim();

  if (!normalizedImage || normalizedImage === '/assets/images/feira.webp') {
    return editionFallback;
  }

  return normalizedImage;
};

export const handleNewsImageError = (event) => {
  const imageElement = event.currentTarget;

  if (imageElement.dataset.fallbackApplied === 'true') return;

  imageElement.dataset.fallbackApplied = 'true';
  imageElement.src = imageElement.dataset.fallbackSrc || NEWS_FALLBACK_IMAGE;
};
