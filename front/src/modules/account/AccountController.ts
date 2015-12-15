import {AccountViewModel} from "./AccountViewModel";
import {AccountService} from "./AccountService";

export class AccountController {
    vm = new AccountViewModel();

    static $inject = ["account", "$state"];
    constructor(private account: AccountService, private $state: ng.ui.IStateService) { }
    
    changePassword() {
        this.account.changePassword(this.vm).then(() => {
            this.vm.reset();
        }, err => console.error(err))
    }

    deleteAccount() {
        this.account.deleteAccount();
    }
}
