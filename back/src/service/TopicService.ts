///<reference path="../../../typings/tsd.d.ts"/>
import {Topic, ITopic} from "../model/Topic";
import {WebError} from "../util/error";

export class TopicService {
    constructor() {

    }

    create(creator, title:string, content:string, type = "url") {
        return Topic.create({title, type, creator, content});
    }

    remove(userId, id) {
        return Topic.findById(id).exec()
            .then(topic => {

                if(!topic) throw new WebError("Not found", 404);
                if(topic.creator != userId) throw new WebError("Not Authorized", 401);

                return topic.remove();
            });
    }

    getAll(userId) {
        return Topic.find({}).exec();
    }
}