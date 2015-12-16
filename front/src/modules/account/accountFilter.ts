
/**
 * user account filter
 * display username if existing, (deleted account) if nullable
 * @returns {function(any): string}
 */
export function accountFilter() {
    return function(value) {
        return value ? value : "(deleted account)"
    }
}
