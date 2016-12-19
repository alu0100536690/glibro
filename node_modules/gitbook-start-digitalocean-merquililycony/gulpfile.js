/*
* Dependencias
*/
var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs-extra');
//var hero = require("gitbook-start-heroku-merquililycony");


gulp.task('paquete-ocean', function(){
    var ocean = require("gitbook-start-digitalocean-merquililycony");
})
