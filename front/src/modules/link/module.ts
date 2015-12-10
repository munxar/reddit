///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";

var app = angular.module("linkit.link", [])
.config(function() {})
.run(function() {
    console.info("loaded: %s", app.name)
});
