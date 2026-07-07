import React, {useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {EmptyState} from '../../../components/EmptyState';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../../navigation/RootStackParamList';
import {useMatchContext} from '../../../store/MatchContext';
import {colors, spacing} from '../../../theme';
import {roommates} from '../../matching/data/roommates';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Status'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function StatusScreen({navigation}: Props): React.JSX.Element {
  const {progresses} = useMatchContext();

  const statusItems = useMemo(() => {
    return progresses
      .filter(progress => progress.status !== 'Chatting')
      .map(progress => {
        const roommate = roommates.find(item => item.id === progress.roommateId);

        if (!roommate) {
          return null;
        }

        return {
          roommate,
          progress,
        };
      })
      .filter(
        (
          item,
        ): item is {
          roommate: (typeof roommates)[number];
          progress: (typeof progresses)[number];
        } => item !== null,
      );
  }, [progresses]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={statusItems}
        keyExtractor={item => item.roommate.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Status</Text>

            <Text style={styles.subtitle}>
              Pantau progress agreement dan kesepakatan tinggal bersama.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              navigation.navigate('RoommateDetail', {
                roommateId: item.roommate.id,
              })
            }>
            <View style={styles.topRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.roommate.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.identity}>
                <Text style={styles.name}>{item.roommate.name}</Text>
                <Text style={styles.meta}>
                  {item.roommate.location} • {item.roommate.compatibilityScore}%
                  match
                </Text>
              </View>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.progress.status}</Text>
            </View>

            <Text style={styles.description}>{item.progress.lastMessage}</Text>

            <View style={styles.timeline}>
              <StatusStep
                title="Chat"
                active
                completed
              />
              <StatusStep
                title="Draft"
                active={
                  item.progress.status === 'Agreement Draft' ||
                  item.progress.status === 'Agreement Created'
                }
                completed={item.progress.status === 'Agreement Created'}
              />
              <StatusStep
                title="Created"
                active={item.progress.status === 'Agreement Created'}
                completed={item.progress.status === 'Agreement Created'}
              />
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="📌"
            title="Belum ada status agreement"
            description="Status akan muncul setelah kamu mulai membuat agreement dari halaman chat."
          />
        }
      />
    </SafeAreaView>
  );
}

type StatusStepProps = {
  title: string;
  active?: boolean;
  completed?: boolean;
};

function StatusStep({
  title,
  active = false,
  completed = false,
}: StatusStepProps): React.JSX.Element {
  return (
    <View style={styles.stepItem}>
      <View
        style={[
          styles.stepDot,
          active && styles.stepDotActive,
          completed && styles.stepDotCompleted,
        ]}>
        {completed ? <Text style={styles.stepCheck}>✓</Text> : null}
      </View>

      <Text style={[styles.stepText, active && styles.stepTextActive]}>
        {title}
      </Text>
    </View>
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
  card: {
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardPressed: {
    opacity: 0.86,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  identity: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  meta: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  description: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  timeline: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stepDotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.muted,
  },
  stepDotCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepCheck: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  stepTextActive: {
    color: colors.primary,
  },
});