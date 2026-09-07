import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetAllCategories } from '@/features/courses/hooks/useCategory'
import { Container, Loader2 } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Learn = () => {
    const {data: categories, isPending: fetchingCategories, isError: errorFetchingCategpories} = useGetAllCategories();
    console.log(categories)
  return (
    <SafeAreaView style={styles.container}>
        <View>
            
        </View>
    </SafeAreaView>
  )
}

export default Learn

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:"#ffff"
    }
})