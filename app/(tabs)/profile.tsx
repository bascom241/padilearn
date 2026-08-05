import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Image, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, Clock, BookOpen, X, Camera, LogOut } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGetProfile } from '@/features/profile/hooks/useGetProfile';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { useUploadAvatar } from '@/features/profile/hooks/useUploadAvatar';
import { useAuth } from '@/providers/AuthProvider';
import { handleApiError } from '@/utils/handleApiError';
import { toast } from '@/utils/toast';
import { router } from 'expo-router';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function Profile() {
  const { data: profile, isPending, error } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const { logout } = useAuth();

  const [editVisible, setEditVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setBio(profile.bio ?? '');
    }
  }, [profile]);

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      toast.error('Permission needed', 'Allow photo library access to change your avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]) return;

    uploadAvatar.mutate(result.assets[0].uri, {
      onSuccess: () => toast.success('Avatar updated'),
      onError: handleApiError,
    });
  };

  const handleSaveProfile = () => {
    updateProfile.mutate(
      { fullName: fullName.trim(), bio: bio.trim() },
      {
        onSuccess: () => {
          toast.success('Profile updated');
          setEditVisible(false);
        },
        onError: handleApiError,
      },
    );
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/Login');
        },
      },
    ]);
  };

  if (isPending) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#110023" />
      </SafeAreaView>
    );
  }

  if (error || !profile) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Could not load your profile.</Text>
      </SafeAreaView>
    );
  }

  const stats = profile.stats ?? { coursesEnrolled: 0, coursesCompleted: 0, learningHoursLogged: 0 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerActionRow}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{profile.fullName}</Text>
          <Text style={styles.headerSubtitle}>{capitalize(profile.role)}</Text>
        </View>
        <TouchableOpacity style={styles.iconNode} onPress={() => setEditVisible(true)}>
          <Settings size={20} color="#110023" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.graphicBanner}>
          <View style={styles.innerGraphicPattern} />
        </View>

        <View style={styles.identityMetaSection}>
          <View style={styles.avatarFloatingWrapper}>
            <TouchableOpacity onPress={handlePickAvatar} style={styles.avatarMainPlate} activeOpacity={0.8}>
              {uploadAvatar.isPending ? (
                <ActivityIndicator color="#110023" />
              ) : profile.avatarUrl ? (
                <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarInitialText}>{profile.fullName[0]}</Text>
              )}
              <View style={styles.avatarCameraBadge}>
                <Camera size={12} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.editProfileOutlinePill} onPress={() => setEditVisible(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <Text style={styles.displayIdentityName}>{profile.fullName}</Text>
          <Text style={styles.subHandleText}>{profile.email}</Text>

          {profile.bio ? (
            <Text style={styles.bioBodyText}>{profile.bio}</Text>
          ) : (
            <Text style={[styles.bioBodyText, styles.bioPlaceholder]}>Add a short bio to tell your cohort about yourself.</Text>
          )}

          <View style={styles.socialFollowCounterRow}>
            <View style={styles.metricCounterItem}>
              <BookOpen size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{stats.coursesEnrolled}</Text> Courses
              </Text>
            </View>

            <View style={styles.metricCounterItem}>
              <Award size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{stats.coursesCompleted}</Text> Completed
              </Text>
            </View>

            <View style={styles.metricCounterItem}>
              <Clock size={15} color="#110023" style={{ marginRight: 4 }} />
              <Text style={styles.counterItemText}>
                <Text style={styles.boldMetricSpan}>{stats.learningHoursLogged}</Text> hrs logged
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.dividerLineBreak} />

        <View style={styles.optionsGroupingContainer}>
          <Text style={styles.sectionGroupingLabel}>ACCOUNT</Text>

          <TouchableOpacity style={styles.optionListTileRow} activeOpacity={0.7} onPress={handleLogout}>
            <View style={styles.tileLeftCluster}>
              <View style={styles.tileIconFrame}>
                <LogOut size={18} color="#ef4444" />
              </View>
              <View style={styles.tileTextMetadataBlock}>
                <Text style={[styles.tileLabelHeading, { color: '#ef4444' }]}>Log Out</Text>
                <Text style={styles.tileDescSubText}>Sign out of your account on this device</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent visible={editVisible} onRequestClose={() => setEditVisible(false)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Edit Profile</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setEditVisible(false)}>
                <X size={18} color="#110023" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
            />

            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.textInput, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell your cohort about yourself"
              multiline
              maxLength={280}
            />

            <TouchableOpacity
              style={[styles.saveButton, updateProfile.isPending && { opacity: 0.6 }]}
              onPress={handleSaveProfile}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'OnestNormal',
    fontSize: 14,
    color: '#64748b',
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
    textTransform: 'capitalize',
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
    overflow: 'visible',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
  },
  avatarCameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#110023',
    borderWidth: 2,
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
  bioPlaceholder: {
    color: '#94a3b8',
    fontStyle: 'italic',
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
  tileLabelHeading: {
    fontFamily: 'OnestBold',
    fontSize: 13.5,
    fontWeight: '600',
    color: '#110023',
  },
  tileDescSubText: {
    fontFamily: 'OnestLight',
    fontSize: 11.5,
    color: '#64748b',
    paddingRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 0, 35, 0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalHeaderTitle: {
    fontFamily: 'OnestBold',
    fontSize: 18,
    fontWeight: '700',
    color: '#110023',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontFamily: 'OnestBold',
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
    marginTop: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'OnestNormal',
    fontSize: 14,
    color: '#110023',
    backgroundColor: '#fafafa',
  },
  bioInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 24,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#110023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontFamily: 'OnestBold',
    fontSize: 14,
  },
});
