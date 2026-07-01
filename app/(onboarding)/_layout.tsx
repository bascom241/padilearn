import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const Onboarding = () => {
    return (
       <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='(onboarding)' options={{headerShown:false}}/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default Onboarding;
