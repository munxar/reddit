

export class LinkDetailsController {
    topic:any = { vote:[], creator: {} };
    comment = "";
    form;

    static $inject = ["$http", "$state", "auth", "toaster"];
    constructor(private $http, private $state, private auth, private toaster) {
        var id = $state.params._id;
        $http.get("/api/topic/" + id)
            .then(res => {
                this.topic = res.data;
            });
    }

    remove() {
        this.$http.delete("/api/topic/" + this.topic._id)
            .then(() => this.$state.go("home"), console.error);
    }

    addComment() {
        console.log(this.form);
        this.$http.post("/api/topic/" + this.topic._id + "/comment", {content: this.comment})
            .then(res => {
                this.comment = null;
                this.topic.comments.unshift(res.data);
            }, console.error);
    }

    removeComment(comment) {
        this.$http.delete("/api/topic/" + this.topic._id + "/comment/" + comment._id)
            .then(() => {
                var idx = this.topic.comments.indexOf(comment);
                if(idx != -1) { this.topic.comments.splice(idx, 1); }
            }, console.error);
    }

    vote(topic) {
        this.$http.put("/api/topic/" + topic._id + "/vote")
            .then(res => {
                topic.votes = res.data.votes;
            }, () => this.toaster.show("login to rate link"));
    }

    voteComment(comment) {
        this.$http.put("/api/topic/" + this.topic._id + "/comment/" + comment._id + "/vote")
            .then(res => {
                comment.votes = res.data.votes;
            }, () => this.toaster.show("login to vote comment"));
    }

    isOwner(entity) {
        var creator = (entity ? (entity.creator ? entity.creator._id : undefined) : undefined)
        return this.auth.user._id === creator;
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

}
