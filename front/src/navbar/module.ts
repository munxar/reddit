///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {NavbarCtrl} from "./NavbarCtrl";
import {AuthService} from "../auth/AuthService";

export function navbar(auth:AuthService) {
    return {
        view: function (ctrl:NavbarCtrl) {
            return m("header", [
                m(".logo", m("a", {href: "#/"}, "linkit")),
                ctrl.isAuthenticated() ? m(".btn-new", m("a", {href: "#/link/create"}, "new link")) : m("div"),
                m(".account", ctrl.isAuthenticated() ? renderLogout(ctrl) : renderLogin(ctrl))
            ]);
        },
        controller: () => new NavbarCtrl(auth)
    }
}

function renderLogout(ctrl) {
    return [
        m("div", [
            m("i", {"class": "fa fa-user"}),
            m("span", ctrl.username())
        ]),
        m("a", {onclick: ctrl.logout}, "logout")
    ];
}

function renderLogin(ctrl) {
    return [
        m("a", {href: "#/login"}, "login"),
        m("span", " / "), m("a", {href: "#/register"}, "register")
    ]
}
