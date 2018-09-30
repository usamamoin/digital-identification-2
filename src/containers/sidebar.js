import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Icon } from "native-base";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import AuthAction from "../store/actions/auth";
import { getAdjustedFontSize } from "../components/common/scaling";
// import appStyles from '../assets/style'

class SideBar extends Component {
    constructor(props) {
        super(props);
        // Actions.drawerOpen();
        // this.props.isLoggedIn(this.props.username);
    }
    goTo = (route, go) => {
        if (Actions.prevScene == route) {
            Actions.drawerClose();
        } else {
            go();
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    {/* <Text style={styles.heading}>App </Text> */}
                    <Text style={{ fontSize: getAdjustedFontSize(18) }}>
                        ORDER MANAGEMENT
                    </Text>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={() => {
                            this.goTo("landing", Actions.landing);
                        }}
                    >
                        <Icon
                            style={styles.icon}
                            name="ios-home"
                            color="#000000"
                        />
                        <Text style={styles.text}>DASHBOARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={() => {
                            this.goTo("updatepass", Actions.updatepass);
                        }}
                    >
                        <Icon
                            style={styles.icon}
                            type="FontAwesome"
                            name="unlock-alt"
                            color="#000000"
                        />

                        <Text style={styles.text}>UPDATE PASSWORD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={this.props.LogOut}
                    >
                        <Icon
                            style={styles.icon}
                            name="ios-power"
                            color="#000000"
                        />
                        <Text style={styles.text}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff"
    },
    top: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        flex: 4
    },
    heading: {
        width: 150,
        height: 160
    },
    icon: {
        fontSize: 25,
        marginLeft: 10,
        textAlign: "center",
        color: "rgba(0,0,0,1)"
    },
    text: {
        marginLeft: 15,
        fontWeight: "200",
        fontSize: getAdjustedFontSize(14),
        color: "rgba(0,0,0,1)"
    },
    options: {
        backgroundColor: "transparent",
        flexDirection: "row",
        height: 50,
        marginLeft: 5,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.3)"
    }
});

const mapStateToProps = state => ({
    username: state.authReducer.username
});
const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: state => dispatch(AuthAction.isLoggedIn(state)),
        LogOut: () => dispatch(AuthAction.LogOut())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar);
