export function setUser(user, token) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserToken() {
    return localStorage.getItem('userToken');
}

export function getUser() {
    return localStorage.getItem('user');
}

export function delUserData() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
}