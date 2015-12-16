import {LinkViewModel} from "./LinkViewModel";

export class LinkCreateController {
    vm = new LinkViewModel();

    static $inject = ["$state", "$http", "toaster"];
    constructor(private $state, private $http, private toaster) {

    }

    create() {
        this.$http.post("/api/topic", this.vm).then(res => {
            this.$state.go("home");
        }, res => this.toaster.show(res.data.message));

    }
}
