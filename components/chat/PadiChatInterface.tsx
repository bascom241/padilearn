import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Send, Sparkles } from "lucide-react-native";
import Bot from "./Bot";
import User from "./User";
import type { ChatMessage } from "@/features/chat/types/chat.types";

interface PadiChatInterfaceProps {
  messages: ChatMessage[];
  isSending: boolean;
  isLoadingHistory: boolean;
  error: string | null;
  onSendMessage: (text: string) => void;
}

const SUGGESTIONS = [
  "Explain async/await in JavaScript",
  "How do I optimize React Native performance?",
  "Give me a 5-day study plan for Web Development",
];

const PadiChatInterface: React.FC<PadiChatInterfaceProps> = ({
  messages,
  isSending,
  isLoadingHistory,
  error,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isSending) return;
    onSendMessage(trimmed);
    setInputText("");
  };

  const handleSuggestionPress = (text: string) => {
    if (isSending) return;
    onSendMessage(text);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    if (item.sender === "user") {
      return <User message={item.content} />;
    }
    return <Bot message={item.content} />;
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {isLoadingHistory ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#110023" />
            <Text style={styles.loadingText}>Loading conversation history...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.sparkleBadge}>
                  <Sparkles size={28} color="#110023" />
                </View>
                <Text style={styles.emptyTitle}>Meet Padi AI</Text>
                <Text style={styles.emptySubtitle}>
                  Your personal study assistant. Ask anything about your courses, homework, or technical concepts!
                </Text>

                <View style={styles.suggestionsWrapper}>
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionChip}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            }
            ListFooterComponent={
              isSending ? (
                <View style={{ marginTop: 8 }}>
                  <Bot isThinking={true} />
                </View>
              ) : null
            }
          />
        )}

        {/* Input Bar */}
        <View style={styles.inputBarContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask Padi AI anything..."
            placeholderTextColor="#94a3b8"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
            editable={!isSending}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isSending) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isSending}
            activeOpacity={0.8}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Send size={18} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PadiChatInterface;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  errorBanner: {
    backgroundColor: "#fee2e2",
    padding: 10,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  errorText: {
    color: "#991b1b",
    fontSize: 13,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#64748b",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sparkleBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#11002315",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#110023",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  suggestionsWrapper: {
    width: "100%",
    gap: 10,
  },
  suggestionChip: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  suggestionText: {
    color: "#110023",
    fontSize: 14,
    fontWeight: "500",
  },
  inputBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    gap: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 44,
    backgroundColor: "#f1f5f9",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#110023",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#cbd5e1",
  },
});
