///<reference path="../../typings/tsd.d.ts"/>

// import third party libraries
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "font-awesome";
import "angular-moment";
import "angular-validation-match";
import "angular-messages";

// load our application modules
import "./modules/auth/module";
import link from "./modules/link/module";
import "./modules/rating/module";
import "./modules/account/module";

// load css
import "./main.css!";

import {config} from "./config";

angular
    .module("linkit", [
        "ngMaterial",
        "ngMessages",
        "ui.router",
        "angularMoment",
        "validation.match",
        "linkit.auth",
        "linkit.account",
        link.name,
        "linkit.rating",
    ])
    .config(config)
;

angular.bootstrap(document, ["linkit"]);
