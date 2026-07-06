import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SelectChip} from '../../../components/SelectChip';
import {MatchCard} from '../../matching/components/MatchCard';
import {roommates} from '../../matching/data/roommates';
import {EmptyState} from '../../../components/EmptyState';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';
import {useMatchContext} from '../../../store/MatchContext';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const budgetFilters = [
  'Semua',
  'Di bawah 1 juta',
  '1 - 2 juta',
  '2 - 3 juta',
  'Di atas 3 juta',
];

export function HomeScreen({navigation}: Props): React.JSX.Element {
  const [search, setSearch] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('Semua');

  const {toggleBookmark, isBookmarked, bookmarkedRoommateIds} =
    useMatchContext();

  const filteredRoommates = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return roommates.filter(item => {
      const matchKeyword =
        keyword.length === 0 ||
        item.name.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword) ||
        item.occupation.toLowerCase().includes(keyword) ||
        item.lifestyleTags.some(tag => tag.toLowerCase().includes(keyword));

      const matchBudget =
        selectedBudget === 'Semua' || item.budget === selectedBudget;

      return matchKeyword && matchBudget;
    });
  }, [search, selectedBudget]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredRoommates}
        extraData={bookmarkedRoommateIds}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Halo, Fredrick 👋</Text>

            <Text style={styles.title}>Cari roommate yang cocok</Text>

            <Text style={styles.subtitle}>
              Temukan calon roommate berdasarkan lokasi, budget, pekerjaan, dan
              gaya tinggal.
            </Text>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Cari lokasi, nama, atau gaya tinggal"
                placeholderTextColor="#9AA8A3"
                style={styles.searchInput}
              />

              {search.length > 0 ? (
                <Text style={styles.clearText} onPress={() => setSearch('')}>
                  ×
                </Text>
              ) : null}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Budget</Text>

              <FlatList
                data={budgetFilters}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterList}
                renderItem={({item}) => (
                  <SelectChip
                    label={item}
                    selected={selectedBudget === item}
                    onPress={() => setSelectedBudget(item)}
                  />
                )}
              />
            </View>

            <Text style={styles.resultText}>
              {filteredRoommates.length} rekomendasi ditemukan
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <MatchCard
            roommate={item}
            isBookmarked={isBookmarked(item.id)}
            onToggleBookmark={() => toggleBookmark(item.id)}
            onPress={() =>
              navigation.navigate('RoommateDetail', {
                roommateId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="🧐"
            title="Belum ada roommate cocok"
            description="Coba ubah kata pencarian atau pilih budget lain."
          />
        }
      />
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.md,
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
  searchBox: {
    marginTop: spacing.xl,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  clearText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  filterSection: {
    marginTop: spacing.xl,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  filterList: {
    gap: spacing.sm,
  },
  resultText: {
    marginTop: spacing.lg,
    fontSize: 14,
    fontWeight: '800',
    color: colors.textSecondary,
  },
});