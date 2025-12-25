import { useAuthStore } from '@/stores/auth';

/**
 * Admin guard middleware
 * Redirects to home if user is not an admin
 */
export function adminGuard(to, from, next) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    // Not authenticated, redirect to login
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else if (!authStore.isAdmin) {
    // Authenticated but not admin, redirect to home
    next({ name: 'home' });
  } else {
    next();
  }
}

/**
 * Super admin guard middleware
 * Redirects to admin dashboard if user is not a super admin
 */
export function superAdminGuard(to, from, next) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else if (!authStore.isSuperAdmin) {
    next({ name: 'admin-dashboard' });
  } else {
    next();
  }
}

export default { adminGuard, superAdminGuard };
