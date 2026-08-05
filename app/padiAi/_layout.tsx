import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const PadiAilayout = () => {
  return (
    <Stack 
        screenOptions={{
            headerShown: false, 
            animation:"slide_from_left"
        }}
    >

        <Stack.Screen
            name='index'
            options={{title:"AI Study Assitance"}}
        />

        <Stack.Screen
            name='[padiAIid]'
            options={{title:"Learning Session"}}
        />

    </Stack>
  )
}

export default PadiAilayout