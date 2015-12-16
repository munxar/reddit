///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {ToastService} from "./ToastService";
import {linkitDelete} from "./linkitDelete";

/**
 * core module
 * basic functionality, used all over the application
 */
export default angular
    .module("linkit.core", [])
    .service("toaster", ToastService)
    .directive("linkitDelete", linkitDelete)
;
