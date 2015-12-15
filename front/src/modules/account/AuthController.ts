
class UserPassViewModel {
    username = "";
    password = "";
}

export class AuthController {
    vm = new UserPassViewModel();

    static $inject = ["auth", "$state"];
    constructor(private auth, private $state) {}

    register() {
        this.auth.register(this.vm).then(() => {
            this.$state.go("home");
        }, err => console.error(err))
    }

    login() {
        this.auth.login(this.vm).then(() => {
            this.$state.go("home");
        }, err => console.error(err))
    }

    logout() {
        this.auth.logout();
    }
}
