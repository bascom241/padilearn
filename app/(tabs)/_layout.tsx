import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Clean, senior-dev Lucide icons instead of default web elements or generic symbols
import { 
  Compass, 
  BookOpen, 
  User, 
  Home
} from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const activeColor = colorScheme === 'dark' ? '#230444' : '#110023';
  const inactiveColor = colorScheme === 'dark' ? '#64748b' : '#73868e';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: -0.1,
          fontFamily: "OnestMedium",
          paddingBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#1e293b' : '#e6ecee',
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
        },
      }}>
      
      {/* 1. Learning Dashboard Core */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={27} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, focused }) => (
            <BookOpen
              size={27} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2} 
            />
          ),
        }}
      />
      
      {/* 2. Course Discovery Marketplace */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Compass 
              size={27} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2} 
            />
          ),
        }}
      />

      {/* 3. Social Engineering Profile Track */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User 
              size={27} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2} 
            />
          ),
        }}
      />

    </Tabs>
  );
}