import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import config from '../config/config';
const {LOGIN_URL} = config;

class Authentication {

    // mainRef = firebase.database().ref('/');


    constructor() {
        try {
            AsyncStorage.getItem("user_data")
                .then((value) => {
                    this.user = JSON.parse(value);
                });
        } catch (error) {
            // Error retrieving data
            throw(error);
        }
    }


    doLogin(obj) {
        let form = new FormData();
        form.append('username',obj.email);
        form.append('password',obj.password);

        return fetch(`${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: form
        })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log('fetch Erro Sign up: ' + error);
                error.errors = true;
                return error;
            });
    }

    createAccount(obj) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        reject('Email Already Exist', 'The email address is already in use by another account.')
                    }
                }).then((data) => {
                    let user = firebase.auth().currentUser;

                    user.updateProfile({
                        displayName: obj.username,
                        isActive : true
                    }).then(function() {
                        resolve('Congratulations! ', `An email is sent to ${data.email} for verification`);
                        // Update successful.
                    }).catch(function(error) {
                        // An error happened.
                        console.log('failed',error);
                    });
                });
        })
    }
    sendEmail() {
        let user = firebase.auth().currentUser;
        let _this = this;
        user.sendEmailVerification().then(function () {
            resolve('Congratulations! ', `An email is sent to ${user.email} for verification`);
        }).catch(function (error) {
            console.log("Error ", error);
        });
    }
    doLogOut(){

        try {
            AsyncStorage.removeItem('cookie',()=>{
                this.user = null;
                Actions.login();
            });
        } catch (error) {
            // Error saving data
            throw(error);
        }

    }
    getUserInfo(){
        return this.user;
    }
}





export let authentication = new Authentication();
