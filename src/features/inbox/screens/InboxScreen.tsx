import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../../../theme';

const chats = [
  {
    id: '1',
    name: 'Raka',
    lastMessage: 'Biasanya kamu tidur jam berapa?',
    match: '92% match',
  },
  {
    id: '2',
    name: 'Dimas',
    lastMessage: 'Kalau biaya internet nanti sharing ya?',
    match: '86% match',
  },
];

export function InboxScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Inbox</Text>
            <Text style={styles.subtitle}>
              Obrolan dengan calon roommate yang sudah kamu mulai.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.chatCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
            </View>

            <Text style={styles.match}>{item.match}</Text>
          </View>
        )}
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
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  match: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
  },
});