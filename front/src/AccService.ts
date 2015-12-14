import {AccountViewModel} from "./AccountViewModel";

export class AccService {
    user = null;

    constructor(private auth, private $http, private $state) {}

    changePass(userPass:AccountViewModel) {
        return this.$http.put("/api/account", userPass).then(res => {
            console.log(res.data);
        }, err => console.error(err));
    }

    deleteAccount() {
        this.$http.delete("/api/account").then(res => {
            this.auth.logout();
        }, err => console.error(err));
    }

}
