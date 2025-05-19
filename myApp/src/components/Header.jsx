import { StyleSheet,View,text }  from "react-native";
import React, { Component } from "react";
const Header = () => {
    return (
        <view>
            <View style={styles.AppiconContainer}>
            <image source={require("./Appicon.png")} style={styles.Appicon} />
            </View>
            <image source={require("./dp.png")} style={styles.dp}/>
            <text>Header</text>
        </view>
    );

};
export default Header;
const styles= StyleSheet.create({
    AppiconContainer: {
        backgroundColor:"#FFFFFF",
        height:44,
        width: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignContent: "center",
    },
Appicon: {
     height: 28,
     width:28,
}
}); 
