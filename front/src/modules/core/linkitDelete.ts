var template = require("./linkitDelete.html!text");

export class LinkitDeleteController {
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

/**
 * inline delete confirmation directive
 * shows delete link and presents the actual delete button on click with a nice
 * FAB speed dial.
 */
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
