import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
  View,
} from "react-native";

const Step2 = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(40)).current; // bottom -> up
  const buttonScale = useRef(new Animated.Value(0.5)).current;

  const Back = require("../../assets/images/O2.png");

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={Back}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ translateY: slide }],
          },
        ]}
      >
        <Text style={styles.bold}>Elevate Your Reading</Text>
        <Text style={styles.normal}>
          With <Text style={styles.boldInline}>Quick Insights</Text>
        </Text>

        <Text style={styles.desc}>
          Get bite-sized summaries, unlock key insights,
          and learn smarter in minutes.
        </Text>
      </Animated.View>

      <Text style={styles.skip}>Skip</Text>

      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: buttonScale }] },
        ]}
      >
        <TouchableOpacity style={styles.button}
         onPress={() => router.replace("/(onboarding)/Step3")}
        >
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  content: {
    paddingHorizontal: 30,
    marginBottom: 130, // pushes content upward from bottom
  },

  bold: {
    fontSize: 34,
    fontFamily: "OnestBold",
  },

  normal: {
    fontSize: 34,
    fontFamily: "OnestNormal",
  },

  boldInline: {
    fontFamily: "OnestBold",
  },

  desc: {
    marginTop: 14,
    fontSize: 14,
    color: "#393939",
    lineHeight: 22,
    fontFamily: "OnestNormal",
  },

  skip: {
    position: "absolute",
    bottom: 42,
    left: 30,
    fontFamily: "OnestNormal",
  },

  buttonWrapper: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },

  button: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#110023",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "white",
    fontSize: 28,
  },
});

export default Step2;