
export class AuthService {
    user = null;

    constructor(private $http, private $state) {}

    init() {
        this.getAccount().then(account => {
            this.user = account;
        }, () => this.logout())
    }

    getAccount() {
        return this.$http.get("/api/account").then(res => res.data);
    }

    register(userPass) {
        return this.$http.post("/api/account/register", userPass)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.user = res.data.account;
            });
    }

    login(userPass) {
        return this.$http.post("/api/account/login", userPass)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.user = res.data.account;
            });
    }

    logout() {
        localStorage.removeItem("token");
        this.user = null;
        this.$state.go("home", null, {reload: true});
    }

    isAuthenticated() {
        return this.user !== null;
    }
}
