import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    ImageBackground
} from "react-native";

const Step1 = () => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(-40)).current;
    const buttonScale = useRef(new Animated.Value(0.5)).current;
    const Back = require("../../assets/images/O1.png")
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
            {/* Text */}
            <Animated.View
                style={{
                    opacity: fade,
                    transform: [{ translateX: slide }],
                }}
            >
                <Text style={styles.bold}>Empower</Text>
                <Text style={styles.normal}>Yourself With</Text>
                <Text style={styles.bold}>Quick</Text>
                <Text style={styles.normal}>Knowledge</Text>
            </Animated.View>

            {/* Button */}
            <Animated.View
                style={{
                    transform: [{ scale: buttonScale }],
                }}
            >
                <TouchableOpacity style={styles.button} onPress={()=> router.push("/(onboarding)/Step2")}>
                    <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Skip */}
            <Text style={styles.skip}>Skip</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 120,
        backgroundColor: "transparent", // image already handles background
    },

    bold: {
        fontSize: 42,
        fontWeight: "700",
        color: "#000",
        fontFamily: "OnestBold"
    },

    normal: {
        fontSize: 42,
        fontWeight: "300",
        color: "#000",
        fontFamily: "OnestBold"
    },

    button: {
        marginTop: 50,
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: "#110023", // your brand color
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        color: "white",
        fontSize: 28,
    },

    skip: {
        position: "absolute",
        bottom: 40,
        left: 30,
        fontSize: 16,
        fontFamily: "OnestNormal"
    },
});

export default Step1;