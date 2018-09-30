// This folder used to connect with server
import * as firebase from 'firebase';

import config from '../config/config.js';
const { AUTH_URL, API_URL } = config;


const login = (user) => {
    return { email: user['username'], password: user['password'] }
};

let signup = (user) => {
    return { username: user['username'], email: user['email'], password: user['password'], gender: user['gender'], accountType: user['accountType'] }
};

let chatHelpers = {
    getChatUsers: function (userId) {
        return firebase.database().ref(`/dailylogs/${userId}`).on("value", (snapshot) => {
            let obj = {};
            const form = snapshot.val();
            obj = { message: "success", code: 200, payload: form };
            return obj;
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
                console.log('There has been a problem with your fetch operation: ' + error);
                // ADD THIS THROW error
                throw error;
            });
    },
    forgotPasswordRequest: function (email) {
        return fetch(`${API_URL}/users/sendforgotemail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
            .then(function (response) {
                console.log("response", response);
                return response.json();
            })
            .then((responseJson) => {
                console.log("responseJson", responseJson);
                return responseJson;
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error);
                // ADD THIS THROW error
                throw error;
            });
    }
}
export default chatHelpers;