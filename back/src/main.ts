///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import {join} from "path";
import {connect} from "mongoose";
import {app} from "./app";
import {config} from "./config";

// connect to database
connect(config.db, err => {

    // on error stop here
    if(err) throw err;

    // server static files
    app.use(express.static(join(__dirname,"../../front")));

    // start web service
    app.listen(config.port);
});
