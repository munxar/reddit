///<reference path="../mithril.d.ts"/>

import * as m from "mithril";
import "./main.css!";
import {AuthService} from "./auth/AuthService";
import {LinkService} from "./links/LinksService";
import {RouteService} from "./util/RouteService";
import {navbar} from "./navbar/module";
import {login} from "./auth/login";
import {register} from "./auth/register";
import {link, linkDetails, linkCreate} from "./links/module";

var authService = new AuthService();
var linkService = new LinkService(authService);
var routeService = new RouteService(location);

m.render(document.body, {
    view: () => m("div", [
        m("#header"),
        m("#main")
    ])
});

m.mount(document.getElementById("header"), navbar(authService));

m.route.mode = "hash";
m.route(document.getElementById("main"), "/link", {
    "/link": link(linkService),
    "/link/:id": linkDetails(linkService, routeService),
    "/link/create": linkCreate(linkService, routeService),
    "/login": login(authService, routeService),
    "/register": register(authService, routeService)
});

authService.init();
