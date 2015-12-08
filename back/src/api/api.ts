///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {auth} from "./auth";

export var api = express.Router();

api.use("/auth", auth);
