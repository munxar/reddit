// convenient array util methods

/**
 * add a element to an array if not existing, yet
 * @param array
 * @param element
 * @returns {boolean} true if added, false if not added
 */
export function addUnique<T>(array: T[], element: T) {
    var idx = array.indexOf(element);
    // if element no present
    if(idx == -1) {
        // add it
        array.push(element);
        return true;
    }
    return false;
}

/**
 * remove a element from a array, if existing
 * @param array
 * @param element
 * @returns {boolean} true if removed, false else
 */
export function removeElement<T>(array: T[], element: T) {
    var idx = array.indexOf(element);
    if(idx != -1) {
        array.splice(idx, 1);
        return true;
    }
    return false;
}