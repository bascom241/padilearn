import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Image as ImageIcon, Code, MessageSquare, Users } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { padiAiService } from '@/features/chat/services/padiAiService';
import { joinConversation, leaveConversation, subscribeToIncomingMessages } from '@/features/chat/services/socket/chat.socket';
import type { ChatMessage } from '@/features/chat/types/chat.types';

const ChatRoom = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [typedMessage, setTypedMessage] = useState('');
  const [messageStack, setMessageStack] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const conversationId = params.id as string;

  const activeChannel = {
    title: (params.title as string) || "PadiAI Chat",
    memberCount: "AI Assistant"
  };

  useEffect(() => {
    loadMessages();
    joinConversation(conversationId);

    // Subscribe to incoming messages
    const unsubscribe = subscribeToIncomingMessages((message) => {
      if (message.conversationId === conversationId) {
        setMessageStack(prev => [...prev, {
          id: String(Date.now()),
          sender: 'ai',
          content: message.message,
          createdAt: new Date().toISOString(),
          type: 'text'
        }]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    });

    return () => {
      unsubscribe();
      leaveConversation(conversationId);
    };
  }, [conversationId]);

  const loadMessages = async () => {
    if (!conversationId) return;
    try {
      setLoading(true);
      setError(null);
      const messages = await padiAiService.getMessages(conversationId);
      setMessageStack(messages);
      // Scroll to bottom after loading
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!typedMessage.trim()) return;
    if (!conversationId) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      content: typedMessage,
      createdAt: new Date().toISOString(),
      type: 'text'
    };

    try {
      setSending(true);
      setError(null);
      
      // Add user message immediately
      setMessageStack([...messageStack, userMessage]);
      setTypedMessage('');

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Send to API via socket
      const response = await padiAiService.sendMessage({
        message: userMessage.content,
        conversationId
      });

      // Add AI response
      const aiMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        content: response.message,
        createdAt: new Date().toISOString(),
        type: 'text'
      };

      setMessageStack(prev => [...prev, aiMessage]);
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
      // Remove the user message if sending failed
      setMessageStack(messageStack);
      setTypedMessage(userMessage.content);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backIconButton} onPress={() => router.back()} activeOpacity={0.7}>
              <ArrowLeft size={22} color="#110023" />
            </TouchableOpacity>
            <View style={styles.channelMetaGroup}>
              <Text numberOfLines={1} style={styles.channelTitle}>{activeChannel.title}</Text>
              <View style={styles.badgeRow}>
                <Users size={10} color="#15803d" />
                <Text style={styles.memberText}>{activeChannel.memberCount}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#110023" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Meta Navigation Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backIconButton} onPress={() => router.back()} activeOpacity={0.7}>
            <ArrowLeft size={22} color="#110023" />
          </TouchableOpacity>
          <View style={styles.channelMetaGroup}>
            <Text numberOfLines={1} style={styles.channelTitle}>{activeChannel.title}</Text>
            <View style={styles.badgeRow}>
              <Users size={10} color="#15803d" />
              <Text style={styles.memberText}>{activeChannel.memberCount}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Message Matrix Component Stream Node */}
      <FlatList
        ref={flatListRef}
        data={messageStack}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatScrollArea}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.messageBubbleContainer, item.sender === 'user' ? styles.myBubbleAlignment : styles.peerBubbleAlignment]}>
            {item.sender !== 'user' && (
              <View style={styles.senderHeaderRow}>
                <Text style={styles.senderNameText}>PadiAI</Text>
              </View>
            )}
            <View style={[styles.bubbleBlock, item.sender === 'user' ? styles.myBubbleBlock : styles.peerBubbleBlock]}>
              <Text style={[styles.bubbleText, item.sender === 'user' ? styles.myBubbleText : styles.peerBubbleText]}>
                {item.content}
              </Text>
            </View>
            <Text style={[styles.timestampText, item.sender === 'user' ? { alignSelf: 'flex-end' } : null]}>
              {item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'Now'}
            </Text>
          </View>
        )}
      />

      {/* Input Action Panel - Keyboard Pin-Safe */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={8}>
        <View style={styles.inputDockContainer}>
          <View style={styles.inputInnerDock}>
            <TouchableOpacity style={[styles.dockAddonButton, sending && { opacity: 0.6 }]} disabled={sending} activeOpacity={0.7}>
              <ImageIcon size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TextInput
              placeholder="Ask PadiAI..."
              placeholderTextColor="#94a3b8"
              value={typedMessage}
              onChangeText={setTypedMessage}
              multiline
              editable={!sending}
              style={styles.textDockInputField}
            />

            <TouchableOpacity 
              style={[styles.sendButton, (!typedMessage.trim() || sending) && { opacity: 0.6 }]} 
              onPress={sendMessage}
              disabled={!typedMessage.trim() || sending}
              activeOpacity={0.8}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Send size={16} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f8fafc' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1, paddingRight: 16 },
  backIconButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' },
  channelMetaGroup: { flexDirection: 'column', flex: 1, gap: 1 },
  channelTitle: { fontFamily: 'OnestBold', fontSize: 15, fontWeight: '700', color: '#110023' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 },
  memberText: { fontFamily: 'OnestLight', fontSize: 11, color: '#15803d', fontWeight: '500' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorBanner: { backgroundColor: '#fee2e2', paddingHorizontal: 16, paddingVertical: 10 },
  errorText: { color: '#dc2626', fontFamily: 'OnestLight', fontSize: 12 },
  chatScrollArea: { paddingHorizontal: 20, paddingVertical: 24, gap: 20 },
  messageBubbleContainer: { maxWidth: '82%', flexDirection: 'column' },
  myBubbleAlignment: { alignSelf: 'flex-end' },
  peerBubbleAlignment: { alignSelf: 'flex-start' },
  senderHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4, paddingLeft: 4 },
  senderNameText: { fontFamily: 'OnestBold', fontSize: 12, fontWeight: '600', color: '#475569' },
  mentorTag: { backgroundColor: '#230444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  mentorTagText: { fontFamily: 'OnestBold', fontSize: 9, color: '#ffffff', fontWeight: '700' },
  bubbleBlock: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  myBubbleBlock: { backgroundColor: '#110023', borderBottomRightRadius: 4 },
  peerBubbleBlock: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderBottomLeftRadius: 4 },
  bubbleText: { fontFamily: 'OnestLight', fontSize: 13, lineHeight: 18 },
  myBubbleText: { color: '#ffffff' },
  peerBubbleText: { color: '#110023' },
  timestampText: { fontFamily: 'OnestLight', fontSize: 10, color: '#94a3b8', marginTop: 4, paddingHorizontal: 4 },
  inputDockContainer: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 10, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f8fafc' },
  inputInnerDock: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 18, paddingHorizontal: 12, minHeight: 48, paddingVertical: 6 },
  dockAddonButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  textDockInputField: { flex: 1, fontFamily: 'OnestLight', fontSize: 14, color: '#110023', paddingHorizontal: 8, maxHeight: 100 },
  sendButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#110023', alignItems: 'center', justifyContent: 'center' },
});

export default ChatRoom;