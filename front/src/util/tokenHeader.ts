
export function tokenHeader(xhr) {
    var token = localStorage.getItem("token");
    if(token) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
    }
}
