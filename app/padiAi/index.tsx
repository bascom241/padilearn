import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLeft from "@/components/ui/header";
import { StyleSheet } from "react-native";
import { Trash, Navigation2 } from "lucide-react-native";
const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/** Header Container */}
      <View style={styles.headerContainer}>
        <HeaderLeft title="Padi AI" />
        <View style={styles.toggleContainer}>
          <Trash  color="#110023"/>
          <Navigation2  color="#110023"/>
        </View>
      </View>

      {/** Chat Container */}
      <View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});

export default index;
