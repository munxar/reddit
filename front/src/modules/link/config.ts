///<reference path="../../../../typings/tsd.d.ts"/>

import {CreateCtrl, ListCtrl, DetailCtrl} from "./HomeCtrl";

var homeTemplate = require("./home.html!text");
var createTemplate = require("./create.html!text");
var detailTemplate = require("./detail.html!text");

config.$inject = ["$stateProvider"];
export function config($stateProvider: ng.ui.IStateProvider) {

    $stateProvider
        .state("home", {
            url: "/",
            template: homeTemplate,
            controller: ListCtrl,
            controllerAs: "ctrl"
        })
        .state("sort", {
            url: "/sort/:tag",
            template: homeTemplate
        })
        .state("create", {
            url: "/create",
            template: createTemplate,
            controller: CreateCtrl,
            controllerAs: "ctrl"
        })
        .state("detail", {
            url: "/topic/:_id",
            template: detailTemplate,
            controller: DetailCtrl,
            controllerAs: "ctrl"
        })
    ;

}
