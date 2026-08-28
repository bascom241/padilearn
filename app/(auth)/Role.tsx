import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GraduationCap, ClipboardPen } from 'lucide-react-native'
import { LayoutAnimation } from 'react-native'
import { useRegisterStore } from '@/features/auth/store/useRegisterStore'
import { useRouter } from 'expo-router'
const Role = () => {


    const {setField, role} = useRegisterStore()
    const handlePress = (role: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setField("role", role)
        
    }
    const router = useRouter();

    return (
        <SafeAreaView style={styles.conatiner}>

            <View>

                <View style={styles.arrowLeftDesign}>
                    <ArrowLeft
                        size={30}
                    />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleHeader}>Select A Role</Text>
                    <Text style={styles.titleContent}>Choose How to use PadiLearn</Text>
                </View>

                {/** Selecet Row box */}


                <View style={styles.borderContainer}>


                    {/** Student */}
                    <TouchableOpacity style={[styles.baseBorder, role === "student" && styles.activeBorder]}
                        onPress={() => handlePress("student")}
                    >

                        <View style={[styles.baseBorderIconContainer, role === "student" && styles.baseBorderIconActiveContainer]}>
                            <GraduationCap size={30} color={role === "student" ? "white" : "#110023"} />
                        </View>

                        <View style={styles.baseBorderContent}>
                            <Text style={styles.title}>Student</Text>
                            <Text style={styles.description}> Explore All Courses, Interact with learners</Text>
                            <Text style={styles.description}> Join & enjoy Live sessions</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Tutor */}
                    <TouchableOpacity style={[styles.baseBorder, role !== "student" && styles.activeBorder]}
                        onPress={() => handlePress("instructor")}
                    >

                        <View style={[styles.baseBorderIconContainer, role !== "student" && styles.baseBorderIconActiveContainer]}>
                            <GraduationCap size={30} color={role !== "student" ? "white" : "#110023"} />
                        </View>

                        <View style={styles.baseBorderContent}>
                            <Text style={styles.title}>Teacher</Text>
                            <Text style={styles.description}> Share Your Experince, Interact with learners</Text>
                            <Text style={styles.description}> Provide Guidiance and Take Control of courses</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.continueButton} onPress={()=> router.push("/(auth)/Register")}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Role

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 5,
        justifyContent: "space-between"
    },
    arrowLeftDesign: {
        margin: 10,
        flexDirection: "row",
        alignItems: "flex-start"
    },
    titleContainer: {
        padding: 10,
        marginTop: 5,
        flexDirection: "column",
        gap: 10
    },
    titleHeader: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold"
    },
    titleContent: {
        fontSize: 15,
        color: "gray"
    },
    borderContainer: {
        padding: 10,
        flexDirection: "column",
        gap: 15
    },
    baseBorder: {
        borderColor: "#ebeaea",
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,

    },
    activeBorder: {
        borderColor: "#110023",
        transitionProperty: ""
    },

    baseBorderIconContainer: {
        backgroundColor: "#ebeaea",
        padding: 5,
        borderColor: "inherit",
        borderRadius: 999
    },
    baseBorderIconActiveContainer: {
        backgroundColor: "#110023",
    },
    baseBorderIconColor: {
        color: "#110023"
    },
    baseBorderActiveIconColor: {
        color: "white"
    },
    baseBorderContent: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10

    },
    description: {
        color: "gray",
        fontSize: 13,
        flexWrap: "wrap",

    }, 
    buttonContainer: {
        padding:15, 
        paddingBottom: 15
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