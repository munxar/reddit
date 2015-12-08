///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {account} from "./account";

export var api = express.Router();

api.use("/account", account);
