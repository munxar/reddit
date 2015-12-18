///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {linkitRater} from "./linkit-rater";

export default angular
    .module("linkit.rating", [])
    .directive("linkitRater", linkitRater)
;
