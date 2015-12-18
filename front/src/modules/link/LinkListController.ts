import {LinkService} from "./LinkService";

export class LinkListController {
    topics: any[] = [];

    static $inject = ["toaster", "$state", "auth" , "link"];
    constructor(private toaster, private $state, private auth, private link: LinkService) {
        this.init();
    }

    /**
     * load all links
     */
    init() {
        this.link.getAll()
            .then(links => this.topics = links, err => this.toaster.show(err.message));
    }

    /**
     * vote a link
     * @param topic to vote
     */
    vote(topic: any) {
        this.link.voteLink(topic._id)
            .then(t => angular.extend(topic, t), () => this.toaster.show("login to rate a link"));
    }

    /**
     * if user is authenticated, route else show message
     */
    toCreate() {
        if(this.auth.isAuthenticated()) {
            this.$state.go("create");
        } else {
            this.toaster.show("please login to create a link")
        }
    }
}
