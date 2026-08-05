import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const AuthLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login'/>
        <Stack.Screen name='Register'/>
        <Stack.Screen name='VerifyEmail'/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default AuthLayout;
