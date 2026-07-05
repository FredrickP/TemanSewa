import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';
import {roommates} from '../../matching/data/roommates';

type Props = NativeStackScreenProps<RootStackParamList, 'Agreement'>;

type AgreementItem = {
  id: string;
  title: string;
  description: string;
};

const agreementItems: AgreementItem[] = [
  {
    id: 'rent',
    title: 'Pembagian biaya sewa',
    description:
      'Biaya sewa dan tagihan bulanan akan dibagi sesuai kesepakatan bersama.',
  },
  {
    id: 'cleaning',
    title: 'Jadwal kebersihan',
    description:
      'Setiap penghuni bertanggung jawab menjaga kebersihan area pribadi dan area bersama.',
  },
  {
    id: 'guest',
    title: 'Aturan menerima tamu',
    description:
      'Tamu boleh datang dengan pemberitahuan sebelumnya dan tetap menjaga kenyamanan penghuni lain.',
  },
  {
    id: 'quiet',
    title: 'Jam tenang',
    description:
      'Hindari aktivitas berisik pada malam hari agar semua penghuni bisa beristirahat.',
  },
  {
    id: 'privacy',
    title: 'Privasi dan barang pribadi',
    description:
      'Setiap penghuni wajib menghargai privasi dan tidak menggunakan barang pribadi tanpa izin.',
  },
];

export function AgreementScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const roommate = roommates.find(item => item.id === route.params.roommateId);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'rent',
    'cleaning',
    'privacy',
  ]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleCreateAgreement = () => {
    console.log('Agreement created', {
      roommateId: roommate?.id,
      selectedItems,
    });

    navigation.replace('MainTabs');
  };

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

        <Text style={styles.step}>Agreement Draft</Text>

        <Text style={styles.title}>Buat kesepakatan dengan {roommate.name}</Text>

        <Text style={styles.subtitle}>
          Pilih poin-poin penting yang ingin disepakati sebelum tinggal bersama.
          Ini membantu ekspektasi lebih jelas dari awal.
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{roommate.name.charAt(0)}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {roommate.name}, {roommate.age}
            </Text>
            <Text style={styles.profileMeta}>
              {roommate.location} • {roommate.compatibilityScore}% match
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Poin kesepakatan</Text>

          {agreementItems.map(item => {
            const isSelected = selectedItems.includes(item.id);

            return (
              <Pressable
                key={item.id}
                onPress={() => toggleItem(item.id)}
                style={[
                  styles.agreementCard,
                  isSelected && styles.agreementCardActive,
                ]}>
                <View
                  style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                  {isSelected ? <Text style={styles.checkText}>✓</Text> : null}
                </View>

                <View style={styles.agreementContent}>
                  <Text style={styles.agreementTitle}>{item.title}</Text>
                  <Text style={styles.agreementDescription}>
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Catatan</Text>
          <Text style={styles.noteText}>
            Untuk MVP awal, agreement ini masih berupa draft di aplikasi. Nanti
            bisa dikembangkan menjadi dokumen yang bisa disetujui kedua pihak.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Buat Agreement"
          onPress={handleCreateAgreement}
          disabled={selectedItems.length === 0}
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
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  profileCard: {
    marginTop: spacing.xxl,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  profileMeta: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  agreementCard: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
  },
  agreementCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#F1F7F4',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  agreementContent: {
    flex: 1,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  agreementDescription: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  noteCard: {
    marginTop: spacing.lg,
    borderRadius: 22,
    backgroundColor: colors.muted,
    padding: spacing.lg,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
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