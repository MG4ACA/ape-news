import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { adminGuard, superAdminGuard } from '@/middleware/adminGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'APE News | Latest News and Updates',
        description: 'Your trusted source for the latest news and updates.',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        title: 'Login | APE News',
        description: 'Sign in to your APE News account',
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {
        title: 'Register | APE News',
        description: 'Create your APE News account',
        guest: true,
      },
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsListView.vue'),
      meta: {
        title: 'All News | APE News',
        description: 'Browse all news articles',
      },
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('../views/NewsDetailView.vue'),
      meta: {
        title: 'Article | APE News',
        description: 'Read full article',
      },
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      meta: {
        title: 'Category | APE News',
        description: 'Browse news by category',
      },
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('../views/VideoGalleryView.vue'),
      meta: {
        title: 'Videos | APE News',
        description: 'Watch our video gallery',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: {
        title: 'Search | APE News',
        description: 'Search news articles',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/UserProfileView.vue'),
      meta: {
        title: 'My Profile | APE News',
        description: 'Manage your profile',
        requiresAuth: true,
      },
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue'),
      meta: {
        title: 'My Bookmarks | APE News',
        description: 'View your saved articles',
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Us | APE News',
        description: 'Learn more about APE News',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us | APE News',
        description: 'Get in touch with us',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
      meta: {
        title: 'Privacy Policy | APE News',
        description: 'Our privacy policy',
      },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue'),
      meta: {
        title: 'Terms of Service | APE News',
        description: 'Our terms of service',
      },
    },
    // Admin Routes
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      beforeEnter: adminGuard,
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
          meta: {
            title: 'Dashboard | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'news',
          name: 'admin-news',
          component: () => import('../views/admin/AdminNewsList.vue'),
          meta: {
            title: 'News Management | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'news/create',
          name: 'admin-news-create',
          component: () => import('../views/admin/AdminNewsCreate.vue'),
          meta: {
            title: 'Create Article | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'news/edit/:id',
          name: 'admin-news-edit',
          component: () => import('../views/admin/AdminNewsEdit.vue'),
          meta: {
            title: 'Edit Article | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('../views/admin/AdminCategories.vue'),
          meta: {
            title: 'Categories | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'comments',
          name: 'admin-comments',
          component: () => import('../views/admin/AdminComments.vue'),
          meta: {
            title: 'Comment Moderation | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'videos',
          name: 'admin-videos',
          component: () => import('../views/admin/AdminVideos.vue'),
          meta: {
            title: 'Video Management | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'ads',
          name: 'admin-ads',
          component: () => import('../views/admin/AdminAds.vue'),
          meta: {
            title: 'Advertisements | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'analytics',
          name: 'admin-analytics',
          component: () => import('../views/admin/AdminAnalytics.vue'),
          meta: {
            title: 'Analytics | Admin Panel',
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/AdminUsers.vue'),
          beforeEnter: superAdminGuard,
          meta: {
            title: 'User Management | Admin Panel',
            requiresAuth: true,
            requiresSuperAdmin: true,
          },
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Update page title and description
  document.title = to.meta.title || 'APE News';
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', to.meta.description || '');
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  // Redirect authenticated users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
