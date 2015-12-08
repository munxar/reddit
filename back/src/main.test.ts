///<reference path="../../typings/tsd.d.ts"/>
import * as chai from "chai";
import {connect, connection} from "mongoose";
import {User} from "./model/User";

var expect = chai.expect;

describe("test", () => {

    before(done => {
        connect("localhost/testing", removeUsers);

        function removeUsers() {
            User.find({}).remove(done);
        }
    });

    after(done => {
        connection.close(done);
    });

    it("wuxel 1", () => {
        expect(1).eql(1);
    });

    it("user has username ans password", () => {
        var user = new User({username: "Hans", password: "1234"});

        expect(user.username).eql("Hans");
        expect(user.password).eql("1234");
    });

    it("save user", done => {
        var user = new User({username: "Hans", password: "1234"});
        user.save(err => {
            if(err) done(err);
            expect(user).to.be.instanceOf(Object);
            done();
        });
    });

    it("username is required", done => {
        var user = new User({password: "1234"});
        user.validate(err => {
            expect(err.errors["username"]["kind"]).eql("required");
            done();
        });
    });
});