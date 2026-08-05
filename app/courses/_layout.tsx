import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const CourseLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='[id]'/>
        <Stack.Screen name='lesson/[id]'/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default CourseLayout;
