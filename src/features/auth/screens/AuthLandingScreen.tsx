import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {colors, spacing} from '../../../theme';
import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthLanding'>;

export function AuthLandingScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.badge}>TemanSewa</Text>

        <Text style={styles.title}>Mulai cari roommate yang cocok</Text>

        <Text style={styles.subtitle}>
          Buat akun atau masuk untuk mulai mengatur preferensi lokasi, budget,
          dan gaya hidup tinggal kamu.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Buat Akun"
          onPress={() => navigation.navigate('Register')}
        />

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Sudah punya akun? Masuk
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.lg,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  loginText: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});