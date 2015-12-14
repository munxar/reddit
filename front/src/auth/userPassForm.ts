///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";

export class UserPassVM {
    username = m.prop("");
    password = m.prop("");
}

export function userPassForm(vm: UserPassVM, onsubmit) {
    return m("form", {onsubmit}, [
        m("input", {type: "text", oninput: m.withAttr("value", vm.username), value: vm.username()}),
        m("input", {type: "password", oninput: m.withAttr("value", vm.password), value: vm.password()}),
        m("button", "login")
    ])
}
