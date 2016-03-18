const gulp = require('gulp');

const watchTasks = [
    'typescript:watch'
];

gulp.task('watch', 'watch for changes', watchTasks);
