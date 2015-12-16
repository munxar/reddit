///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {AuthService} from "./AuthService";
import {config} from "./config";
import {run} from "./run";
import core from "../core/module";

export default angular
    .module("linkit.auth", [
        core.name
    ])
    .service("auth", AuthService)
    .config(config)
    .run(run)
;
