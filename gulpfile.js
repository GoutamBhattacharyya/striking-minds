var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');
var injectPartials = require('gulp-inject-partials');
var newer = require ('gulp-newer');
var imgMin = require ('gulp-imagemin');

var SOURCEPATHS = {
    sassSource : 'src/scss/*.scss',
    sassApp: 'src/scss/app.scss',
    htmlSource : 'src/*.html',
    htmlPartialsSource: 'src/partials/*.html',
    jsSource : 'src/js/*.js',
    imgSource : 'src/images/**'
};

var APPPATH = {
    root : 'app/',
    css : 'app/css',
    js : 'app/js',
    fonts: 'app/fonts',
    img : 'app/images'
};

gulp.task('clean-html', function(){
    return gulp.src(APPPATH.root + '/*html', {read: false, force: true})
        .pipe(clean());
});
gulp.task('clean-scripts', function(){
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});
gulp.task('sass',function(){
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles;
    sassFiles =  gulp.src(SOURCEPATHS.sassApp)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        return merge(sassFiles, bootstrapCSS)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('images', function(){
    return gulp.src(SOURCEPATHS.imgSource)
        .pipe(newer(APPPATH.img))
        .pipe(imgMin())
        .pipe(gulp.dest(APPPATH.img));
})
gulp.task('moveFonts', function(){
    gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(APPPATH.fonts));
});
gulp.task('html', function(){
    return gulp.src(SOURCEPATHS.htmlSource)
        .pipe(injectPartials())
        .pipe(gulp.dest(APPPATH.root));
});
/*
gulp.task('copy',['clean-html'],function(){
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
});
*/
gulp.task('scripts',['clean-scripts'],function(){
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(APPPATH.js));
});
gulp.task('serve', ['sass'], function(){
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*html', APPPATH.js + '/*.js'],{
        server: {
            baseDir : APPPATH.root
        }
    });
});

gulp.task('watch', ['serve','sass', 'clean-html', 'scripts', 'clean-scripts','moveFonts', 'images', 'html'],function(){
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
    //gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
    gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
    gulp.watch([SOURCEPATHS.imgSource], ['images']);
    gulp.watch([SOURCEPATHS.htmlSource, SOURCEPATHS.htmlPartialsSource], ['html']);
});

gulp.task('default', ['watch']);