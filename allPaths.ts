const DASHBOARD = "/dashboard";
const PROFILE = "/profile";

const protectedPaths = [DASHBOARD, PROFILE];

const allPaths = {
  DASHBOARD,
  HOME: "/",
  LOGIN: "/login",
  PROFILE,
  SETTINGS: "/settings",
  TECH: "/tech",
};

export {protectedPaths, allPaths};
