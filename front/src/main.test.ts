///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
// import angular-mocks first!
import "angular-mocks/ngMock";
import * as angular from "angular";
import "dist/main";
var expect = chai.expect;

describe("main", () => {

    beforeEach(angular.mock.module("linkit"));

    it("test 1", angular.mock.inject((auth) => {
        expect(1).eql(1);
    }));

    it("test 2", () => {
        expect(2).eql(2);
    });

});

