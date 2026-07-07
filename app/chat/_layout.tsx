import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const ChatLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='chat' options={{headerShown:false}}/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default ChatLayout;
