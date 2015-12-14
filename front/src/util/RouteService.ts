
export class RouteService {
    constructor(private location) {}

    home() {
        this.location.hash = "/";
    }

    login() {
        this.location.hash = "/login";
    }

    register() {
        this.location.hash = "/register";
    }
}
