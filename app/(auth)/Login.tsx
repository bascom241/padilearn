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
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { handleApiError } from "@/utils/handleApiError";
import { handleApiSuccess } from "@/utils/handleApiSuccess";
import { saveToken } from "@/utils/tokenService";
const Login = () => {
  const [secure, setSecure] = useState(true);
    const logo = require('../../assets/images/Padi.png');
    const [formData,setFormData] = useState({email:"", password:""});
    const {mutate,isPending} = useLogin()


    const handleChange = (fieldName: string, value: string)  => {
      setFormData({...formData, [fieldName]:value})
    }


    const handleSubmit =  () => {
      console.log("ENTERING ")
      mutate(formData,{
        onSuccess: async (response)=> {
            handleApiSuccess(response, "login successful")
            router.push("/(tabs)");
            const {accessToken, refreshToken} = response.data; 
            await saveToken(accessToken, refreshToken);
        },onError: handleApiError
      } )
    }
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Enter your sign in details to continue
            </Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email address"
                placeholderTextColor="#8B8B95"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text)=> handleChange("email", text )}
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
                value={formData.password}
                onChangeText={(text)=> handleChange( "password", text )}
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {
                isPending ?  <ActivityIndicator animating={true} color="white" /> : <Text style={styles.buttonText}>Sign in</Text>
              }
            
            </TouchableOpacity>

            {/* Forgot */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Footer Section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity onPress={()=> router.push("/(auth)/Register")}>
              <Text style={styles.createAccount}>Create an account</Text>
            </TouchableOpacity>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    fontSize: 16,
    color: "#110023",
    fontFamily: "OnestBold",
    padding: 4,
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