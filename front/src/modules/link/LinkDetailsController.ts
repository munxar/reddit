import {LinkService} from "./LinkService";
import {topic} from "../../../../back/src/api/topic";

export class LinkDetailsController {
    topic:any = {vote: [], creator: {}};
    comment = "";
    form;

    static $inject = ["$http", "$state", "auth", "toaster", "link"];

    constructor(private $http, private $state, private auth, private toaster, private link:LinkService) {
        this.init();
    }

    onError = err => this.toaster.show(err.message);
    onSuccess = topic => this.topic = topic;

    init() {
        this.link.getOne(this.$state.params._id)
            .then(this.onSuccess, this.onError);
    }

    remove() {
        this.link.remove(this.topic._id).then(() => this.$state.go("home"), this.onError);
    }

    addComment() {
        this.link.addComment(this.topic._id, this.comment)
            .then(comment => {
                this.comment = null;
                this.topic.comments.unshift(comment);
            }, this.onError);
    }

    removeComment(comment) {
        this.link.removeComment(this.topic._id, comment._id)
        .then(this.onSuccess, this.onError);
    }

    vote(topic) {
        this.link.voteLink(topic._id)
            .then(votes => {
                topic.votes = votes;
            }, () => this.toaster.show("login to rate link"));
    }

    voteComment(comment) {
        this.link.voteComment(this.topic._id, comment._id)
            .then(c => {
                comment.votes = c.votes;
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
