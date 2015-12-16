///<reference path="../../../../typings/tsd.d.ts"/>
import * as chai from "chai";
// import angular-mocks first!
import "angular-mocks/ngMock";
import * as angular from "angular";
import link from "./module";
import {LinkService} from "./LinkService";
var expect = chai.expect;

/**
 * test the link module
 */
describe("link", () => {

    // before each test load link module
    beforeEach(angular.mock.module(link.name));

    it("check if service exists", angular.mock.inject(link => {
        expect(link).to.exist;
    }));

    it("create posts given data tp api/topic", angular.mock.inject((link, $httpBackend: angular.IHttpBackendService) => {
        var data = {title: "test 123", content: "http://www.google.ch"};
        var res = {};

        // backend definition common for all tests
        $httpBackend
            .expectPOST("api/topic", data)
            .respond(200, res)
        ;

        link.create(data).then(link => expect(link).eql(res));

        $httpBackend.flush();
    }));


    it("create posts on error", angular.mock.inject((link, $httpBackend: angular.IHttpBackendService) => {
        var data = {};
        var res = { message: "error" };

        // backend definition common for all tests
        $httpBackend
            .expectPOST("api/topic", data)
            .respond(400, res)
        ;

        var error;
        link.create(data).then(null, err => error = err);

        $httpBackend.flush();

        expect(error).eql(res);
    }));

    it("getAll gets links", angular.mock.inject((link, $httpBackend: angular.IHttpBackendService) => {
        var data = [{},{}];

        // backend definition common for all tests
        $httpBackend
            .expectGET("api/topic")
            .respond(200, data)
        ;

        link.getAll().then(links => expect(links).eql(data));

        $httpBackend.flush();
    }));


});
