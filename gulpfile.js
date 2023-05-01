var gulp = require('gulp');

var merge = require('gulp-merge');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var ejs = require("gulp-ejs");
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var uglify = require("gulp-uglify");
var spritesmith = require('gulp.spritesmith');
var reload = browserSync.reload;

// 定义css 兼容前缀
var autoprefixerOpt = {
	browsers: ['IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1', '> 10%']
}

gulp.task('cleanBuild', function() {
	return gulp.src('./build')
		.pipe(plumber({
			errorHandler: notify.onError("cleanBuild 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(clean())
		.pipe(notify("cleanBuild 任务执行成功!clean文件: <%= file.relative %>"));
});

gulp.task('libsClean', function() {
	return gulp.src('./target/libs')
		.pipe(plumber({
			errorHandler: notify.onError("libsClean 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(clean())
		.pipe(notify("libsClean 任务执行成功!clean文件: <%= file.relative %>"));
});

gulp.task('icon', function() {
	var spriteData = gulp.src('./target/sprites/icon/*.png')
		.pipe(spritesmith({
			algorithm: 'binary-tree',
			cssFormat: 'less',
			cssTemplate: './target/sprites/template/spice-less.template.handlebars',
			padding: 6,
			retinaSrcFilter: ['./target/sprites/icon/*@2x.png'],
			imgName: 'icon.png',
			retinaImgName: 'icon@2x.png',
			cssName: 'sprites.less'
		}));

	var imgStream = spriteData.img
		.pipe(plumber({
			errorHandler: notify.onError("icon-img 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./target/images/'))
		.pipe(notify("icon-img 任务执行成功!生成文件: <%= file.relative %>"));

	var cssStream = spriteData.css
		.pipe(plumber({
			errorHandler: notify.onError("icon-css 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./target/sprites/style/'))
		.pipe(notify("icon-css 任务执行成功!生成文件: <%= file.relative %>"));

	return merge(imgStream, cssStream)
});

gulp.task('html', function() {
	return gulp.src('./target/*.html')
		.pipe(plumber({
			errorHandler: notify.onError("html 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(ejs())
		.pipe(gulp.dest("./build"));
		// .pipe(notify("html 任务执行成功!生成文件: <%= file.relative %>"));
});
gulp.task('pagingHtml', function() {
	return gulp.src('./target/paging/*.html')
		.pipe(plumber({
			errorHandler: notify.onError("html 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(ejs())
		.pipe(gulp.dest("./build/paging"));
		// .pipe(notify("html 任务执行成功!生成文件: <%= file.relative %>"));
});
gulp.task('guidelineHtml', function() {
	return gulp.src('./target/guideline/guideline.html')
		.pipe(plumber({
			errorHandler: notify.onError("guideline html 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(ejs())
		.pipe(gulp.dest("./build/guideline/"));
		// .pipe(notify("guideline html 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('css', function() {
	return gulp.src('./target/css/*.less')
		.pipe(plumber({
			errorHandler: notify.onError("css 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(less())
		.pipe(autoprefixer(autoprefixerOpt))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(reload({
			stream: true
		}));
		// .pipe(notify("css 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('guidelineCss', function() {
	return gulp.src('./target/guideline/guideline.less')
		.pipe(plumber({
			errorHandler: notify.onError("guideline css 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(less())
		.pipe(autoprefixer(autoprefixerOpt))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./build/guideline/'))
		.pipe(reload({
			stream: true
		}));
		// .pipe(notify("guideline css 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('js', function() {
	return gulp.src('./target/js/*.js')
		.pipe(plumber({
			errorHandler: notify.onError("js 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/js'));
		// .pipe(notify("js 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('guidelineJs', function() {
	return gulp.src('./target/guideline/guideline.js')
		.pipe(plumber({
			errorHandler: notify.onError("guideline js 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/guideline/'));
		// .pipe(notify("guideline js 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('copyFonts', function() {
	return gulp.src('./target/fonts/**/*')
		.pipe(plumber({
			errorHandler: notify.onError("fonts 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/fonts'));
		// .pipe(notify("fonts 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('copyImg', function() {
	return gulp.src('./target/images/**/*')
		.pipe(plumber({
			errorHandler: notify.onError("img 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/images'));
		// .pipe(notify("img 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('copyMail', function() {
	return gulp.src('./target/mailtemplate/*')
		.pipe(plumber({
			errorHandler: notify.onError("img 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/mailtemplate'));
		// .pipe(notify("img 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('copyLibs', function() {
	return gulp.src('./target/libs/**/*')
		.pipe(plumber({
			errorHandler: notify.onError("copyLibs 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/libs'));
		// .pipe(notify("copyLibs 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('libsJs', function() {
	return gulp.src('./libs/**/*.js')
		.pipe(plumber({
			errorHandler: notify.onError("libsJs 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./target/libs'));
		// .pipe(notify("libsJs 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('libsCss', function() {
	return gulp.src('./libs/**/*.css')
		.pipe(plumber({
			errorHandler: notify.onError("libsCss 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./target/libs'));
		// .pipe(notify("libsCss 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('copyLibsOther', function() {
	return gulp.src(['./libs/**/*', '!./libs/**/*.js', '!./libs/**/*.css'])
		.pipe(plumber({
			errorHandler: notify.onError("copyLibsOther 任务执行失败! Error: <%= error.message %>")
		}))
		.pipe(gulp.dest('./target/libs'));
		// .pipe(notify("copyLibsOther 任务执行成功!生成文件: <%= file.relative %>"));
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: [
				'./build',
				'./html',
				'./target',
				'./static',
				'./'
			]
		},
		port: 3333,
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		},
		open: false,
		notify: false
	});

	gulp.watch(['target/sprites/icon/*.png', '!target/sprites/icon/*副本.png'], ['icon']).on('change', reload);
	gulp.watch('target/sprites/style/sprites.less', ['copyImg', 'css']).on('change', function() {
		console.log('图标less 生成了');
	});

	gulp.watch(['target/**/*.html', '!target/**/*副本.html'], ['html']).on('change', reload);
	gulp.watch('target/guideline/guideline.html', ['guidelineHtml']).on('change', reload);
	gulp.watch(['./target/paging/*.html'], ['pagingHtml']).on('change', reload);
	
	gulp.watch(['target/css/**/*.less', '!target/css/**/*副本.less'], ['css']);
	gulp.watch('target/guideline/guideline.less', ['guidelineCss']);

	gulp.watch(['target/js/*.js', '!target/js/*副本.js'], ['js']).on('change', reload);
	gulp.watch('target/guideline/guideline.js', ['guidelineJs']).on('change', reload);

	gulp.watch(['target/fonts/**/*'], ['copyFonts']).on('change', reload);

	gulp.watch(['target/images/*', '!target/images/*副本.*'], ['copyImg']).on('change', reload);

	gulp.watch(['target/mailtemplate/*.html', '!target/mailtemplate/*副本.html'], ['copyMail']).on('change', reload);
});


gulp.task('default', ['cleanBuild'], function() {
	gulp.start([
		'icon',
		'html',
		'guidelineHtml',
		'pagingHtml',
		'css',
		'guidelineCss',
		'js',
		'guidelineJs',
		'copyFonts',
		'copyImg',
		'copyMail',
		'copyLibs',
		'serve'
	], function() {
		console.log('项目启动成功！');
	});
});

gulp.task('libs', ['libsClean'], function() {
	gulp.start(['copyLibsOther', 'libsJs', 'libsCss'], function() {
		console.log('libs 已更新！');
	});
});
