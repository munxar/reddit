///<reference path="../../typings/tsd.d.ts"/>

// import third party libraries
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "font-awesome";
import "angular-moment";
import "angular-validation-match";

// load our application modules
import "./modules/auth/module";
import "./modules/link/module";
import "./modules/rating/module";
import "./modules/account/module";

// load css
import "./main.css!";

import {config} from "./config";

angular
    .module("linkit", [
        "ngMaterial",
        "ui.router",
        "angularMoment",
        "validation.match",
        "linkit.auth",
        "linkit.account",
        "linkit.link",
        "linkit.rating",
    ])
    .config(config)
;

angular.bootstrap(document, ["linkit"]);
