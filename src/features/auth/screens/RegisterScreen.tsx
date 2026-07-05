import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppTextInput} from '../../../components/AppTextInput';
import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({navigation}: Props): React.JSX.Element {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phoneNumber.trim().length > 0 &&
    password.trim().length >= 6;

const handleRegister = () => {
  console.log('Register pressed', {
    fullName,
    email,
    phoneNumber,
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

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.badge}>Daftar Akun</Text>

          <Text style={styles.title}>Buat akun TemanSewa</Text>

          <Text style={styles.subtitle}>
            Isi data dasar kamu dulu. Setelah itu kita bantu atur preferensi
            tempat tinggal dan calon roommate yang cocok.
          </Text>

          <View style={styles.form}>
            <AppTextInput
              label="Nama Lengkap"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Masukkan nama lengkap"
            />

            <AppTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AppTextInput
              label="Nomor HP"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Contoh: 081234567890"
              keyboardType="phone-pad"
            />

            <AppTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Minimal 6 karakter"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Kenapa data ini dibutuhkan?</Text>
            <Text style={styles.infoText}>
              Data ini membantu kami membuat profil dasar agar proses pencarian
              roommate terasa lebih aman dan terpercaya.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title="Daftar"
            onPress={handleRegister}
            disabled={!isFormValid}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Sudah punya akun? </Text>
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}>
              Masuk
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
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
  infoBox: {
    marginTop: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.muted,
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  loginRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
});