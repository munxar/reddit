interface IAccount {
    _id: string;
    username: string;
}

interface ITokenAccount {
    token: string;
    account: IAccount;
}

/**
 * service for authentication managemant
 */
export class AuthService {
    user:IAccount = {_id: null, username: ""};

    static $inject = ["$http", "$q", "toaster"];
    constructor(private $http:ng.IHttpService, private $q:ng.IQService, private toaster) {

    }

    /**
     * if a token is present, try to get user info.
     * if this fails, we asume a invalid token so we cleanup user infos.
     * @returns {IPromise<IAccount>}
     */
    autologin() {
        return this.$http.get<IAccount>("/api/account")
            .then(res => {
                this.user = res.data;
                return this.user;
            }, () => {
                this.logout();
                return this.$q.reject();
            })
    }

    /**
     * register a user by username ans password
     * @param userPass
     * @returns {IPromise<TResult>}
     */
    register(userPass) {
        return this.$http.post<ITokenAccount>("/api/account/register", userPass)
            .then(this.storeUserAndToken);
    }

    /**
     * login a user with username ans password
     * @param userPass
     * @returns {IPromise<IAccount>}
     */
    login(userPass) {
        return this.$http.post<ITokenAccount>("/api/account/login", userPass)
            .then(this.storeUserAndToken);
    }

    /**
     * logout the user
     * cleanup user object and token
     */
    logout() {
        // remove token and clean user data
        localStorage.removeItem("token");
        this.user = {_id: null, username: ""};
    }

    /**
     * check if a user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.user._id !== null;
    }

    private storeUserAndToken = res => {
        localStorage.setItem("token", res.data.token);
        this.user = res.data.account;
        return this.user;
    };
}
