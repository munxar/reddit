///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-ui-router";
import {config} from "./config";
import core from "../core/module";
import {LinkService} from "./LinkService";

export default angular
    .module("linkit.link", [
        "ui.router",
        core.name
    ])
    .service("link", LinkService)
    .config(config)
;
