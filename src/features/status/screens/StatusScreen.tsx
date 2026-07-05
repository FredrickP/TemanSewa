import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../../../theme';

const statuses = [
  {
    id: '1',
    name: 'Raka',
    status: 'Agreement Draft',
    description: 'Menunggu review poin kesepakatan tinggal bersama.',
  },
  {
    id: '2',
    name: 'Dimas',
    status: 'Chatting',
    description: 'Masih tahap ngobrol dan validasi kecocokan.',
  },
];

export function StatusScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Status</Text>
        <Text style={styles.subtitle}>
          Pantau progress match, chat, dan agreement dengan calon roommate.
        </Text>

        <View style={styles.list}>
          {statuses.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </View>
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
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
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
  list: {
    marginTop: spacing.xxl,
  },
  card: {
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  status: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
});