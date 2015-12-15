
export class ToastService {

    static $inject = ["$mdToast"];
    constructor(private $mdToast) {

    }

    show(message: string) {
        this.$mdToast.show({
            template: "<md-toast>" + message + "</md-toast>"
        });
    }
}
