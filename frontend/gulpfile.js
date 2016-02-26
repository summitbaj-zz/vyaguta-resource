;(function () {
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
        runTimestamp = Math.round(Date.now() / 1000),
        uglify = require('gulp-uglify'),
        buffer = require('vinyl-buffer'),
        envify = require('envify/custom'),
        gulpif = require('gulp-if'),
        minifyCss = require('gulp-minify-css'),
        eslint = require('gulp-eslint'),
        inject = require('gulp-inject');

    var config = {
        paths: {
            js: './src/js/*.js',
            css: [
                './src/css/import.css',
                './src/css/bootstrap.min.css',
                './src/css/forms.css',
                './src/css/main.css',
                './src/css/custom.css',
                './src/css/font-awesome.css',
                './src/css/glyphicons.css',
                'node_modules/toastr/build/toastr.css',
                'node_modules/react-datepicker/dist/react-datepicker.css'
            ],
            img: [
                './src/img/*',
                './src/img/**/*'
            ],
            fonts: './src/css/fonts/*',
            distJs: './dist/js',
            distCss: './dist/css',
            distImg: './dist/img',
            distFonts: './dist/css/fonts',
            appJsPath: './src/js/routes',
            appJs: './src/js/main',
            customUI: [
                './src/custom-ui/bootstrap.js'
            ],
            html: './index.html'
        },
        env:{
            development: 'development'
        }
    };

    var env = process.env.NODE_ENV || config.env.development;
    var isProduction = process.env.NODE_ENV === 'production';

    gulp.task('fonts', function () {
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
            .pipe(gulpif(isProduction,imagemin({
                progressive: true,
                interlaced: true,
                svgoPlugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })))
            .pipe(gulp.dest(config.paths.distImg));
    });

    gulp.task('styles', function () {
        // Compiles CSS
        gulp.src(config.paths.css)
            .pipe(concat('bundle.css'))
            .pipe(gulpif(isProduction,minifyCss()))
            .pipe(gulp.dest(config.paths.distCss))
            .pipe(reload({stream: true}))
    });

    gulp.task('custom_ui', function () {
        // Compiles CSS
        gulp.src(config.paths.customUI)
            .pipe(concat('vyaguta-custom.min.js'))
            .pipe(gulp.dest(config.paths.distJs))
            .pipe(reload({stream: true}))
    });

    /*
     Browser Sync
     */
    gulp.task('browser-sync', function () {
        browserSync({
            // we need to disable clicks and forms for when we test multiple rooms
            server: {
                baseDir: 'dist'
            },
            middleware: [historyApiFallback()],
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
            entries: [config.paths.appJs],
            debug: env=== config.env.development,
            cache: {},
            packageCache: {},
            transform: [babelify]
        };

        // watchify() if watch requested, otherwise run browserify() once
        var bundler = watch ? watchify(browserify(props)) : browserify(props);

        function rebundle() {
            var stream = bundler
                .transform(envify({
                    NODE_ENV: env
                }))
                .bundle();
            return stream
                .on('error', handleErrors)
                .pipe(source('vyaguta.min.js'))
                .pipe(buffer())
                .pipe(gulpif(isProduction,uglify()).on('error', gutil.log))
                .pipe(gulp.dest(config.paths.distJs))
                .pipe(reload({stream: true}))
        }

        // listen for an update and run rebundle
        bundler.on('update', function () {
            rebundle();
            gutil.log('Rebundle...');
        });

        // run it once the first time buildScript is called
        return rebundle();
    }

    gulp.task('scripts', function () {
        return buildScript(false);
    });

    gulp.task('html', function(){
        var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
        gulp.src('./index.html')
            .pipe(inject(sources, {ignorePath: 'dist'}))
            .pipe(gulp.dest('./dist'))
    });

    gulp.task('watch', function(){
        gulp.watch(config.paths.css, ['styles']); // gulp watch for css changes
        return buildScript(true); // browserify watch for JS changes
    });

    gulp.task('default', [
        'styles',
        'scripts',
        'browser-sync',
        'images',
        'fonts',
        'custom_ui',
        'watch',
        'html'
    ]
    );

    gulp.task('build',[
        'styles',
        'scripts',
        'images',
        'fonts',
        'custom_ui',
        'html'
        ])

})();
