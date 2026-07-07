import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Clock, BookOpen, Star, ArrowRight, Layers } from 'lucide-react-native';

interface CourseCardProps {
  course?: {
    title: string;
    category: string;
    lessons: number;
    duration: string;
    rating: number;
    level: string; 
    price: string; 
    image: any;
  };
  onPress?: () => void;
}

const CourseCard = ({ course, onPress }: CourseCardProps) => {
  // Configured with standard placeholder options fitting your brand system
  const data = course || {
    title: "Advanced Next.js & Production Architecture",
    category: "TECH SPRINT",
    lessons: 24,
    duration: "18.5 hrs",
    rating: 4.9,
    level: "Advanced",
    price: "$49",
    image: require('../../assets/images/card1.jpg'),
  };

  return (
    <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.9} onPress={onPress}>
      {/* Course Main Thumbnail Media Window */}
      <View style={styles.imageContainer}>
        <Image source={data.image} style={styles.courseImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{data.category}</Text>
        </View>
      </View>

      {/* Meta Metric Details Breakdown Elements */}
      <View style={styles.detailsContainer}>
        <View style={styles.ratingRow}>
          <View style={styles.starGroup}>
            <Star size={12} color="#eab308" fill="#eab308" />
            <Text style={styles.ratingText}>{data.rating}</Text>
          </View>
          <View style={styles.levelGroup}>
            <Layers size={11} color="#64748b" />
            <Text style={styles.levelText}>{data.level}</Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.courseTitle}>
          {data.title}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <BookOpen size={13} color="#64748b" />
            <Text style={styles.metaText}>{data.lessons} Lessons</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={13} color="#64748b" />
            <Text style={styles.metaText}>{data.duration}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Pricing / CTA Interaction Footer Row */}
        <View style={styles.cardFooter}>
          <Text style={styles.priceText}>{data.price}</Text>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Course</Text>
            <ArrowRight size={12} color="#ffffff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  imageContainer: {
    width: 105,
    height: 125,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(17, 0, 35, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontFamily: 'OnestBold',
    fontSize: 8,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  starGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    color: '#110023',
    fontWeight: '600',
  },
  levelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#64748b',
  },
  courseTitle: {
    fontFamily: 'OnestBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#110023',
    lineHeight: 19,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'OnestLight',
    fontSize: 11,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceText: {
    fontFamily: 'OnestBold',
    fontSize: 16,
    fontWeight: '800',
    color: '#110023',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#110023',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  actionButtonText: {
    fontFamily: 'OnestBold',
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CourseCard;