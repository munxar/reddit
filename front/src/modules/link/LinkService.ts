///<reference path="../../../../typings/tsd.d.ts"/>
import {LinkViewModel} from "./LinkViewModel";
import {onError} from "../../../../back/src/util/error";

interface Link {
    votes: string[]
}

/**
 * service to create, delete and update links
 */
export class LinkService {

    static $inject = ["$http", "$q"];
    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {

    }

    // on error make rejected promise from server response (WebError)
    onError = res => this.$q.reject(res.data);
    onSuccess = res => res.data;

    // create a link
    create(data: LinkViewModel) {
        return this.$http.post("api/topic", data)
            .then(this.onSuccess, this.onError);
    }

    // get all links
    getAll() {
        return this.$http.get<any[]>("api/topic")
            .then(this.onSuccess, this.onError)
    }

    // vote a link
    voteLink(linkId) {
        return this.$http.put<Link>("api/topic/" + linkId + "/vote",{}).then(res => res.data.votes, this.onError);
    }

    // get link by id
    getOne(linkId) {
        return this.$http.get("/api/topic/" + linkId)
            .then(this.onSuccess, this.onError);
    }

    remove(topicId) {
        return this.$http.delete("/api/topic/" + topicId)
            .then(this.onSuccess, this.onError);
    }

    addComment(topicId, content) {
        return this.$http.post("/api/topic/" + topicId + "/comment", {content})
            .then(this.onSuccess, this.onError);
    }

    removeComment(topicId, commentId) {
        return this.$http.delete("/api/topic/" + topicId + "/comment/" + commentId)
            .then(this.onSuccess, this.onError);
    }

    voteComment(topicId, commentId) {
        return this.$http.put("/api/topic/" + topicId + "/comment/" + commentId + "/vote", {})
            .then(this.onSuccess, this.onError);
    }
}
