///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {AccountService} from "./AccountService";
import {linkitAccount} from "./linkitAccount";
import {config} from "./config";

angular
    .module("linkit.account", ["linkit.auth"])
    .service("account", AccountService)
    .directive("linkitAccount", linkitAccount)
    .config(config)
;
