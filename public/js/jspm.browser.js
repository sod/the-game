SystemJS.config({
  baseURL: "/",
  paths: {
    "game/": "public/compiled/",
    "github:*": "public/jspm_packages/github/*"
  }
});
