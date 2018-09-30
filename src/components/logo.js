import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import logo from '../assets/images/logo.jpg'
export default function Logo(props) {

    return (
        <View style={styles.container}>
            <Animated.Image source={logo} style={[styles.logo, { height: props.imageHeight }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo: {
        width: 330,
        height: 80
    }
});
