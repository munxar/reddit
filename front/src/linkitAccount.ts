var template = require("./linkitAccount.html!text");

class AccountCtrl {

    constructor(private auth) {

    }

    logout() {
        this.auth.logout();
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
