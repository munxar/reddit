import {config} from "../config";
import * as jwt from "jsonwebtoken";

// express jwt middleware to prevent access without a json web token
export function authorization(req, res, next) {
    var header = req.headers.authorization || "";

    var token = header.substr(7, header.length);

    if(token) {
        jwt.verify(token, config.tokenSecret, function(err, decoded) {
            req.user = decoded;
            next(err);
        });
    } else {
        req.user = { _id: undefined };
        next();
    }
}
