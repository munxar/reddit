///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import {join} from "path";
import {api} from "./api/api";

// create express app
export var app = express();

// server static files
app.use(express.static(join(__dirname,"../../front")));

// mount api endpoints
app.use("/api", api);

