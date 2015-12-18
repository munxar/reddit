///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import auth from "../auth/module";
import {AccountService} from "./AccountService";
import {linkitAccount} from "./linkitAccount";
import {accountFilter} from "./accountFilter";
import {config} from "./config";

export default angular
    .module("linkit.account", [
        auth.name
    ])
    .service("account", AccountService)
    .directive("linkitAccount", linkitAccount)
    .filter("account", accountFilter)
    .config(config)
;
