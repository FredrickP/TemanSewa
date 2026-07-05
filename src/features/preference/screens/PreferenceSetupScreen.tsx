import React, {useState} from 'react';
import {
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

type Props = NativeStackScreenProps<RootStackParamList, 'PreferenceSetup'>;

const budgetOptions = [
  'Di bawah 1 juta',
  '1 - 2 juta',
  '2 - 3 juta',
  'Di atas 3 juta',
];

const locationOptions = [
  'Dekat kantor',
  'Dekat kampus',
  'Dekat transportasi umum',
  'Area bebas dipilih',
];

export function PreferenceSetupScreen({navigation}: Props): React.JSX.Element {
  const [targetLocation, setTargetLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedLocationType, setSelectedLocationType] = useState('');

  const isFormValid =
    targetLocation.trim().length > 0 &&
    selectedBudget.length > 0 &&
    selectedLocationType.length > 0;

    const handleContinue = () => {
    console.log('Preference setup', {
        targetLocation,
        selectedBudget,
        selectedLocationType,
    });

  navigation.navigate('LifestylePreference');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>Langkah 1 dari 3</Text>

        <Text style={styles.title}>Cari roommate di area mana?</Text>

        <Text style={styles.subtitle}>
          Kita mulai dari lokasi dan budget dulu supaya rekomendasi roommate
          lebih sesuai dengan kebutuhan kamu.
        </Text>

        <View style={styles.section}>
          <AppTextInput
            label="Lokasi target"
            value={targetLocation}
            onChangeText={setTargetLocation}
            placeholder="Contoh: Sudirman, Depok, BSD"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prioritas lokasi</Text>

          <View style={styles.optionContainer}>
            {locationOptions.map(item => {
              const isSelected = selectedLocationType === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setSelectedLocationType(item)}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipActive,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget sewa per bulan</Text>

          <View style={styles.optionContainer}>
            {budgetOptions.map(item => {
              const isSelected = selectedBudget === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setSelectedBudget(item)}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipActive,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Kenapa ini penting?</Text>
          <Text style={styles.infoText}>
            Roommate yang cocok bukan cuma soal harga, tapi juga jarak,
            kebiasaan perjalanan, dan kenyamanan area tinggal.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Lanjut"
          onPress={handleContinue}
          disabled={!isFormValid}
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  step: {
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
  section: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  infoCard: {
    marginTop: spacing.xxl,
    borderRadius: 22,
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
});