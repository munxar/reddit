var template = require("./linkitAccount.html!text");

class AccountCtrl {

    static $inject = ["auth", "toaster", "$state"];
    constructor(private auth, private toaster, private $state) {

    }

    logout() {
        this.auth.logout();
        this.toaster.show("logout success");
    }

    account() {
        this.$state.go("account.details");
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    getUsername() {
        return this.auth.user.username;
    }
}

export function linkitAccount() {
    return {
        template,
        controller: AccountCtrl,
        controllerAs: "ctrl"
    };
}
