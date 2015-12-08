///<reference path="../../typings/tsd.d.ts"/>
import {app} from "./app";
import {connect} from "mongoose";

// connect to database
connect("localhost/reddit", err => {

    // on error stop here
    if(err) throw err;

    // start web service
    app.listen(3000);
});
