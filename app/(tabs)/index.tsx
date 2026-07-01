import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={{fontFamily:"OnestBold"}}>Welcome Home </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1, 
    alignItems: "center",
    justifyContent:"center"
  }
})

export default HomeScreen ;
