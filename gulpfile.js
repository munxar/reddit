var gulp = require("gulp");
var ts = require("gulp-typescript");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

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

gulp.task("pre-test", [config.back.build], function () {
    return gulp.src(["back/dist/**/*.js"])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task(config.back.test, ["pre-test"], function () {
    return gulp.src(config.back.testFiles, {read: false})
        .pipe(mocha(config.back.testConfig))
        .pipe(istanbul.writeReports().on("error", handleError))
        .on("error", handleError);
});

// error handler for watching with gulp-mocha
function handleError(err) {
    // report error
    console.error(err.toString());
    // emit end to make gulp.watch work
    this.emit("end");
}

gulp.task(config.back.watch, [config.back.test], function () {
    gulp.watch(config.back.tsFiles, [config.back.test]);
});

gulp.task("watch", [config.back.watch]);

gulp.task("default", [config.back.test]);