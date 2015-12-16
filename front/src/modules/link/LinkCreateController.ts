import {LinkViewModel} from "./LinkViewModel";
import {LinkService} from "./LinkService";

/**
 * creates links
 */
export class LinkCreateController {
    vm = new LinkViewModel();

    static $inject = ["$state", "link", "toaster"];
    constructor(private $state, private link: LinkService, private toaster) {

    }

    /**
     * create new link, and route to list on success, display error otherwise
     */
    create() {
        this.link.create(this.vm)
            .then(link => {
                this.toaster.show("link created");
                this.$state.go("home");
            }, res => this.toaster.show(res.message))
    }

}
