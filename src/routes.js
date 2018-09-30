// app/index.js

import React, { Component } from "react";
import { Router, Scene, Actions, ActionConst } from "react-native-router-flux";
// import "./config/fbConfig.js";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { Login, Landing, SideBar } from "./containers";
import scanner from "./containers/scanner"

import {
    UpdatePass
} from "./components";

export default class Routes extends Component {
    onBackPress = () => {
        Actions.pop();
        return true;
    };

    render() {
        return (
            <Provider store={store}>
                <Router backAndroidHandler={this.onBackPress}>
                    <Scene key="root">
                        <Scene
                            key="login"
                            component={Login}
                            hideNavBar={true}
                            type={ActionConst.RESET}

                        />

                        <Scene
                            key="dashboard"
                            drawer
                            contentComponent={SideBar}
                            type={ActionConst.RESET}
                            drawerPosition="left"
                            tapToClose={true}
                            hideNavBar={true}
                            initial
                        >
                            <Scene key="main">
                                <Scene
                                    type={ActionConst.REPLACE}
                                    key="landing"
                                    title="Home"
                                    component={Landing}
                                    hideNavBar={true}
                                    initial
                                />

                                <Scene
                                    type={ActionConst.REPLACE}
                                    key="scanner"
                                    title="Scanner"
                                    component={scanner}
                                    hideNavBar={true}
                                    initial
                                />

                            </Scene>
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}
