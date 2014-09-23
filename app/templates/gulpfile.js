'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

// build start
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({style: 'expanded'}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', function () {
    return gulp.src('app/partials/**/*.html')
    .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe($.ngHtml2js({
        moduleName: 'app',
        prefix: 'partials/'
    }))
    .pipe(gulp.dest('.tmp/partials'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
        read: false,
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        addPrefix: '../'
    }))
    .pipe($.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['html', 'partials', 'images', 'fonts']);
// build end

// server start


var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://server/context/'; // The location of your backend
var proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

function proxyMiddleware(req, res, next) {
    if (req.url.indexOf(proxyApiPrefix) !== -1) {
        proxy.web(req, res);
    } else {
        next();
    }
}

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    browserSync.instance = browserSync.init(files, {
        startPath: '/index.html',
        server: {
            baseDir: baseDir,
            middleware: proxyMiddleware
        },
        browser: browser
    });

}

gulp.task('serve', ['watch'], function () {
    browserSyncInit([
        'app',
        '.tmp'
    ], [
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/partials/**/*.html',
        'app/images/**/*'
    ]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit('dist');
});

gulp.task('serve:e2e', function () {
    browserSyncInit(['app', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function () {
    browserSyncInit('dist', null, []);
});
// serve end

// watch start
gulp.task('watch', ['wiredep', 'styles'] ,function () {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
// watch end

// wireapp start
// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
    .pipe(wiredep({
        directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
    .pipe(wiredep({
        directory: 'app/bower_components',
        exclude: []
    }))
    .pipe(gulp.dest('app'));
});
// wireapp end

// unit test start
var wiredep = require('wiredep');

gulp.task('test', function() {
    var bowerDeps = wiredep({
        directory: 'app/bower_components',
        exclude: ['bootstrap-sass-official'],
        dependencies: true,
        devDependencies: true
    });

    var testFiles = bowerDeps.js.concat([
        'app/vendor/**/*.js',
        'app/scripts/**/*.js',
        'test/unit/**/*.js'
    ]);

    return gulp.src(testFiles)
    .pipe($.karma({
        configFile: 'test/karma.conf.js',
        action: 'run'
    }))
    .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
    });
});
// unit test end
// e2e test start
var browserSync = require('browser-sync');

// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

gulp.task('protractor-only', ['webdriver-update', 'wiredep'], function (done) {
    var testFiles = [
        'test/e2e/**/*.js'
    ];

    gulp.src(testFiles)
    .pipe($.protractor.protractor({
        configFile: 'test/protractor.conf.js',
    }))
    .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
    })
    .on('end', function () {
        // Close browser sync server
        browserSync.exit();
        done();
    });
});

gulp.task('protractor', ['serve:e2e', 'protractor-only']);
gulp.task('protractor:src', ['serve:e2e', 'protractor-only']);
gulp.task('protractor:dist', ['serve:e2e-dist', 'protractor-only']);
// e2e test end

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

