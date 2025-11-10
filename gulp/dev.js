const gulp = require('gulp')
// HTML
const fileInclude = require('gulp-file-include')
// SASS
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
// const webpack = require('webpack-stream')
// const babel = require('gulp-babel')
// const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const browserSync = require('browser-sync').create()

const gulpPrettier = require('gulp-prettier').default

gulp.task('clean:dev', function (done) {
   if (fs.existsSync('./build/')) {
      return gulp.src('./build/', { read: false }).pipe(clean({ force: true }))
   }
   done()
})
const configJson = JSON.parse(fs.readFileSync('gulp/config.json'))
const fileIncludeSetting = {
   prefix: '@@',
   basepath: '@file',
   context: configJson,
}

const plumberNotify = (title) => {
   return {
      errorHandler: notify.onError({
         title: title,
         message: 'Error <%= error.message %>',
         sound: false,
      }),
   }
}

gulp.task('html:dev', function () {
   return gulp
      .src('./src/html/*.html')
      .pipe(changed('./build/', { hasChanged: changed.compareContents }))
      .pipe(plumber(plumberNotify('HTML')))
      .pipe(fileInclude(fileIncludeSetting))
      .pipe(gulpPrettier())
      .pipe(gulp.dest('./build/'))
})

gulp.task('sass:dev', function () {
   return gulp
      .src('./src/scss/*.scss')
      .pipe(changed('./build/css/'))
      .pipe(plumber(plumberNotify('SCSS')))
      .pipe(sourceMaps.init())
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(
         autoprefixer({
            overrideBrowserslist: ['last 12 versions'],
            cascade: false,
         }),
      )
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./build/css/'))
})

gulp.task('images:dev', function () {
   return (
      gulp
         .src('./src/assets/**/*')
         .pipe(changed('./build/assets/'))
         // .pipe(imagemin({ verbose: true }))
         .pipe(gulp.dest('./build/assets/'))
   )
})

gulp.task('fonts:dev', function () {
   return gulp.src('./src/fonts/**/*').pipe(changed('./build/fonts/')).pipe(gulp.dest('./build/fonts/'))
})

gulp.task('files:dev', function () {
   return gulp.src('./src/files/**/*').pipe(changed('./build/files/')).pipe(gulp.dest('./build/files/'))
})

gulp.task('js:dev', function () {
   return (
      gulp
         .src(['./src/js/*.js'])
         .pipe(changed('./build/js/'))
         .pipe(plumber(plumberNotify('JS')))
         // .pipe(babel())
         // .pipe(webpack(require('./../webpack.config.js')))
         .pipe(gulpPrettier())
         .pipe(gulp.dest('./build/js/'))
   )
})

gulp.task('json:dev', function () {
   return gulp
      .src(['./src/js/*.json', './src/js/*/*.json'])
      .pipe(changed('./build/js/'))
      .pipe(changed('./build/js/data/'))
      .pipe(plumberNotify('JSON'))
      .pipe(gulp.dest('./build/js/'))
      .pipe(gulp.dest('./build/js/data/'))
})

gulp.task('server:dev', function (done) {
   browserSync.init({
      server: {
         baseDir: './build/',
      },
      port: 3000,
      open: true,
      notify: false,
   })
   done()
})

gulp.task('watch:dev', function () {
   gulp.watch('./src/scss/**/*.scss', gulp.series('sass:dev')).on('change', browserSync.reload)
   gulp.watch('./src/html/**/*.html', gulp.series('html:dev')).on('change', browserSync.reload)
   gulp.watch('./src/assets/**/*', gulp.series('images:dev')).on('change', browserSync.reload)
   gulp.watch('./src/fonts/**/*', gulp.series('fonts:dev')).on('change', browserSync.reload)
   gulp.watch('./src/files/**/*', gulp.series('files:dev')).on('change', browserSync.reload)
   gulp.watch('./src/js/**/*.js', gulp.series('js:dev')).on('change', browserSync.reload)
   gulp.watch('./src/js/**/*.json', gulp.series('json:dev')).on('change', browserSync.reload)
})
