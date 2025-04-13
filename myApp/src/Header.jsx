import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.AppiconContainer}>
        <Image source={require("../Appicon.png")} style={styles.Appicon} />
      </View>
      <Image source={require("../girl.png")} style={styles.girl} />
      <Text>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  AppiconContainer: {
    backgroundColor: "#FFFFFF",
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  Appicon: {
    height: 28,
    width: 28,
  },
  girl: {
    height: 44,
    width: 44,
  },
});
