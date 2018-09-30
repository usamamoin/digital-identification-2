import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableNativeFeedback
} from "react-native";
// import Modal from "react-native-modal";
import Block from "../components/block";
import { Button, Icon } from "native-base";
import { Actions } from "react-native-router-flux";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.tagSelected = this.tagSelected.bind(this);
        this.renderButton = this.renderButton.bind(this);

        this.state = {
            displayShare: false,
            dataToShare: [],
            shareClicked: false
        };
    }

    tagSelected = val => {
        console.log("Tag selected");

        this.state.dataToShare.push(val);
        this.setState({
            displayShare: true
        });

        console.log(this.state.dataToShare);
    };

    showQRcode = () => {
        console.log("Function called");
        this.setState({ shareClicked: !this.state.shareClicked });
    };

    renderButton = () => {
        if (this.state.displayShare == true) {
            return (
                <TouchableNativeFeedback>
                    <View
                        style={{
                            bottom: 5,
                            left: "15%",
                            width: "70%",
                            height: "7%",
                            backgroundColor: "rgb(38,19,72)",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "white",
                                elevation: 1
                            }}
                        >
                            SHARE YOUR TAGS
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            );
        } else {
            return null;
        }
    };

    render() {
        let displayShareButt = "none";
        if (this.state.displayShare == true) {
            displayShareButt = "block";
        }
        console.log(displayShareButt);

        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 2,
                        backgroundColor: "orange"
                    }}
                >
                    <Button
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: "rgb(38,19,72)",
                            position: "absolute",
                            bottom: 25,
                            right: 25
                        }}
                        title="Submit"
                        block
                        primary
                        onPress={() => { Actions.scanner() }}
                    >
                        <Icon
                            type="Entypo"
                            name="camera"
                            style={{
                                fontSize: 17,
                                color: "#fff"
                            }}
                        />
                    </Button>
                </View>
                <View
                    style={{
                        width: "100 %",
                        flex: 1,
                        backgroundColor: "orange",
                        //borderBottomLeftRadius: "50%"
                        borderBottomLeftRadius:
                            Math.round(Dimensions.get("window").width) / 2,
                        borderBottomRightRadius:
                            Math.round(Dimensions.get("window").width) / 2
                    }}
                />

                <View
                    style={{
                        flex: 1,
                        //  backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ImageBackground
                        style={{
                            height: 100,
                            width: 100,
                            backgroundColor: "blue",
                            top: -35,
                            borderRadius: 50
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 10
                    }}
                >
                    <ScrollView>
                        <View
                            style={{
                                paddingTop: 20,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingLeft: 35,
                                paddingRight: 35,
                                paddingBottom: 10
                            }}
                        >
                            <Block
                                title="Hello World"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                            <Block
                                title="Hello World1"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingLeft: 35,
                                paddingRight: 35,
                                paddingBottom: 10
                            }}
                        >
                            <Block
                                title="Hello World21"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                            <Block
                                title="Hello World12"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingLeft: 35,
                                paddingRight: 35,
                                paddingBottom: 10
                            }}
                        >
                            <Block
                                title="Hello World213123"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                            <Block
                                title="Hello World1231231"
                                tagType="Education"
                                onTagClick={this.tagSelected}
                            />
                        </View>
                    </ScrollView>
                </View>
                {this.state.displayShare && (
                    <TouchableNativeFeedback onPress={() => this.showQRcode()}>
                        <View
                            style={{
                                bottom: 5,
                                left: "15%",
                                width: "70%",
                                height: "7%",
                                backgroundColor: "rgb(38,19,72)",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    elevation: 1
                                }}
                            >
                                SHARE YOUR TAGS
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(249,249,249)"
    },
    backgroundStyle: {
        height: "60%",
        resizeMode: "contain",
        justifyContent: "center"
    }
});
