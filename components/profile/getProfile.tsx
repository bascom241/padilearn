import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, StyleProp, ViewStyle } from 'react-native';
import { useGetProfile } from '@/features/profile/hooks/useGetProfile';

// Reusable inline skeleton pulse effect
const PulseSkeleton = ({ style }: { style: StyleProp<ViewStyle> }) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[style, { opacity }]} />;
};

const GetProfile = () => {
  const { data, isPending, error } = useGetProfile();

  // 1. Error State
  if (error) {
    return (
      <View style={styles.headerProfileName}>
        <Text style={styles.greetText}>Hello,</Text>
        <Text style={[styles.userName, styles.errorText]}>Error loading profile</Text>
      </View>
    );
  }

  // 2. Loading State (Keeps layout perfectly stable)
  if (isPending) {
    return (
      <View style={styles.headerProfileName}>
        <PulseSkeleton style={[styles.skeleton, styles.skeletonGreet]} />
        <PulseSkeleton style={[styles.skeleton, styles.skeletonName]} />
      </View>
    );
  }

  // 3. Success State
  return (
    <View style={styles.headerProfileName}>
      <Text style={styles.greetText}>Hello,</Text>
      <Text style={styles.userName}>{data?.fullName || 'User'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerProfileName: {
    flexDirection: "column",
    gap: 4, 
    alignItems: "flex-start",
  },
  greetText: {
    fontFamily: "OnestLight",
    fontSize: 13,
    color: '#64748b',
  },
  userName: {
    fontFamily: "OnestBold",
    fontSize: 18,
    fontWeight: '700',
    color: "#110023",
    letterSpacing: -0.3,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
  },
  // Skeleton styling matching text heights
  skeleton: {
    backgroundColor: '#e2e8f0', 
    borderRadius: 4,
  },
  skeletonGreet: {
    width: 40,
    height: 13,
    marginVertical: 2, 
  },
  skeletonName: {
    width: 120, // Slightly wider to safely simulate a full name layout
    height: 18,
    marginVertical: 3,
  },
});

export default GetProfile;