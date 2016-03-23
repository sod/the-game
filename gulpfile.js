require('./src/shared/ts-register');

var tasks = [
    'help',
    'typescript',
    'jspm',
    'build',
    'watch'
];

tasks.forEach(function (filename) {
    require('./src/gulp/task/' + filename + '.ts');
});
