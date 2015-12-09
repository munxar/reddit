///<reference path="../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {header} from "./directive";

angular.module("reddit.header", [])
    .directive("redditHeader", header)
;
