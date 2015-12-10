
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
}

export class DetailCtrl {
    topic = {};
    constructor($http, $state) {
        $http.get("/api/topic/" + $state.params._id).then(res => this.topic = res.data);
    }
}