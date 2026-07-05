import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';
import {roommates} from '../data/roommates';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'roommate' | 'system';
};

const guidedQuestions = [
  'Biasanya tidur jam berapa?',
  'Pembagian biaya gimana?',
  'Seberapa sering menerima tamu?',
  'Preferensi kebersihan rumah?',
];

export function ChatScreen({navigation, route}: Props): React.JSX.Element {
  const roommate = roommates.find(item => item.id === route.params.roommateId);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-1',
      sender: 'system',
      text: 'Mulai ngobrol dengan santai. TemanSewa akan bantu kasih pertanyaan agar obrolan tetap aman dan terarah.',
    },
    {
      id: 'roommate-1',
      sender: 'roommate',
      text: `Halo, aku ${roommate?.name ?? 'calon roommate'}. Salam kenal ya!`,
    },
  ]);

  const handleSend = (text?: string) => {
    const finalText = text ?? message;

    if (!finalText.trim()) {
      return;
    }

    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}`,
        sender: 'me',
        text: finalText.trim(),
      },
    ]);

    setMessage('');
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
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{roommate.name.charAt(0)}</Text>
            </View>

            <View>
              <Text style={styles.name}>{roommate.name}</Text>
              <Text style={styles.status}>{roommate.compatibilityScore}% match</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}>
          {messages.map(item => {
            const isMe = item.sender === 'me';
            const isSystem = item.sender === 'system';

            return (
              <View
                key={item.id}
                style={[
                  styles.messageBubble,
                  isMe && styles.myBubble,
                  isSystem && styles.systemBubble,
                ]}>
                <Text
                  style={[
                    styles.messageText,
                    isMe && styles.myMessageText,
                    isSystem && styles.systemMessageText,
                  ]}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.guidedSection}>
          <Text style={styles.guidedTitle}>Pertanyaan bantu</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.guidedList}>
            {guidedQuestions.map(item => (
              <Pressable
                key={item}
                style={styles.guidedChip}
                onPress={() => handleSend(item)}>
                <Text style={styles.guidedText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Tulis pesan..."
            placeholderTextColor="#9AA8A3"
            style={styles.input}
            multiline
          />

          <Pressable style={styles.sendButton} onPress={() => handleSend()}>
            <Text style={styles.sendText}>Kirim</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    height: 72,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  backText: {
    marginTop: -2,
    fontSize: 34,
    color: colors.primary,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  status: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  messageBubble: {
    maxWidth: '82%',
    alignSelf: 'flex-start',
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  systemBubble: {
    maxWidth: '100%',
    alignSelf: 'center',
    backgroundColor: colors.muted,
    borderColor: colors.muted,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  systemMessageText: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  guidedSection: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guidedTitle: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    fontSize: 13,
    fontWeight: '900',
    color: colors.textSecondary,
  },
  guidedList: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  guidedChip: {
    borderRadius: 999,
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  guidedText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 110,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  sendButton: {
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textPrimary,
  },
});