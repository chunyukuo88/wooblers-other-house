const DASHBOARD = "/dashboard";
const PROFILE = "/profile";
const EMAIL_API_ROUTE = "/api/send-email";

const protectedPaths = [DASHBOARD, PROFILE, EMAIL_API_ROUTE];

const allPaths = {
  BREAD: "/bread",
  DASHBOARD,
  EMAIL_API_ROUTE,
  HOME: "/",
  LOGIN: "/login",
  PROFILE,
  COLORS: "/colors",
  TECH: "/tech",
};

export {protectedPaths, allPaths};
