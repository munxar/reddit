///<reference path="../../../../typings/tsd.d.ts"/>
import * as chai from "chai";
import {LinkitDeleteController} from "./linkitDelete";

var expect = chai.expect;

describe("linkitDelete", () => {

    it("action() triggers fn if set", () => {
        var ctrl = new LinkitDeleteController();
        var called = false;
        ctrl.onaction = () => called = true;
        ctrl.action();
        expect(called).eql(true);
    });

    it("action() is ignored if nothing is set", () => {
        var ctrl = new LinkitDeleteController();
        // smoke test
        ctrl.action();
    });

    it("close() set isOpen flag to false", () => {
        var ctrl = new LinkitDeleteController();
        expect(ctrl.isOpen).to.be.undefined;
        ctrl.close();
        expect(ctrl.isOpen).eql(false);
    });

});
