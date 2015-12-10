import {AccountService} from "../service/AccountService";
import {TokenService} from "../service/TokenService";
import {IAccount} from "../model/Account";

export class AccountController {
    tokenService = new TokenService();

    constructor(private accountService: AccountService) {

    }

    getAccount = (req, res, next) => {
        this.accountService
            .getAccount(req.user._id)
            .then(account => res.json(account), next);
    };

    register = (req, res, next) => {
        this.accountService
            .register(req.body.username, req.body.password)
            .then((account: IAccount) => {
                return res.json({account, token: this.tokenService.generate(account)})
            }, next);
    };

    login = (req, res, next) => {
        this.accountService
            .authenticate(req.body.username, req.body.password)
            .then((account: IAccount) => {
                return res.json({account, token: this.tokenService.generate(account)})
            }, next);
    };

    update = (req, res, next) => {
        this.accountService
            .update(req.user._id, req.body.password, req.body.newPassword)
            .then(account => res.json({account}), next)
    };

    remove = (req, res, next) => {
        this.accountService
            .remove(req.user._id)
            .then(account => res.json(account), next);
    };
}