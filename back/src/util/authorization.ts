import {config} from "../config";
import * as jwt from "jsonwebtoken";

/*
 * authorization of a user with valid token.
 * if no token is present, we set an empty guest user.
 */
export function authorization(req, res, next) {
    // extract authorization header
    var header = req.headers.authorization || "";

    // remove string "Bearer " the rest should be the token
    var token = header.substr(7, header.length);

    // verify token
    if(token) {
        jwt.verify(token, config.tokenSecret, function(err, decoded) {
            // if token is valid, we store the payload in the request object for later use
            req.user = decoded;
            // signal an error
            next(err);
        });
    } else {
        // set empty user
        req.user = { _id: undefined };
        next();
    }
}
