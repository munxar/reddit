///<reference path="../../../typings/tsd.d.ts"/>
import {Topic, ITopic} from "../model/Topic";
import {WebError} from "../util/error";
import {IAccount} from "../model/Account";
import {Comment, IComment} from "../model/Comment";
import {addUnique, removeElement} from "../util/array";

/**
 * topic service
 * used to create, delete, list and vote topics
 */
export class TopicService {
    constructor() {}

    create(userId, title:string, content:string, type = "url") {
        return Topic.create({title, type, creator: userId, content});
    }

    remove(userId, id) {
        return this.getOne(userId, id)
            .then((topic: ITopic) => topic.remove());
    }

    getAll(userId) {
        return Topic.find({}).exec();
    }

    getOne(userId, id) {
        return Topic.findById(id).exec()
            .then(topic => {
                if(!topic) throw new WebError("Not found", 404);
                if(topic.creator != userId) throw new WebError("Not Authorized", 401);

                return topic;
            })
    }

    vote(userId, id, value) {
        return this.getOne(userId, id)
            .then((topic: ITopic) => {
                // reset up or down vote for this user
                removeElement(topic.upVotes, userId);
                removeElement(topic.downVotes, userId);

                // value positive, up vote
                if(value > 0) {
                    addUnique(topic.upVotes, userId);
                }
                // value negative, down vote
                if(value < 0) {
                    addUnique(topic.downVotes, userId);
                }

                // always save, to capture value == 0 case, which is a vote reset
                return topic.save();
            });
    }

    createComment(userId, id, content: string) {
        return this.getOne(userId, id)
            .then(() => {
                return Comment.create({creator:userId,content,topic:id})
            });
    }

    removeComment(userId, id, commentId) {
        return Comment.findById(commentId).exec();
    }
}
