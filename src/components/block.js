import React, { Component } from "react";
import {
    View,
    Button,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
const checkImage = require("./../assets/images/check.png");

export default class Block extends Component {
    constructor(props) {
        super(props);
        this.state = { isSelected: false };
    }

    SampleFunction = () => {
        if (this.state.isSelected == false) {
            this.setState({
                isSelected: true
            });
        } else {
            this.setState({
                isSelected: false
            });
        }
        this.props.onTagClick(this.props.tagType + ":" + this.props.title);
        // Alert.alert("On Long Press Activated on Button")
    };

    render() {
        const isSelected = this.state.isSelected;
        let imageSource = require("../assets/images/education.png");
        let colorCode = "rgb(230, 230, 230)";
        let imageTint = "rgb(38,19,72)";
        if (isSelected) {
            colorCode = "#8BC34A";
            imageSource = checkImage;
            imageTint = "white";
        } else {
        }

        return (
            <TouchableOpacity
                style={{
                    width: "48.5%",
                    height: 170,
                    backgroundColor: "white",
                    elevation: 1
                }}
                onLongPress={event => {
                    this.SampleFunction();
                }}
                activeOpacity={0.9}
            >
                <View>
                    <View
                        style={{
                            height: 60,
                            width: 60,
                            backgroundColor: colorCode,
                            borderRadius: 30,
                            marginTop: 20,
                            marginLeft: 20,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Image
                            source={imageSource}
                            style={{
                                width: 50,
                                height: 50,
                                resizeMode: "center",
                                tintColor: imageTint
                            }}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            paddingTop: 20,
                            marginHorizontal: 15
                        }}
                    >
                        <Text>{this.props.title}</Text>
                        <Text
                            style={{
                                fontSize: 10
                            }}
                        >
                            Last Updated 28/9/2018
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
