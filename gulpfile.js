require('ts-node').register({
    disableWarnings: true
});

var tasks = [
    'help',
    'typescript',
    'build',
    'watch'
];

tasks.forEach(function (filename) {
    require('./src/gulp/task/' + filename + '.ts');
});
