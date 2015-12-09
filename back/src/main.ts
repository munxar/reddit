///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import {connect} from "mongoose";
import {app} from "./app";
import {config} from "./config";

// connect to database
connect(config.db, err => {

    // on error stop here
    if(err) throw err;

    // start web service
    app.listen(config.port);
});
