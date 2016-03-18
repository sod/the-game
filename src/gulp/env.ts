interface Argv {
    _: string[];
    env: string;
    verbose: boolean;
}

const noop:any = require('gulp-util').noop;

const DEV:string = 'dev';
const PROD:string = 'prod';

const createGulpIf = (condition:boolean) =>
    (streamProvider:Function):NodeJS.WritableStream =>
        condition ? streamProvider() : noop();

const argv:Argv = require('gulp-util').env;

export const environment:string = argv.env == PROD ? PROD : DEV;
export const development:boolean = environment === DEV;
export const production:boolean = environment === PROD;
export const watch:boolean = argv._.indexOf('watch') !== -1;
export const verbose:boolean = argv.verbose;
export const minify:boolean = production;
export const pipeIfMinify = createGulpIf(minify);
export const pipeIfNotMinify = createGulpIf(!minify);
