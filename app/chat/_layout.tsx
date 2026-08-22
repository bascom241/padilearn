import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const ChatLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='[id]' options={{headerShown:false}}/>
        <Stack.Screen name='new' options={{headerShown:false}}/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default ChatLayout;
