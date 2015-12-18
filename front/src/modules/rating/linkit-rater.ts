var template = require("./linkit-rater.html!text");
import "./linkit-rater.css!css";

/**
 * rate directive
 */
class RateController {
    votes;
    isVoted;
    onupdate;

    constructor() {
    }

    vote() {
        if(this.onupdate) { this.onupdate(); }
    }

    count() {
        return (this.votes || []).length;
    }
}

export function linkitRater() {
    return {
        template,
        scope: {},
        controller: RateController,
        controllerAs: "ctrl",
        bindToController: {
            votes: "=",
            isVoted: "=",
            onupdate: "&"
        }
    }
}
