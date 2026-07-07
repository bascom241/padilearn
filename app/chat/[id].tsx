import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Image as ImageIcon, Code, MessageSquare, Users } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ChatRoom = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [typedMessage, setTypedMessage] = useState('');

  const activeChannel = {
    title: (params.title as string) || "Next.js Core Cohort",
    memberCount: "142 Active Devs"
  };

  const [messageStack, setMessageStack] = useState([
    {
      id: '1',
      sender: 'Senior Dev Tunde',
      text: 'Make sure you guys handle race conditions elegantly using dynamic locking methods in your Spring backend before launching tomorrow.',
      timestamp: '11:24 AM',
      isMe: false,
      role: 'Mentor'
    },
    {
      id: '2',
      sender: 'You',
      text: 'Got it. Handled decimal precision issues inside the Paystack transaction payload matrix as well.',
      timestamp: '11:26 AM',
      isMe: true,
      role: 'Student'
    },
    {
      id: '3',
      sender: 'Dev Chloe',
      text: 'Are we breaking our landing page layout at precise viewport configurations or using standard breakpoints?',
      timestamp: '11:30 AM',
      isMe: false,
      role: 'Student'
    }
  ]);

  const sendMessage = () => {
    if (!typedMessage.trim()) return;
    const newMsg = {
      id: String(messageStack.length + 1),
      sender: 'You',
      text: typedMessage,
      timestamp: 'Just Now',
      isMe: true,
      role: 'Student'
    };
    setMessageStack([...messageStack, newMsg]);
    setTypedMessage('');
  };

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
        <TouchableOpacity style={styles.optionsButton} activeOpacity={0.7}>
          <Code size={18} color="#110023" />
        </TouchableOpacity>
      </View>

      {/* Message Matrix Component Stream Node */}
      <FlatList
        data={messageStack}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatScrollArea}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.messageBubbleContainer, item.isMe ? styles.myBubbleAlignment : styles.peerBubbleAlignment]}>
            {!item.isMe && (
              <View style={styles.senderHeaderRow}>
                <Text style={styles.senderNameText}>{item.sender}</Text>
                {item.role === 'Mentor' && (
                  <View style={styles.mentorTag}><Text style={styles.mentorTagText}>Staff</Text></View>
                )}
              </View>
            )}
            <View style={[styles.bubbleBlock, item.isMe ? styles.myBubbleBlock : styles.peerBubbleBlock]}>
              <Text style={[styles.bubbleText, item.isMe ? styles.myBubbleText : styles.peerBubbleText]}>
                {item.text}
              </Text>
            </View>
            <Text style={[styles.timestampText, item.isMe ? { alignSelf: 'flex-end' } : null]}>{item.timestamp}</Text>
          </View>
        )}
      />

      {/* Input Action Panel - Keyboard Pin-Safe */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={8}>
        <View style={styles.inputDockContainer}>
          <View style={styles.inputInnerDock}>
            <TouchableOpacity style={styles.dockAddonButton} activeOpacity={0.7}>
              <ImageIcon size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TextInput
              placeholder="Message workspace..."
              placeholderTextColor="#94a3b8"
              value={typedMessage}
              onChangeText={setTypedMessage}
              multiline
              style={styles.textDockInputField}
            />

            <TouchableOpacity 
              style={[styles.sendButton, !typedMessage.trim() && { opacity: 0.6 }]} 
              onPress={sendMessage}
              disabled={!typedMessage.trim()}
              activeOpacity={0.8}
            >
              <Send size={16} color="#ffffff" />
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
  optionsButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
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