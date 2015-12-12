///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import {join} from "path";
import {Account} from "./model/Account";
import {api} from "./api/api";
import {onError, notFound} from "./util/error";
import {authorization} from "./util/authorization";

// create a express app
export var app = express();

// server static files
app.use(express.static(join(__dirname,"../../front")));

// logger
app.use(morgan("dev"));

// parse json bodies
app.use(bodyParser.json());

// mount api endpoint, and secure them
app.use("/api", authorization, api);

// if we come here, nothing was found
app.use(notFound);

// generic error handler
app.use(onError);

