///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {TopicService} from "../service/TopicService";
import {TopicController} from "../controller/TopicController";
import {secure} from "../util/secure";

export var topic = express.Router();

var topicService = new TopicService();
var ctrl = new TopicController(topicService);

// create a topic
topic.post("/", secure, ctrl.create);
// list all topics
topic.get("/", ctrl.getAll);
// remove a topic by id (only creator can delete)
topic.delete("/:id", secure, ctrl.remove);
// get one topic by id
topic.get("/:id", ctrl.getOne);
// add a vote to a topic
topic.put("/:id/vote", secure, ctrl.vote);

// create a comment
topic.post("/:id/comment", secure, ctrl.createComment);
// remove a comment (only users own comments)
topic.delete("/:id/comment/:commentId", secure, ctrl.removeComment);
