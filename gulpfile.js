const gulp = require("gulp")
const concat = require("gulp-concat")
const terser = require("gulp-terser")
const sourcemaps = require("gulp-sourcemaps")
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")
const {src, sories, parallel, dest, watch} = require("gulp")
const jsPath = "static/js/*.js"
const cssPath = "static/css/*.css"

function jsMinify() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat("all.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("static/js"))
}

function cssMinify() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat("style_min.css"))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("static/css"))
}

exports.jsMinify = jsMinify
exports.cssMinify = cssMinify