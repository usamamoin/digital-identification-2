import React, { Component } from 'react'

import { View, Image, Text, Linking, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from 'expo';
import DashboardHeader from '../../components/header';
import {Actions} from 'react-native-router-flux'

export default class Chapter1 extends Component {
    render() {
        return (

        <View >
            <TouchableWithoutFeedback hideOnBackdropPress={true}  >
                        <DashboardHeader iconName="navicon" goto={Actions.drawerOpen} />
            </TouchableWithoutFeedback>

        <View>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 800
                }}
            />
            
            {/* Paste the code below */}

            
            <Text style={{alignItems: "center",fontSize: 20,marginTop: 20,textAlign: 'center',color: 'white',backgroundColor : 'transparent',}}>
                Paste the content here
            </Text>

        </View>
            

        </View>
        )
    }
}