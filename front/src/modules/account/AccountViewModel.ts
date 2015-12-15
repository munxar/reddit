
export class AccountViewModel {

    password:string;
    newPassword:string;
    newPasswordConfirm: string;

    constructor() {
        this.reset();
    }

    reset() {
        this.password = "";
        this.newPassword = "";
        this.newPasswordConfirm = "";
    }
}
