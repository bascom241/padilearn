import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Mic, MicOff, Radio, Users } from 'lucide-react-native';
import { useWorkshop } from '@/features/workshops/hooks/useWorkshop';
import { useJoinWorkshop } from '@/features/workshops/hooks/useJoinWorkshop';
import { useEndWorkshop } from '@/features/workshops/hooks/useEndWorkshop';
import { handleApiError } from '@/utils/handleApiError';
import { toast } from '@/utils/toast';

const WorkshopRoom = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: workshop, isLoading: isLoadingWorkshop } = useWorkshop(id);
  const joinWorkshop = useJoinWorkshop();
  const endWorkshop = useEndWorkshop();
  const [connection, setConnection] = useState<{ isHost: boolean } | null>(null);

  useEffect(() => {
    if (!id) return;
    joinWorkshop.mutate(id, {
      onSuccess: (result) => setConnection({ isHost: result.isHost }),
      onError: (error) => {
        handleApiError(error);
        router.back();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleEnd = () => {
    if (!id) return;
    endWorkshop.mutate(id, {
      onSuccess: () => {
        toast.success('Session ended');
        router.back();
      },
      onError: handleApiError,
    });
  };

  const isConnecting = isLoadingWorkshop || joinWorkshop.isPending || !connection;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.liveBadge}>
          <Radio size={12} color="#ffffff" />
          <Text style={styles.liveBadgeText}>LIVE</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        {isConnecting ? (
          <>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.statusText}>Connecting to session...</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>{workshop?.title}</Text>
            <Text style={styles.subtitle}>
              Hosted by {typeof workshop?.host === 'object' ? workshop.host.fullName : 'your instructor'}
            </Text>

            <View style={styles.roleBadge}>
              {connection.isHost ? (
                <Mic size={14} color="#110023" />
              ) : (
                <Users size={14} color="#110023" />
              )}
              <Text style={styles.roleBadgeText}>
                {connection.isHost ? 'You are hosting' : 'Listening'}
              </Text>
            </View>

            <View style={styles.noticeCard}>
              <MicOff size={20} color="#94a3b8" style={{ marginBottom: 8 }} />
              <Text style={styles.noticeText}>
                Audio is not available in this build yet — this screen connects to the live
                session and holds your place, but the microphone/speaker engine (LiveKit
                native SDK) has not been added to the app build. Once that is wired in, this
                screen will carry live audio automatically.
              </Text>
            </View>
          </>
        )}
      </View>

      {connection?.isHost && !isConnecting && (
        <TouchableOpacity style={styles.endButton} onPress={handleEnd} disabled={endWorkshop.isPending}>
          {endWorkshop.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.endButtonText}>End Session</Text>
          )}
        </TouchableOpacity>
      )}
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
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  liveBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  statusText: {
    color: '#ffffff',
    fontFamily: 'OnestNormal',
    fontSize: 13,
    marginTop: 12,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#cbd5e1',
    fontFamily: 'OnestLight',
    fontSize: 13,
    marginBottom: 20,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    marginBottom: 32,
  },
  roleBadgeText: {
    fontFamily: 'OnestBold',
    fontSize: 12,
    color: '#110023',
  },
  noticeCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  noticeText: {
    color: '#cbd5e1',
    fontFamily: 'OnestLight',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  endButton: {
    margin: 20,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endButtonText: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 14,
  },
});

export default WorkshopRoom;
