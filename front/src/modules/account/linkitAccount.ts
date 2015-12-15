var template = require("./linkitAccount.html!text");

class AccountCtrl {

    static $inject = ["auth", "toaster"];
    constructor(private auth, private toaster) {

    }

    logout() {
        this.auth.logout();
        this.toaster.show("logout success");
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
