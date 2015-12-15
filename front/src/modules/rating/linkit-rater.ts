var template = require("./linkit-rater.html!text");
import "./linkit-rater.css!css";

class RateController {
    votes;
    onupdate;

    static $inject = ["auth"];
    constructor(private auth) {
    }

    vote() {
        if(this.onupdate) { this.onupdate(); }
    }

    isVoted() {
        var userId = this.auth.user ? this.auth.user._id : undefined;
        var votes = this.votes || [];
        return votes.filter(vote => vote == userId).length;
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
            onupdate: "&"
        }
    }
}
