var template = require("./linkit-rater.html!text");
import "./linkit-rater.css!css";

class RateController {
    topic;

    constructor(private $http) {
    }

    up() {
        this.rateOrReset(1);
    }

    down() {
        this.rateOrReset(-1);
    }

    isUp() {
        return this.topic.vote == 1;
    }

    isDown() {
        return this.topic.vote == -1;
    }

    rateOrReset(vote) {
        // if already voted
        if (this.topic.vote == vote) {
            // vote
            this.topic.vote = 0;
        } else {
            // rate
            this.topic.vote = vote;
        }

        this.$http.put("/api/topic/" + this.topic._id + "/vote", {vote: this.topic.vote})
            .then(res => {
                this.topic.vote = res.data.vote;
                this.topic.votes = res.data.votes;
            }, console.error);
    }
}

export function linkitRater() {
    return {
        template,
        scope: {},
        controller: RateController,
        controllerAs: "ctrl",
        bindToController: {
            topic: "="
        }
    }
}
