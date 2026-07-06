import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppButton} from '../../../components/AppButton';
import {AppTextInput} from '../../../components/AppTextInput';
import {SelectChip} from '../../../components/SelectChip';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PreferenceSetup'>;

const locationOptions = [
  'Dekat kantor',
  'Dekat kampus',
  'Dekat transportasi umum',
  'Area bebas dipilih',
];

const budgetOptions = [
  'Di bawah 1 juta',
  '1 - 2 juta',
  '2 - 3 juta',
  'Di atas 3 juta',
];

export function PreferenceSetupScreen({navigation}: Props): React.JSX.Element {
  const [targetLocation, setTargetLocation] = useState('');
  const [selectedLocationType, setSelectedLocationType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const isFormValid =
    targetLocation.trim().length > 0 &&
    selectedLocationType.length > 0 &&
    selectedBudget.length > 0;

  const handleContinue = () => {
    console.log('Preference setup', {
      targetLocation,
      selectedLocationType,
      selectedBudget,
    });

    navigation.navigate('LifestylePreference');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
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
            {locationOptions.map(item => (
              <SelectChip
                key={`location-${item}`}
                label={item}
                selected={selectedLocationType === item}
                onPress={() => setSelectedLocationType(item)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget sewa per bulan</Text>

          <View style={styles.optionContainer}>
            {budgetOptions.map(item => (
              <SelectChip
                key={`budget-${item}`}
                label={item}
                selected={selectedBudget === item}
                onPress={() => setSelectedBudget(item)}
              />
            ))}
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
        <AppButton
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
    paddingBottom: 120,
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