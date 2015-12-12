
class TopicViewModel {
    title: string;
    content: string;
}

export class CreateCtrl {
    vm = new TopicViewModel();

    constructor(private $state, private $http) {

    }

    create() {
        this.$http.post("/api/topic", this.vm).then(res => {
            console.log(res.data);
            this.$state.go("home");
        }, err => console.error(err));

    }
}

export class ListCtrl {
    topics = [];
    constructor(private $http) {
        $http.get("/api/topic").then(res => this.topics = res.data);
    }

    url(s) {
        var prefix = 'http://';
        if (s.substr(0, prefix.length) !== prefix)
        {
            s = prefix + s;
        }
        return s;
    }

}

export class DetailCtrl {
    topic: any = {};
    comments = [];
    comment = "";
    form;

    constructor(private $http, private $state) {
        var id = $state.params._id;
        $http.get("/api/topic/" + id)
            .then(res => {
                this.topic = res.data;
                this.comments = this.topic.comments;
            });
    }

    remove() {
        this.$http.delete("/api/topic/" + this.topic._id)
        .then(() => this.$state.go("home"), console.error);
    }

    addComment() {
        console.log(this.form);
        this.$http.post("/api/topic/" + this.topic._id + "/comment", {content: this.comment})
            .then(res => {
                this.comment = null;
                this.comments.push(res.data);
            }, console.error);
    }

    removeComment(comment) {
        this.$http.delete("/api/topic/" + this.topic._id + "/comment/" + comment._id)
            .then(() => {
                var idx = this.comments.indexOf(comment);
                if(idx != -1) { this.comments.splice(idx, 1); }
            }, console.error);
    }
}
