import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'APE News';
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', to.meta.description || '');
  }
  next();
});

export default router;
