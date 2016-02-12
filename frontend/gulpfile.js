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
        concat = require('gulp-concat');

    var config = {
        paths: {
            js: './src/js/*.js',
            css: [
                './src/css/*.css',
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
            ],
            fonts:'',
            distJs: './dist/js',
            distCss: './dist/css/',
            appJsPath: './src/routes/routes',
            appJs: 'app'

        }
    };

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
    gulp.task('default', ['styles','scripts','browser-sync'], function() {
        return buildScript(true); // browserify watch for JS changes
    });

})();
