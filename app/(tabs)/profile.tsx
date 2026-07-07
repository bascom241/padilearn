import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, GraduationCap, Clock, ChevronRight, BookOpen, FileCode2, ShieldAlert } from 'lucide-react-native';

export default function Profile() {
  // Student Context Identity Dataset
  const studentProfile = {
    name: "Abdulwahab",
    handle: "student_id_8942",
    track: "AI & Full-Stack Infrastructure",
    cohort: "Edulink Tech Cohort 2026",
    joined: "Enrolled Jan 2026",
    coursesEnrolled: 4,
    completedCerts: 2,
    learningHours: "148 hrs"
  };

  // Student-Focused Progress Milestones & System Options
  const learningInventory = [
    { 
      label: "Verified Certifications", 
      Icon: Award, 
      desc: "View your earned architectural smart tokens and certificates",
      badge: "2 Earned"
    },
    { 
      label: "Academic & Cohort Settings", 
      Icon: GraduationCap, 
      desc: "Manage your live classroom schedules and cohort assignments",
      badge: null
    },
    { 
      label: "Assignments & Submissions", 
      Icon: FileCode2, 
      desc: "Review grading criteria, pending deadlines, and code reviews",
      badge: "1 Pending"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Twitter-Style Minimalist Student Header */}
      <View style={styles.headerActionRow}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{studentProfile.name}</Text>
          <Text style={styles.headerSubtitle}>{studentProfile.cohort}</Text>
        </View>
        <TouchableOpacity style={styles.iconNode}>
          <Settings size={20} color="#110023" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Minimalist Accent Academic Banner */}
        <View style={styles.graphicBanner}>
          <View style={styles.innerGraphicPattern} />
        </View>

        {/* Profile Identity Stack */}
        <View style={styles.identityMetaSection}>
          <View style={styles.avatarFloatingWrapper}>
            <View style={styles.avatarMainPlate}>
              <Text style={styles.avatarInitialText}>{studentProfile.name[0]}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileOutlinePill}>
            <Text style={styles.editButtonText}>Account Settings</Text>
          </TouchableOpacity>

          <Text style={styles.displayIdentityName}>{studentProfile.name}</Text>
          <Text style={styles.subHandleText}>ID: {studentProfile.handle}</Text>

          {/* Academic Track Definition */}
          <Text style={styles.bioBodyText}>
            Focusing on high-performance infrastructure, concurrent backend systems, and clean layout patterns. Track: <Text style={{ fontFamily: 'OnestBold', color: '#110023' }}>{studentProfile.track}</Text>
          </Text>

          {/* Twitter-Style Micro-Meta Grid for Student Info */}
          <View style={styles.metaDataGridBlock}>
            <View style={styles.metaRowItem}>
              <GraduationCap size={14} color="#64748b" />
              <Text style={styles.metaLabelInlineText}>{studentProfile.cohort}</Text>
            </View>
            <View style={styles.metaRowItem}>
              <Clock size={14} color="#64748b" />
              <Text style={styles.metaLabelInlineText}>{studentProfile.joined}</Text>
            </View>
          </View>

          {/* Twitter-Style Numerical Metrics Redesigned for Student Progress */}
          <View style={styles.socialFollowCounterRow}>
            <View style={styles.metricCounterItem}>
              <BookOpen size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{studentProfile.coursesEnrolled}</Text> Courses
              </Text>
            </View>

            <View style={styles.metricCounterItem}>
              <Award size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{studentProfile.completedCerts}</Text> Certificates
              </Text>
            </View>

            <View style={styles.metricCounterItem}>
              <Clock size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{studentProfile.learningHours}</Text> Logged
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.dividerLineBreak} />

        {/* Academic Options / Student Portal List Tile Loop */}
        <View style={styles.optionsGroupingContainer}>
          <Text style={styles.sectionGroupingLabel}>STUDENT PORTAL</Text>
          
          {learningInventory.map((node, index) => {
            const SettingIcon = node.Icon;
            return (
              <TouchableOpacity key={index} style={styles.optionListTileRow} activeOpacity={0.7}>
                <View style={styles.tileLeftCluster}>
                  <View style={styles.tileIconFrame}>
                    <SettingIcon size={18} color="#110023" />
                  </View>
                  <View style={styles.tileTextMetadataBlock}>
                    <View style={styles.tileHeaderLine}>
                      <Text style={styles.tileLabelHeading}>{node.label}</Text>
                      {node.badge && (
                        <View style={styles.inlinePillNotification}>
                          <Text style={styles.notificationText}>{node.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text numberOfLines={1} style={styles.tileDescSubText}>{node.desc}</Text>
                  </View>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  headerTitleContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontFamily: 'OnestBold',
    fontSize: 16,
    fontWeight: '700',
    color: '#110023',
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#64748b',
    marginTop: -1,
  },
  iconNode: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  graphicBanner: {
    height: 100,
    backgroundColor: '#110023',
    position: 'relative',
    overflow: 'hidden',
  },
  innerGraphicPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.05,
    backgroundColor: '#ffffff',
  },
  identityMetaSection: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  avatarFloatingWrapper: {
    marginTop: -38,
    marginBottom: 8,
  },
  avatarMainPlate: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#f1f5f9',
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitialText: {
    fontFamily: 'OnestBold',
    fontSize: 26,
    fontWeight: '800',
    color: '#110023',
  },
  editProfileOutlinePill: {
    position: 'absolute',
    top: 14,
    right: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  editButtonText: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    fontWeight: '700',
    color: '#110023',
  },
  displayIdentityName: {
    fontFamily: 'OnestBold',
    fontSize: 19,
    fontWeight: '700',
    color: '#110023',
    letterSpacing: -0.4,
  },
  subHandleText: {
    fontFamily: 'OnestLight',
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 1,
  },
  bioBodyText: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    marginTop: 10,
  },
  metaDataGridBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 6,
    marginTop: 12,
  },
  metaRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaLabelInlineText: {
    fontFamily: 'OnestLight',
    fontSize: 12,
    color: '#64748b',
  },
  socialFollowCounterRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  metricCounterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterItemText: {
    fontFamily: 'OnestLight',
    fontSize: 13,
    color: '#64748b',
  },
  boldMetricSpan: {
    fontFamily: 'OnestBold',
    color: '#110023',
    fontWeight: '700',
  },
  dividerLineBreak: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginTop: 16,
  },
  optionsGroupingContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  sectionGroupingLabel: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    letterSpacing: 0.6,
    color: '#94a3b8',
    marginBottom: 6,
  },
  optionListTileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  tileLeftCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  tileIconFrame: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTextMetadataBlock: {
    flex: 1,
    gap: 1,
  },
  tileHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tileLabelHeading: {
    fontFamily: 'OnestBold',
    fontSize: 13.5,
    fontWeight: '600',
    color: '#110023',
  },
  inlinePillNotification: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  notificationText: {
    fontFamily: 'OnestBold',
    fontSize: 9,
    color: '#1d4ed8',
  },
  tileDescSubText: {
    fontFamily: 'OnestLight',
    fontSize: 11.5,
    color: '#64748b',
    paddingRight: 8,
  },
});