import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../../../theme';

export function ProfileScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>F</Text>
        </View>

        <Text style={styles.title}>Fredrick</Text>
        <Text style={styles.subtitle}>Software Engineer • Jakarta</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferensi kamu</Text>
          <Text style={styles.cardText}>📍 Sudirman / area sekitar kantor</Text>
          <Text style={styles.cardText}>💰 2 - 3 juta per bulan</Text>
          <Text style={styles.cardText}>🛏️ Tidur normal</Text>
          <Text style={styles.cardText}>🧹 Cukup rapi</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Akun</Text>
          <Text style={styles.cardText}>Edit profile</Text>
          <Text style={styles.cardText}>Pengaturan preferensi</Text>
          <Text style={styles.cardText}>Logout</Text>
        </View>
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
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
  },
  card: {
    marginTop: spacing.xl,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
});