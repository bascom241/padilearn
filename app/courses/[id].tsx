import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, BookOpen, Star, Layers, Play, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Swap with React Navigation hooks if needed

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CourseDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  // Fallback to structure data gracefully if params are empty
  const courseData = {
    title: (params.title as string) || "Advanced Next.js & Production Architecture",
    category: (params.category as string) || "TECH SPRINT",
    lessons: params.lessons ? `${params.lessons} Lessons` : "24 Lessons",
    duration: (params.duration as string) || "18.5 hrs",
    rating: (params.rating as string) || "4.9",
    level: (params.level as string) || "Advanced",
    price: (params.price as string) || "$49",
    image: require('../../assets/images/card1.jpg'), // Uses your existing placeholder asset schema
  };

  // Modern structured syllabus curriculum payload
  const syllabus = [
    {
      id: 0,
      title: "Module 1: Production Core Architecture",
      duration: "4.5 hrs",
      lessons: [
        { title: "Caching matrices and fine-grained ISR mechanics", duration: "45 mins", isFree: true },
        { title: "Streaming layouts and heavy layout composition", duration: "50 mins", isFree: false },
        { title: "Hydration pipeline bottlenecks & runtime overrides", duration: "35 mins", isFree: false },
      ]
    },
    {
      id: 1,
      title: "Module 2: Custom Middleware & State Locks",
      duration: "6.2 hrs",
      lessons: [
        { title: "Edge route distribution and global token systems", duration: "60 mins", isFree: false },
        { title: "Race conditions in high-concurrency state locks", duration: "75 mins", isFree: false },
      ]
    },
    {
      id: 2,
      title: "Module 3: Infrastructure & Enterprise Rollouts",
      duration: "7.8 hrs",
      lessons: [
        { title: "Paystack wallet isolation architecture", duration: "90 mins", isFree: false },
        { title: "Pragmatic metrics canvas tracking implementation", duration: "45 mins", isFree: false },
      ]
    }
  ];

  const toggleSection = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Media Window Hero Video Panel with Overlay Controls */}
        <ImageBackground source={courseData.image} style={styles.heroVideoWindow}>
          <View style={styles.videoOverlay}>
            <SafeAreaView edges={['top']} style={styles.headerNavRow}>
              <TouchableOpacity style={styles.blurIconButton} onPress={() => router.back()} activeOpacity={0.7}>
                <ArrowLeft size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.blurBadge}>
                <Text style={styles.blurBadgeText}>{courseData.category}</Text>
              </View>
            </SafeAreaView>

            {/* Centered Premium Video Launch Target Circle */}
            <TouchableOpacity style={styles.playCenterButton} activeOpacity={0.8}>
              <View style={styles.playInnerCircle}>
                <Play size={22} color="#110023" fill="#110023" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.previewLabel}>Preview this tech sprint</Text>
          </View>
        </ImageBackground>

        {/* Content Body Layout Wrap */}
        <View style={styles.bodyWrapper}>
          
          {/* Metadata Grid Badge Row */}
          <View style={styles.metaBadgeRow}>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#eab308" fill="#eab308" />
              <Text style={styles.ratingText}>{courseData.rating}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Layers size={12} color="#64748b" />
              <Text style={styles.levelText}>{courseData.level}</Text>
            </View>
          </View>

          {/* Master Course Headline */}
          <Text style={styles.courseMainTitle}>{courseData.title}</Text>
          <Text style={styles.courseAuthor}>Instructed by Vetted Industry Veterans</Text>

          {/* Clean Core Metrics Overview Grid (Matches Analytics Styles) */}
          <View style={styles.statsPanelGrid}>
            <View style={styles.statItemCell}>
              <BookOpen size={18} color="#110023" />
              <Text style={styles.statVal}>{courseData.lessons}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItemCell}>
              <Clock size={18} color="#110023" />
              <Text style={styles.statVal}>{courseData.duration}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItemCell}>
              <ShieldCheck size={18} color="#110023" />
              <Text style={styles.statVal}>Certificate</Text>
            </View>
          </View>

          {/* Expandable Module Syllabus/Curriculum Component Stack */}
          <View style={styles.curriculumSection}>
            <Text style={styles.sectionLabel}>Course Syllabus</Text>
            
            {syllabus.map((module) => {
              const isCurrentOpen = expandedSection === module.id;
              return (
                <View key={module.id} style={styles.accordionContainer}>
                  <TouchableOpacity 
                    style={styles.accordionHeader} 
                    onPress={() => toggleSection(module.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.accordionHeaderLeft}>
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                      <Text style={styles.moduleMeta}>{module.lessons.length} lessons • {module.duration}</Text>
                    </View>
                    {isCurrentOpen ? <ChevronUp size={18} color="#110023" /> : <ChevronDown size={18} color="#110023" />}
                  </TouchableOpacity>

                  {isCurrentOpen && (
                    <View style={styles.accordionContentDropdown}>
                      {module.lessons.map((lesson, lIdx) => (
                        <View key={lIdx} style={styles.lessonRowItem}>
                          <View style={styles.lessonLeftInfo}>
                            <View style={styles.lessonIndexCircle}>
                              <Text style={styles.lessonIndexText}>{lIdx + 1}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text numberOfLines={1} style={styles.lessonTitleText}>{lesson.title}</Text>
                              <Text style={styles.lessonDurationText}>{lesson.duration}</Text>
                            </View>
                          </View>
                          {lesson.isFree && (
                            <View style={styles.freePreviewBadge}>
                              <Text style={styles.freePreviewText}>Preview</Text>
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

        </View>
      </ScrollView>

      {/* High-End Fixed Bottom Sticky Checkout Bar Container */}
      <View style={styles.stickyFooterBar}>
        <View style={styles.footerPriceContainer}>
          <Text style={styles.priceLabel}>TOTAL ACCESS</Text>
          <Text style={styles.footerPriceValue}>{courseData.price}</Text>
        </View>
        <TouchableOpacity style={styles.primaryEnrollButton} activeOpacity={0.8}>
          <Text style={styles.enrollButtonText}>Enroll in Cohort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 120, // Prevents elements from hiding under the footer bar
  },
  heroVideoWindow: {
    width: SCREEN_WIDTH,
    height: 250,
    backgroundColor: '#110023',
  },
  videoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 0, 35, 0.45)',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  headerNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  blurIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  blurBadgeText: {
    fontFamily: 'OnestBold',
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  playCenterButton: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playInnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLabel: {
    fontFamily: 'OnestLight',
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  bodyWrapper: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef9c3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    color: '#a16207',
    fontWeight: '700',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#475569',
  },
  courseMainTitle: {
    fontFamily: 'OnestBold',
    fontSize: 22,
    fontWeight: '700',
    color: '#110023',
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  courseAuthor: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  statsPanelGrid: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  statItemCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statVal: {
    fontFamily: 'OnestBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#110023',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
  },
  curriculumSection: {
    marginTop: 32,
  },
  sectionLabel: {
    fontFamily: 'OnestBold',
    fontSize: 16,
    fontWeight: '700',
    color: '#110023',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  accordionContainer: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionHeaderLeft: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    paddingRight: 8,
  },
  moduleTitle: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#110023',
  },
  moduleMeta: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#64748b',
  },
  accordionContentDropdown: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  lessonRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lessonLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  lessonIndexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#23044410',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexText: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    color: '#110023',
    fontWeight: '600',
  },
  lessonTitleText: {
    fontFamily: 'OnestBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  lessonDurationText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  freePreviewBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freePreviewText: {
    fontFamily: 'OnestBold',
    fontSize: 10,
    color: '#15803d',
    fontWeight: '700',
  },
  stickyFooterBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerPriceContainer: {
    flexDirection: 'column',
    gap: 1,
  },
  priceLabel: {
    fontFamily: 'OnestLight',
    fontSize: 10,
    color: '#64748b',
    letterSpacing: 0.5,
  },
  footerPriceValue: {
    fontFamily: 'OnestBold',
    fontSize: 22,
    fontWeight: '800',
    color: '#110023',
  },
  primaryEnrollButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#110023',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrollButtonText: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default CourseDetails;