///<reference path="../../../../typings/tsd.d.ts"/>
import * as chai from "chai";
// import angular-mocks first!
import "angular-mocks/ngMock";
import * as angular from "angular";
var expect = chai.expect;

describe("linkit-rater", () => {

    beforeEach(angular.mock.module("linkit.rating"));

    it("linkit-rater directive", angular.mock.inject(($compile, $rootScope: ng.IRootScopeService) => {
        var scope = $rootScope.$new();
        // compile
        var rater = $compile("<linkit-rater></linkit-rater>")(scope);
        // eval expressions
        scope.$digest();
        // access the controller
        var ctrl = rater.isolateScope().ctrl;
        //console.log(ctrl);

    }));

});


