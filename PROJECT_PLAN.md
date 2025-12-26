# APE News - Project Plan & Task Breakdown

## Project Overview

Full-stack news website with user area and admin panel.

**Tech Stack:** Vue 3 + Node.js + Express + MySQL + PrimeVue + JWT

---

## Development Phases

### Phase 1: Project Setup & Database Design

### Phase 2: Backend API Development

### Phase 3: Frontend - User Area

### Phase 4: Frontend - Admin Panel

### Phase 5: Integration & Testing

### Phase 6: Deployment & Production

---

## PHASE 1: Project Setup & Database Design

**Estimated Time:** 1-2 days

### 1.1 Backend Setup

- [ ] Initialize Node.js project (`npm init`)
- [ ] Install backend dependencies
  - express, mysql2, jsonwebtoken, bcrypt, dotenv
  - cors, express-validator, multer, sharp
- [ ] Create folder structure (controllers, models, routes, middleware)
- [ ] Setup `.env` and `.env.example` files
- [ ] Configure database connection (config/database.js)
- [ ] Setup Express app with middleware (CORS, body-parser, error handler)
- [ ] Create server.js entry point

### 1.2 Database Design

- [ ] Design database schema (see PROJECT_STRUCTURE.md)
- [ ] Create MySQL database `ape_news`
- [ ] Write migration files:
  - [ ] 001_create_users.sql
  - [ ] 002_create_categories.sql
  - [ ] 003_create_news.sql
  - [ ] 004_create_comments.sql
  - [ ] 005_create_ads.sql
  - [ ] 006_create_videos.sql
  - [ ] 007_create_bookmarks.sql
  - [ ] 008_create_analytics.sql
  - [ ] 009_create_news_categories.sql (junction table)
- [ ] Run migrations
- [ ] Create seed data (sample admin user, categories)

### 1.3 Frontend Setup

- [ ] Verify Vite + Vue 3 setup
- [ ] Install Pinia for state management
- [ ] Install Axios for API calls
- [ ] Install additional PrimeVue components
- [ ] Configure Vite proxy for API
- [ ] Update `.env` with API base URL
- [ ] Create folder structure (stores, services, views, components)

---

## PHASE 2: Backend API Development

**Estimated Time:** 5-7 days

### 2.1 Authentication System

- [ ] Create User model (models/User.js)
- [ ] Password hashing utilities (utils/passwordHash.js)
- [ ] JWT token generation (utils/tokenGenerator.js)
- [ ] Auth controller (controllers/authController.js)
  - [ ] Register endpoint
  - [ ] Login endpoint
  - [ ] Get current user
  - [ ] Refresh token
- [ ] Auth middleware (middleware/authMiddleware.js)
- [ ] Role middleware (middleware/roleMiddleware.js)
- [ ] Auth routes (routes/auth.js)
- [ ] Test auth endpoints

### 2.2 Category Management API

- [ ] Create Category model (models/Category.js)
- [ ] Category controller (controllers/categoryController.js)
  - [ ] Get all categories (with hierarchy)
  - [ ] Create category
  - [ ] Update category
  - [ ] Delete category
- [ ] Category routes (routes/categories.js)
- [ ] Validation middleware for category data
- [ ] Test category endpoints

### 2.3 News Management API

- [ ] Create News model (models/News.js)
- [ ] News controller (controllers/newsController.js)
  - [ ] Get all published news (public)
  - [ ] Get news by category
  - [ ] Get featured news
  - [ ] Get breaking news
  - [ ] Get single article
  - [ ] Search news
  - [ ] Create article (draft/published)
  - [ ] Update article
  - [ ] Delete article
  - [ ] Upload article image
- [ ] File upload middleware (multer)
- [ ] Image processing (sharp for optimization)
- [ ] News routes (routes/news.js)
- [ ] Validation middleware
- [ ] Test news endpoints

### 2.4 Comments API

- [ ] Create Comment model (models/Comment.js)
- [ ] Comment controller (controllers/commentController.js)
  - [ ] Get article comments
  - [ ] Create comment
  - [ ] Delete comment (user/moderator)
  - [ ] Moderate comment (approve/reject)
- [ ] Comment routes (routes/comments.js)
- [ ] Test comment endpoints

### 2.5 Advertisement Management API

- [ ] Create Ad model (models/Ad.js)
- [ ] Ad controller (controllers/adController.js)
  - [ ] Get active ads (by position, check expiry)
  - [ ] Get all ads
  - [ ] Create ad
  - [ ] Update ad
  - [ ] Delete ad
  - [ ] Upload ad image
- [ ] Ad routes (routes/ads.js)
- [ ] Test ad endpoints

### 2.6 Video Management API

- [ ] Create Video model (models/Video.js)
- [ ] Video controller (controllers/videoController.js)
  - [ ] Get all videos
  - [ ] Get video gallery/playlist
  - [ ] Create video entry (YouTube URL)
  - [ ] Update video
  - [ ] Delete video
- [ ] Video routes (routes/videos.js)
- [ ] Test video endpoints

### 2.7 User Management API

- [ ] User controller (controllers/userController.js)
  - [ ] Get user profile
  - [ ] Update user profile
  - [ ] Get bookmarks
  - [ ] Add bookmark
  - [ ] Remove bookmark
- [ ] Admin user management (for super admin)
  - [ ] Get all admin users
  - [ ] Create admin user
  - [ ] Update admin user role
  - [ ] Delete admin user
- [ ] User routes (routes/users.js)
- [ ] Test user endpoints

### 2.8 Analytics API

- [ ] Create Analytics model (models/Analytics.js)
- [ ] Analytics controller (controllers/analyticsController.js)
  - [ ] Track article view
  - [ ] Get article analytics (views, comments count)
  - [ ] Get dashboard statistics
  - [ ] Get popular articles
- [ ] Analytics routes (routes/analytics.js)
- [ ] Test analytics endpoints

### 2.9 API Testing & Documentation

- [ ] Test all endpoints with Postman/Insomnia
- [ ] Create API documentation
- [ ] Handle error responses consistently
- [ ] Implement rate limiting (optional)

---

## PHASE 3: Frontend - User Area

**Estimated Time:** 6-8 days

### 3.1 Setup & Configuration

- [x] Configure Vue Router with routes
- [x] Setup Pinia stores (auth, news, categories, user)
- [x] Create API service layer (services/)
- [x] Setup Axios interceptors (auth token, error handling)
- [x] Configure PrimeVue theme

### 3.2 Common Components

- [x] Update AppHeader.vue with navigation
- [x] Update AppFooter.vue
- [x] Update SideRail.vue
- [x] Create LoadingSpinner.vue
- [x] Create ErrorMessage.vue
- [x] Create Pagination.vue

### 3.3 Authentication

- [x] Create auth store (stores/auth.js)
- [x] Create authService.js
- [x] Create LoginView.vue (separate page)
- [x] Create RegisterView.vue (separate page)
- [x] Implement auth guard (middleware/auth.js)
- [x] Add login/logout to header

### 3.4 Home Page

- [x] Update HomeView.vue
  - [x] Featured/Breaking news section
  - [x] Latest news grid
  - [x] Categories showcase
  - [ ] Video section preview
  - [ ] Banner ad placements
- [ ] Create FeaturedNews.vue component
- [x] Create NewsCard.vue component
- [ ] Create NewsGrid.vue component

### 3.5 News Listing & Detail

- [x] Create NewsListView.vue (all news)
- [x] Create CategoryView.vue (filter by category)
- [x] Create NewsDetailView.vue
  - [x] Article content with rich text
  - [x] YouTube video embed (if exists)
  - [x] Social share buttons
  - [x] Reading time display
  - [x] View count
  - [x] Comments section
  - [x] Related articles
  - [ ] Banner ads
- [ ] Create CategoryFilter.vue
- [ ] Create SocialShare.vue
- [x] Create CommentSection.vue
- [ ] Create RelatedNews.vue

### 3.6 Video Gallery

- [x] Create VideoGalleryView.vue
- [x] Create VideoCard.vue
- [ ] Create VideoPlayer.vue (YouTube embed)
- [ ] Implement playlist/grid view

### 3.7 Search Functionality

- [x] Create SearchView.vue
- [x] Add search bar to header
- [x] Implement search API integration
- [x] Display search results

### 3.8 User Profile & Bookmarks

- [x] Create UserProfileView.vue
- [x] Create user store (stores/user.js)
- [x] Create BookmarksView.vue
- [x] Implement bookmark functionality
- [x] Add bookmark button to news cards

### 3.9 Multilingual Support ✅

- [x] Implement Vue I18n (Sinhala, English, Tamil)
- [x] Create LanguageSwitcher.vue (floating globe button)
- [x] Add language persistence (localStorage)
- [x] Implement getLocalizedField utility
- [x] Database migration for multilingual columns
- [x] Update backend News model for language filtering
- [x] Update all views for multilingual content display
- [x] Implement page refresh on language change
- [x] Category multilingual support
- [x] Slug generation with transliteration (Sinhala/Tamil)

### 3.10 Responsive Design

- [ ] Make all components mobile-responsive
- [ ] Test on different screen sizes
- [ ] Adjust PrimeVue breakpoints

---

## PHASE 4: Frontend - Admin Panel

**Estimated Time:** 7-10 days

### 4.1 Admin Layout & Navigation ✅

- [x] Create admin layout (separate from main app)
- [x] Create AdminSidebar.vue (with logo)
- [x] Create AdminHeader.vue
- [x] Setup admin routes (nested under /admin)
- [x] Implement admin guard (adminGuard.js)
- [x] Add role-based permission checks

### 4.2 Admin Dashboard 🔄

- [x] Create AdminDashboard.vue
- [ ] Create AnalyticsDashboard.vue component
  - [x] Total articles count
  - [x] Total views
  - [x] Total comments
  - [x] Total users
  - [ ] Popular articles
  - [ ] Recent comments
- [ ] Integrate analytics API (partial)

### 4.3 News Management ✅

- [x] Create AdminNewsList.vue (data table with CRUD actions)
- [x] Create AdminNewsCreate.vue (integrated with NewsEditor)
  - [x] Rich text editor (PrimeVue Editor)
  - [x] Title, slug, excerpt (multilingual: si/en/ta)
  - [x] Category selection (multi-select)
  - [x] Featured image upload
  - [x] YouTube video URL
  - [x] Featured/Breaking toggle
  - [x] Draft/Published status
  - [x] Meta tags (SEO)
- [x] Create AdminNewsEdit.vue (integrated with NewsEditor)
- [x] Create NewsEditor.vue component (reusable form)
- [x] Implement image upload with preview
- [x] Add form validation
- [x] Integrate news CRUD APIs
- [x] Add sample data generator
- [x] Multilingual content support (Sinhala, English, Tamil)

### 4.4 Category Management ✅

- [x] Create AdminCategories.vue
- [x] Create CategoryManager component (integrated in AdminCategories)
  - [x] DataTable with multilingual display
  - [x] Add/Edit/Delete categories
  - [x] Parent category selection dropdown
  - [x] Display order management
  - [x] Active/Inactive toggle
  - [ ] Drag & drop reordering (optional - not implemented)
- [x] Integrate category API
- [x] Multilingual support (name_si/en/ta, description_si/en/ta)
- [x] Search/filter functionality

### 4.5 Advertisement Management ✅

- [x] Create AdminAds.vue
- [x] Create AdManager.vue component
  - [x] Ad title, image upload
  - [x] Banner position (header, sidebar, content)
  - [x] Link URL
  - [x] Start/End date (schedule)
  - [x] Active/Inactive toggle
- [x] Display active ads in data table
- [x] Integrate ad API

### 4.6 Video Management ✅

- [x] Create AdminVideos.vue
- [x] Create VideoManager.vue component
  - [x] YouTube URL input
  - [x] Title, description
  - [x] Video thumbnail preview
  - [x] Featured toggle
  - [x] Active/Inactive toggle
- [x] Display videos in data table
- [x] Integrate video API

### 4.7 Comment Moderation

- [ ] Create CommentModeration.vue
- [ ] Display all comments with article context
- [ ] Approve/Delete actions
- [ ] Filter by status (pending, approved)
- [ ] Integrate comment API

### 4.8 User & Role Management

- [ ] Create AdminUsers.vue
- [ ] Display all admin users in data table
- [ ] Create/Edit admin user form
  - [ ] Name, email, password
  - [ ] Role selection (Super Admin, Editor, Moderator)
- [ ] Delete user with confirmation
- [ ] Implement role-based UI (only super admin sees this)
- [ ] Integrate admin user API

### 4.9 Analytics Page

- [ ] Create AdminAnalytics.vue
- [ ] Display detailed analytics
  - [ ] Article views over time (chart)
  - [ ] Most viewed articles
  - [ ] Category performance
  - [ ] User engagement
- [ ] Use PrimeVue Chart components

---

## PHASE 5: Integration & Testing

**Estimated Time:** 3-4 days

### 5.1 Frontend-Backend Integration

- [ ] Test all API endpoints from frontend
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Test file uploads
- [ ] Test authentication flow
- [ ] Test role-based access

### 5.2 Features Testing

- [ ] Test news CRUD operations
- [ ] Test category hierarchy
- [ ] Test comments (create, delete, moderate)
- [ ] Test bookmarks functionality
- [ ] Test video embeds
- [ ] Test ad display and scheduling
- [ ] Test social sharing
- [ ] Test search functionality
- [ ] Test analytics tracking

### 5.3 UI/UX Refinement

- [ ] Test dark/light mode consistency
- [ ] Check responsive design on all pages
- [ ] Add loading skeletons
- [ ] Add transitions/animations
- [ ] Improve error messages
- [ ] Add success notifications (PrimeVue Toast)
- [ ] Polish admin panel UI

### 5.4 Security & Validation

- [ ] Test JWT token expiry and refresh
- [ ] Test role-based permissions thoroughly
- [ ] Validate all form inputs
- [ ] Sanitize user input (XSS prevention)
- [ ] Test file upload restrictions
- [ ] Implement CSRF protection (if needed)

### 5.5 Performance Optimization

- [ ] Optimize images (compression, lazy loading)
- [ ] Implement pagination for large datasets
- [ ] Add caching strategies
- [ ] Optimize database queries
- [ ] Code splitting (lazy load routes)
- [ ] Minify assets for production

---

## PHASE 6: Deployment & Production

**Estimated Time:** 2-3 days

### 6.1 Backend Deployment

- [ ] Setup production environment variables
- [ ] Configure production database
- [ ] Setup file storage (local or cloud)
- [ ] Deploy to hosting (Heroku, DigitalOcean, AWS, etc.)
- [ ] Setup SSL certificate
- [ ] Configure domain

### 6.2 Frontend Deployment

- [ ] Build production bundle (`npm run build`)
- [ ] Deploy to hosting (Netlify, Vercel, AWS S3, etc.)
- [ ] Configure environment variables
- [ ] Setup custom domain
- [ ] Test production build

### 6.3 Database & Backup

- [ ] Setup automated database backups
- [ ] Create initial data seeds
- [ ] Monitor database performance

### 6.4 Monitoring & Maintenance

- [ ] Setup error logging (Sentry, LogRocket)
- [ ] Monitor server health
- [ ] Setup analytics (Google Analytics)
- [ ] Create admin documentation
- [ ] Create user documentation

---

## Additional Tasks (Optional/Future)

### Enhancement Ideas:

- [ ] Email notifications (new comment, new article)
- [ ] Newsletter subscription
- [ ] Multi-language support (i18n)
- [ ] PWA (Progressive Web App)
- [ ] RSS feed
- [ ] Article tags system
- [ ] Advanced analytics (charts, reports)
- [ ] Image gallery in articles
- [ ] Related articles AI suggestions
- [ ] Article versioning/history
- [ ] Scheduled publishing
- [ ] SEO optimization tools
- [ ] Sitemap generation
- [ ] Social media auto-posting

---

## Current Status: 🔄 Phase 4 - Admin Panel (45-50% Complete)

**Completed:**

- ✅ Phase 1: Project Setup & Database Design
- ✅ Phase 2: Backend API Development
- ✅ Phase 3: Frontend User Area (with Multilingual Support)
- 🔄 Phase 4.1: Admin Layout & Navigation (100%)
- 🔄 Phase 4.2: Admin Dashboard (50%)
- 🔄 Phase 4.3: News Management (100%)
- 🔄 Phase 4.4: Category Management (100%)
- ✅ Phase 4.5: Advertisement Management (100%)
- ✅ Phase 4.6: Video Management (100%)

**In Progress:**

- Phase 4.7: Comment Moderation (0%)
- Phase 4.8: User & Role Management (0%)
- Phase 4.9: Analytics Page (0%)

**Next Step:** Implement Comment Moderation (Phase 4.7)

---

## Development Notes

### Priority Order:

1. Authentication system (critical)
2. News CRUD (core feature)
3. Category management
4. User area views
5. Admin panel
6. Comments & bookmarks
7. Videos & ads
8. Analytics

### Testing Checklist:

- ✅ User can register and login
- ✅ User can view published news
- ✅ User can filter by category
- ✅ User can read full articles
- ✅ User can comment on articles
- ✅ User can bookmark articles
- ✅ Admin can create/edit/delete news
- ✅ Admin can manage categories
- ✅ Admin can manage ads
- ✅ Admin can manage videos
- ✅ Admin can moderate comments
- ✅ Super Admin can manage users
- ✅ Role-based permissions work correctly
- ✅ Dark/light mode works
- ✅ Responsive on mobile

---

## Timeline Estimate

| Phase                          | Duration       | Status            |
| ------------------------------ | -------------- | ----------------- |
| Phase 1: Setup & Database      | 1-2 days       | ✅ Complete       |
| Phase 2: Backend API           | 5-7 days       | ✅ Complete       |
| Phase 3: Frontend User Area    | 6-8 days       | ✅ Complete       |
| Phase 4: Frontend Admin Panel  | 7-10 days      | 🔄 ~50% Complete  |
| Phase 5: Integration & Testing | 3-4 days       | ⏳ Pending        |
| Phase 6: Deployment            | 2-3 days       | ⏳ Pending        |
| **Total**                      | **24-34 days** | **~70% Complete** |

---

## Contact & Support

For questions or issues during development, refer to:

- PROJECT_STRUCTURE.md for architecture details
- README.md for setup instructions
- API documentation for endpoint details
