import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageSquare, Users, MessageCircle, Hash, ChevronRight, MessageSquareText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
interface RoomItem {
    id: string;
    title: string;
    subtitle: string;
    unreadCount: number;
    memberCount: string;
    category: string;
    time: string;
  }
const ChatChannelsList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Structured high-end channels mock list
  const activeRooms = [
    {
      id: 'nextjs-core',
      title: "Next.js Core Cohort",
      subtitle: "Senior Dev Tunde: Make sure you guys handle race conditions...",
      unreadCount: 3,
      memberCount: "142 Active Devs",
      category: "TRACK CHANNELS",
      time: "11:30 AM"
    },
    {
      id: 'ui-ux-systemic',
      title: "UI/UX Systemic Design Lab",
      subtitle: "Dev Chloe: Are we breaking our landing page layout at precise...",
      unreadCount: 0,
      memberCount: "89 Members",
      category: "TRACK CHANNELS",
      time: "Yesterday"
    },
    {
      id: 'spring-infra',
      title: "Spring Boot Enterprise Infra",
      subtitle: "You: Handled decimal precision issues inside the Paystack...",
      unreadCount: 0,
      memberCount: "64 Members",
      category: "TRACK CHANNELS",
      time: "Jul 5"
    },
    {
      id: 'abdulwahab-mentor',
      title: "Engr. Abdulwahab",
      subtitle: "Your technical architectural layout review looks spot on.",
      unreadCount: 1,
      memberCount: "1-on-1 Mentor Workspace",
      category: "DIRECT WORKSPACES",
      time: "Jul 4"
    }
  ];

  const handleRoomPress = (room: RoomItem) => {
    router.push({
      pathname: "/chat/[id]",
      params: { id: room.id, title: room.title }
    });
  };

  // Group items smoothly by their category headers
  const renderRoomItem = ({ item }: { item: typeof activeRooms[0] }) => (
    <TouchableOpacity 
      style={styles.roomRowCard} 
      onPress={() => handleRoomPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.roomIconWrapper}>
        {item.category === 'DIRECT WORKSPACES' ? (
          <MessageCircle size={20} color="#110023" />
        ) : (
          <Hash size={20} color="#230444" />
        )}
      </View>

      <View style={styles.roomMetaBlock}>
        <View style={styles.roomMetaTopRow}>
          <Text numberOfLines={1} style={styles.roomTitleText}>{item.title}</Text>
          <Text style={styles.timeStampText}>{item.time}</Text>
        </View>

        <Text numberOfLines={1} style={styles.subtitleSnippet}>{item.subtitle}</Text>

        <View style={styles.roomBottomRow}>
          <View style={styles.membersIndicator}>
            <Users size={12} color="#64748b" />
            <Text style={styles.memberCountText}>{item.memberCount}</Text>
          </View>
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadCounterBadge}>
              <Text style={styles.unreadCounterText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter items elegantly based on search inputs
  const filteredRooms = activeRooms.filter(room => 
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Upper Global Navigation Row */}
      <View style={styles.header}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerMainTitle}>Workspaces</Text>
          <Text style={styles.headerSubtitle}>Connect with your cohort and engineering mentors</Text>
        </View>
      </View>

      {/* Dynamic Search Box Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <Search size={18} color="#64748b" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search channels or active rooms..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.inputField}
          />
        </View>
      </View>

      {/* Main Channels List Layout Node */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoomItem}
        contentContainerStyle={styles.listContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <MessageSquareText size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
            <Text style={styles.emptyStateText}>No active workspaces found</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  headerTitleGroup: {
    flexDirection: 'column',
    gap: 2,
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
    // Soft clean minimalist shadow spec
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
  },
});

export default ChatChannelsList;