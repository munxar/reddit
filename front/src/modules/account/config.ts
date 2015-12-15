///<reference path="../../../../typings/tsd.d.ts"/>
import {AccountController} from "./AccountController";
import {AuthController} from "./AuthController";

var accountTemplate = require("./account.html!text");
var loginTemplate = require("./login.html!text");
var registerTemplate = require("./register.html!text");

config.$inject = ["$stateProvider"];
export function config($stateProvider:angular.ui.IStateProvider) {
    $stateProvider
        .state("account", {
            url: "/account",
            template: accountTemplate,
            controller: AccountController,
            controllerAs: "ctrl"
        })
        .state("login", {
            url: "/login",
            template: loginTemplate,
            controller: AuthController,
            controllerAs: "ctrl"
        })
        .state("register", {
            url: "/register",
            template: registerTemplate,
            controller: AuthController,
            controllerAs: "ctrl"
        })
}
