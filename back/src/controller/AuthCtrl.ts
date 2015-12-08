import {AuthService} from "../service/AuthService";

export class AuthCtrl {
    constructor(private auth: AuthService) {

    }

    register = (req, res, next) => {
        res.json({});
    };
}