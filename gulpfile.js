var gulp = require("gulp");
var ts = require("gulp-typescript");
var mocha = require("gulp-mocha");

var config = {
    back: {
        build: "back:build",
        test: "back:test",
        files: "back/src/**/*.ts",
        outDir: "back/dist",
        testFiles: "back/dist/**/*.test.js",
        tsConfig: {target: "es5", module: "commonjs"},
        testConfig: {}
    }
};

gulp.task(config.back.build, function () {
    return gulp.src(config.back.files)
        .pipe(ts(config.back.tsConfig))
        .pipe(gulp.dest(config.back.outDir));
});

gulp.task(config.back.test, [config.back.build], function () {
    return gulp.src(config.back.testFiles, {read: false})
        .pipe(mocha(config.back.testConfig))
});

gulp.task("default", [config.back.test]);