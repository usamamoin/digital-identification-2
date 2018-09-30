import React from "react";
import { Text, View } from "react-native";
import { Item, Input, Label } from "native-base";

export function CustomInput(props) {
    return (
        <View style={{ margin: 2 }}>
            <Item>
                <Label style={{ fontWeight: "100", color  : props.textColor ? props.textColor : 'white', fontSize : props.fontSize }}>{props.label}</Label>
                <Input
                    keyboardType={props.type}
                    value={props.value}
                    secureTextEntry={props.secure}
                    returnKeyType={props.returnKeyType}
                    placeholder={props.placeholder}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    onChangeText={val => props.changeHandler(val)}
                    onSubmitEditing={props.onSubmitAction}
                    onBlur={props.onBlurAction}
                    onFocus={props.onFocusAction}
                />
            </Item>
        </View>
    );
}

export function InputWithOutLabel(props) {
    return (
        <View style={{ margin: 2 }}>
            <Item style={{ width: 100 }}>
                <Input
                    keyboardType={props.type}
                    value={props.value}
                    onChangeText={val => props.changeHandler(val)}
                />
            </Item>
        </View>
    );
}
