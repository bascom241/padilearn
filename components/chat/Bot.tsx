import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Bot as PadiBot } from "lucide-react-native";

interface BotProps {
  message?: string;
  isThinking?: boolean;
}

const Bot: React.FC<BotProps> = ({ message, isThinking }) => {
  return (
    <View style={styles.botContainer}>
      <View style={styles.botSpaceContainer}>
        <View style={styles.botAvatar}>
          <PadiBot color="#ffffff" size={20} />
        </View>

        <View style={styles.textContainer}>
          {isThinking ? (
            <View style={styles.thinkingContainer}>
              <ActivityIndicator size="small" color="#110023" />
              <Text style={styles.thinkingText}>Padi AI is thinking...</Text>
            </View>
          ) : (
            <Text style={styles.text}>{message || ""}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Bot;

const styles = StyleSheet.create({
  botContainer: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    marginVertical: 4,
  },
  botSpaceContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  botAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#110023",
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  textContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#110023",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexShrink: 1,
  },
  text: {
    color: "#1e1e24",
    fontSize: 15,
    lineHeight: 22,
  },
  thinkingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  thinkingText: {
    color: "#64748b",
    fontSize: 14,
    fontStyle: "italic",
  },
});
