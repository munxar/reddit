///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
import * as request from "supertest";
import {app} from "./app";

var expect = chai.expect;

describe("api", () => {

    it("check api root", done => {
        request(app)
            .get("/api")
            .expect("content-type", /json/)
            .expect(200)
            .end(done);
    });

});