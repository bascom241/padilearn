import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, GraduationCap, ShieldCheck, Bookmark, Video, BookOpen, Calendar, HelpCircle, MessageSquare, Award, TrendingUp } from "lucide-react-native";
// Imported Gifted Line Chart Engine Component
import { LineChart } from "react-native-gifted-charts";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      tag: "VETTED TUTORS",
      title: "Learn directly from native vocational tech experts",
      desc: "Skip the guesswork. Our educators are top-tier industry veterans vetted for high-impact knowledge transmission.",
      Icon: GraduationCap,
      image: require('../../assets/images/card1.jpg')
    },
    {
      tag: "LIVE CLASSROOMS",
      title: "Interactive virtual spaces built for scale",
      desc: "Engage in real-time engineering and creative cohorts designed to mirror real professional team sprints.",
      Icon: ShieldCheck,
      image: require('../../assets/images/card2.jpg')
    },
    {
      tag: "PREMIUM MATERIALS",
      title: "Get access to globally industry-standard course tracks",
      desc: "Unlock source repositories, pristine production blueprints, and curriculum tailored to current enterprise standards.",
      Icon: Bookmark,
      image: require('../../assets/images/card1.jpg')
    }
  ];

  const quickActions = [
    { label: "Live Class", Icon: Video, bg: '#ff8a00' },
    { label: "Courses", Icon: BookOpen, bg: '#22c55e' },
    { label: "Timetable", Icon: Calendar, bg: '#0ea5e9' },
    { label: "Support", Icon: HelpCircle, bg: '#a855f7' },
    { label: "Chats", Icon: MessageSquare, bg: '#ec4899' },
    { label: "Certificates", Icon: Award, bg: '#eab308' },
  ];

  // Learning Progress Dataset structured seamlessly for Gifted Charts
  const chartData = [
    { value: 2.0, label: 'M' },
    { value: 4.5, label: 'T' },
    { value: 3.0, label: 'W' },
    { value: 6.2, label: 'T' },
    { value: 4.8, label: 'F' },
    { value: 1.5, label: 'S' },
    { value: 3.8, label: 'S' },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    if (slideIndex !== activeSlide && slideIndex >= 0 && slideIndex < features.length) {
      setActiveSlide(slideIndex);
    }
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/** Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerProfileContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.subProfileContainer}>
                <User size={24} color="#230444" />
              </View>
            </View>

            <View style={styles.headerProfileName}>
              <Text style={styles.greetText}>Hello,</Text>
              <Text style={styles.userName}>Abdulbasit</Text>
            </View>
          </View>

          <View style={styles.bellWrapper}>
            <Bell size={24} color="#110023" />
          </View>
        </View>

        {/** Feature Carousel */}
        <View style={styles.carouselSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 12}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.carouselContentContainer}
          >
            {features.map((item, index) => {
              const CustomIcon = item.Icon;
              return (
                <ImageBackground 
                  key={index} 
                  source={item.image}
                  style={styles.infoCard}
                  imageStyle={styles.cardImageStyle}
                >
                  <View style={styles.cardOverlay}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardTag}>{item.tag}</Text>
                      <View style={styles.cardIconBadge}>
                        <CustomIcon size={16} color="#110023" />
                      </View>
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                  </View>
                </ImageBackground>
              );
            })}
          </ScrollView>

          <View style={styles.indicatorContainer}>
            {features.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorBar,
                  index === activeSlide ? styles.activeIndicatorBar : null
                ]}
              />
            ))}
          </View>
        </View>

        {/** Horizontal Scrollable Circles Section with Floating Spacer Ring */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollerContent}
          >
            {quickActions.map((action, index) => {
              const ActionIcon = action.Icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.circleItemWrapper} 
                  activeOpacity={0.8}
                >
                  {/* Outer vibrant border wrapper container circle */}
                  <View style={[styles.actionCircle, { borderColor: action.bg }]}>
                    {/* Inner centered circular mask holding our core icon */}
                    <View style={[styles.actionInnerCircle, { backgroundColor: action.bg }]}>
                      <ActionIcon size={20} color="#ffffff" />
                    </View>
                  </View>
                  
                  {/* Name clearly aligned at the bottom of the circle layout combo */}
                  <Text numberOfLines={1} style={styles.circleLabel}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/** Gifted Area Trend Analytics Graph Section */}
        <View style={styles.analyticsSection}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.chartTitleContainer}>
              <Text style={styles.chartTitle}>Learning Trend</Text>
              <Text style={styles.chartSubtitle}>Weekly study metrics breakdown</Text>
            </View>
            <View style={styles.chartBadge}>
              <TrendingUp size={14} color="#15803d" style={{ marginRight: 4 }} />
              <Text style={styles.chartBadgeText}>+12.4%</Text>
            </View>
          </View>

          <View style={styles.chartWrapperCanvas}>
            <LineChart
              data={chartData}
              curved
              isAnimated
              animateOnDataChange
              animationDuration={1200}
              thickness={3}
              color="#110023"
              noOfSections={3}
              areaChart
              startFillColor="#110023"
              endFillColor="#ffffff"
              startOpacity={0.12}
              endOpacity={0.01}
              hideRules
              hideYAxisText
              yAxisColor="transparent"
              xAxisColor="#f1f5f9"
              pointerConfig={{
                pointerStripColor: '#cbd5e1',
                pointerStripWidth: 1.5,
                pointerColor: '#110023',
                radius: 5,
                pointerLabelComponent: (items: any) => (
                  <View style={styles.chartTooltip}>
                    <Text style={styles.tooltipText}>{items[0].value} hrs</Text>
                  </View>
                ),
              }}
              xAxisLabelTextStyle={{
                color: '#94a3b8',
                fontSize: 11,
                fontFamily: 'OnestLight',
                textAlign: 'center'
              }}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  headerProfileContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  profileContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: "#230444",
    alignItems: 'center',
    justifyContent: 'center',
  },
  subProfileContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2304442d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProfileName: {
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-start",
  },
  greetText: {
    fontFamily: "OnestLight",
    fontSize: 13,
    color: '#64748b',
  },
  userName: {
    fontFamily: "OnestBold",
    fontSize: 18,
    fontWeight: '700',
    color: "#110023",
    letterSpacing: -0.3,
  },
  bellWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselSection: {
    marginTop: 20,
  },
  carouselContentContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  infoCard: {
    width: CARD_WIDTH,
    height: 180, 
    backgroundColor: '#f8fafc', 
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    overflow: 'hidden', 
  },
  cardImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.88)', 
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTag: {
    fontFamily: "OnestBold",
    fontSize: 11,
    fontWeight: '800',
    color: '#110023',
    letterSpacing: 0.8,
  },
  cardIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#23044415',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: "OnestBold",
    fontSize: 18,
    fontWeight: '700',
    color: '#110023',
    letterSpacing: -0.4,
    lineHeight: 24,
    marginBottom: 6,
  },
  cardDesc: {
    fontFamily: "OnestLight",
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  indicatorBar: {
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
  },
  activeIndicatorBar: {
    width: 28,
    backgroundColor: '#110023',
  },
  actionsSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontFamily: "OnestBold",
    fontSize: 16,
    fontWeight: '700',
    color: '#110023',
    marginBottom: 16,
    paddingHorizontal: 20,
    letterSpacing: -0.2,
  },
  scrollerContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  circleItemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    width: 72,
  },
  // The Outer Circle acts as a ring outline container
  actionCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2, 
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // The Inner Circle leaves precise padding whitespace creating a floating loop effect
  actionInnerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: '#ffffff', // Strips ring intersection line
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLabel: {
    fontFamily: "OnestBold",
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    letterSpacing: -0.1,
  },

  // Premium Gifted Area Analytics Layout Container Card
  analyticsSection: {
    marginTop: 32,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitleContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  chartTitle: {
    fontFamily: "OnestBold",
    fontSize: 16,
    fontWeight: '700',
    color: '#110023',
  },
  chartSubtitle: {
    fontFamily: "OnestLight",
    fontSize: 12,
    color: '#64748b',
  },
  chartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chartBadgeText: {
    fontFamily: "OnestBold",
    fontSize: 11,
    fontWeight: '700',
    color: '#16803d',
  },
  chartWrapperCanvas: {
    marginRight: -20, // Clean canvas alignments
    marginTop: 10,
    alignItems: 'center',
  },
  chartTooltip: {
    backgroundColor: '#110023',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default HomeScreen;