///<reference path="../../../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {ToastService} from "./ToastService";
import {linkitDelete} from "./linkitDelete";

/**
 * core module
 */
export default angular
    .module("linkit.core", [])
    .service("toaster", ToastService)
    .directive("linkitDelete", linkitDelete)
;
