;(function() {
    'use strict';
    var source = require('vinyl-source-stream'),
        gulp = require('gulp'),
        gutil = require('gulp-util'),
        browserify = require('browserify'),
        babelify = require('babelify'),
        watchify = require('watchify'),
        notify = require('gulp-notify'),
        browserSync = require('browser-sync'),
        reload = browserSync.reload,
        historyApiFallback = require('connect-history-api-fallback'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin'),
        iconfont = require('gulp-iconfont'),
        runTimestamp = Math.round(Date.now()/1000);

    var config = {
        paths: {
            js: './src/js/*.js',
            css: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                './src/css/*.css'
            ],
            img: [
                './src/img/*',
                './src/img/**/*'
            ],
            fonts:'./src/css/fonts/*',
            distJs: './dist/js',
            distCss: './dist/css/',
            distImg: './dist/img',
            distFonts: './dist/css/fonts',
            appJsPath: './src/routes/routes',
            appJs: 'app'

        }
    };

    gulp.task('fonts', function(){
        return gulp.src(config.paths.fonts)
            .pipe(iconfont({
                fontName: 'myfont', // required
                prependUnicode: true, // recommended option
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
                timestamp: runTimestamp // recommended to get consistent builds when watching files
            }))
            .pipe(gulp.dest(config.paths.distFonts));
    });

    gulp.task('images', function () {
        gulp.src(config.paths.img)
            .pipe(iconfont({
                fontName: 'myfont', // required
                prependUnicode: true, // recommended option
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
                timestamp: runTimestamp // recommended to get consistent builds when watching files
            }))
            .pipe(imagemin({
                progressive: true,
                interlaced: true,
                svgoPlugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            }))
            .pipe(gulp.dest(config.paths.distImg));
    });

    gulp.task('styles',function() {
        // Compiles CSS
        gulp.src(config.paths.css)
            .pipe(concat('bundle.css'))
            .pipe(gulp.dest(config.paths.distCss))
            .pipe(reload({stream:true}))
    });

    /*
     Browser Sync
     */
    gulp.task('browser-sync', function() {
        browserSync({
            // we need to disable clicks and forms for when we test multiple rooms
            server : {},
            middleware : [ historyApiFallback() ],
            ghostMode: false
        });
    });

    function handleErrors() {
        var args = Array.prototype.slice.call(arguments);
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);
        this.emit('end'); // Keep gulp from hanging on this task
    }

    function buildScript(watch) {
        var props = {
            entries: [config.paths.appJsPath],
            debug : true,
            cache: {},
            packageCache: {},
            transform:  [babelify]
        };

        // watchify() if watch requested, otherwise run browserify() once
        var bundler = watch ? watchify(browserify(props)) : browserify(props);

        function rebundle() {
            var stream = bundler.bundle();
            return stream
                .on('error', handleErrors)
                .pipe(source('min.js'))
                .pipe(gulp.dest(config.paths.distJs))
                .pipe(reload({stream:true}))
        }

        // listen for an update and run rebundle
        bundler.on('update', function() {
            rebundle();
            gutil.log('Rebundle...');
        });

        // run it once the first time buildScript is called
        return rebundle();
    }

    gulp.task('scripts', function() {
        return buildScript(false); // this will run once because we set watch to false
    });

// run 'scripts' task first, then watch for future changes
    gulp.task('default', ['styles', 'scripts', 'browser-sync', 'images', 'fonts'], function() {
        return buildScript(true); // browserify watch for JS changes
    });

})();
