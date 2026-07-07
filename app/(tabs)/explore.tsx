import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageCircle, Repeat2, Heart, Share, Radio, BadgeCheck, Sparkles, Sliders, Plus, Mic, X, Code2, Layers, Cpu } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TwitterExploreScreen() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<'for-you' | 'spaces'>('for-you');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  
  // Modal Controllers
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [spaceModalVisible, setSpaceModalVisible] = useState(false);

  // Form Inputs State
  const [newPostText, setNewPostText] = useState('');
  const [selectedTag, setSelectedTag] = useState('#infra');
  const [newSpaceTitle, setNewSpaceTitle] = useState('');

  const CHARACTER_LIMIT = 280;

  // Algorithmic Micro-Post Feed
  const feedPosts = [
    {
      id: 'post-1',
      author: {
        name: "Engr. Abdulwahab",
        handle: "abdul_infra",
        avatarBg: "#11002315",
        isVerified: true
      },
      content: "Just handled a critical race condition edge-case inside the Paystack wallet routing architecture. Standard DB locks were bottlenecking concurrent requests—dropped in a dynamic pessimistic write-lock loop instead. Decimal precision is now pristine. 🧵 👇",
      timestamp: "2h",
      tag: "#backend #infra",
      metrics: { replies: 14, retweets: 42, likes: 189 },
      postTimestampText:"01/5/2025"
    },
    {
      id: 'post-2',
      author: {
        name: "Tunde NextDev",
        handle: "tunde_codes",
        avatarBg: "#15803d15",
        isVerified: false
      },
      content: "Are we breaking our landing page layout components at precise responsive boundaries, or are we just relying on standard flex-wrap guesswork? Minimalist high-end UI demands strict adherence to the original Figma breaking points. Don't compromise on the typography break layouts.",
      timestamp: "4h",
      tag: "#uiux #designsystem",
      metrics: { replies: 8, retweets: 12, likes: 64 },
      postTimestampText:"12/12/2026"
    }
  ];

  const liveSpaces = [
    {
      id: 'space-1',
      title: "How To Break Into AI Engineering 🚀",
      host: "Engr. Abdulwahab",
      listeningCount: "412 listening",
      speakers: ["abdul_infra", "dev_chloe", "tunde_codes"],
      isLive: true
    }
  ];

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleFabPress = () => {
    if (currentTab === 'for-you') {
      setPostModalVisible(true);
    } else {
      setSpaceModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      
      {/* 1. Global App Header */}
      <View style={styles.topStickyHeader}>
        <View style={styles.avatarPlaceholderCircle}>
          <Text style={styles.avatarInitial}>A</Text>
        </View>
        
        {/* Dynamic Nav Tabs Component */}
        <View style={styles.navTabGroup}>
          <TouchableOpacity 
            style={styles.tabPressNode} 
            onPress={() => setCurrentTab('for-you')}
          >
            <Text style={[styles.tabLabelText, currentTab === 'for-you' && styles.activeLabelText]}>For you</Text>
            {currentTab === 'for-you' && <View style={styles.activeIndicatorBar} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabPressNode} 
            onPress={() => setCurrentTab('spaces')}
          >
            <View style={styles.spacesTabHeaderRow}>
              <Text style={[styles.tabLabelText, currentTab === 'spaces' && styles.activeLabelText]}>Spaces</Text>
              <View style={styles.liveIndicatorDot} />
            </View>
            {currentTab === 'spaces' && <View style={styles.activeIndicatorBar} />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconConfigButton}>
          <Sliders size={18} color="#110023" />
        </TouchableOpacity>
      </View>

      {/* 2. Scroll Feed Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedScrollLayout}>
        
        {/* Constant Global Search Bar */}
        <View style={styles.searchContainerPadding}>
          <View style={styles.searchBarWrapper}>
            <Search size={16} color="#64748b" style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="Search trends, vectors, or cohorts..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInnerInput}
            />
          </View>
        </View>

        {/* 3. Live Audio Spaces Section Loop */}
        {liveSpaces.map((space) => (
          <TouchableOpacity 
            key={space.id} 
            style={styles.spaceAudioCard}
            onPress={() => router.push({ pathname: "/chat/[id]", params: { id: space.id, title: space.title } })}
            activeOpacity={0.9}
          >
            <View style={styles.spaceTopRow}>
              <View style={styles.liveBadgeWrapper}>
                <Radio size={12} color="#ffffff" style={{ marginRight: 4 }} />
                <Text style={styles.liveBadgeText}>LIVE NOW</Text>
              </View>
              <Text style={styles.listeningMetricText}>{space.listeningCount}</Text>
            </View>

            <Text style={styles.spaceTitleText}>{space.title}</Text>
            
            <View style={styles.spaceFooterContainer}>
              <View style={styles.avatarClusterRow}>
                {space.speakers.map((item, idx) => (
                  <View key={idx} style={[styles.clusterCircle, { marginLeft: idx === 0 ? 0 : -10, backgroundColor: idx === 0 ? '#110023' : '#64748b' }]}>
                    <Text style={styles.clusterCircleText}>{item[0].toUpperCase()}</Text>
                  </View>
                ))}
                <Text style={styles.hostLabelMetaText}>Hosted by @{space.host}</Text>
              </View>
              
              <View style={styles.joinSpacePillButton}>
                <Text style={styles.joinButtonText}>Listen In</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 4. Post Timeline Stream Grid */}
        {currentTab === 'for-you' && feedPosts.map((post) => {
          const isPostLiked = likedPosts.includes(post.id);
          return (
            <View key={post.id} style={styles.tweetContainerRow}>
              <View style={styles.tweetLeftColumn}>
                <View style={[styles.userProfileAvatar, { backgroundColor: post.author.avatarBg }]}>
                  <Text style={styles.avatarProfileChar}>{post.author.name[0]}</Text>
                </View>
              </View>

              <View style={styles.tweetRightColumn}>
                <View style={styles.tweetHeaderMetaRow}>
                  <View style={styles.nameContainerGroup}>
                    <Text numberOfLines={1} style={styles.profileDisplayName}>{post.author.name}</Text>
                    {post.author.isVerified && <BadgeCheck size={15} color="#110023" fill="#110023" style={{ marginRight: 4 }} />}
                    <Text numberOfLines={1} style={styles.userHandleText}>@{post.author.handle}</Text>
                    <Text style={styles.dotSeparator}>·</Text>
                    <Text style={styles.postTimestampText}>{post.postTimestampText || post.timestamp}</Text>
                  </View>
                </View>

                <Text style={styles.tweetCoreContentText}>
                  {post.content} <Text style={[styles.tweetInlineHyperlink, { color: '#110023' }]}>{post.tag}</Text>
                </Text>

                <View style={styles.tweetActionEngagementBar}>
                  <TouchableOpacity style={styles.actionEngagementNode}>
                    <MessageCircle size={15} color="#64748b" />
                    <Text style={styles.actionMetricNumberLabel}>{post.metrics.replies}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionEngagementNode}>
                    <Repeat2 size={16} color="#64748b" />
                    <Text style={styles.actionMetricNumberLabel}>{post.metrics.retweets}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionEngagementNode} 
                    onPress={() => toggleLike(post.id)}
                  >
                    <Heart size={15} color={isPostLiked ? "#ef4444" : "#64748b"} fill={isPostLiked ? "#ef4444" : "transparent"} />
                    <Text style={[styles.actionMetricNumberLabel, isPostLiked && { color: "#ef4444" }]}>
                      {isPostLiked ? post.metrics.likes + 1 : post.metrics.likes}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionEngagementNode}>
                    <Share size={14} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        {currentTab === 'spaces' && (
          <View style={styles.emptyStateContainerBlock}>
            <Sparkles size={24} color="#94a3b8" style={{ marginBottom: 8 }} />
            <Text style={styles.emptyStateHeadingText}>No other live spaces found</Text>
            <Text style={styles.emptyStateParagraph}>When engineering teams host open mic reviews or design teardowns, they will pop up live right here.</Text>
          </View>
        )}

      </ScrollView>

      {/* 5. Context-Aware Floating Action Button (#110023) */}
      <TouchableOpacity 
        style={styles.floatingActionButton} 
        onPress={handleFabPress}
        activeOpacity={0.85}
      >
        {currentTab === 'for-you' ? (
          <Plus size={22} color="#ffffff" />
        ) : (
          <Mic size={20} color="#ffffff" />
        )}
      </TouchableOpacity>

      {/* ==================== A. ENHANCED INFORMATIVE POST COMPOSER LAYER ==================== */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={postModalVisible}
        onRequestClose={() => setPostModalVisible(false)}
      >
        <View style={styles.fullscreenModalOverlay}>
          <SafeAreaView style={styles.modalSheetSurface}>
            <View style={styles.modalHeaderTopBar}>
              <TouchableOpacity onPress={() => setPostModalVisible(false)} style={styles.closeModalCircleNode}>
                <X size={18} color="#110023" />
              </TouchableOpacity>
              
              <View style={styles.headerRightActionGroup}>
                <Text style={[
                  styles.characterCounterText, 
                  (CHARACTER_LIMIT - newPostText.length) < 20 && { color: '#ef4444' }
                ]}>
                  {CHARACTER_LIMIT - newPostText.length}
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.publishSubmitPill, 
                    { backgroundColor: '#110023' },
                    newPostText.trim().length === 0 && { opacity: 0.5 }
                  ]}
                  disabled={newPostText.trim().length === 0}
                  onPress={() => {
                    console.log('Publish Data:', { content: newPostText, tag: selectedTag });
                    setNewPostText('');
                    setPostModalVisible(false);
                  }}
                >
                  <Text style={styles.publishButtonText}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Structure Prompt Guide Card */}
            <View style={styles.infoTipCard}>
              <Layers size={14} color="#110023" style={{ marginRight: 8, marginTop: 1 }} />
              <Text style={styles.infoTipText}>
                <Text style={{ fontWeight: '700' }}>Insight Blueprint:</Text> State the technical context, the system bottleneck/constraint, and your architectural solution.
              </Text>
            </View>

            {/* Dynamic Segment Selection Tag Scroll */}
            <View style={styles.tagSelectorContainer}>
              {['#infra', '#architecture', '#uiux', '#db-ops'].map((tag) => (
                <TouchableOpacity 
                  key={tag}
                  style={[styles.tagPillNode, selectedTag === tag && styles.tagPillNodeActive]}
                  onPress={() => setSelectedTag(tag)}
                >
                  <Text style={[styles.tagPillLabel, selectedTag === tag && styles.tagPillLabelActive]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.composerFormBody}>
              <View style={styles.composerAvatarPlaceholder}>
                <Text style={styles.composerAvatarChar}>A</Text>
              </View>
              <TextInput
                placeholder="What implementation architecture anomaly did you solve today?"
                placeholderTextColor="#94a3b8"
                multiline
                autoFocus
                maxLength={CHARACTER_LIMIT}
                style={styles.multilineTextDraftInput}
                value={newPostText}
                onChangeText={setNewPostText}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* ==================== B. HOST LIVE SPACE SETUP SHEET LAYER ==================== */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={spaceModalVisible}
        onRequestClose={() => setSpaceModalVisible(false)}
      >
        <View style={styles.fullscreenModalOverlay}>
          <SafeAreaView style={styles.modalSheetSurface}>
            <View style={styles.modalHeaderTopBar}>
              <TouchableOpacity onPress={() => setSpaceModalVisible(false)} style={styles.closeModalCircleNode}>
                <X size={18} color="#110023" />
              </TouchableOpacity>
              <Text style={styles.centeredModalTitleHeader}>Host Live Review</Text>
              <View style={{ width: 32 }} /> 
            </View>

            <View style={styles.spaceCreationFlowContainer}>
              <View style={styles.radioWaveCenterGraphic}>
                <Radio size={36} color="#110023" />
              </View>
              
              <Text style={styles.inputSectionHeaderTitle}>Give your live space a focus title</Text>
              
              <View style={styles.textInputBoxContainerLine}>
                <TextInput
                  placeholder="e.g., Optimizing Database Connection Pools with Spring Boot..."
                  placeholderTextColor="#94a3b8"
                  autoFocus
                  style={styles.flatSingleLineSpaceInput}
                  value={newSpaceTitle}
                  onChangeText={setNewSpaceTitle}
                />
              </View>

              <Text style={styles.spaceExplainerClarificationText}>
                Launching this session broadcasts an instant live-microphone open audio workspace invite to your technical cohort.
              </Text>

              <TouchableOpacity 
                style={[styles.launchLiveSessionButtonPill, { backgroundColor: '#110023' }]}
                onPress={() => {
                  console.log('Launch Space Room Title:', newSpaceTitle);
                  setNewSpaceTitle('');
                  setSpaceModalVisible(false);
                }}
              >
                <Mic size={16} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.actionButtonLabelText}>Start Live Session</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topStickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatarPlaceholderCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#110023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '700',
  },
  navTabGroup: {
    flexDirection: 'row',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    gap: 32,
  },
  tabPressNode: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 4,
  },
  spacesTabHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
  tabLabelText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  activeLabelText: {
    color: '#110023',
    fontWeight: '700',
  },
  activeIndicatorBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#110023',
    borderRadius: 2,
  },
  iconConfigButton: {
    width: 32,
    height: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  feedScrollLayout: {
    paddingBottom: 90,
  },
  searchContainerPadding: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff3f4',
    borderRadius: 99,
    paddingHorizontal: 16,
    height: 38,
  },
  searchInnerInput: {
    flex: 1,
    fontSize: 13,
    color: '#110023',
  },
  spaceAudioCard: {
    backgroundColor: '#7856ff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#7856ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  spaceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  liveBadgeText: {
    fontSize: 9,
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  listeningMetricText: {
    fontSize: 11,
    color: '#ffffffea',
  },
  spaceTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
    letterSpacing: -0.3,
  },
  spaceFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#ffffff1a',
    paddingTop: 12,
  },
  avatarClusterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clusterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7856ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterCircleText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
  hostLabelMetaText: {
    fontSize: 11,
    color: '#ffffffcc',
    marginLeft: 8,
  },
  joinSpacePillButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 99,
  },
  joinButtonText: {
    fontSize: 11,
    color: '#7856ff',
    fontWeight: '700',
  },
  tweetContainerRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tweetLeftColumn: {
    marginRight: 12,
  },
  userProfileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarProfileChar: {
    fontSize: 14,
    color: '#110023',
  },
  tweetRightColumn: {
    flex: 1,
  },
  tweetHeaderMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  nameContainerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileDisplayName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#110023',
    marginRight: 4,
  },
  userHandleText: {
    fontSize: 13,
    color: '#64748b',
    marginRight: 4,
  },
  dotSeparator: {
    color: '#64748b',
    marginRight: 4,
  },
  postTimestampText: {
    fontSize: 13,
    color: '#64748b',
  },
  tweetCoreContentText: {
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
  },
  tweetInlineHyperlink: {
    fontWeight: '600',
  },
  tweetActionEngagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    maxWidth: '90%',
  },
  actionEngagementNode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  actionMetricNumberLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyStateContainerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyStateHeadingText: {
    fontSize: 16,
    color: '#110023',
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyStateParagraph: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  
  // Brand Main Palette FAB Configuration
  floatingActionButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#110023', 
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#110023',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fullscreenModalOverlay: {
    flex: 1,
    backgroundColor: '#00000040', 
    justifyContent: 'flex-end',
  },
  modalSheetSurface: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.88,
    width: SCREEN_WIDTH,
  },
  modalHeaderTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  headerRightActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  characterCounterText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  closeModalCircleNode: {
    width: 32,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  publishSubmitPill: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 99,
  },
  publishButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '700',
  },

  // Structural Guidance Informative Banner Card
  infoTipCard: {
    backgroundColor: '#11002309',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#110023',
  },
  infoTipText: {
    fontSize: 12,
    color: '#110023',
    lineHeight: 16,
    flex: 1,
  },

  // Tag Pill Selectors Row Layout
  tagSelectorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tagPillNode: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tagPillNodeActive: {
    backgroundColor: '#110023',
    borderColor: '#110023',
  },
  tagPillLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  tagPillLabelActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  composerFormBody: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  composerAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#110023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerAvatarChar: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '700',
  },
  multilineTextDraftInput: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    lineHeight: 22,
    paddingTop: 2,
    textAlignVertical: 'top',
  },
  
  centeredModalTitleHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#110023',
  },
  spaceCreationFlowContainer: {
    padding: 24,
    alignItems: 'center',
    flex: 1,
  },
  radioWaveCenterGraphic: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#11002310',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  inputSectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#110023',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  textInputBoxContainerLine: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    height: 48,
    justifyContent: 'center',
    marginBottom: 14,
  },
  flatSingleLineSpaceInput: {
    fontSize: 13.5,
    color: '#110023',
    width: '100%',
  },
  spaceExplainerClarificationText: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 17,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  launchLiveSessionButtonPill: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonLabelText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
});