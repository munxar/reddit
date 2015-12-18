///<reference path="../../../../typings/tsd.d.ts"/>
import {AccountController} from "./AccountController";

var accountTemplate = require("./account.html!text");
var pwresetTemplate = require("./pwreset.html!text");
var deleteTemplate = require("./delete.html!text");

config.$inject = ["$stateProvider"];
export function config($stateProvider:angular.ui.IStateProvider) {

    $stateProvider
        .state("account", {
            url: "/account",
            template: "<ui-view>",
        })
        .state("account.details", {
            url: "/",
            template: accountTemplate
        })
        .state("account.reset", {
            url: "/reset",
            template: pwresetTemplate,
            controller: AccountController,
            controllerAs: "ctrl"
        })
        .state("account.delete", {
            url: "/delete",
            template: deleteTemplate,
            controller: AccountController,
            controllerAs: "ctrl"
        })
    ;
}
