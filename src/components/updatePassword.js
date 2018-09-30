import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DashboardHeader from "../components/header";
import { connect } from "react-redux";
import AuthAction from "../store/actions/auth";
import appStyles from "../assets/style";
import { CustomInput } from "./common";

class UpdatePass extends Component {
    constructor() {
        super();
        this.state = {
            old: "",
            new: "",
            confirm: ""
        };
    }
    

    verifyPassword = () => {
        if (
            this.state.new !== "" &&
            this.state.confirm !== ""
        ) {
            if(this.state.new === this.state.confirm){
                this.props.updatePassword({
                    password: this.state.confirm,
                    username: this.props.username
                });
            }else {
                Alert.alert("Error", "New and Confirm passowrd don't match ")
            }
            
        }else {
            Alert.alert("Error", "All Fields are Required")
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <DashboardHeader
                        iconName="navicon"
                        goto={Actions.drawerOpen}
                    />
                </View>

                <View
                    style={{
                        flex: 2,
                        justifyContent: "center",
                        alignContent: "center"
                    }}
                >
                    <KeyboardAwareScrollView
                                keyboardShouldPersistTaps="always"
                                ref="scroll"
                                style={{ margin: 23 }}
                            >
                                <CustomInput
                                    label="New Password:"
                                    secure={true}
                                    value={this.state.new}
                                    returnKeyType="next"
                                    changeHandler={value =>
                                        this.setState({ new: value })
                                    }
                                />
                                <CustomInput
                                    label="Confirm Password:"
                                    secure={true}
                                    value={this.state.confirm}
                                    returnKeyType="done"
                                    changeHandler={value =>
                                        this.setState({ confirm: value })
                                    }
                                    onSubmitAction={this.verifyPassword}
                                />

                                <Text> {"\n"}</Text>
                                <Button
                                    block
                                    rounded
                                    style={{backgroundColor : appStyles.buttonColor}}
                                    onPress={this.verifyPassword}
                                >
                                    <Text> Submit </Text>
                                </Button>
                            </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appStyles.appColor
    },
    row: {
        margin: 20,
        flexDirection: "row"
    }
});

const mapStateToProps = state => ({
    isLoading: state.authReducer.isLoading,
    username: state.authReducer.username
});

const mapDispatchToProps = dispatch => {
    return {
        updatePassword: state => dispatch(AuthAction.updatePassword(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePass);
