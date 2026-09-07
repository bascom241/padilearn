import { Image, StyleSheet, Text, View } from 'react-native'
import { CourseSummary } from '@/features/courses/types/Course'

const CourseCard = ({ item }: { item: CourseSummary }) => {
    return (
        <View style={styles.cardContainer}>

            {/** Thumbnail */}
            <Image
                src={item.thumbnail}
                style={styles.courseImage}

            />
            {/** Title */}
            <Text style={styles.courseTitle}>
                {item.title}
            </Text>

            {/** Instructor */}
            <Text style={styles.courseInstructor}>
                {typeof item.instructor === "object" && item.instructor !== null ? item.instructor.fullName : "Instructor Id : " + item.instructor}            
            </Text>

            {/** Pricing */}
            <Text style={styles.price}>
                {item.price}
            </Text>


        </View >
    )
}

export default CourseCard

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "column",
        gap: 4,
        alignItems: "center"
    },
    courseImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    courseInstructor: {
        color: "#d3d3d3"
    },
    price: {
        fontWeight: "bold"
    }
})