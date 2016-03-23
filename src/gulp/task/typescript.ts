import {pipeIfNotMinify} from "../env";
import {typescript as config} from '../config';
import {remove} from '../fs';

const {join: pathJoin} = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const build = function(source: string|string[], destination: string, base: string, project) {
    return gulp.src(source, {base})
        .pipe(plumber())
        .pipe(pipeIfNotMinify(() => sourcemaps.init()))
        .pipe(typescript(project))
        .pipe(pipeIfNotMinify(() => sourcemaps.write('./maps')))
        .pipe(gulp.dest(destination));
};

const removeCompiledFile = function(file: string, destination: string) {
    const file = pathJoin(destination, file.replace(/\.ts$/, '.js'));
    return remove(file);
};

const createProject = function(compilerdefaults: {}, compileroverrides: {isolatedModules?: boolean} = {}) {
    const options = {};
    Object.keys(compilerdefaults).forEach(function(key) {
        options[key] = compileroverrides[key] || compilerdefaults[key];
    });
    return typescript.createProject(options);
};

gulp.task('typescript:clean', function() {
    return Promise.all(<PromiseLike[]>config.clean.map(glob => remove(glob)));
});

gulp.task('typescript:build', ['typescript:clean', 'jspm:link'], function() {
    const {source, destination, base, compileroptions, typedefFile} = config.build;
    const project = createProject(compileroptions);

    return build([typedefFile].concat(source), destination, base, project);
});

gulp.task('typescript:lint', function() {
    const {source, base, compileroptions, typedefFile} = config.build;
    const lintProject = createProject(compileroptions);

    return gulp.src([typedefFile].concat(source), {base})
        .pipe(plumber())
        .pipe(typescript(lintProject))
        .pipe(plumber.stop())
});

gulp.task('typescript:watch', function() {
    const {destination, base, compileroptions, typedefFile} = config.build;

    return watch(config.watch, {verbose: true}, function(vinyl) {
        if (vinyl.event == 'unlink') {
            return removeCompiledFile(vinyl.relative, destination);
        }

        const project = createProject(compileroptions, {
            isolatedModules: true
        });

        gulp.start('typescript:lint');
        return build([typedefFile, vinyl.path], destination, base, project);
    });
});
