///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "./modules/link/module";
import "./main.css!";
import {AuthController} from "./AuthController";
import {redditAccount} from "./redditAccount";
import {AuthService} from "./AuthService";
import {CreateCtrl, ListCtrl, DetailCtrl} from "./HomeCtrl";
import {linkitRater} from "./modules/rating/linkit-rater";

var homeTemplate = require("./home.html!text");
var createTemplate = require("./create.html!text");
var loginTemplate = require("./login.html!text");
var registerTemplate = require("./register.html!text");
var accountTemplate = require("./account.html!text");
var detailTemplate = require("./detail.html!text");

import IStateProvider = angular.ui.IStateProvider;
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;

var app = angular.module("linkit", [
    "ngMaterial",
    "ui.router",
    "linkit.link"
]);

app.config(function($urlRouterProvider: IUrlRouterProvider, $stateProvider: IStateProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise("/");

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
        .state("account", {
            url: "/account",
            template: accountTemplate,
            controller: AuthController,
            controllerAs: "ctrl"
        })
    ;

    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            "request": function (config) {
                config.headers = config.headers || {};
                if (localStorage["token"]) {
                    config.headers.Authorization = "Bearer " + localStorage["token"];
                }
                return config;
            },
            "responseError": function (response) {
                if (response.status === 401) {
                    $location.path("/login");
                }
                return $q.reject(response);
            }
        };
    });

    $mdThemingProvider
        .theme('default')
        .primaryPalette('red')
        .accentPalette('blue');
});

app.directive("redditAccount", redditAccount);
app.service("auth", AuthService);
app.directive("linkitRater", linkitRater);

app.run(function(auth) {
    auth.init();

});

angular.bootstrap(document, [app.name]);

