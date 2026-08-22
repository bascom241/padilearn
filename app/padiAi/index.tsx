import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLeft from "@/components/ui/header";
import { Trash, Plus } from "lucide-react-native";
import PadiChatInterface from "@/components/chat/PadiChatInterface";
import { usePadiAi } from "@/features/chat/hooks/usePadiAi";

const PadiAiScreen = () => {
  const {
    messages,
    isSending,
    isLoadingHistory,
    error,
    sendMessage,
    startNewChat,
    deleteCurrentChat,
    conversationId,
  } = usePadiAi();

  const handleClear = () => {
    if (messages.length === 0) return;
    Alert.alert(
      "Clear Chat Session",
      "Are you sure you want to delete this chat conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => deleteCurrentChat(),
        },
      ]
    );
  };

  const handleNewChat = () => {
    startNewChat();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <HeaderLeft title="Padi AI" />
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={handleNewChat}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Plus color="#110023" size={22} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClear}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Trash color={messages.length > 0 ? "#ef4444" : "#94a3b8"} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Container */}
      <View style={styles.chatWrapper}>
        <PadiChatInterface
          messages={messages}
          isSending={isSending}
          isLoadingHistory={isLoadingHistory}
          error={error}
          onSendMessage={sendMessage}
        />
      </View>
    </SafeAreaView>
  );
};

export default PadiAiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
  },
  chatWrapper: {
    flex: 1,
  },
});
