import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MatchCard} from '../../matching/components/MatchCard';
import {roommates} from '../../matching/data/roommates';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={roommates}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Halo, Fredrick 👋</Text>

            <Text style={styles.title}>Rekomendasi roommate buat kamu</Text>

            <Text style={styles.subtitle}>
              Kami menemukan beberapa calon roommate yang cocok berdasarkan
              lokasi, budget, dan gaya tinggal kamu.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <MatchCard
            roommate={item}
            onPress={() =>
              navigation.navigate('RoommateDetail', {
                roommateId: item.id,
              })
            }
          />
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
});