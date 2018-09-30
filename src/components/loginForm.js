import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import appStyle from "../assets/style";
import ValidationComponent from "react-native-form-validator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";

export default class LoginForm extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "zm@gmail.com",
            password: "123123123",
            height: 0,
            shouldDisableButton: false,
            error: false
        };
    }
    loginSubmit = () => {
        if (
            this.validate({
                username: { required: true },
                password: { required: true }
            })
        ) {
            Actions.dashboard();
        } else {
            Alert.alert("Error", "Enter Username and Password");
            this.setState({ error: true });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
                    <View style={{ margin: 20 }}>
                        <TextInput
                            underlineColorAndroid={"transparent"}
                            style={[styles.input]}
                            placeholder="Username"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            borderColor="rgba(0, 0, 0, .4)"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={username =>
                                this.setState({ username })
                            }
                            value={this.state.username}
                        />
                        <TextInput
                            underlineColorAndroid={"transparent"}
                            style={[styles.input]}
                            placeholder="Password"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            secureTextEntry={true}
                            borderColor="rgba(0, 0, 0, .4)"
                            returnKeyType="go"
                            ref={input => (this.passwordInput = input)}
                            onChangeText={password =>
                                this.setState({ password })
                            }
                            value={this.state.password}
                            onSubmitEditing={this.loginSubmit}
                        />
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this.loginSubmit}
                        >
                            <Text style={styles.button}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: "white"
    },
    input: {
        height: 40,
        margin: 10,
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 20
    },
    heading: {
        textAlign: "center",
        fontSize: 20,
        color: appStyle.buttonColor,
        fontWeight: "bold"
    },

    buttonContainer: {
        backgroundColor: appStyle.buttonColor,
        height: 40,
        justifyContent: "center",
        borderRadius: 20,
        margin: 10
    },
    button: {
        textAlign: "center",
        color: "#rgba(255, 255, 255, 0.9)",
        fontWeight: "700"
    },
    signUptext: {
        textAlign: "center",
        color: "#rgb(255, 255, 255)",
        backgroundColor: "transparent",
        fontWeight: "300",
        marginBottom: 5
    },
    visi: {
        textAlign: "center",
        color: "#rgb(255, 255, 255)",
        backgroundColor: "transparent",
        fontWeight: "300",
        marginBottom: 5,
        borderColor: "rgba(0,0,0,0.5)"
    }
});
