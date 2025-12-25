/**
 * Calculate reading time for article content
 * @param {string} content - HTML or text content
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) return 0;

  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');

  // Count words
  const words = text.trim().split(/\s+/).length;

  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}

/**
 * Format reading time to readable string
 * @param {number} minutes - Reading time in minutes
 * @returns {string} Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes) {
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

export default calculateReadingTime;
