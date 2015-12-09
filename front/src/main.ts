///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";

var app = angular.module("reddit", ["ngMaterial"]);

angular.bootstrap(document, [app.name]);

