// This folder used to connect with server

import config from '../config/config.js';
const { AUTH_URL, API_URL } = config;

const login = (user) => {
    return { email: user['username'], password: user['password'] }
};

let signup = (user) => {
    return { username: user['username'], email: user['email'], password: user['password'], gender: user['gender'], accountType: user['accountType'] }
};

let authHelpers = {
    createAccountRequest: function (data) {
        return fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signup(data))
        })
            .then(function (response) {
                return response.json();
            })
            // .then((responseJson) => {
            //     return JSON.parse(responseJson);
            // })
            .catch(function (error) {
                console.log('fetch Erro Sign up: ' + error);
                // ADD THIS THROW error
                error.errors = true;
                return error;
            });
    },
    loginRequest: function (data) {

        return fetch(`${AUTH_URL}/local`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login(data))
        })
            .then(function (response) {
                return response.json();
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch(function (error) {
                console.log('fetch Erro Login: ' + error);
                // ADD THIS THROW error
                return error;
            });
    },
    forgotPasswordRequest: function (email) {
        return fetch(`${API_URL}/users/sendforgotemail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : email})
        })
            .then(function (response) {

                return response.json();
            })
            .then((responseJson) => {

                return responseJson;
            })
            .catch(function (error) {
                console.log('fetch Erro sendForgotEmail: ' + error);
                // ADD THIS THROW error
                return error;
            });
    },
    createPost: function (obj) {
        return fetch(`${API_URL}/users/addPost`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid : obj.uid, text: obj.post})
        })
            .then(function (response) {
                return response.json();
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch(function (error) {
                console.log('fetch Erro AddPost: ' + error);
                // ADD THIS THROW error
                return error;
            });
    },
    getAllUser: function () {
        return fetch(`${API_URL}/users/`, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then((responseJson) => {
                return responseJson
            })
            .catch(function (error) {
                console.log('fetch Erro AllUsers: ' + error);
                // ADD THIS THROW error
                return error;
            });
    }
};
export default authHelpers;