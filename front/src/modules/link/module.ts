///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {config} from "./config";
import core from "../core/module";

export default angular
    .module("linkit.link", [
        core.name
    ])
    .config(config)
;
