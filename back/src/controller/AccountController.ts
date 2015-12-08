import {AccountService} from "../service/AccountService";

export class AccountController {
    constructor(private accountService: AccountService) {

    }

    getAccount = (req, res, next) => {
        res.json({});
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
        res.json();
    };

    remove = (req, res, next) => {
        res.json({});
    };
}