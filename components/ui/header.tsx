import { View, Text } from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
interface HeaderProp {
  title: string;
}
const HeaderLeft = ({ title }: HeaderProp) => {


  // Back to the main Page. 


  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  }

  return (
    <View style={styles.container}>
        <ArrowLeft  color="#110023" onPress={handleBackPress}/>
        <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    alignItems:"center"
  },
});

export default HeaderLeft;
