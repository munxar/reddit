///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
import * as request from "supertest";
import {app} from "./app";

var expect = chai.expect;

describe("app", () => {

    describe("auth", () => {
        it("user can register with username and password", done => {
            request(app)
                .post("/api/auth/register")
                .expect("content-type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).eql({});
                    done(err);
                })
        });
    });

    it("test 404 forward", done => {
        request(app)
        .get("/xxx")
        .expect("content-type", /json/)
        .expect(404)
        .end((err, res) => {
            expect(res.body.message).eql("Not Found!");
            done(err);
        });
    })

});