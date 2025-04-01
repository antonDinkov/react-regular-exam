export function setUser(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userToken', token);
    /* localStorage.setItem('userName', JSON.stringify(userName)); */
}

export function setLiked(postId) {
    localStorage.setItem(`liked-${postId}`, "true");
}

export function getLiked(postId) {
    return localStorage.getItem(`liked-${postId}`);
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