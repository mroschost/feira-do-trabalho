import feiraLogoFallback from '@/assets/images/feira.webp';

export const NEWS_FALLBACK_IMAGE = feiraLogoFallback;

export const EDITION_NEWS_IMAGES = {
  'agua-quente-2026': '/assets/news/agua-quente-2026.jpg',
  'cruzeiro-2025': '/assets/news/cruzeiro-2025.jpg',
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
