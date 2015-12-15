import {AccountViewModel} from "./AccountViewModel";

export class AccountService {
    user = null;

    static $inject = ["auth", "$http"];
    constructor(private auth, private $http) {}

    changePassword(userPass:AccountViewModel) {
        return this.$http.put("/api/account", userPass).then(res => {
            return res.data;
        });
    }

    deleteAccount() {
        this.$http.delete("/api/account").then(res => {
            return res.data;
        });
    }

}
