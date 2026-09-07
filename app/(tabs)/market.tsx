import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useGetAllCategories } from '@/features/courses/hooks/useCategory'
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderLeft from '@/components/ui/header';
import { ArrowLeft } from 'lucide-react-native';
import { SlidersHorizontal, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCourses } from '@/features/courses/hooks/useCourses';

import { CourseSummary } from '@/features/courses/types/Course';
import CourseCard from '@/components/cards/market/Courses';
const Market = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const router = useRouter()
    const { data: categories, isPending: fetchingCategories, isError: errorFetchingCategpories } = useGetAllCategories();
    const { data: courses, isPending: fetchingAllCourses, isError: errorFetchingCourses } = useCourses();
    console.log(categories)
    console.log(courses);


    if (courses === null) {
        return (<View>

        </View>)
    }
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={() => router.back()}>
                    <ArrowLeft size={22} color="#110023" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Explore Courses</Text>
                <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.7}
                    onPress={() => setIsFilterVisible(true)}
                >
                    <ShoppingBag size={20} color="#110023" />
                </TouchableOpacity>
            </View>


            {/** Newly Created Courses */}
            <View>
                {
                    errorFetchingCourses && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "red" }}>Error Loading courses</Text>
                    </View>
                }

                {
                    fetchingAllCourses && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                        <ActivityIndicator size="large" color="#110023" />
                    </View>
                }


                <FlatList
                    data={courses?.courses}
                    renderItem={({ item }) => <CourseCard item={item} />}
                    keyExtractor={(item) => item._id}

                />
            </View>




            {/** Categories Filtering */}
            <View>

            </View>



        </SafeAreaView>
    )
}

export default Market

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: "#fff"
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,

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
})