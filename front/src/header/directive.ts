var template = require("./header.html!text");

export function header() {
    return {
        replace: true,
        template
    };
}