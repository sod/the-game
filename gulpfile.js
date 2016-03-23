require('ts-node').register({
    disableWarnings: true
});

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
