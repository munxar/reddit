
export function accountFilter() {
    return function(value) {
        return value ? value : "(deleted account)"
    }
}
