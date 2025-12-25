# APE News - Project Structure

## Overview

APE News is a full-stack news website with user area and admin panel, built with Vue 3 + Node.js + MySQL.

---

## Frontend Structure (Vue 3 + Vite + PrimeVue)

```
ape-news/
├── public/
│   ├── logo.png
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── main.css                    # Global styles
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue           # Main header with navigation
│   │   │   ├── AppFooter.vue           # Footer component
│   │   │   ├── SideRail.vue            # Side navigation rail
│   │   │   ├── ThemeToggle.vue         # Dark/Light mode toggle
│   │   │   └── LoadingSpinner.vue      # Loading indicator
│   │   ├── news/
│   │   │   ├── NewsCard.vue            # News article card
│   │   │   ├── NewsGrid.vue            # Grid layout for news
│   │   │   ├── NewsList.vue            # List layout for news
│   │   │   ├── FeaturedNews.vue        # Featured/Breaking news section
│   │   │   ├── CategoryFilter.vue      # Category filter component
│   │   │   ├── NewsDetail.vue          # Full article view
│   │   │   ├── CommentSection.vue      # Comments component
│   │   │   ├── SocialShare.vue         # Social sharing buttons
│   │   │   └── RelatedNews.vue         # Related articles
│   │   ├── video/
│   │   │   ├── VideoCard.vue           # Video card component
│   │   │   ├── VideoPlayer.vue         # YouTube embed player
│   │   │   └── VideoGallery.vue        # Video gallery view
│   │   ├── user/
│   │   │   ├── UserProfile.vue         # User profile component
│   │   │   ├── BookmarksList.vue       # User bookmarks
│   │   │   └── LoginForm.vue           # Login modal
│   │   └── admin/
│   │       ├── AdminSidebar.vue        # Admin panel sidebar
│   │       ├── AdminHeader.vue         # Admin header
│   │       ├── NewsEditor.vue          # Rich text editor for news
│   │       ├── CategoryManager.vue     # Category CRUD
│   │       ├── AdManager.vue           # Ads management
│   │       ├── VideoManager.vue        # Video management
│   │       ├── UserManager.vue         # Admin users management
│   │       └── AnalyticsDashboard.vue  # Analytics overview
│   ├── views/
│   │   ├── HomeView.vue                # Landing page
│   │   ├── NewsListView.vue            # All news listing
│   │   ├── NewsDetailView.vue          # Single article view
│   │   ├── CategoryView.vue            # News by category
│   │   ├── VideoGalleryView.vue        # Video gallery page
│   │   ├── SearchView.vue              # Search results
│   │   ├── UserProfileView.vue         # User profile page
│   │   └── admin/
│   │       ├── AdminDashboard.vue      # Admin dashboard
│   │       ├── AdminNewsList.vue       # Manage news
│   │       ├── AdminNewsCreate.vue     # Create news
│   │       ├── AdminNewsEdit.vue       # Edit news
│   │       ├── AdminCategories.vue     # Manage categories
│   │       ├── AdminAds.vue            # Manage ads
│   │       ├── AdminVideos.vue         # Manage videos
│   │       ├── AdminUsers.vue          # Manage admin users
│   │       └── AdminAnalytics.vue      # Analytics page
│   ├── router/
│   │   └── index.js                    # Vue Router config
│   ├── stores/
│   │   ├── auth.js                     # Auth state (Pinia)
│   │   ├── news.js                     # News state
│   │   ├── categories.js               # Categories state
│   │   ├── user.js                     # User state
│   │   └── admin.js                    # Admin state
│   ├── services/
│   │   ├── api.js                      # Axios instance
│   │   ├── authService.js              # Authentication API
│   │   ├── newsService.js              # News CRUD API
│   │   ├── categoryService.js          # Category API
│   │   ├── commentService.js           # Comments API
│   │   ├── adService.js                # Ads API
│   │   ├── videoService.js             # Video API
│   │   ├── userService.js              # User API
│   │   └── analyticsService.js         # Analytics API
│   ├── utils/
│   │   ├── dateFormatter.js            # Date formatting
│   │   ├── readingTime.js              # Calculate reading time
│   │   ├── imageUpload.js              # Image upload helper
│   │   ├── validators.js               # Form validators
│   │   └── constants.js                # App constants
│   ├── middleware/
│   │   ├── auth.js                     # Auth guard
│   │   └── adminGuard.js               # Admin role guard
│   ├── App.vue                         # Root component
│   └── main.js                         # App entry point
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── PROJECT_STRUCTURE.md                # This file
└── PROJECT_PLAN.md                     # Task plan

```

---

## Backend Structure (Node.js + Express + MySQL)

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js                 # MySQL connection
│   │   ├── jwt.js                      # JWT config
│   │   └── env.js                      # Environment variables
│   ├── models/
│   │   ├── User.js                     # User model
│   │   ├── News.js                     # News article model
│   │   ├── Category.js                 # Category model
│   │   ├── Comment.js                  # Comment model
│   │   ├── Ad.js                       # Advertisement model
│   │   ├── Video.js                    # Video model
│   │   ├── Bookmark.js                 # User bookmarks
│   │   └── Analytics.js                # Article analytics
│   ├── controllers/
│   │   ├── authController.js           # Auth logic
│   │   ├── newsController.js           # News CRUD
│   │   ├── categoryController.js       # Category CRUD
│   │   ├── commentController.js        # Comments CRUD
│   │   ├── adController.js             # Ads CRUD
│   │   ├── videoController.js          # Video CRUD
│   │   ├── userController.js           # User management
│   │   └── analyticsController.js      # Analytics
│   ├── routes/
│   │   ├── auth.js                     # Auth routes
│   │   ├── news.js                     # News routes
│   │   ├── categories.js               # Category routes
│   │   ├── comments.js                 # Comment routes
│   │   ├── ads.js                      # Ads routes
│   │   ├── videos.js                   # Video routes
│   │   ├── users.js                    # User routes
│   │   └── analytics.js                # Analytics routes
│   ├── middleware/
│   │   ├── authMiddleware.js           # Verify JWT
│   │   ├── roleMiddleware.js           # Check user role
│   │   ├── uploadMiddleware.js         # File upload (multer)
│   │   ├── validationMiddleware.js     # Input validation
│   │   └── errorHandler.js             # Global error handler
│   ├── utils/
│   │   ├── tokenGenerator.js           # JWT generation
│   │   ├── passwordHash.js             # bcrypt helpers
│   │   ├── emailSender.js              # Email service
│   │   ├── imageProcessor.js           # Image optimization
│   │   └── validators.js               # Input validators
│   ├── database/
│   │   ├── migrations/                 # Database migrations
│   │   │   ├── 001_create_users.sql
│   │   │   ├── 002_create_categories.sql
│   │   │   ├── 003_create_news.sql
│   │   │   ├── 004_create_comments.sql
│   │   │   ├── 005_create_ads.sql
│   │   │   ├── 006_create_videos.sql
│   │   │   ├── 007_create_bookmarks.sql
│   │   │   └── 008_create_analytics.sql
│   │   └── seeds/                      # Seed data
│   │       ├── seedUsers.js
│   │       └── seedCategories.js
│   └── app.js                          # Express app
├── uploads/                            # Uploaded files
│   ├── images/
│   │   ├── news/
│   │   └── ads/
│   └── temp/
├── .env                                # Environment variables
├── .env.example
├── package.json
├── README.md
└── server.js                           # Server entry point
```

---

## Database Schema (MySQL)

### Tables Overview:

1. **users** - User accounts (admin & regular users)
2. **categories** - News categories with hierarchy
3. **news** - News articles
4. **comments** - Article comments
5. **ads** - Advertisement banners
6. **videos** - YouTube video records
7. **bookmarks** - User bookmarked articles
8. **analytics** - Article view tracking
9. **news_categories** - Many-to-many relationship

### Relationships:

- User → News (one-to-many)
- User → Comments (one-to-many)
- User → Bookmarks (one-to-many)
- News → Comments (one-to-many)
- News → Categories (many-to-many)
- News → Analytics (one-to-many)
- Category → Category (self-referencing for hierarchy)

---

## Technology Stack

### Frontend:

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **UI Library:** PrimeVue
- **State Management:** Pinia
- **Router:** Vue Router
- **HTTP Client:** Axios
- **Rich Text Editor:** PrimeVue Editor (Quill)
- **Form Validation:** Vuelidate or custom

### Backend:

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM/Query Builder:** mysql2 (raw queries) or Sequelize
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **File Upload:** Multer
- **Image Processing:** Sharp
- **Validation:** express-validator
- **Environment:** dotenv
- **CORS:** cors

### DevOps:

- **Version Control:** Git
- **Package Manager:** npm
- **Environment:** Development & Production

---

## Key Features by Section

### User Area (Public):

✅ View all published news articles
✅ Filter by category
✅ Search functionality
✅ Read full articles with rich content
✅ View embedded YouTube videos
✅ Comment on articles (authenticated users)
✅ Social sharing (Facebook, Twitter, WhatsApp)
✅ Reading time estimate
✅ Related articles
✅ Video gallery/playlist view
✅ User registration & login
✅ User profiles
✅ Bookmark/favorite articles

### Admin Panel:

✅ Dashboard with analytics
✅ News CRUD (Create, Read, Update, Delete)
✅ Rich text editor with image upload
✅ Draft/Published status
✅ Featured/Breaking news toggle
✅ Category management (with hierarchy)
✅ Advertisement management (banner positions, schedule, expiry)
✅ Video management (YouTube embed URLs)
✅ Comment moderation
✅ User role management (Super Admin, Editor, Moderator)
✅ View analytics (views, engagement)
✅ Role-based permissions

---

## Permissions by Role

| Feature           | Super Admin | Editor | Moderator |
| ----------------- | ----------- | ------ | --------- |
| Manage Users      | ✅          | ❌     | ❌        |
| Manage Roles      | ✅          | ❌     | ❌        |
| Create News       | ✅          | ✅     | ❌        |
| Edit News         | ✅          | ✅     | ❌        |
| Delete News       | ✅          | ✅     | ❌        |
| Publish News      | ✅          | ✅     | ❌        |
| Manage Categories | ✅          | ✅     | ❌        |
| Manage Ads        | ✅          | ✅     | ❌        |
| Manage Videos     | ✅          | ✅     | ❌        |
| Moderate Comments | ✅          | ✅     | ✅        |
| View Analytics    | ✅          | ✅     | ✅        |

---

## API Endpoints Structure

### Authentication:

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user
- POST `/api/auth/refresh` - Refresh token

### News:

- GET `/api/news` - Get all published news (public)
- GET `/api/news/:id` - Get single article (public)
- POST `/api/news` - Create article (auth + editor)
- PUT `/api/news/:id` - Update article (auth + editor)
- DELETE `/api/news/:id` - Delete article (auth + editor)
- GET `/api/news/featured` - Get featured news
- GET `/api/news/breaking` - Get breaking news
- GET `/api/news/category/:categoryId` - Get by category

### Categories:

- GET `/api/categories` - Get all categories (public)
- POST `/api/categories` - Create category (auth + editor)
- PUT `/api/categories/:id` - Update category (auth + editor)
- DELETE `/api/categories/:id` - Delete category (auth + editor)

### Comments:

- GET `/api/comments/news/:newsId` - Get article comments
- POST `/api/comments` - Create comment (auth)
- DELETE `/api/comments/:id` - Delete comment (auth + moderator)

### Ads:

- GET `/api/ads/active` - Get active ads (public)
- GET `/api/ads` - Get all ads (auth + editor)
- POST `/api/ads` - Create ad (auth + editor)
- PUT `/api/ads/:id` - Update ad (auth + editor)
- DELETE `/api/ads/:id` - Delete ad (auth + editor)

### Videos:

- GET `/api/videos` - Get all videos (public)
- POST `/api/videos` - Create video (auth + editor)
- PUT `/api/videos/:id` - Update video (auth + editor)
- DELETE `/api/videos/:id` - Delete video (auth + editor)

### Users:

- GET `/api/users/profile` - Get user profile (auth)
- PUT `/api/users/profile` - Update profile (auth)
- GET `/api/users/bookmarks` - Get user bookmarks (auth)
- POST `/api/users/bookmarks/:newsId` - Bookmark article (auth)
- DELETE `/api/users/bookmarks/:newsId` - Remove bookmark (auth)

### Admin Users:

- GET `/api/admin/users` - Get all admin users (super admin)
- POST `/api/admin/users` - Create admin user (super admin)
- PUT `/api/admin/users/:id` - Update admin user (super admin)
- DELETE `/api/admin/users/:id` - Delete admin user (super admin)

### Analytics:

- POST `/api/analytics/view/:newsId` - Track article view
- GET `/api/analytics/news/:newsId` - Get article analytics (auth + editor)
- GET `/api/analytics/dashboard` - Get dashboard data (auth + editor)

---

## Environment Variables

### Frontend (.env):

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=APE News
```

### Backend (.env):

```
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=ape_news

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5MB
UPLOAD_PATH=./uploads

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

---

## Next Steps

Refer to **PROJECT_PLAN.md** for detailed task breakdown and implementation phases.
