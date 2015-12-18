///<reference path="../../../../typings/tsd.d.ts"/>

var template = require("./list-item.html!text");

class ListItemController {
    item;
}

export function listItem() {
    return {
        template,
        scope: {},
        replace: true,
        controller: ListItemController,
        controllerAs: "ctrl",
        bindToController: {
            item: "="
        }
    }
}
