import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "../components/loginForm";
import { Text } from "native-base";
import appStyle from "../assets/style";
import { connect } from "react-redux";
import AuthAction from "../store/actions/auth";
import Loader from "../components/common/loader";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.props.isLoading} />
                <View style={styles.top}>
                    <Text style={styles.title}>Digital Identity</Text>
                </View>
                <LoginForm {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center"
    },
    title: {
        color: appStyle.appColor,
        fontSize: 30
    },
    top: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapStateToProps = state => ({
    isLoading: state.authReducer.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        Login: state => dispatch(AuthAction.LoginState(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
