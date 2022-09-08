export function setUserData(data) {
    return localStorage.setItem('user', JSON.stringify(data));
}
export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}
export function clearUserData() {
    return localStorage.removeItem('user');
}
export function getToken() {
    const user = getUserData();
    if (user) {
        return user.token;
    } else {
        return null;
    }
}