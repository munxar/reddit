import * as expressJwt from "express-jwt";
import {config} from "../config";

// express jwt middleware to prevent access without a json web token
export var secure = expressJwt({
    secret: config.tokenSecret
}).unless({
    // exclude the register and login endpoint
    path: ["/api/account/register", "/api/account/login"]
});
