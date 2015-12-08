var gulp = require("gulp");
var ts = require("gulp-typescript");
var mocha = require("gulp-mocha");

var config = {
    back: {
        build: "back:build",
        test: "back:test",
        watch: "back:watch",
        tsFiles: "back/src/**/*.ts",
        outDir: "back/dist",
        testFiles: "back/dist/**/*.test.js",
        tsConfig: {target: "es5", module: "commonjs"},
        testConfig: {}
    }
};

gulp.task(config.back.build, function () {
    return gulp.src(config.back.tsFiles)
        .pipe(ts(config.back.tsConfig))
        .pipe(gulp.dest(config.back.outDir));
});

gulp.task(config.back.test, [config.back.build], function () {
    return gulp.src(config.back.testFiles, {read: false})
        .pipe(mocha(config.back.testConfig))
});

gulp.task(config.back.watch, [config.back.test], function() {
    gulp.watch(config.back.tsFiles, [config.back.test]);
});

gulp.task("watch", [config.back.watch]);

gulp.task("default", [config.back.test]);