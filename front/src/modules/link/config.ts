///<reference path="../../../../typings/tsd.d.ts"/>

// controllers
import {LinkDetailsController} from "./LinkDetailsController";
import {LinkCreateController} from "./LinkCreateController";
import {LinkListController} from "./LinkListController";

// templates
var listTemplate = require("./list.html!text");
var createTemplate = require("./create.html!text");
var detailsTemplate = require("./details.html!text");

config.$inject = ["$stateProvider"];
export function config($stateProvider: ng.ui.IStateProvider) {

    $stateProvider
        .state("home", {
            url: "/",
            template: listTemplate,
            controller: LinkListController,
            controllerAs: "ctrl"
        })
        .state("sort", {
            url: "/sort/:tag",
            template: listTemplate
        })
        .state("create", {
            url: "/create",
            template: createTemplate,
            controller: LinkCreateController,
            controllerAs: "ctrl"
        })
        .state("detail", {
            url: "/topic/:_id",
            template: detailsTemplate,
            controller: LinkDetailsController,
            controllerAs: "ctrl"
        })
    ;

}
