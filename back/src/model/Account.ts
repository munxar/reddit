///<reference path="../../../typings/tsd.d.ts"/>
import {Document, model, Schema, Model, Promise} from "mongoose";
import * as bcrypt from "bcrypt";
import {config} from "../config";

// interface for user account
export interface IAccount extends Document {
    username: string;
    password: string;

    comparePasswords(candidatePassword: string): Promise<boolean>;
}

// mongoose schema for user
var AccountSchema = new Schema({
    username: { type: String, required: true, index: { unique: true }, minlength: 4, maxlength: 16 },
    password: { type: String, required: true, minlength: 4, maxlength: 16 }
});

// if password was modified, encrypt it and override password with salt/hash string
AccountSchema.pre("save", function(next) {
    var account:IAccount = this;
    if(!account.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(config.saltFactor, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(account.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the clear text password with the hashed one
            account.password = hash;
            next();
        });
    });
});

// compare a password hash with a password candidate
AccountSchema.method("comparePasswords", function(candidatePassword) {
    var promise = new Promise();

    bcrypt.compare(candidatePassword, this.password, function(err, isValid) {
        if(err) promise.reject(err);
        promise.fulfill(isValid);
    });

    return promise;
});

// create user model and cast to extended type
export var Account = model<IAccount>("Account", AccountSchema);
