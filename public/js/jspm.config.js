SystemJS.config({
  packages: {
    'game': {
      'format': 'cjs',
      'main': 'frontend.js',
      'defaultExtension': 'js'
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    'github:*/*.json'
  ],
  map: {
    'phaser': 'github:photonstorm/phaser@2.4.6'
  },
  packages: {}
});
