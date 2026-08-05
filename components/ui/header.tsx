import { View, Text } from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { StyleSheet } from "react-native";
interface HeaderProp {
  title: string;
}
const HeaderLeft = ({ title }: HeaderProp) => {
  return (
    <View style={styles.container}>
        <ArrowLeft  color="#110023"/>
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
