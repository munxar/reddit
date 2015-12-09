///<reference path="../../../typings/tsd.d.ts"/>
import * as chai from "chai";
import {addUnique, removeElement} from "./array";
import {WebError} from "./error";
var expect = chai.expect;

describe("util", () => {

    describe("array", () => {

        it("add unique adds element", () => {
            var array = [1, 3];

            addUnique(array, 1);
            addUnique(array, 2);
            addUnique(array, 3);

            expect(array).eql([1, 3, 2])
        });

        it("removeElement removes element from array", () => {
            var array = [1, 2, 3];

            removeElement(array, 2);
            removeElement(array, 1);

            expect(array).eql([3]);
        });

    });

    describe("error", () => {

        it("default WebError", () => {
            var error = new WebError("boom");

            expect(error.status).eql(500);
            expect(error.message).eql("boom");
        });

    });
});
