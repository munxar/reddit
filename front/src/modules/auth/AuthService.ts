
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

    static $inject = ["$http", "$q"];
    constructor(private $http:ng.IHttpService, private $q:ng.IQService) {

    }

    init() {
        this.getAccount().then(account => {
            this.user = account;
        }, () => this.logout())
    }

    getAccount() {
        return this.$http.get<IAccount>("/api/account")
            .then(res => res.data);
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
            });
    }

    logout() {
        // not really necessary, but all other methods return a promise,
        // so to be concise we return one here to.
        var q = this.$q.defer();

        // remove token and clean user data
        localStorage.removeItem("token");
        this.user = {_id: null, username: ""};

        // resolve and return
        q.resolve();
        return q.promise;
    }

    isAuthenticated() {
        return this.user._id !== null;
    }
}
