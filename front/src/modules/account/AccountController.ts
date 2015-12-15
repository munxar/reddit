import {AccountViewModel} from "./AccountViewModel";
import {AccountService} from "./AccountService";

export class AccountController {
    vm = new AccountViewModel();

    static $inject = ["account", "$state", "toaster", "auth"];
    constructor(private account: AccountService, private $state: ng.ui.IStateService, private toaster, private auth) { }

    changePassword() {
        this.account.changePassword(this.vm).then(() => {
            this.$state.go("^.details");
            this.toaster.show("password changed");
        }, res => this.toaster.show(res.data.message))
    }

    deleteAccount() {
        this.account.deleteAccount();
        this.auth.logout();
        this.toaster.show("account deleted");
        this.$state.go("home");
    }
}
