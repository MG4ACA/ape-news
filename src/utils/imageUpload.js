import { IMAGE_UPLOAD } from './constants';

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file type
  if (!IMAGE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${IMAGE_UPLOAD.ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > IMAGE_UPLOAD.MAX_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${IMAGE_UPLOAD.MAX_SIZE / (1024 * 1024)}MB limit`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Create image preview URL from file
 * @param {File} file - Image file
 * @returns {Promise<string>} Data URL for preview
 */
export function createImagePreview(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Get full image URL from path
 * @param {string} imagePath - Relative image path
 * @returns {string} Full image URL
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;

  // If path already starts with /uploads, use it as-is for proxy
  if (imagePath.startsWith('/uploads')) {
    return imagePath;
  }

  // Otherwise, add /uploads prefix
  return `/uploads${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

/**
 * Upload image to server
 * @param {File} file - Image file to upload
 * @param {string} type - Upload type (news, ads, etc.)
 * @returns {Promise<string>} Uploaded image URL
 */
export async function uploadImage(file, type = 'news') {
  // Validate image
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Create FormData for upload
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`/api/${type}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.data.url || data.data.path;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

export default {
  validateImageFile,
  createImagePreview,
  getImageUrl,
  uploadImage,
};
