
run.$inject = ["auth", "toaster"];
export function run(auth, toaster) {

    auth.autologin().then(account => {
        toaster.show("welcome " + account.username);
    }, () => {
        toaster.show("welcome to linkit");
    });
}
