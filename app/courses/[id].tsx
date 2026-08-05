import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, BookOpen, Layers, Play, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Lock } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useQueryClient } from '@tanstack/react-query';
import { useCourse } from '@/features/courses/hooks/useCourse';
import { useInitializeEnrollment, useVerifyEnrollment } from '@/features/courses/hooks/useEnrollment';
import type { CourseLesson } from '@/features/courses/types/Course';
import { handleApiError } from '@/utils/handleApiError';
import { toast } from '@/utils/toast';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatDuration = (seconds: number) => {
  if (!seconds) return '—';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = (minutes / 60).toFixed(1);
  return `${hours} hrs`;
};

const formatPrice = (price: number) => (price === 0 ? 'Free' : `₦${price.toLocaleString()}`);

const CourseDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const queryClient = useQueryClient();

  const { data: course, isLoading, isError } = useCourse(id);
  const initializeEnrollment = useInitializeEnrollment();
  const verifyEnrollment = useVerifyEnrollment();

  const toggleSection = (idx: number) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const handleEnroll = () => {
    if (!course) return;
    initializeEnrollment.mutate(course.id, {
      onSuccess: async (result) => {
        if (result.free) {
          queryClient.invalidateQueries({ queryKey: ['course', course.id] });
          toast.success('Enrolled!', 'You now have full access to this course.');
          return;
        }

        if (result.authorizationUrl && result.reference) {
          await WebBrowser.openBrowserAsync(result.authorizationUrl);

          verifyEnrollment.mutate(result.reference, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['course', course.id] });
              toast.success('Payment verified', 'Enrollment complete!');
            },
            onError: () => {
              toast.info(
                'Still confirming payment',
                'If you completed the payment, pull to refresh in a moment.',
              );
            },
          });
        }
      },
      onError: handleApiError,
    });
  };

  const handleLessonPress = (lesson: CourseLesson) => {
    if (lesson.isLocked) {
      toast.info('Locked lesson', 'Enroll in this course to unlock this lesson.');
      return;
    }
    router.push({ pathname: '/courses/lesson/[id]', params: { id: lesson.id, title: lesson.title } });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#110023" />
      </SafeAreaView>
    );
  }

  if (isError || !course) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Could not load this course.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.errorBackButton}>
          <Text style={styles.errorBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isEnrolling = initializeEnrollment.isPending || verifyEnrollment.isPending;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Media Window Hero Video Panel with Overlay Controls */}
        <ImageBackground source={{ uri: course.thumbnail }} style={styles.heroVideoWindow}>
          <View style={styles.videoOverlay}>
            <SafeAreaView edges={['top']} style={styles.headerNavRow}>
              <TouchableOpacity style={styles.blurIconButton} onPress={() => router.back()} activeOpacity={0.7}>
                <ArrowLeft size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.blurBadge}>
                <Text style={styles.blurBadgeText}>{course.category.toUpperCase()}</Text>
              </View>
            </SafeAreaView>

            <TouchableOpacity style={styles.playCenterButton} activeOpacity={0.8}>
              <View style={styles.playInnerCircle}>
                <Play size={22} color="#110023" fill="#110023" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>

            <Text style={styles.previewLabel}>Preview this course</Text>
          </View>
        </ImageBackground>

        {/* Content Body Layout Wrap */}
        <View style={styles.bodyWrapper}>

          {/* Metadata Grid Badge Row */}
          <View style={styles.metaBadgeRow}>
            <View style={styles.levelBadge}>
              <Layers size={12} color="#64748b" />
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
            {course.isEnrolled && (
              <View style={styles.ratingBadge}>
                <CheckCircle size={12} color="#15803d" />
                <Text style={[styles.ratingText, { color: '#15803d' }]}>Enrolled</Text>
              </View>
            )}
          </View>

          {/* Master Course Headline */}
          <Text style={styles.courseMainTitle}>{course.title}</Text>
          <Text style={styles.courseAuthor}>Instructed by {course.instructor.fullName}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>

          {/* Clean Core Metrics Overview Grid */}
          <View style={styles.statsPanelGrid}>
            <View style={styles.statItemCell}>
              <BookOpen size={18} color="#110023" />
              <Text style={styles.statVal}>{course.totalLessons} Lessons</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItemCell}>
              <Clock size={18} color="#110023" />
              <Text style={styles.statVal}>{formatDuration(course.totalDuration)}</Text>
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

            {course.modules.map((module, moduleIdx) => {
              const isCurrentOpen = expandedSection === moduleIdx;
              return (
                <View key={module.id} style={styles.accordionContainer}>
                  <TouchableOpacity
                    style={styles.accordionHeader}
                    onPress={() => toggleSection(moduleIdx)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.accordionHeaderLeft}>
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                      <Text style={styles.moduleMeta}>{module.lessonCount} lessons • {formatDuration(module.duration)}</Text>
                    </View>
                    {isCurrentOpen ? <ChevronUp size={18} color="#110023" /> : <ChevronDown size={18} color="#110023" />}
                  </TouchableOpacity>

                  {isCurrentOpen && (
                    <View style={styles.accordionContentDropdown}>
                      {module.lessons.map((lesson, lIdx) => (
                        <TouchableOpacity
                          key={lesson.id}
                          style={styles.lessonRowItem}
                          onPress={() => handleLessonPress(lesson)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.lessonLeftInfo}>
                            <View style={styles.lessonIndexCircle}>
                              <Text style={styles.lessonIndexText}>{lIdx + 1}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text numberOfLines={1} style={styles.lessonTitleText}>{lesson.title}</Text>
                              <Text style={styles.lessonDurationText}>{formatDuration(lesson.duration)}</Text>
                            </View>
                          </View>
                          {lesson.isLocked ? (
                            <Lock size={16} color="#94a3b8" />
                          ) : lesson.isPreview ? (
                            <View style={styles.freePreviewBadge}>
                              <Text style={styles.freePreviewText}>Preview</Text>
                            </View>
                          ) : (
                            <Play size={16} color="#110023" />
                          )}
                        </TouchableOpacity>
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
          <Text style={styles.footerPriceValue}>{formatPrice(course.price)}</Text>
        </View>
        {course.isEnrolled ? (
          <View style={[styles.primaryEnrollButton, styles.enrolledButton]}>
            <Text style={styles.enrollButtonText}>You are enrolled</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.primaryEnrollButton}
            activeOpacity={0.8}
            onPress={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.enrollButtonText}>Enroll in Course</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    fontFamily: 'OnestNormal',
    fontSize: 14,
    color: '#64748b',
  },
  errorBackButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#110023',
    borderRadius: 12,
  },
  errorBackButtonText: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
  },
  scrollContent: {
    paddingBottom: 120,
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
    backgroundColor: '#dcfce7',
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
    textTransform: 'capitalize',
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
  courseDescription: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#475569',
    marginTop: 12,
    lineHeight: 20,
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
  enrolledButton: {
    backgroundColor: '#15803d',
  },
  enrollButtonText: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default CourseDetails;
