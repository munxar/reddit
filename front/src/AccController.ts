import {AccountViewModel} from "./AccountViewModel";

export class AccController {
    vm = new AccountViewModel();

    constructor(private acc, private $state) { }

    changePass() {
        this.acc.changePass(this.vm).then(() => {
            this.vm.reset();
        }, err => console.error(err))
    }

    deleteAccount() {
        this.acc.deleteAccount();
    }
}
