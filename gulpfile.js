var gulp = require("gulp");
var ts = require("gulp-typescript");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var KarmaServer = require("karma").Server;

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
    },
    front: {
        build: "front:build",
        watch: "front:watch",
        tsFiles: "front/src/**/*.ts",
        outDir: "front/dist",
        tsConfig: {target: "es5", module: "commonjs"}
    }
};

gulp.task(config.back.build, function () {
    return gulp.src(config.back.tsFiles)
        .pipe(ts(config.back.tsConfig))
        .pipe(gulp.dest(config.back.outDir));
});

gulp.task(config.front.build, ["build:html", "build:scss"], function () {
    return gulp.src(config.front.tsFiles)
        .pipe(ts(config.front.tsConfig))
        .pipe(gulp.dest(config.front.outDir));
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
        .pipe(istanbul.writeReports())
        .on("error", handleError);
});

// error handler for watching with gulp-mocha
function handleError(err) {
    // report error
    console.error(err.toString());
    // emit end to make gulp.watch work
    this.emit("end");
}

gulp.task(config.back.watch, [config.back.build], function () {
    gulp.watch(config.back.tsFiles, [config.back.build]);
});

gulp.task("build:html", function() {
    gulp.src("front/src/**/*.html")
        .pipe(gulp.dest("front/dist"))
});

gulp.task("build:scss", function() {
    return gulp.src("front/src/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("front/dist"));
});

gulp.task(config.front.watch, [config.front.build], function () {
    gulp.watch(config.front.tsFiles, [config.front.build, function() { browserSync.reload();}]);
    gulp.watch("front/src/**/*.html", ["build:html", function() { browserSync.reload(); }]);
    gulp.watch("front/src/**/*.scss", ["build:scss", function() { browserSync.reload(); }]);
});

gulp.task("watch", [config.back.watch, config.front.watch], function() {
    nodemon({
        script: "back/dist/main",
        watch: "back/dist/**/*.js"
    });
});

gulp.task("front:test", function(done) {
    new KarmaServer({
        configFile: __dirname + "/karma.conf.js"
    }, done).start();
});

gulp.task("serve", ["watch"], function() {
    setTimeout(function() {
        browserSync.init({
            proxy: "localhost:3000",
            port: 4000
        });
    }, 1000);
});

gulp.task("default", [config.back.test, config.front.build]);
