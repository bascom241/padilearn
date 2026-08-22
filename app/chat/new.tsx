import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { padiAiService } from '@/features/chat/services/padiAiService';

const NewChatScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartChat = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // Send first message which creates a new conversation
      const response = await padiAiService.sendMessage({
        message: message.trim()
      });

      // Navigate to the new conversation
      router.replace({
        pathname: "/chat/[id]",
        params: { 
          id: response.conversationId, 
          title: message.trim().substring(0, 50) + (message.trim().length > 50 ? '...' : '')
        }
      });
    } catch (err) {
      console.error('Failed to start chat:', err);
      setError('Failed to start conversation. Please try again.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#110023" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Start Chatting with PadiAI</Text>
          <Text style={styles.welcomeSubtitle}>
            Ask anything about your courses, get help with coding, or discuss any topic. PadiAI is here to help!
          </Text>
        </View>

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Your Question</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message here..."
            placeholderTextColor="#94a3b8"
            value={message}
            onChangeText={setMessage}
            multiline
            editable={!loading}
            textAlignVertical="top"
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, (!message.trim() || loading) && styles.sendButtonDisabled]}
            onPress={handleStartChat}
            disabled={!message.trim() || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <Send size={18} color="#ffffff" />
                <Text style={styles.sendButtonText}>Send</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Try asking about:</Text>
          <SuggestionButton 
            text="React Hooks explained"
            onPress={() => setMessage('Explain React Hooks and how they work')}
          />
          <SuggestionButton 
            text="JavaScript async/await"
            onPress={() => setMessage('How does async/await work in JavaScript?')}
          />
          <SuggestionButton 
            text="Database optimization"
            onPress={() => setMessage('Best practices for database query optimization')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

interface SuggestionButtonProps {
  text: string;
  onPress: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, onPress }) => (
  <TouchableOpacity 
    style={styles.suggestionButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.suggestionButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  headerTitle: {
    fontFamily: 'OnestBold',
    fontSize: 16,
    fontWeight: '700',
    color: '#110023',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 32,
    marginTop: 20,
  },
  welcomeTitle: {
    fontFamily: 'OnestBold',
    fontSize: 20,
    fontWeight: '700',
    color: '#110023',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontFamily: 'OnestLight',
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    fontFamily: 'OnestLight',
    fontSize: 12,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#110023',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'OnestLight',
    fontSize: 14,
    color: '#110023',
    minHeight: 100,
    maxHeight: 200,
    marginBottom: 12,
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#110023',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionsSection: {
    marginTop: 32,
  },
  suggestionsTitle: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#110023',
    marginBottom: 12,
  },
  suggestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionButtonText: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#110023',
  },
});

export default NewChatScreen;
