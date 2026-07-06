import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MatchCard} from '../../matching/components/MatchCard';
import {roommates} from '../../matching/data/roommates';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../../navigation/RootStackParamList';
import {useMatchContext} from '../../../store/MatchContext';
import {colors, spacing} from '../../../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Saved'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SavedScreen({navigation}: Props): React.JSX.Element {
  const {bookmarkedRoommateIds, toggleBookmark, isBookmarked} =
    useMatchContext();

  const savedRoommates = useMemo(() => {
    return roommates.filter(item => bookmarkedRoommateIds.includes(item.id));
  }, [bookmarkedRoommateIds]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedRoommates}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Saved</Text>

            <Text style={styles.subtitle}>
              Calon roommate yang kamu tandai untuk dihubungi nanti.
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
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyTitle}>Belum ada yang disimpan</Text>
            <Text style={styles.emptyDescription}>
              Tandai calon roommate dari Home agar muncul di halaman ini.
            </Text>
          </View>
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
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  emptyDescription: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});