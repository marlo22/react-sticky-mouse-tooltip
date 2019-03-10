require('dotenv').config();
const MODE = process.env.MODE;

//Modules
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const runSequence = require('gulp-run-sequence');
const del = require('del');
const inject = require('gulp-inject-string');

//Webpack Configs
const webpackDevelopConfig = require('./webpack.development.js');
const webpackProductionConfig = require('./webpack.production.js');

var catalog;

switch(MODE) {
  case 'development':
    catalog = 'build';
    break;

  case 'production':
    catalog = 'dist';
    break;

  default:
    catalog = 'build';
    break;
}

gulp.task('serve', () => {
  browserSync.init({
    server: catalog
  });

  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['scss']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.jsx', ['js']);
});

gulp.task('html', () => {
  if(MODE === 'production') {
    return gulp.src('src/index.html')
      .pipe(inject.after('<!-- CSS -->', '\n\t<link rel="stylesheet" href="css/style.min.css" />'))
      .pipe(inject.after('<!-- JS -->', '\n\t<script src="js/bundle.min.js"><\/script>'))
      .pipe(gulp.dest(`${catalog}`));
  }

  if(MODE === 'development') {
    return gulp.src('src/index.html')
      .pipe(inject.after('<!-- CSS -->', '\n\t<link rel="stylesheet" href="css/style.css" />'))
      .pipe(inject.after('<!-- JS -->', '\n\t<script src="js/bundle.js"><\/script>'))
      .pipe(gulp.dest(`${catalog}`))
      .pipe(browserSync.stream());
  }
});

gulp.task('scss', () => {
  if(MODE === 'development') {
    return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(rename('style.css'))
      .pipe(gulp.dest(`${catalog}/css`))
      .pipe(browserSync.stream());
  }

  if(MODE === 'production') {
    return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(cleanCss())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest(`${catalog}/css`));
  }
});

gulp.task('js', () => {
  if(MODE === 'development') {
    return gulp.src('src/main.jsx')
      .pipe(gulpWebpack(webpackDevelopConfig)).on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe(gulp.dest(`${catalog}/js`))
      .pipe(browserSync.stream());
  }

  if(MODE === 'production') {
    return gulp.src('src/main.jsx')
      .pipe(gulpWebpack(webpackProductionConfig)).on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe(gulp.dest(`${catalog}/js`));
  }
});

gulp.task('clean', () => {
  if(MODE === 'development') {
    return del(['build']);
  }

  if(MODE === 'production') {
    return del(['dist']);
  }
});

gulp.task('development', function(cb) {
  runSequence('clean', ['html', 'scss', 'js'], 'serve', cb);
});

gulp.task('production', function(cb) {
  runSequence('clean', ['html', 'scss', 'js'], cb);
});
