import {WebError} from "./error";

// middleware to restrict access to authenticated users
export function secure(req, res, next) {
    // check if user is authenticated
    if(!req.user._id) {
        return next(new WebError("Not Authorized!", 403));
    }

    next();
}
