import {AuthService} from "../auth/AuthService";

export class NavbarCtrl {

    constructor(private auth:AuthService) {
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    username() {
        return this.auth.user.username;
    }

    logout = () => {
        this.auth.logout();
    };
}
