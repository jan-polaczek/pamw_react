import { handleResponse } from "./handleResponse";
import { urls } from "./config";

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

export const authenticationService = {
    login,
    logout,
    currentUser,
};

export const packageService = {
    getPackages,
    incrementPackageStatus
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(urls.apiPath + urls.authPath, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUser = user;
            window.location.reload();
            return user;
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.reload(true);
}

function getPackages() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.access_token }
    };

    return fetch(urls.apiPath + urls.packagesPath, requestOptions)
        .then(handleResponse)
        .then(packages => packages);
}

function incrementPackageStatus(packageData) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.access_token }
    };

    const incrementUrl = packageData._links.increment_status

    return fetch(urls.apiPath + incrementUrl, requestOptions)
        .then(handleResponse)
        .then(result => result);
}
