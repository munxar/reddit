
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
        }, err => this.toaster.show(err.data.message))
    }

    login() {
        this.auth.login(this.vm).then(account => {
            this.$state.go("home");
            this.toaster.show("welcome " + account.username);
        }, err => {
            this.toaster.show(err.data.message);
            this.vm.password = "";
        })
    }

}
