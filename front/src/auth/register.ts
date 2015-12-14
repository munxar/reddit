///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {AuthService} from "./AuthService";
import {RouteService} from "../util/RouteService";
import {userPassForm, UserPassVM} from "./userPassForm";

class RegisterCtrl {
    vm = new UserPassVM();

    constructor(private auth:AuthService, private route: RouteService) {
    }

    register = e => {
        e.preventDefault();

        this.auth.register(this.vm).then(() => {
            this.route.home();
        }, err => console.error(err))
    };
}

function view(ctrl:RegisterCtrl) {
    return [
        m("h1", "register"),
        userPassForm(ctrl.vm, ctrl.register)
    ];
}

export function register(auth, route) {
    return {view, controller: () => new RegisterCtrl(auth, route)};
}
