import {AccountViewModel} from "./AccountViewModel";

export class AccountService {
    user = null;

    static $inject = ["auth", "$http"];
    constructor(private auth, private $http) {}

    changePassword(userPass:AccountViewModel) {
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
