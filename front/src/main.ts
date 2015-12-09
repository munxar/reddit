///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "./header/module";
import "./main.css!";

var app = angular.module("reddit", [
    "ngMaterial",
    "ui.router",
    "reddit.header"
]);

angular.bootstrap(document, [app.name]);

