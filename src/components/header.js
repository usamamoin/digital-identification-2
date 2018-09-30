/**
 * Created by zainmustafa on 29/03/2018.
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";

import { Icon, Button } from "native-base";
import appStyles from "../assets/style";
import { Actions } from "react-native-router-flux";

class DashboardHeader extends Component {
    render() {
        const { title } = Actions.currentParams;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Button
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.goto();
                        }}
                        transparent={true}
                    >
                        <Icon
                            type="FontAwesome"
                            style={styles.btnIconsHeader}
                            name={this.props.iconName}
                            size={23}
                        />
                    </Button>
                    {title !== "Home" && (
                            <Button
                                onPress={() => {
                                    Actions.pop();
                                }}
                                transparent={true}
                            >
                                <Icon
                                    type="Ionicons"
                                    style={styles.btnIconsHeader}
                                    name="ios-arrow-back"
                                    size={23}
                                />
                            </Button>
                        )}
                </View>
                <View
                    style={{
                        flex: 4,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{ fontSize: 20, color: appStyles.buttonColor }}
                    >
                        {title}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    {/* <Icon type="MaterialCommunityIcons" style={styles.btnIconsHeader} name="bell" size={15} /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: appStyles.headerColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    btnIconsHeader: {
        marginHorizontal: 17,
        color: appStyles.buttonColor
    }
});

export default DashboardHeader;
