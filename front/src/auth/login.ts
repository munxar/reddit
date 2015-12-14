///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {AuthService} from "./AuthService";
import {userPassForm, UserPassVM} from "./userPassForm";
import {RouteService} from "../util/RouteService";

class LoginCtrl {
    vm = new UserPassVM();

    constructor(private auth: AuthService, private route: RouteService) {
    }

    login = e => {
        e.preventDefault();
        this.auth.login(this.vm)
            .then(() => {
                this.route.home();
            }, err => console.error(err));
    };
}

function view(ctrl:LoginCtrl) {
    return [
        m("h1", "login"),
        userPassForm(ctrl.vm, ctrl.login)
    ];
}

export function login(auth, route) {
    return {view, controller: () => new LoginCtrl(auth, route)};
}
