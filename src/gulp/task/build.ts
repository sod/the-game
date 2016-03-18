const gulp = require('gulp');

const buildTasks = [
    'typescript:build',
];

gulp.task('build', 'build project', buildTasks, function() {
}, {
    options: {
        'env=dev': 'development mode: serve original separate files [default]',
        'env=prod': 'production mode: minify and concat everything',
        'no-symfony': 'skip symfony tasks'
    }
});
