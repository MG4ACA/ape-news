import { useAuthStore } from '@/stores/auth';

/**
 * Authentication guard middleware
 * Redirects to login if user is not authenticated
 */
export function authGuard(to, from, next) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    // Redirect to login with return URL
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

export default authGuard;
