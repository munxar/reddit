///<reference path="../../typings/tsd.d.ts"/>

config.$inject = ["$urlRouterProvider", "$mdThemingProvider"];
export function config($urlRouterProvider:ng.ui.IUrlRouterProvider, $mdThemingProvider:ng.material.IThemingProvider) {
    $urlRouterProvider.otherwise("/");

    $mdThemingProvider
        .theme("default")
        .primaryPalette("blue-grey")
        .accentPalette("purple");

}
