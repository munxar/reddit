
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
    constructor($http) {
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
    constructor(private $http, private $state) {
        $http.get("/api/topic/" + $state.params._id).then(res => this.topic = res.data);
    }

    remove() {
        this.$http.delete("/api/topic/" + this.topic._id)
        .then(() => this.$state.go("home"), console.error);
    }
}
