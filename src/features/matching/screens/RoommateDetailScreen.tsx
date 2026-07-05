import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';
import {roommates} from '../data/roommates';

type Props = NativeStackScreenProps<RootStackParamList, 'RoommateDetail'>;

export function RoommateDetailScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const roommate = roommates.find(item => item.id === route.params.roommateId);

  if (!roommate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Roommate tidak ditemukan</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{roommate.name.charAt(0)}</Text>
          </View>

          <Text style={styles.title}>
            {roommate.name}, {roommate.age}
          </Text>

          <Text style={styles.subtitle}>{roommate.occupation}</Text>

          <View style={styles.scoreBox}>
            <Text style={styles.score}>{roommate.compatibilityScore}% cocok</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ringkasan</Text>
          <Text style={styles.description}>{roommate.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferensi tinggal</Text>

          <Text style={styles.infoText}>📍 {roommate.location}</Text>
          <Text style={styles.infoText}>💰 {roommate.budget} / bulan</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>

          <View style={styles.tags}>
            {roommate.lifestyleTags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Saran TemanSewa</Text>
          <Text style={styles.description}>
            Profil ini cukup cocok dengan preferensi kamu. Lanjutkan dengan
            ngobrol santai untuk memastikan aturan tinggal, pembagian biaya,
            dan ekspektasi kebersihan.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
            title="Mulai Chat"
            onPress={() =>
                navigation.navigate('Chat', {
                roommateId: roommate.id,
                })
            }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 120,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  backText: {
    marginTop: -2,
    fontSize: 34,
    color: colors.primary,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scoreBox: {
    marginTop: spacing.lg,
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  score: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.primary,
  },
  card: {
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  infoText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
});