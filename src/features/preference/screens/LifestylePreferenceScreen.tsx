import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'LifestylePreference'
>;

const sleepOptions = ['Pagi', 'Normal', 'Begadang'];
const cleanlinessOptions = ['Santai', 'Cukup rapi', 'Sangat rapi'];
const guestOptions = ['Jarang', 'Kadang-kadang', 'Sering'];
const smokingOptions = ['Tidak merokok', 'Merokok', 'Tidak masalah'];
const petOptions = ['Tidak punya', 'Punya hewan', 'Tidak masalah'];

export function LifestylePreferenceScreen({
  navigation,
}: Props): React.JSX.Element {
  const [sleepHabit, setSleepHabit] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [guestHabit, setGuestHabit] = useState('');
  const [smoking, setSmoking] = useState('');
  const [pet, setPet] = useState('');

  const isFormValid =
    sleepHabit &&
    cleanliness &&
    guestHabit &&
    smoking &&
    pet;

  const handleContinue = () => {
    console.log('Lifestyle preference', {
      sleepHabit,
      cleanliness,
      guestHabit,
      smoking,
      pet,
    });

    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>Langkah 2 dari 3</Text>

        <Text style={styles.title}>Gaya tinggal kamu seperti apa?</Text>

        <Text style={styles.subtitle}>
          Ini membantu TemanSewa mencocokkan kamu dengan roommate yang punya
          kebiasaan tinggal paling sesuai.
        </Text>

        <OptionSection
          title="Kebiasaan tidur"
          options={sleepOptions}
          selectedValue={sleepHabit}
          onSelect={setSleepHabit}
        />

        <OptionSection
          title="Kebersihan kamar/rumah"
          options={cleanlinessOptions}
          selectedValue={cleanliness}
          onSelect={setCleanliness}
        />

        <OptionSection
          title="Menerima tamu"
          options={guestOptions}
          selectedValue={guestHabit}
          onSelect={setGuestHabit}
        />

        <OptionSection
          title="Preferensi merokok"
          options={smokingOptions}
          selectedValue={smoking}
          onSelect={setSmoking}
        />

        <OptionSection
          title="Hewan peliharaan"
          options={petOptions}
          selectedValue={pet}
          onSelect={setPet}
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tips</Text>
          <Text style={styles.infoText}>
            Jawab sesuai kebiasaan asli kamu. Semakin jujur preferensinya,
            semakin akurat hasil match roommate nanti.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Lihat Rekomendasi"
          onPress={handleContinue}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}

type OptionSectionProps = {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

function OptionSection({
  title,
  options,
  selectedValue,
  onSelect,
}: OptionSectionProps): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.optionContainer}>
        {options.map(item => {
          const isSelected = selectedValue === item;

          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
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