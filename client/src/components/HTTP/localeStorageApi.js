export function setUser(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userToken', token);
    /* localStorage.setItem('userName', JSON.stringify(userName)); */
}

export function updateUserLocalStorage(user) {
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