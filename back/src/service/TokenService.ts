///<reference path="../../../typings/tsd.d.ts"/>
import * as jwt from "jsonwebtoken";
import {IAccount} from "../model/Account";
import {config} from "../config";

// wrapper service for token generation
export class TokenService {
    constructor(private secret = config.tokenSecret, private expiration = config.tokenExpiration) {}

    // generate token from account
    generate(account: IAccount) {
        var payload = {_id: account._id, username: account.username};
        return jwt.sign(payload, this.secret, {expiresIn: this.expiration});
    }

    // generate header
    header(account: IAccount) {
        return {Authorization: "Bearer " + this.generate(account)};
    }
}