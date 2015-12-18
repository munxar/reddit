import {AccountViewModel} from "./AccountViewModel";

/**
 * account business logic
 */
export class AccountService {

    static $inject = ["$http"];
    constructor(private $http) {

    }

    changePassword(userPass:AccountViewModel) {
        return this.$http.put("/api/account", userPass).then(res => {
            return res.data;
        });
    }

    deleteAccount() {
        return this.$http.delete("/api/account").then(res => {
            return res.data;
        });
    }

}
