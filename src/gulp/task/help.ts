import {environment} from '../env'

const {log, colors} = require('gulp-util');
const help = require('gulp-help');
const gulp = require('gulp');

help(gulp, {
    hideEmpty: true,
    hideDepsMessage: true,
    description: ''
});

log('Environment', colors.magenta(environment));
