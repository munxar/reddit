

export class LinkListController {
    topics = [];

    static $inject = ["$http", "toaster", "$state", "auth"];
    constructor(private $http, private toaster, private $state, private auth) {
        $http.get("/api/topic").then(res => this.topics = res.data);
    }

    vote(topic) {
        this.$http.put("/api/topic/" + topic._id + "/vote")
            .then(res => {
                topic.votes = res.data.votes;
            }, err => this.toaster.show("login to rate a link"));
    }

    toCreate() {
        if(this.auth.isAuthenticated()) {
            this.$state.go("create");
        } else {
            this.toaster.show("please login to create a link")
        }
    }
}
