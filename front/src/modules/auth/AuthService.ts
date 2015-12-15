interface IAccount {
    _id: string;
    username: string;
}

interface ITokenAccount {
    token: string;
    account: IAccount;
}

export class AuthService {
    user:IAccount = {_id: null, username: ""};

    static $inject = ["$http", "$q", "toaster"];

    constructor(private $http:ng.IHttpService, private $q:ng.IQService, private toaster) {

    }

    init() {
        return this.$http.get<IAccount>("/api/account")
            .then(res => {
                this.user = res.data;
                return this.user;
            }, () => {
                this.logout();
                return this.$q.reject();
            })
    }

    register(userPass) {
        return this.$http.post<ITokenAccount>("/api/account/register", userPass)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.user = res.data.account;
            });
    }

    login(userPass) {
        return this.$http.post<ITokenAccount>("/api/account/login", userPass)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.user = res.data.account;
                return this.user;
            });
    }

    logout() {
        // remove token and clean user data
        localStorage.removeItem("token");
        this.user = {_id: null, username: ""};
    }

    isAuthenticated() {
        return this.user._id !== null;
    }
}
