export const NEWS_FALLBACK_IMAGE = '/assets/images/feira.webp';

export const getNewsImageSrc = (image) => {
  if (typeof image !== 'string') return NEWS_FALLBACK_IMAGE;

  const normalizedImage = image.trim();
  return normalizedImage.length > 0 ? normalizedImage : NEWS_FALLBACK_IMAGE;
};

export const handleNewsImageError = (event) => {
  const imageElement = event.currentTarget;

  if (imageElement.dataset.fallbackApplied === 'true') return;

  imageElement.dataset.fallbackApplied = 'true';
  imageElement.src = NEWS_FALLBACK_IMAGE;
};
