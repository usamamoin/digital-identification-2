import React, {PureComponent} from "react";
import { View, StatusBar } from "react-native";
import Routes from "./src/routes.js";
import SplashScreen from "react-native-splash-screen"
require('core-js/es6/array')


export default class App extends PureComponent {
    
    componentDidMount(){
        SplashScreen.hide();
    }
    render(){
        return (
            <View style={{ flex: 1, backgroundColor: "#7f0aa3" }}>
                <StatusBar backgroundColor="#7f0aa3" barStyle="light-content" />
                <Routes />
            </View>
        );
    }
}

