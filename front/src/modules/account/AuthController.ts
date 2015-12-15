
class UserPassViewModel {
    username = "";
    password = "";
}

export class AuthController {
    vm = new UserPassViewModel();

    static $inject = ["auth", "$state", "toaster"];
    constructor(private auth, private $state, private toaster) {}

    register() {
        this.auth.register(this.vm).then(() => {
            this.$state.go("home");
            this.toaster.show("register success");
        }, err => console.error(err))
    }

    login() {
        this.auth.login(this.vm).then(account => {
            this.$state.go("home");
            this.toaster.show("welcome " + account.username);
        }, err => console.error(err))
    }

}
