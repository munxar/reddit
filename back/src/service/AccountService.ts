///<reference path="../../../typings/tsd.d.ts"/>
import {Account, IAccount} from "../model/Account";
import {Promise} from "mongoose";
import {WebError} from "../util/error";

/**
 * service to handle user account
 */
export class AccountService {
    constructor() {}

    /**
     * register a new account
     * @param username username (unique)
     * @param password password (not empty)
     * @returns Promise<IAccount>
     */
    register(username: string, password: string) {
        return Account.create({username, password}).then(account => account, err => {
            // duplicate key aka username
            if(err.code == 11000) {
                throw new WebError("username already exists", 400);
            }
        });
    }

    /**
     * authenticate a user by username and password
     * @param username
     * @param password
     * @returns Promise
     */
    authenticate(username: string, password: string) {

        var error = new WebError("username / password wrong", 400);

        return Account.findOne({username: username}).exec()
            .then(account => {

                if(account == null) throw error;

                return account.comparePasswords(password).then(isValid => {
                    if(!isValid) throw error;
                    return account;
                })
            });
    }

    /**
     * get one account by id
     * @param id account id
     * @returns Promise<IAccount>
     */
    getAccount(id) {
        return Account.findById(id).exec()
            .then(account => {
                if(account == null) throw new WebError("account not found", 404);
                return account;
            });
    }
}