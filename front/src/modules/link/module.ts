///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {config} from "./config";

angular
    .module("linkit.link", [])
    .config(config)
;
