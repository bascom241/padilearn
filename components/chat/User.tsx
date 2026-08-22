import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { User2 } from "lucide-react-native";

interface UserProps {
  message: string;
}

const User: React.FC<UserProps> = ({ message }) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userSpaceContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{message}</Text>
        </View>

        <View style={styles.userAvatar}>
          <User2 color="#110023" size={20} />
        </View>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    marginVertical: 4,
  },
  userSpaceContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  userAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e2ee",
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  textContainer: {
    backgroundColor: "#110023",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
    flexShrink: 1,
  },
  text: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 22,
  },
});
