
// web error class
// this class gives us common interface to send errors to our frontend
// you can use this class to generate errors like
// next(new WebError("some error", 123))
export class WebError {
    /**
     * error message
     * @param message message text
     * @param status http status code, default 500
     */
    constructor(public message: string, public status = 500) {

    }
}

// generic error handler
export function onError(err, req, res, next) {
    res.status(err.status || 500).json(err);
}

// not found handler
export function notFound(req, res, next) {
    next(new WebError("Not Found!", 404));
}