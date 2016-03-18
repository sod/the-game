SystemJS.config({
  packages: {
    game: {
      format: 'cjs',
      main: 'frontend.js',
      defaultExtension: 'js'
    }
  }
});

SystemJS.config({
  packageConfigPaths: []
});
