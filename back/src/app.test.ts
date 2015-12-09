///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
import * as request from "supertest";
import {connect, connection} from "mongoose";
import {app} from "./app";
import {config} from "./config";
import {Account, IAccount} from "./model/Account";
import {Topic, ITopic} from "./model/Topic";
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
        Promise.all([
            Account.find({}).remove(),
            Topic.find({}).remove()
        ]).then(() => done());
    });

    describe("app", () => {

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

        it("user can't register with username that is already taken", done => {
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

        it("change password", done => {
            // create an account
            Account.create({username: "fritz", password: "abcd"}).then(account => {
                // update password
                request(app)
                    .put("/api/account")
                    .set(tokenService.header(account))
                    .send({password: "abcd", newPassword: "1234"})
                    .expect("content-type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        // check if new password is in db
                        Account.findById(res.body.account._id).exec()
                            .then(acc => {
                                acc.comparePasswords("1234").then(() => {
                                    done(err);
                                });
                            }, done);
                    });
            }, done);
        });

        it("change password with wrong password will fail", done => {
            // create an account
            Account.create({username: "fritz", password: "abcd"}).then(account => {
                // update password
                request(app)
                    .put("/api/account")
                    .set(tokenService.header(account))
                    .send({password: "abcx", newPassword: "1234"})
                    .expect("content-type", /json/)
                    .expect(401, done);
            }, done);
        });

        it("user can delete own account", done => {
            // create an account
            Account.create({username: "deleter", password: "4242"}).then(account => {
                // update password
                request(app)
                    .delete("/api/account")
                    .set(tokenService.header(account))
                    .expect("content-type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        Account.count(function(e, count) {
                            expect(e).to.be.null;
                            expect(count).eql(0);
                            done(err);
                        });
                    });
            }, done);
        });
    });

    describe("topic", () => {

        it("every valid user can create a topic", done => {
            Account.create({username: "hans", password: "1234"}).then(account => {
                request(app)
                    .post("/api/topic")
                    .send({title: "hi there!", content: "www.abc.com"})
                    .set(tokenService.header(account))
                    .expect("content-type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body._id).to.exist;
                        expect(res.body.title).eql("hi there!");
                        expect(res.body.content).eql("www.abc.com");

                        done(err);
                    });
            });
        });

        it("invalid user can't create a topic", done => {
            request(app)
                .post("/api/topic")
                .send({title: "hi there!", content: "www.abc.com"})
                .expect("content-type", /json/)
                .expect(401, done);
        });

        it("a user can delete his own topic", done => {
            Account.create({username: "hans", password: "1234"}).then(account => {
                var token = tokenService.header(account);

                request(app)
                    .post("/api/topic")
                    .set(tokenService.header(account))
                    .send({title: "hi there!", content: "www.abc.com"})
                    .set(token)
                    .end((err, res) => {
                        var topic = res.body;

                        request(app)
                            .delete("/api/topic/" + topic._id)
                            .set(token)
                            .expect(200)
                            .end((err, res) => {
                                // check response contains deleted topic
                                expect(res.body._id).eql(topic._id);

                                // check db no topic anymore
                                Topic.find({}).count(function (e, count) {
                                    expect(e).to.be.null;
                                    expect(count).eql(0);

                                    done(err);
                                });
                            });
                    });
            });
        });

        it("a user can't delete topic from other users", done => {
            var account1, account2;

            // create account1
            Account.create({username: "user1", password: "1234"})
                .then(account => account1 = account)
                // create account2
                .then(() => Account.create({username: "user2", password: "1234"}))
                .then(account => account2 = account)
                // create topic for account1
                .then(() => Topic.create({title: "test", content: "www.test.com", creator: account1}))
                // try to delete topic with account2 should fail
                .then((topic:ITopic) => {
                    request(app)
                        .delete("/api/topic/" + topic._id)
                        .set(tokenService.header(account2))
                        .expect("content-type", /json/)
                        .expect(401)
                        .end((err, res) => {

                            done(err);
                        });
                }, done);
        });

        it("try to access topic that dosn't exists should return 404", done => {

            // create account1
            Account.create({username: "user1", password: "1234"})
                .then(account => {
                    var topic = new Topic();
                    request(app)
                        .delete("/api/topic/" + topic._id)
                        .set(tokenService.header(account))
                        .expect("content-type", /json/)
                        .expect(404)
                        .end((err, res) => {
                            done(err);
                        });
                });
        });

        it("a user can list all available topics", done => {
            var acc = new Account({username: "user", password: "1234"});

            Topic.create({creator: acc._id, title: "test1", content: "www.test.com"})
                .then(() => Topic.create({creator: acc._id, title: "test2", content: "www.test.com"}))
                .then(() => {
                    request(app)
                        .get("/api/topic")
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.length).eql(2);

                            done(err);
                        })
                }, done)
        });

        it("get a specific topic by id", done => {
            var acc = new Account({username: "user", password: "1234"});

            Topic.create({creator: acc._id, title: "test1", content: "www.test.com"})
                .then(topic => {
                    request(app)
                        .get("/api/topic/" + topic._id)
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body._id).eql(topic._id.toString());

                            done(err);
                        })
                }, done)
        });


        it("user can up vote a topic", done => {
            var acc = new Account({username: "user", password: "1234"});

            Topic.create({creator: acc._id, title: "test1", content: "www.test.com"})
                .then(topic => {
                    request(app)
                        .put("/api/topic/" + topic._id + "/vote")
                        .send({value: 1})
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.upVotes).contains(acc._id.toString());
                            done(err);
                        })
                }, done)
        });

        it("user can down vote a topic", done => {
            var acc = new Account({username: "user", password: "1234"});

            Topic.create({creator: acc._id, title: "test1", content: "www.test.com"})
                .then(topic => {
                    request(app)
                        .put("/api/topic/" + topic._id + "/vote")
                        .send({value: -1})
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.downVotes).contains(acc._id.toString());
                            done(err);
                        })
                }, done)
        });

        it("user reset a vote on a topic", done => {
            var acc = new Account({username: "user", password: "1234"});

            Topic.create({creator: acc._id, title: "test1", content: "www.test.com", upVotes:[acc._id]})
                .then(topic => {
                    request(app)
                        .put("/api/topic/" + topic._id + "/vote")
                        // optional, if no value is send, we reset the vote
                        //.send({value: 0})
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.downVotes).not.contains(acc._id.toString());
                            expect(res.body.upVotes).not.contains(acc._id.toString());

                            done(err);
                        })
                }, done)
        });

        it("up and down vote is exclusive", done => {
            var acc = new Account({username: "user", password: "1234"});

            // initial state with upvote
            Topic.create({creator: acc._id, title: "test1", content: "www.test.com", upVotes:[acc._id]})
                .then(topic => {
                    // down vote
                    request(app)
                        .put("/api/topic/" + topic._id + "/vote")
                        .send({value: -1})
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.downVotes).contains(acc._id.toString());
                            expect(res.body.upVotes).not.contains(acc._id.toString());

                            done(err);
                        })
                }, done)
        });

        it("a vote is unique per topic per user", done => {
            var acc = new Account({username: "user", password: "1234"});

            // initial state with upvote
            Topic.create({creator: acc._id, title: "test1", content: "www.test.com", upVotes:[acc._id]})
                .then(topic => {
                    // up vote again should have no impact
                    request(app)
                        .put("/api/topic/" + topic._id + "/vote")
                        .send({value: 1})
                        .set(tokenService.header(acc))
                        .expect("content-type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.upVotes).contains(acc._id.toString());
                            // only one entry
                            expect(res.body.upVotes.length).eql(1);
                            expect(res.body.downVotes).not.contains(acc._id.toString());

                            done(err);
                        })
                }, done)
        });
    });

});