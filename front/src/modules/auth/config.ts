///<reference path="../../../../typings/tsd.d.ts"/>

config.$inject = ["$httpProvider"];
export function config($httpProvider: ng.IHttpProvider) {

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
                if(response.status === 404) {
                    $location.path("/");
                }
                return $q.reject(response);
            }
        };
    }]);

}
