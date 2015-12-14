///<reference path="../../mithril.d.ts"/>
import * as m from "mithril";
import {LinkService} from "./LinksService";
import {RouteService} from "../util/RouteService";

class LinkCtrl {
    links = [];
    constructor(linkService: LinkService) {
        linkService.getAll().then(links => this.links = links);
    }
}

class LinkDetailsCtrl {
    link: any = {comments: []};

    constructor(private linkService: LinkService, private route: RouteService) {
        linkService.getOne(m.route.param("id"))
            .then(link => this.link = link);
    }

    remove = (e) => {
        this.linkService.remove(this.link._id)
            .then(() => this.route.home());
    };
}


function view(ctrl: LinkCtrl) {
    return m(".link-list", ctrl.links.map(link => renderLink(link)));
}

function renderLink(link) {
    var count = link.comments.length;

    return m(".link", [
        m(".link-title", m("a", {href: "http://" + link.content, target: "_blank"}, link.title)),
        m(".link-info", m("span", "created " + link.creationDate + " by " + link.creator.username)),
        m(".link-actions", m("a", {href: "#/link/" + link._id}, count + " Comments"))
    ]);
}

export function link(links: LinkService) {
    return {
        view,
        controller: () => new LinkCtrl(links)
    };
}

export function linkDetails(linkService: LinkService, routeService: RouteService) {
    return {
        view: (ctrl) => [
            renderLink(ctrl.link),
            m("button",{onclick: ctrl.remove},"delete")
        ],
        controller: () => new LinkDetailsCtrl(linkService, routeService)
    }
}

class CreateVM {
    title = m.prop("");
    content = m.prop("");
}

class CreateCtrl {
    vm = new CreateVM();
    constructor(private linkService: LinkService, private routeService: RouteService) {

    }

    create = e => {
        e.preventDefault();
        this.linkService.create(this.vm)
            .then(() => this.routeService.home())
    };
}

function createView(ctrl: CreateCtrl) {
    return [
        m("h1", "new link"),
        m("form", {onsubmit: ctrl.create}, [
            m("input", {oninput: m.withAttr("value", ctrl.vm.title), value: ctrl.vm.title()}),
            m("input", {oninput: m.withAttr("value", ctrl.vm.content), value: ctrl.vm.content()}),
            m(".form-actions", [
                m("button", {type: "submit"}, "Create"),
                m("a", {href: "#/"}, "Cancel")
            ])
        ])
    ];
}

export function linkCreate(linkService: LinkService, routeService: RouteService) {
    return {
        view: createView,
        controller: () => new CreateCtrl(linkService, routeService)
    }
}
