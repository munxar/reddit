///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";

export var api = express.Router();

api.get("/", (req, res) => {
    res.json({});
});
