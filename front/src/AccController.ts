
class AccountViewModel {
    password = "";
    newPassword = "";
}

export class AccController {
    vm = new AccountViewModel();

    constructor(private $state, private $http) {

    }

    changePass() {
        this.$http.put("/api/account", this.vm).then(res => {
            console.log(res.data);
            this.$state.go("home");
        }, err => console.error(err));
    }
}
