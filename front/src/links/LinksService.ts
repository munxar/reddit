///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {tokenHeader} from "../util/tokenHeader";
import {AuthService} from "../auth/AuthService";

export class LinkService {
    constructor(private auth: AuthService) {}

    getAll() {
        return m.request({url: "api/topic", config: tokenHeader});
    }

    getOne(id) {
        return m.request({url: "api/topic/" + id, config: tokenHeader});
    }

    remove(id) {
        return m.request({url: "api/topic/" + id, method: "delete", config: tokenHeader});
    }

    create(data) {
        return m.request({url: "api/topic", method: "post", data: data, config: tokenHeader});
    }
}
