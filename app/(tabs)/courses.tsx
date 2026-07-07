import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, ArrowLeft, GraduationCap, X } from 'lucide-react-native';
import CourseCard from '@/components/cards/Courses';
import { useRouter } from 'expo-router';
const Courses = () => {
    const [activeCategory, setActiveCategory] = useState('All Sprints');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Filter States
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [selectedPrice, setSelectedPrice] = useState('All');
    const router = useRouter(); 
    const categories = ['All Sprints', 'Tech Architecture', 'Vocational Experts', 'UI/UX Systemic'];
    const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const priceTiers = ['All', 'Free', 'Paid'];

    const mockCourses = [
        {
            title: "Advanced Next.js & Production Architecture",
            category: "TECH SPRINT",
            lessons: 24,
            duration: "18.5 hrs",
            rating: 4.9,
            level: "Advanced",
            price: "Free",
            progress: 0.65,
            image: require('../../assets/images/card1.jpg')
        },
        {
            title: "High-End Micro-Interactions & Figma to Code workflows",
            category: "UI/UX SYSTEMIC",
            lessons: 16,
            duration: "12.2 hrs",
            rating: 5.0,
            level: "Intermediate",
            price: "$29",
            progress: 0.15,
            image: require('../../assets/images/card2.jpg')
        },
        {
            title: "Spring Boot Enterprise Infrastructure & State Locking",
            category: "TECH SPRINT",
            lessons: 32,
            duration: "26 hrs",
            rating: 4.8,
            level: "Advanced",
            price: "$49",
            progress: 0.82,
            image: require('../../assets/images/card1.jpg')
        }
    ];

    const handleResetFilters = () => {
        setSelectedLevel('All Levels');
        setSelectedPrice('All');
    };

    const handleCoursePress = (course: any) => {
    const courseId = course.id ?? String(course.title ?? 'course').replace(/\s+/g, '-').toLowerCase();

    router.push({
        pathname: '/courses/[id]', // Points to your course detail file
        params: {
            id: courseId,
            title: course.title,
            category: course.category,
            lessons: course.lessons,
            duration: course.duration,
            rating: course.rating,
            level: course.level,
            price: course.price,
            // Pass remote images via string URI or handle asset require references carefully
        }
    });
};

    return (
        <SafeAreaView style={styles.container}>
            {/* Upper Navigation Row */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={()=> router.back()}>
                    <ArrowLeft size={22} color="#110023" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Classrooms</Text>
                <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.7}
                    onPress={() => setIsFilterVisible(true)}
                >
                    <SlidersHorizontal size={20} color="#110023" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Dynamic Minimal Search Section */}
                <View style={styles.searchWrapper}>
                    <View style={styles.searchBarContainer}>
                        <Search size={18} color="#64748b" style={{ marginRight: 8 }} />
                        <TextInput
                            placeholder="Search ongoing cohorts..."
                            placeholderTextColor="#94a3b8"
                            style={styles.inputField}
                        />
                    </View>
                </View>

                {/* Categories Dynamic Pill Selector Component */}
                <View style={styles.categorySection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.categoryPill,
                                    activeCategory === cat ? styles.activeCategoryPill : null
                                ]}
                                onPress={() => setActiveCategory(cat)}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    styles.categoryPillText,
                                    activeCategory === cat ? styles.activeCategoryPillText : null
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Global Track Analytics Mini Panel */}
                <View style={styles.trackOverviewPanel}>
                    <View style={styles.panelLeft}>
                        <Text style={styles.panelTitle}>Sprint Status Overview</Text>
                        <Text style={styles.panelSubtitle}>You are managing 3 active tracks cleanly.</Text>
                    </View>
                    <View style={styles.panelBadge}>
                        <GraduationCap size={18} color="#ffffff" />
                    </View>
                </View>

                {/* Courses Cards Iterative Component Node Render stack */}
                <View style={styles.listSection}>
                    <Text style={styles.sectionLabel}>Active Cohorts</Text>
                    {mockCourses.map((course, idx) => (
                        <CourseCard key={idx} course={course} onPress={() => handleCoursePress(course)} />
                    ))}
                </View>
            </ScrollView>

            {/* Modern High-End Filter Bottom Sheet Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterVisible}
                onRequestClose={() => setIsFilterVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setIsFilterVisible(false)}
                >
                    <AnimatedPressable style={styles.modalSheet}>
                        {/* Header Drag Handle Line */}
                        <View style={styles.dragHandle} />

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderTitle}>Filter Sprints</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsFilterVisible(false)}
                            >
                                <X size={18} color="#110023" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                            {/* Difficulty Level Selection */}
                            <View style={styles.filterGroup}>
                                <Text style={styles.filterGroupLabel}>Difficulty Level</Text>
                                <View style={styles.filterOptionsContainer}>
                                    {levels.map((lvl) => (
                                        <TouchableOpacity
                                            key={lvl}
                                            style={[
                                                styles.filterOptionPill,
                                                selectedLevel === lvl ? styles.activeFilterOptionPill : null
                                            ]}
                                            onPress={() => setSelectedLevel(lvl)}
                                        >
                                            <Text style={[
                                                styles.filterOptionText,
                                                selectedLevel === lvl ? styles.activeFilterOptionText : null
                                            ]}>
                                                {lvl}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Pricing Filter Selection */}
                            <View style={styles.filterGroup}>
                                <Text style={styles.filterGroupLabel}>Price Option</Text>
                                <View style={styles.filterOptionsContainer}>
                                    {priceTiers.map((tier) => (
                                        <TouchableOpacity
                                            key={tier}
                                            style={[
                                                styles.filterOptionPill,
                                                selectedPrice === tier ? styles.activeFilterOptionPill : null
                                            ]}
                                            onPress={() => setSelectedPrice(tier)}
                                        >
                                            <Text style={[
                                                styles.filterOptionText,
                                                selectedPrice === tier ? styles.activeFilterOptionText : null
                                            ]}>
                                                {tier}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        {/* Action Buttons Footer */}
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={handleResetFilters}
                            >
                                <Text style={styles.resetButtonText}>Reset All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => setIsFilterVisible(false)}
                            >
                                <Text style={styles.applyButtonText}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </AnimatedPressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
};

// Internal aliasing wrapper helper container component
const AnimatedPressable = Pressable as any;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f8fafc',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'OnestBold',
        fontSize: 16,
        fontWeight: '700',
        color: '#110023',
        letterSpacing: -0.2,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchWrapper: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 48,
    },
    inputField: {
        flex: 1,
        fontFamily: 'OnestLight',
        fontSize: 14,
        color: '#110023',
    },
    categorySection: {
        marginTop: 20,
    },
    categoryScroll: {
        paddingHorizontal: 20,
        gap: 8,
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    activeCategoryPill: {
        backgroundColor: '#110023',
        borderColor: '#110023',
    },
    categoryPillText: {
        fontFamily: 'OnestLight',
        fontSize: 13,
        color: '#475569',
    },
    activeCategoryPillText: {
        fontFamily: 'OnestBold',
        fontWeight: '700',
        color: '#ffffff',
    },
    trackOverviewPanel: {
        marginTop: 24,
        marginHorizontal: 20,
        padding: 18,
        backgroundColor: '#230444',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    panelLeft: {
        flexDirection: 'column',
        gap: 2,
    },
    panelTitle: {
        fontFamily: 'OnestBold',
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
    panelSubtitle: {
        fontFamily: 'OnestLight',
        fontSize: 11,
        color: '#cbd5e1',
    },
    panelBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listSection: {
        marginTop: 28,
        paddingHorizontal: 20,
    },
    sectionLabel: {
        fontFamily: 'OnestBold',
        fontSize: 15,
        fontWeight: '700',
        color: '#110023',
        marginBottom: 14,
        letterSpacing: -0.1,
    },

    /* Filter Sheet Layout Specs */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(17, 0, 35, 0.4)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 12,
        paddingHorizontal: 24,
        paddingBottom: 34,
        maxHeight: '75%',
    },
    dragHandle: {
        width: 38,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    modalHeaderTitle: {
        fontFamily: 'OnestBold',
        fontSize: 18,
        fontWeight: '700',
        color: '#110023',
        letterSpacing: -0.3,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalScroll: {
        marginBottom: 24,
    },
    filterGroup: {
        marginBottom: 24,
    },
    filterGroupLabel: {
        fontFamily: 'OnestBold',
        fontSize: 14,
        fontWeight: '700',
        color: '#110023',
        marginBottom: 12,
    },
    filterOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterOptionPill: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    activeFilterOptionPill: {
        backgroundColor: '#110023',
        borderColor: '#110023',
    },
    filterOptionText: {
        fontFamily: 'OnestLight',
        fontSize: 12,
        color: '#475569',
    },
    activeFilterOptionText: {
        fontFamily: 'OnestBold',
        fontWeight: '600',
        color: '#ffffff',
    },
    modalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    resetButton: {
        flex: 1,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    resetButtonText: {
        fontFamily: 'OnestBold',
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    applyButton: {
        flex: 2,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#110023',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: {
        fontFamily: 'OnestBold',
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '700',
    },
});

export default Courses;