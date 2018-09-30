import { handleApiErrors } from "./api-errors";
import config from '../config/config.js';
const {  AUTH_URL, API_URL } = config;


function processRequest(request) {
    return (request
        .then(response => handleApiErrors(response))
        .then(response => response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
          }))
        .then(json => json)
        .catch(error => {
            console.log("catching error")
            console.log(error)
            throw (error && error.status) ? error.status : "NETWORK ERR";
        })
    )
}


export function get(path, Cookie) {
    const API_REQ_URL = API_URL + path;
    const request = fetch(API_REQ_URL, {
        method: 'GET',
        "Cookie" : "PHPSESSID="+Cookie
    })
    return processRequest(request)
}

export function post(path, body, Cookie) {
    const API_REQ_URL = API_URL + path;
    const request = fetch(API_REQ_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            "Cookie" : "PHPSESSID="+Cookie
        },
        body

    })
    return processRequest(request)

}

export function put(path, token, obj) {
    const API_REQ_URL = `${API_BASE_URL}/${path}/`
    const request = fetch(API_REQ_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(obj)

    })
    return processRequest(request)
}

export function login(obj, route) {
    let form = new FormData();
    form.append('username',obj.username);
    form.append('password',obj.password);
    const API_REQ_URL = AUTH_URL + route;
    const request = fetch(API_REQ_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: form
    })
    return processRequest(request)

}
