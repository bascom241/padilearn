import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Register = () => {
    const [secure, setSecure] = useState(true);
    const logo = require('../../assets/images/Padi.png')
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {/* Top Right Help */}
                    <TouchableOpacity style={styles.helpRow}>
                        <Text style={styles.help}>Get help</Text>
                        <Ionicons name="chevron-forward" size={16} color="#110023" />
                    </TouchableOpacity>

                    {/* Centralized Content Box */}
                    <View style={styles.mainContent}>
                        {/* Logo */}
                        <View style={styles.logoBox}>
                            <Image
                                source={logo}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Heading */}
                        <Text style={styles.title}>Welcome to Padi Learn</Text>
                        <Text style={styles.subtitle}>
                            Enter your signup  details to continue
                        </Text>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor="#8B8B95"
                                style={styles.input}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Email address"
                                placeholderTextColor="#8B8B95"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>


                        {/* Password */}
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter password"
                                placeholderTextColor="#8B8B95"
                                secureTextEntry={secure}
                                style={styles.input}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setSecure(!secure)}>
                                <Ionicons
                                    name={secure ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#B0B0B0"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign In */}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Sign in</Text>
                        </TouchableOpacity>

                        {/* Forgot */}
                        <TouchableOpacity style={styles.forgotButton}>
                            <Text style={styles.forgot}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Footer Section */}
                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={{flexDirection:"row", alignItems:"center", gap:4}} onPress={()=> router.push("/(auth)/Login")}>
                            <Text style={{color:"gray"}}>Already have an account?</Text>
                            <Text style={styles.createAccount}>Log In</Text>
                        </TouchableOpacity>
                        <Text style={styles.version}>Version 1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === "ios" ? 60 : 40,
        paddingBottom: 20,
        justifyContent: "space-between", // Pushes footer down cleanly
    },
    helpRow: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },
    help: {
        fontFamily: "OnestBold",
        color: "#110023",
        fontSize: 14,
        marginRight: 2,
    },
    mainContent: {
        flex: 1,
        justifyContent: "center", // Perfectly centers the form contents vertically
        marginVertical: 20,
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 24,
    },
    logoText: {
        fontSize: 24,
        color: "#110023",
        fontFamily: "OnestBold",
    },
    title: {
        fontSize: 26,
        textAlign: "center",
        color: "#110023",
        fontFamily: "OnestBold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        textAlign: "center",
        color: "#8B8B95",
        fontFamily: "OnestNormal",
        marginBottom: 16,
    },
    inputWrapper: {
        marginTop: 16,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAFAFA", // Slight background makes inputs cleaner
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: "OnestNormal",
        color: "#110023",
    },
    button: {
        marginTop: 24,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#110023",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "OnestBold",
    },
    forgotButton: {
        marginTop: 20,
        alignSelf: "center",
        padding: 4,
    },
    forgot: {
        color: "#110023",
        fontSize: 15,
        fontFamily: "OnestBold",
    },
    bottomSection: {
        alignItems: "center",
        marginTop: 20,
    },
    createAccount: {
       
        color: "#110023",
        fontFamily: "OnestBold",
    
    },
    version: {
        marginTop: 12,
        color: "#B0B0B0",
        fontSize: 13,
        fontFamily: "OnestNormal",
    },
    logo: {
        width: 200,
        height: 200,
    },
});