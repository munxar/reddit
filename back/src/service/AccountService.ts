///<reference path="../../../typings/tsd.d.ts"/>
import {Account, IAccount} from "../model/Account";
import {Promise} from "mongoose";
import {WebError} from "../util/error";

/**
 * service to handle user account
 */
export class AccountService {
    constructor() {
    }

    /**
     * register a new account
     * @param username username (unique)
     * @param password password (not empty)
     * @returns Promise<IAccount>
     */
    register(username:string, password:string) {
        console.log("register");

        return Account.create({username, password}).then(account => account, err => {
            // duplicate key aka username
            if (err.code == 11000) {
                throw new WebError("username already exists", 400);
            }
            throw err;
        });
    }

    /**
     * authenticate a user by username and password
     * @param username
     * @param password
     * @returns Promise
     */
    authenticate(username:string, password:string) {

        var error = new WebError("username / password wrong", 400);

        return Account.findOne({username: username}).exec()
            .then(account => {

                if (account == null) throw error;

                return account.comparePasswords(password).then(isValid => {
                    if (!isValid) throw error;
                    return account;
                })
            });
    }

    /**
     * get one account by id
     * @param id account id
     * @returns Promise<IAccount>
     */
    getAccount(id):Promise<IAccount> {
        return Account.findById(id).exec()
            .then(account => {
                if (account == null) throw new WebError("account not found", 404);
                return account;
            });
    }

    /**
     * update the password
     * @param id account id
     * @param password current password
     * @param newPassword new password
     */
    update(id, password:string, newPassword:string) {
        var account;
        return this.getAccount(id)
            .then(acc => {
                account = acc;
                return acc.comparePasswords(password);
            })
            .then(isValid => {
                if (!isValid) {
                    throw new WebError("password invalid", 400);
                }
                account.password = newPassword;
                return account.save();
            })
    }

    /**
     * remove user account
     * @param userId
     * @returns Promise<IAccount>
     */
    remove(userId) {
        return this.getAccount(userId)
            .then(account => account.remove());
    }
}
