///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {account} from "./account";
import {topic} from "./topic";

export var api = express.Router();

api.use("/account", account);
api.use("/topic", topic);
