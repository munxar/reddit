/**
 * wrapper service for $mdToast
 */
export class ToastService {

    static $inject = ["$mdToast"];
    constructor(private $mdToast) {

    }

    /**
     * show a toast message
     * @param message
     */
    show(message: string) {
        this.$mdToast.show({
            template: "<md-toast>" + message + "</md-toast>"
        });
    }
}
