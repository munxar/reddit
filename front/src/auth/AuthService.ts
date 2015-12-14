///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {tokenHeader} from "../util/tokenHeader";

export class AuthService {
    user:any = {};

    init() {
        return m.request({url: "api/account", config: tokenHeader})
            .then(user => this.user = user, err => {
                this.logout();
                return err;
            });
    }

    login(vm) {
        return m.request<any>({url: "api/account/login", method: "post", data: vm})
            .then(res => {
                this.user = res.account;
                localStorage.setItem("token", res.token);
                return res;
            });
    }

    register(vm) {
        return m.request<any>({url: "api/account/register", method: "post", data: vm})
            .then(res => {
                this.user = res.account;
                localStorage.setItem("token", res.token);
                return res;
            });
    }

    logout() {
        this.user = {};
        localStorage.removeItem("token");
    }

    isAuthenticated() {
        return this.user._id != undefined;
    }

}
