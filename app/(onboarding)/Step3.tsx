import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";

const Step3 = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(0.6)).current;

  const Back = require("../../assets/images/O3.png");

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
        <Text style={styles.bold}>Master Learning</Text>
        <Text style={styles.normal}>Anytime, Anywhere</Text>

        <Text style={styles.desc}>
          Start your journey with bite-sized lessons
          tailored just for you.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonWrapper,
          {
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(auth)/Login")}
        >
          <Text style={styles.buttonText}>Start</Text>
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
    marginBottom: 140,
  },

  bold: {
    fontSize: 34,
    fontFamily: "OnestBold",
  },

  normal: {
    fontSize: 34,
    fontFamily: "OnestNormal",
  },

  desc: {
    marginTop: 15,
    fontSize: 14,
    color: "#777",
    lineHeight: 22,
    fontFamily: "OnestNormal",
  },

  buttonWrapper: {
    position: "absolute",
    bottom: 40,
    right: 30,
  },

  button: {
    backgroundColor: "#110023",
    paddingHorizontal: 30,
    height: 58,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "OnestBold",
  },
});

export default Step3;