import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { getHasSeenOnboarding } from "@/utils/tokenService";
const Logo = require("../assets/images/Logo.png");

const MIN_SPLASH_MS = 1200;

const SplashScreen = () => {
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { isAuthenticated, isHydrating } = useAuth();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isHydrating) return;

    let cancelled = false;

    const decideRoute = async () => {
      const [hasSeenOnboarding] = await Promise.all([
        getHasSeenOnboarding(),
        new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_MS)),
      ]);

      if (cancelled) return;

      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else if (hasSeenOnboarding) {
        router.replace("/(auth)/Login");
      } else {
        router.replace("/(onboarding)/Step1");
      }
    };

    decideRoute();

    return () => {
      cancelled = true;
    };
  }, [isHydrating, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#110023",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
