import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRegisterStore } from '@/features/auth/store/useRegisterStore'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EditNewlyCreatedProfile } from '@/features/auth/types/RegisterationRequestDto'
import { useEditNewProfile } from '@/features/auth/hooks/useProfile'
import { useRouter } from 'expo-router'
import { handleApiSuccess } from '@/utils/handleApiSuccess'
import { handleApiError } from '@/utils/handleApiError'
import { KeyboardAvoidingView } from 'react-native'
const Instructor = () => {
    const { role } = useRegisterStore();
    const [formData, setFormData] = useState<EditNewlyCreatedProfile>({ interests: [], bio: "" });
    const { mutate, isPending, isError } = useEditNewProfile();
    const router = useRouter();
    const handleFieldChange = (field: keyof EditNewlyCreatedProfile, value: any) => {
        setFormData((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }


    const handleInterestsChange = (text: string) => {
        const arrayFromText = text.split(',').map(item => item.trim());
        handleFieldChange('interests', text === "" ? [] : arrayFromText);
    }


    const handleSuccess = () => {
        router.push("/(tabs)")
    }

    const handleSubmit = () => {
        const { interests, bio } = formData
        const dataToSend: EditNewlyCreatedProfile = {
            role,
            interests,
            bio
        }

        mutate(dataToSend, {
            onSuccess: (data) => {
                const { message } = data;
                console.log(message)
                handleApiSuccess(message, "Edit Profile");
            },
            onError: handleApiError
        })
    }



    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <ArrowLeft />
                        <Text style={styles.headerTitle}>Instructor Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleHeader}>Create Profile</Text>
                        <Text style={styles.titleContent}>Setup how you want to look to students</Text>
                    </View>


                    <Text style={styles.fieldLabel}>Area of Specialization</Text>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            placeholder="e.g. English, Physics (separated by commas)"
                            placeholderTextColor="#8B8B95"
                            style={styles.input}
                            autoCapitalize="none"
                            value={formData.interests?.join(', ')}
                            onChangeText={handleInterestsChange}
                        />
                    </View>


                    <Text style={styles.fieldLabel}>Bio</Text>
                    <View style={[styles.fieldWrapper, styles.bioFieldWrapper]}>
                        <TextInput
                            placeholder="Tell students about your qualifications and teaching style..."
                            placeholderTextColor="#8B8B95"
                            style={[styles.input, styles.bioInput]}
                            autoCapitalize="none"
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            returnKeyType="default"
                            value={formData.bio || ""}
                            onChangeText={(text) => handleFieldChange('bio', text)}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
                        <Text style={styles.continueButtonText}>Start Teaching</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </KeyboardAvoidingView>
    )
}

export default Instructor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        justifyContent: "space-between"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#110023"
    },
    titleContainer: {
        paddingVertical: 10,
        marginTop: 5,
        flexDirection: "column",
        gap: 6
    },
    titleHeader: {
        fontSize: 28,
        color: "black",
        fontWeight: "bold"
    },
    titleContent: {
        fontSize: 14,
        color: "gray"
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#110023",
        marginTop: 16,
        marginBottom: 6
    },
    fieldWrapper: {
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAFAFA"
    },
    bioFieldWrapper: {
        height: 140,
        alignItems: "flex-start",
        paddingVertical: 12
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: "OnestNormal",
        color: "#110023",
    },
    bioInput: {
        height: "100%"
    },
    buttonContainer: {
        paddingVertical: 15
    },
    continueButton: {
        backgroundColor: "#110023",
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
    },
    continueButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    }
})
