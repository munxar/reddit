///<reference path="../../../typings/tsd.d.ts"/>
import {Topic, ITopic} from "../model/Topic";
import {WebError} from "../util/error";
import {IAccount} from "../model/Account";
import {IComment, Comment} from "../model/Comment";
import {addUnique, removeElement} from "../util/array";

/**
 * topic service
 * used to create, delete, list and vote topics
 */
export class TopicService {
    constructor() {
    }

    create(userId, title:string, content:string, type = "url") {
        return Topic.create({title, type, creator: userId, content});
    }

    remove(userId, id) {
        return this.getOne(userId, id)
            .then((topic:ITopic) => {
                if (topic.creator._id.toString() != userId) throw new WebError("Not Authorized!", 403);
                return topic.remove();
            });
    }

    getAll(userId) {
        return Topic.find({})
            .populate("creator", "username")
            .exec()
            .then(topics => {
                return topics.map(topic => calculateVotes(userId, topic));
            });
    }

    getOne(userId, id) {
        return Topic.findById(id)
            .populate("creator", "username")
            .populate("comments.creator", "username")
            .exec()
            .then(topic => {
                if (!topic) throw new WebError("Not found", 404);
                return topic;
            })
    }

    vote(userId, id, value) {
        return this.getOne(userId, id)
            .then((topic:ITopic) => {

                // reset up or down vote for this user
                removeElement(topic.upVotes, userId);
                removeElement(topic.downVotes, userId);

                // value positive, up vote
                if (value > 0) {
                    addUnique(topic.upVotes, userId);
                }
                // value negative, down vote
                if (value < 0) {
                    addUnique(topic.downVotes, userId);
                }

                // always save, to capture value == 0 case, which is a vote reset
                return topic.save();
            })
            .then(topic => calculateVotes(userId, topic));
    }

    createComment(userId, id, content:string) {
        return this.getOne(userId, id)
            .then((topic: ITopic) => {
                var comment = new Comment({creator: userId, content, topic: id});
                topic.comments.push(comment);
                return topic.save();
            })
            .then((topic: ITopic) => this.getOne(userId, topic._id))
            .then((topic: ITopic) => {
                // return last comment
                return topic.comments[topic.comments.length-1];
            });
    }

    removeComment(userId, id, commentId) {
        return this.getOne(userId, id)
            .then((topic: ITopic) => {
                var comment = topic.comments.filter(comment => comment._id.toString() == commentId)[0];
                if(comment == undefined) throw new WebError("Not Found!", 404);
                if(comment.creator._id.toString() != userId) throw new WebError("Not Authorized!", 403);
                var idx = topic.comments.indexOf(comment);
                if(idx != -1) {
                    topic.comments.splice(idx, 1);
                }
                return topic.save();
            });
    }
}

function calculateVotes(userId, t) {
    var topic = t.toJSON();
    topic.vote = 0;
    if (userId) {
        topic.vote += topic.upVotes.filter(v => v == userId.toString()).length;
        topic.vote -= topic.downVotes.filter(v => v == userId.toString()).length;
    }

    topic.votes = topic.upVotes.length - topic.downVotes.length;

    return topic;
}

