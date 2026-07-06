import React, {useMemo} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
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
  BottomTabScreenProps<MainTabParamList, 'Inbox'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function InboxScreen({navigation}: Props): React.JSX.Element {
  const {progresses, deletedChatRoommateIds, deleteChat} = useMatchContext();

  const inboxItems = useMemo(() => {
    return progresses
      .filter(progress => !deletedChatRoommateIds.includes(progress.roommateId))
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
  }, [progresses, deletedChatRoommateIds]);

  const handleDeleteChat = (roommateId: string, roommateName: string) => {
    Alert.alert(
      'Hapus chat?',
      `Percakapan dengan ${roommateName} akan dihapus dari Inbox.`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => deleteChat(roommateId),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={inboxItems}
        keyExtractor={item => item.roommate.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Inbox</Text>
            <Text style={styles.subtitle}>
              Obrolan dengan calon roommate yang sudah kamu mulai.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [
              styles.chatCard,
              pressed && styles.chatCardPressed,
            ]}
            onPress={() =>
              navigation.navigate('Chat', {
                roommateId: item.roommate.id,
              })
            }>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.roommate.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.roommate.name}</Text>

              <Text style={styles.message} numberOfLines={1}>
                {item.progress.lastMessage}
              </Text>

              <Text style={styles.status}>{item.progress.status}</Text>
            </View>

            <View style={styles.rightInfo}>
              <Text style={styles.match}>
                {item.roommate.compatibilityScore}% match
              </Text>

              <Pressable
                style={styles.deleteButton}
                onPress={event => {
                  event.stopPropagation();
                  handleDeleteChat(item.roommate.id, item.roommate.name);
                }}>
                <Text style={styles.deleteText}>Hapus</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="💬"
            title="Belum ada chat"
            description="Mulai chat dari detail roommate agar percakapan muncul di sini."
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
  chatCardPressed: {
    opacity: 0.86,
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
  status: {
    marginTop: spacing.sm,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  rightInfo: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  match: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
  },
  deleteButton: {
    marginTop: spacing.sm,
    borderRadius: 999,
    backgroundColor: '#FEE4E2',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#D92D20',
  },
});