import { useVerify } from "@/features/auth/hooks/useVerify";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { toast } from "../../utils/toast"; // Your clean toast system
import { handleApiSuccess } from "@/utils/handleApiSuccess";
import { handleApiError } from "@/utils/handleApiError";

const VerifyEmail = () => {
  // 1. Keep track of 4 separate digits for the verification layout
  const [userCode, setCode] = useState(["", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const {mutate, isPending, error} = useVerify()
  // Create refs to automatically jump focus forward/backward between inputs
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...userCode];
    // Only capture the last character typed (handles replacements)
    newCode[index] = text.slice(-1);
    setCode(newCode);

    // Auto-focus the next input box if a character was entered
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Detect backspace to jump to the previous input box cleanly
    if (e.nativeEvent.key === "Backspace" && !userCode[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = userCode.join("");
    if (code.length < 4) {
      toast.error("Incomplete Code", "Please enter the full 4-digit code sent to your email.");
      return;
    }
    console.log("Verifying code:", code);
    mutate(code , {
        onSuccess: (data) => {
            handleApiSuccess(data, "Email verified succesfully" );
          router.push("/(tabs)");
        }, onError:handleApiError
    });
  };

  const handleResend = () => {
    setIsResending(true);
    toast.info("Code Sent", "A fresh verification code has been dispatched to your inbox.");
    
    // Simulate cooldown timer reset block
    setTimeout(() => {
      setIsResending(false);
    }, 15000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardWrapper}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          
          {/* Top Left Navigation Back Action */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#110023" />
          </TouchableOpacity>

          {/* Centralized Form Content */}
          <View style={styles.mainContent}>
            
            {/* Verification Envelope Context Icon */}
            <View style={styles.iconBox}>
              <Ionicons name="mail-open-outline" size={48} color="#110023" />
            </View>

            <Text style={styles.title}>Verify your Email</Text>
            <Text style={styles.subtitle}>
              We've sent a 4-digit security token code to your inbox. Please enter it below.
            </Text>

            {/* Row of 4 Distinct OTP Square Inputs */}
            <View style={styles.otpContainer}>
              {userCode.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Core Action Trigger Button */}
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>

            {/* Sub-Action: Code Resender block */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive a token? </Text>
              <TouchableOpacity onPress={handleResend} disabled={isResending}>
                <Text style={[styles.resendLink, isResending && styles.disabledLink]}>
                  {isResending ? "Wait 15s" : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Clean minimal footer */}
          <View style={styles.bottomSection}>
            <Text style={styles.secureBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#B0B0B0" /> Secure verification process
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 6,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 10,
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
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
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
    fontSize: 24,
    fontFamily: "OnestBold",
    color: "#110023",
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#110023",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#110023",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "OnestBold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  resendText: {
    color: "#8B8B95",
    fontSize: 15,
    fontFamily: "OnestNormal",
  },
  resendLink: {
    color: "#110023",
    fontSize: 15,
    fontFamily: "OnestBold",
  },
  disabledLink: {
    color: "#B0B0B0",
  },
  bottomSection: {
    alignItems: "center",
    marginTop: 24,
  },
  secureBadge: {
    color: "#B0B0B0",
    fontSize: 13,
    fontFamily: "OnestNormal",
    flexDirection: "row",
    alignItems: "center",
  },
});