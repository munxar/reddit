import {UserPassViewModel} from "./UserPassViewModel";

/**
 * controller for login and register
 */
export class AuthController {
    vm = new UserPassViewModel();

    static $inject = ["auth", "$state", "toaster"];
    constructor(private auth, private $state, private toaster) {}

    register() {
        this.auth.register(this.vm)
            .then(this.routeHomeAndDisplayWelcome, this.showErrorAndResetPassword)
    }

    login() {
        this.auth.login(this.vm)
            .then(this.routeHomeAndDisplayWelcome, this.showErrorAndResetPassword)
    }

    showErrorAndResetPassword = err => {
        this.toaster.show(err.data.message);
        this.vm.password = "";
    };

    routeHomeAndDisplayWelcome = account => {
        this.$state.go("home");
        this.toaster.show("welcome " + account.username);
    };
}
