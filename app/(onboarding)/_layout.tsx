import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const Onboarding = () => {
    return (
       <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='Step1'/>
        <Stack.Screen name='Step2'/>
        <Stack.Screen name='Step3'/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default Onboarding;
