///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import * as bodyParser from "body-parser";
import {join} from "path";
import {Account} from "./model/Account";
import {api} from "./api/api";
import {secure} from "./util/secure";
import {onError, notFound} from "./util/error";

// create a express app
export var app = express();

// server static files
app.use(express.static(join(__dirname,"../../front")));

// parse json bodies
app.use(bodyParser.json());

// mount api endpoint, and secure them
app.use("/api", secure, api);

// if we come here, nothing was found
app.use(notFound);

// generic error handler
app.use(onError);

