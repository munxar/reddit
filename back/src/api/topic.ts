///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {TopicService} from "../service/TopicService";
import {TopicController} from "../controller/TopicController";

export var topic = express.Router();

var topicService = new TopicService();
var ctrl = new TopicController(topicService);

topic.post("/", ctrl.create);
topic.get("/", ctrl.getAll);
topic.delete("/:id", ctrl.remove);
