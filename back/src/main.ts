///<reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import {join} from "path";
import {connect} from "mongoose";
import {app} from "./app";

// connect to database
connect("localhost/reddit", err => {

    // on error stop here
    if(err) throw err;

    // server static files
    app.use(express.static(join(__dirname,"../../front")));

    // start web service
    app.listen(3000);
});
