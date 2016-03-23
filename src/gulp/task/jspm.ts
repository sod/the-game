import {minify, verbose} from "../env";
import {jspm as config} from '../config';
import {ensureSymlink, Promise, readDir} from '../fs';
import {remove} from '../fs';

const {join: pathJoin} = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');
const watch = require('gulp-watch');
const jspm = require('jspm');

class JspmPackage {
    constructor(public path:string, public name:string) {
    }
}

const validatePathForShell = function(string:string):string {
    if (/[^\w/\.]/.test(string)) {
        throw new Error(`path contains prohibited characters. Mustn't match on /[^\w/\.]/ in '${string}'`);
    }

    return string;
};

const getJspmPackages = function():JspmPackage[] {
    const {map} = jspm.Loader();
    const vendors = Object.keys(map);

    const toRelativeUrl = (lib:string):string =>
        lib.replace(/^(github|npm):/, 'public/jspm_packages/$1/');

    const toJspmPackage = (vendor:string):JspmPackage =>
        new JspmPackage(toRelativeUrl(map[vendor]), vendor);

    return vendors.map(toJspmPackage);
};

const shouldPackageNameExist = function(name: string) {
    const shouldExist = getJspmPackages().map(jspmPackage => jspmPackage.name);
    return shouldExist.indexOf(name) === -1
};

const removeUnknownJspmNames = function(target: string) {
    return readDir(target)
        .catch(error => [])
        .then(actualNames => Promise.all(actualNames
                .filter(shouldPackageNameExist)
                .map(name => remove(pathJoin(target, name)))))
};

gulp.task('jspm:link', function() {
    const linkJspmPackage = function(vendor:JspmPackage):PromiseLike<string> {
        const source = vendor.path;
        const destination = config.link + '/' + vendor.name;
        return ensureSymlink(source, destination).catch(error => {
            if (error.code === 'EEXIST') {
                // EEXIST throws if symlink exists but does not equal source (jspm module was upgraded/downgraded)
                // => retry then
                return remove(destination).then(function() {
                    return ensureSymlink(source, destination);
                });
            }

            return error;
        });
    };

    return removeUnknownJspmNames(config.link)
        .then(() => Promise.all(getJspmPackages().map(linkJspmPackage)));
});

// gulp.task('jspm:build', ['typescript:build'], function(done) {
//     const {source, destination} = config.build;
//     const args = [
//         'bundle',
//         validatePathForShell(source),
//         validatePathForShell(destination)
//     ];
//
//     if (minify) {
//         args.push('--minify', '--no-mangle', '--skip-source-maps');
//     } else {
//         args.push('--source-map-contents');
//     }
//
//     const command = `node node_modules/.bin/jspm` + ' ' + args.join(' ');
//
//     shell.task(command, {
//         quiet: !verbose
//     })(function(error) {
//         if (error) {
//             console.error(error.message);
//             console.error(error.stderr);
//         }
//         done();
//     });
// });

gulp.task('jspm:watch', function() {
    return watch(config.watch, {verbose: true}, function() {
        gulp.start('jspm:build');
    });
});
