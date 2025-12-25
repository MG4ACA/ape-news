// App constants

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  USER: 'user',
};

export const NEWS_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const AD_POSITIONS = {
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  CONTENT: 'content',
};

export const COMMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  NEWS_PER_PAGE: 12,
  COMMENTS_PER_PAGE: 20,
  VIDEOS_PER_PAGE: 12,
};

export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const UPLOADS_BASE_URL =
  import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:3000/uploads';

export default {
  USER_ROLES,
  NEWS_STATUS,
  AD_POSITIONS,
  COMMENT_STATUS,
  PAGINATION,
  IMAGE_UPLOAD,
  API_BASE_URL,
  UPLOADS_BASE_URL,
};
