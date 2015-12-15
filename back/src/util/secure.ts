import {WebError} from "./error";

export function secure(req, res, next) {
    if(!req.user._id) return next(new WebError("Not Authorized!", 403));

    next();
}
