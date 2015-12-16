var template = require("./linkitDelete.html!text");

class LinkitDeleteController {
    onaction;
    isOpen;

    action() {
        if(this.onaction) {
            this.onaction();
        }
    }

    close() {
        this.isOpen = false;
    }
}

export function linkitDelete() {
    return {
        template,
        scope: {},
        controller: LinkitDeleteController,
        controllerAs: "ctrl",
        bindToController: {
            onaction: "&"
        }
    }
}
