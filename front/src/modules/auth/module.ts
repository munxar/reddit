///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {AuthService} from "./AuthService";
import {config} from "./config";
import {run} from "./run";

angular.module("linkit.auth", [])
    .service("auth", AuthService)
    .config(config)
    .run(run)
;
