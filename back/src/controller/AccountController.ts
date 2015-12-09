import {AccountService} from "../service/AccountService";

export class AccountController {
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
            .then(account => res.json({account}), next);
    };

    login = (req, res, next) => {
        this.accountService
            .authenticate(req.body.username, req.body.password)
            .then(account => res.json({account}), next);
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