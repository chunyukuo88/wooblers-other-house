const DASHBOARD = "/dashboard";
const PROFILE = "/profile";
const SETTINGS = "/settings";

const protectedPaths = [DASHBOARD, PROFILE, SETTINGS];

const allPaths = {
  DASHBOARD,
  HOME: "/",
  LOGIN: "/login",
  PROFILE,
  SETTINGS,
};

export {protectedPaths, allPaths};
