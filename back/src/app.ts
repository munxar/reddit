///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import * as bodyParser from "body-parser";
import {api} from "./api/api";
import {onError, notFound} from "./util/error";

// create a express app
export var app = express();

// parse json bodies
app.use(bodyParser.json());

// mount api endpoint
app.use("/api", api);

// if we come here, nothing was found
app.use(notFound);

// generic error handler
app.use(onError);

