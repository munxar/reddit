///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "./main.css!";

var app = angular.module("reddit", ["ngMaterial", "ui.router"]);

angular.bootstrap(document, [app.name]);

