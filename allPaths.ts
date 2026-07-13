const DASHBOARD = '/dashboard';
const PROFILE = '/profile';
const EMAIL_API_ROUTE = '/api/send-email';

// These are not agents of change. The actual protected paths are
// made effective in <root>/proxy.ts, specifically in the config object.
const protectedPaths = [DASHBOARD, PROFILE, EMAIL_API_ROUTE];

const allPaths = {
  DASHBOARD,
  EMAIL_API_ROUTE,
  HOME: '/',
  LOGIN: '/login',
  PROFILE,
  COLORS: '/colors',
  TECH: '/tech',
};

export { protectedPaths, allPaths };
