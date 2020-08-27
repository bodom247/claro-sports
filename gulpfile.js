/* Dependencias */
var gulp    = require('gulp'),
	server = require('gulp-server-livereload'),
	pug = require('gulp-pug'),
	compass = require('gulp-compass'),
	coffee = require('gulp-coffee'),
	gutil   = require('gulp-util'),
	uglify  = require('gulp-uglify'),
	watch   = require('gulp-watch'),
	notify  = require('gulp-notify')
	concat  = require('gulp-concat');
	cssmin = require('gulp-cssmin');

/* Configuración del 'server' */
gulp.task('webserver', function(){
	gulp.src('./dist')
	.pipe(server({
		path: './dist',
		directoryListing: false,
		port: 3000,
		// open: true,
		livereload:{
			enable: true,
			port: 3010
		}
	}));
});

/* Configuración de la tarea 'pug' */
gulp.task('pug', function(){
	var YOUR_LOCALS = {};
	gulp.src('./src/pug/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./dist/'))
});

/* Configuración de la tarea 'compass' */
gulp.task('compass', function(){
	gulp.src('./src/sass/**/*.*')
	.pipe(compass({
		config_file: './src/config.rb',
		css: 'src/css-js/compiled',
		sass: 'src/sass',
		scss: 'src/scss'
	}))
	.on('error', function(error){
		console.log(error);
	})
	.pipe(gulp.dest('src/css-js/compiled'));
});
 
/* Configuración de la tarea 'coffee' */
gulp.task('coffee', function(){
	gulp.src('./src/coffee/**/*.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('src/css-js/compiled'))
});

/* Configuración de la tarea 'pug:watch' */
gulp.task('pug:watch', function(){
	gulp.watch('./src/pug/**/*.pug', ['pug']);
});

/* Configuración de la tarea 'compass:watch' */
gulp.task('compass:watch', function(){
	gulp.watch('./src/sass/**/*.sass', ['compass']);
});

/* Configuración de la tarea 'coffee:watch' */
gulp.task('coffee:watch', function(){
	gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
});

gulp.task('watch:js', function () {
    return watch(['src/css-js/external/**/*.js', 'src/css-js/compiled/core.js', 'src/css-js/contactos.js'], function () {
        gulp.src(['src/css-js/external/**/*.js', 'src/css-js/compiled/core.js', 'src/css-js/contactos.js'])
		.pipe(concat("core.js"))
		.pipe(uglify({keepSpecialComments : 0}))
		.pipe(gulp.dest('./dist/js/'));
    });
});

gulp.task('watch:css', function () {
    return watch(['src/css-js/fonts.css', 'src/css-js/external/**/*.css', 'src/css-js/compiled/*.css'], function () {
        gulp.src(['src/css-js/fonts.css', 'src/css-js/external/**/*.css', 'src/css-js/compiled/*.css'])
    	.pipe(concat("styles.css"))
    	.pipe(cssmin({keepSpecialComments : 0}))
        .pipe(gulp.dest('./dist/css/'));
    });
});

gulp.task('compile', ['pug:watch','compass:watch','coffee:watch','webserver','watch:css', 'watch:js']);