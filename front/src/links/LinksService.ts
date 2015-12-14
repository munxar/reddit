///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {tokenHeader} from "../util/tokenHeader";
import {AuthService} from "../auth/AuthService";

export class LinkService {
    constructor(private auth: AuthService) {}

    getAll() {
        return m.request({url: "api/topic", config: tokenHeader}).then(link => {
            link.vote = link.votes.filter(vote => vote == this.auth.user._id).length > 0;
            return link;
        });
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

    addComment(id, content) {
        return m.request({url: "api/topic/" + id + "/comment", method: "post", data: {content}, config: tokenHeader});
    }
}

function onError(err) {
    console.error(err);
}
