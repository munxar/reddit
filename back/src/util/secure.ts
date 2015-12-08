import * as expressJwt from "express-jwt";
import {config} from "../config";

export var secure = expressJwt({
    secret: config.tokenSecret
}).unless({
    path: ["/api/account/register", "/api/account/login"]
});
