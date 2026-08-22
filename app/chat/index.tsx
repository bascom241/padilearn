import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageSquare, Users, MessageCircle, Hash, ChevronRight, MessageSquareText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { padiAiService } from '@/features/chat/services/padiAiService';
import type { AiConversation } from '@/features/chat/types/chat.types';

const ChatChannelsList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<AiConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await padiAiService.getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomPress = (conversation: AiConversation) => {
    router.push({
      pathname: "/chat/[id]",
      params: { id: conversation._id, title: conversation.title }
    });
  };

  const renderRoomItem = ({ item }: { item: AiConversation }) => (
    <TouchableOpacity 
      style={styles.roomRowCard} 
      onPress={() => handleRoomPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.roomIconWrapper}>
        <MessageCircle size={20} color="#110023" />
      </View>

      <View style={styles.roomMetaBlock}>
        <View style={styles.roomMetaTopRow}>
          <Text numberOfLines={1} style={styles.roomTitleText}>{item.title}</Text>
          <Text style={styles.timeStampText}>
            {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Now'}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.subtitleSnippet}>PadiAi Conversation</Text>

        <View style={styles.roomBottomRow}>
          <View style={styles.membersIndicator}>
            <MessageSquare size={12} color="#64748b" />
            <Text style={styles.memberCountText}>AI Chat</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerMainTitle}>PadiAI Chat</Text>
            <Text style={styles.headerSubtitle}>Chat with your AI assistant</Text>
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
      {/* Upper Global Navigation Row */}
      <View style={styles.header}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerMainTitle}>PadiAI Chat</Text>
          <Text style={styles.headerSubtitle}>Chat with your AI assistant</Text>
        </View>
        <TouchableOpacity 
          style={styles.newChatButton}
          onPress={() => router.push('/chat/new')}
          activeOpacity={0.7}
        >
          <MessageSquare size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Dynamic Search Box Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <Search size={18} color="#64748b" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search conversations..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.inputField}
          />
        </View>
      </View>

      {/* Main Channels List Layout Node */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item._id}
        renderItem={renderRoomItem}
        contentContainerStyle={styles.listContainerStyle}
        showsVerticalScrollIndicator={false}
        onRefresh={loadConversations}
        refreshing={loading}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <MessageSquareText size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
            <Text style={styles.emptyStateText}>
              {error || 'No conversations yet. Start chatting with PadiAI!'}
            </Text>
            {!error && (
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => router.push('/chat/new')}
              >
                <Text style={styles.startButtonText}>Start New Chat</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleGroup: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  headerMainTitle: {
    fontFamily: 'OnestBold',
    fontSize: 22,
    fontWeight: '700',
    color: '#110023',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontFamily: 'OnestLight',
    fontSize: 12,
    color: '#64748b',
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#110023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
  },
  inputField: {
    flex: 1,
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#110023',
  },
  listContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomRowCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    gap: 14,
    shadowColor: '#110023',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  roomIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomMetaBlock: {
    flex: 1,
  },
  roomMetaTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  roomTitleText: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#110023',
    flex: 1,
    paddingRight: 8,
  },
  timeStampText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#94a3b8',
  },
  subtitleSnippet: {
    fontFamily: 'OnestLight',
    fontSize: 12,
    color: '#64748b',
    marginBottom: 10,
  },
  roomBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membersIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCountText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#64748b',
  },
  unreadCounterBadge: {
    backgroundColor: '#110023',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCounterText: {
    fontFamily: 'OnestBold',
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '700',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyStateText: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  startButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#110023',
    borderRadius: 10,
  },
  startButtonText: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ChatChannelsList;