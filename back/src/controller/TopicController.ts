import {TopicService} from "../service/TopicService";

export class TopicController {

    constructor(private topicService: TopicService) {

    }

    getAll = (req, res, next) => {
        this.topicService.getAll(req.user._id)
            .then(topics => res.json(topics), next);
    };

    create = (req, res, next) => {
        this.topicService
            .create(req.user._id, req.body.title, req.body.content, req.body.type)
            .then(topic => res.json(topic), next);
    };

    remove = (req, res, next) => {
        this.topicService
            .remove(req.user._id, req.params.id)
            .then(topic => res.json(topic), next);
    };

    getOne = (req,res, next) => {
        this.topicService
            .getOne(req.user._id, req.params.id)
            .then(topic => res.json(topic), next);
    };

    vote = (req, res, next) => {
        this.topicService
            .vote(req.user._id, req.params.id, req.body.value)
            .then(topic => res.json(topic), next);
    };

    createComment = (req, res, next) => {
        this.topicService
            .createComment(req.user._id, req.params.id, req.body.content)
            .then(comment => res.json(comment), next);
    };

    removeComment = (req, res, next) => {
        this.topicService
            .removeComment(req.user._id, req.params.id, req.params.commentId)
            .then(comment => res.json(comment), next);
    };
}