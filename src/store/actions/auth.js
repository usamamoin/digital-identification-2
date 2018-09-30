import { AsyncStorage, Alert, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import { ActionType } from "./../actions";
import { login } from "../../utils/api-call";
import { actionDispatch } from "../../utils/return-obj";

export default class AuthAction {
    static LoginState(obj) {
        return dispatch => {
            dispatch(actionDispatch(ActionType.LOGIN));
            login(obj, "")
                .then(async success => {
                    if (success.error) throw success.error;
                    success.username = obj.username;
                    await AsyncStorage.setItem(
                        "cookie",
                        JSON.stringify({
                            cookie: success.cookie,
                            username: obj.username
                        })
                    );
                    dispatch(actionDispatch(ActionType.LOGIN_SUCCESS, success));
                    Keyboard.dismiss();
                    Actions.dashboard({ user: success });
                })
                .catch(error => {
                    Alert.alert("Error", error);
                    dispatch(actionDispatch(ActionType.LOGIN_FAIL, error));
                });
        };
    }

    static updatePassword(obj) {
        return dispatch => {
            dispatch(actionDispatch(ActionType.UPDATE_PASSWORD));
            login(obj, "/EditPassword")
                .then(async response => {
                    if (response.error) throw response.error;

                    dispatch(
                        actionDispatch(
                            ActionType.UPDATE_PASSWORD_SUCCESS,
                            response
                        )
                    );
                    Alert.alert("Success", response.success, [
                        {
                            text: "OK",
                            onPress: () => {
                                Actions.landing();
                            }
                        }
                    ]);
                })
                .catch(error => {
                    Alert.alert("Error", "Invalid password");
                    dispatch(
                        actionDispatch(ActionType.UPDATE_PASSWORD_FAIL, error)
                    );
                });
        };
    }

    static forgotPassword() {
        return dispatch => {
            dispatch(actionDispatch(ActionType.FORGOT_PASSWORD));
            login("api-token-auth/", obj)
                .then(async success => {
                    // console.log("success", success);
                    // await AsyncStorage.setItem('token', JSON.stringify(success.token))
                    // await AsyncStorage.setItem('user', JSON.stringify(success.user))
                    dispatch(
                        actionDispatch(
                            ActionType.FORGOT_PASSWORD_SUCCESS,
                            success
                        )
                    );
                    // Actions.deck({ user: success })
                })
                .catch(error => {
                    console.log("error in auto login", error);
                    dispatch(
                        actionDispatch(ActionType.FORGOT_PASSWORD_FAIL, error)
                    );
                });
        };
    }

    static LogOut = () => {
        return async (dispatch, state) => {
            dispatch(actionDispatch(ActionType.LOGOUT));
            if(state().authReducer.cookie !== null){
                await AsyncStorage.removeItem("cookie");
                dispatch(actionDispatch(ActionType.LOGOUT_SUCCESS));
                Actions.login();
            }else {
                dispatch(actionDispatch(ActionType.LOGOUT_SUCCESS));
                Actions.login();
            }
        };
    };

    static isLoggedIn = username => {
        return async dispatch => {
            if (!username || username == "") {
                const data = await AsyncStorage.getItem("cookie");
                if (!data) {
                    dispatch(AuthAction.LogOut());
                } else {
                    data = JSON.parse(data);
                    dispatch(actionDispatch(ActionType.LOGIN_SUCCESS, data));
                }
            }
        };
    };
}
