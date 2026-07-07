import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
const CourseLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='courses' options={{headerShown:false}}/>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default CourseLayout;
