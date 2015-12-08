///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
import * as request from "supertest";
import {connect, connection} from "mongoose";
import {app} from "./app";
import {config} from "./config";
import {Account} from "./model/Account";
import {TokenService} from "./service/TokenService";

var expect = chai.expect;
var tokenService = new TokenService();

describe("api", () => {

    // make connection to db
    before(done => {
        connect(config.db_testing, done);
    });

    // close connection to db
    after(done => {
        connection.close(done);
    });

    // remove relevant collections before every test
    beforeEach(done => {
        Account.find({}).remove(done);
    });

    describe("account", () => {

        it("user can register account with username and password", done => {
            request(app)
                .post("/api/account/register")
                .send({username: "hans", password: "1234"})
                .expect("content-type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.account.username).eql("hans");
                    done(err);
                })
        });

        it("user can't register with username that is already given", done => {
            request(app)
                .post("/api/account/register")
                .send({username: "hans", password: "1234"})
                .end((err, res) => {
                    expect(err).to.be.null;

                    request(app)
                        .post("/api/account/register")
                        .send({username: "hans", password: "5678"})
                        .expect("content-type", /json/)
                        .expect(400)
                        .end((err, res) => {
                            expect(res.body.message).eql("username already exists");
                            done(err);
                        })
                })
        });

        it("valid username / password can login", done => {
            request(app)
                .post("/api/account/register")
                .send({username: "hans", password: "1234"})
                .end((err, res) => {
                    expect(err).to.be.null;

                    request(app)
                        .post("/api/account/login")
                        .send({username: "hans", password: "1234"})
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.account.username).eql("hans");

                            done(err);
                        })
                })
        });

        it("invalid password can't login", done => {
            request(app)
                .post("/api/account/register")
                .send({username: "hans", password: "1234"})
                .end((err, res) => {
                    expect(err).to.be.null;

                    request(app)
                        .post("/api/account/login")
                        .send({username: "hans", password: "1234x"})
                        .expect("content-type", /json/)
                        .expect(400)
                        .end((err, res) => {
                            expect(res.body.message).eql("username / password wrong");

                            done(err);
                        })
                })
        });

        it("invalid username can't login", done => {
            request(app)
                .post("/api/account/login")
                .send({username: "yada", password: "1234"})
                .expect("content-type", /json/)
                .expect(400)
                .end((err, res) => {
                    expect(res.body.message).eql("username / password wrong");

                    done(err);
                })
        });

        it("access user account with valid token", done => {
            Account.create({username: "hans", password: "1234"}).then(account => {

                request(app)
                    .get("/api/account")
                    .set(tokenService.header(account))
                    .expect("content-type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.username).eql("hans");

                        done(err);
                    });
            }, done);
        });

        it("access user account without token", done => {
            request(app)
                .get("/api/account")
                .expect("content-type", /json/)
                .expect(401, done);
        });

        it("access user account with invalid token", done => {
            request(app)
                .get("/api/account")
                .set(tokenService.header(new Account({username: "jabbathehut"})))
                .expect("content-type", /json/)
                .expect(404, done);
        });
    });

    it("test 404 forward", done => {
        request(app)
            .get("/make404")
            .expect("content-type", /json/)
            .expect(404)
            .end((err, res) => {
                expect(res.body.message).eql("Not Found!");
                done(err);
            });
    })

});