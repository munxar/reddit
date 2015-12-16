///<reference path="../../../../typings/tsd.d.ts"/>
import {AuthController} from "./AuthController";
var loginTemplate = require("./login.html!text");
var registerTemplate = require("./register.html!text");

config.$inject = ["$stateProvider", "$httpProvider"];
export function config($stateProvider:angular.ui.IStateProvider, $httpProvider:ng.IHttpProvider) {

    $stateProvider
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
    ;

    $httpProvider.interceptors.push(["$q", "$location", function ($q, $location) {
        return {
            "request": function (config) {
                config.headers = config.headers || {};
                if (localStorage["token"]) {
                    config.headers["Authorization"] = "Bearer " + localStorage["token"];
                }
                return config;
            },
            "responseError": function (response) {
                if (response.status === 401 || response.status === 403) {
                    //$location.path("/login");
                }
                // not found -> redirect
                if (response.status === 404) {
                    $location.path("/");
                }
                return $q.reject(response);
            }
        };
    }]);


}
