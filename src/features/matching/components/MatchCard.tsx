import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, spacing} from '../../../theme';
import type {Roommate} from '../screens/types/Roomate';

type MatchCardProps = {
  roommate: Roommate;
  onPress: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export function MatchCard({
  roommate,
  onPress,
  isBookmarked = false,
  onToggleBookmark,
}: MatchCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{roommate.name.charAt(0)}</Text>
        </View>

        <View style={styles.identity}>
          <Text style={styles.name}>
            {roommate.name}, {roommate.age}
          </Text>
          <Text style={styles.occupation}>{roommate.occupation}</Text>
        </View>

        <Pressable
          onPress={event => {
            event.stopPropagation();
            onToggleBookmark?.();
          }}
          style={[
            styles.bookmarkButton,
            isBookmarked && styles.bookmarkButtonActive,
          ]}>
          <Text
            style={[
              styles.bookmarkText,
              isBookmarked && styles.bookmarkTextActive,
            ]}>
            {isBookmarked ? '★' : '☆'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.scoreBox}>
          <Text style={styles.score}>{roommate.compatibilityScore}%</Text>
          <Text style={styles.scoreLabel}>Match</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>📍 {roommate.location}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>💰 {roommate.budget} / bulan</Text>
      </View>

      <View style={styles.tags}>
        {roommate.lifestyleTags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {roommate.description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardPressed: {
    opacity: 0.86,
  },
  header: {
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
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  identity: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  occupation: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textSecondary,
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButtonActive: {
    backgroundColor: '#FFF4D6',
  },
  bookmarkText: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textSecondary,
  },
  bookmarkTextActive: {
    color: '#F5A400',
  },
  scoreRow: {
    marginTop: spacing.md,
    alignItems: 'flex-start',
  },
  scoreBox: {
    borderRadius: 18,
    backgroundColor: colors.muted,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  score: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
  },
  scoreLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  metaRow: {
    marginTop: spacing.md,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tags: {
    marginTop: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  description: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
});