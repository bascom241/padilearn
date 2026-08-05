import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Lock } from 'lucide-react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useLessonVideoPlayback } from '@/features/courses/hooks/useLessonVideoPlayback';

const LessonPlayer = () => {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const { data: playback, isLoading, isError } = useLessonVideoPlayback(id);

  const player = useVideoPlayer(playback?.playbackUrl ?? null, (instance) => {
    instance.loop = false;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>{title ?? 'Lesson'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.videoWrapper}>
        {isLoading && <ActivityIndicator size="large" color="#ffffff" />}

        {isError && (
          <View style={styles.centerMessage}>
            <Lock size={28} color="#ffffff" style={{ marginBottom: 8 }} />
            <Text style={styles.messageText}>You do not have access to this lesson yet.</Text>
          </View>
        )}

        {!isLoading && !isError && playback?.status !== 'ready' && (
          <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color="#ffffff" style={{ marginBottom: 12 }} />
            <Text style={styles.messageText}>
              {playback?.status === 'failed'
                ? 'This video failed to process. Contact your instructor.'
                : 'Video is still processing — check back shortly.'}
            </Text>
          </View>
        )}

        {playback?.playbackUrl && (
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#110023',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 15,
  },
  videoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  centerMessage: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  messageText: {
    color: '#ffffff',
    fontFamily: 'OnestNormal',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LessonPlayer;
