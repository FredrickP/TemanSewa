import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppButton} from '../../../components/AppButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';
import {AppTextInput} from '../../../components/AppTextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

const handleLogin = () => {
  console.log('Login pressed', {
    email,
    password,
  });

  navigation.replace('PreferenceSetup');
};
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.badge}>Masuk Akun</Text>

          <Text style={styles.title}>Selamat datang kembali</Text>

          <Text style={styles.subtitle}>
            Masuk untuk melanjutkan pencarian roommate yang cocok dengan gaya
            tinggal kamu.
          </Text>

       <View style={styles.form}>
        <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            secureTextEntry
            autoCapitalize="none"
        />

  <Text style={styles.forgotText}>Lupa password?</Text>
</View>
        </View>

        <View style={styles.footer}>
          <AppButton
            title="Masuk"
            onPress={handleLogin}
            disabled={!isFormValid}
          />

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}>
              Daftar
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    height: 56,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    marginTop: -2,
    fontSize: 34,
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.muted,
    fontSize: 14,
    fontWeight: '800',
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
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  form: {
    marginTop: spacing.xxl,
  },
  label: {
    marginBottom: spacing.sm,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  input: {
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  forgotText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  registerRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
});